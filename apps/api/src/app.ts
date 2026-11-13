import compression from "compression";
import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import { config, isProduction } from "./config.js";
import { databaseIsReady } from "./db.js";
import { errorHandler, notFoundHandler } from "./http/errors.js";
import { devCors, noStore, requestId } from "./http/middleware.js";
import { publicRouter } from "./routes/public.js";

export function createApp() {
  const app = express();

  app.disable("x-powered-by");
  app.set("trust proxy", isProduction ? 1 : false);

  app.use(requestId);
  app.use(
    helmet({
      // The API serves JSON only; lock everything down.
      contentSecurityPolicy: { directives: { defaultSrc: ["'none'"], frameAncestors: ["'none'"] } },
      crossOriginResourcePolicy: { policy: "same-origin" },
    }),
  );
  app.use(compression());
  app.use(express.json({ limit: "100kb" }));

  if (!isProduction && config.DEV_ALLOWED_ORIGINS.length > 0) {
    app.use(devCors(config.DEV_ALLOWED_ORIGINS));
  }

  const api = express.Router();

  api.use(
    rateLimit({
      windowMs: 60_000,
      limit: config.NODE_ENV === "test" ? 10_000 : 300,
      standardHeaders: "draft-8",
      legacyHeaders: false,
      handler: (_req, res) => {
        res.status(429).json({
          error: {
            code: "RATE_LIMITED",
            message: "Too many requests. Please wait a moment and try again.",
            requestId: res.locals.requestId,
          },
        });
      },
    }),
  );

  api.get("/health", noStore, (_req, res) => {
    const ready = databaseIsReady();
    res.status(ready ? 200 : 503).json({ data: { status: ready ? "ok" : "degraded", database: ready } });
  });

  api.use(publicRouter);

  app.use("/api/v1", api);
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
