import { randomUUID } from "node:crypto";
import type { RequestHandler } from "express";

const REQUEST_ID_PATTERN = /^[A-Za-z0-9._-]{8,128}$/;

/** Accepts a well-formed X-Request-ID or creates one (PRD 10.1). */
export const requestId: RequestHandler = (req, res, next) => {
  const incoming = req.get("x-request-id");
  const id = incoming && REQUEST_ID_PATTERN.test(incoming) ? incoming : `req_${randomUUID()}`;
  res.locals.requestId = id;
  res.setHeader("X-Request-ID", id);
  next();
};

/**
 * Development-only CORS for explicitly listed origins. Production serves the UI
 * and API from one origin, so no CORS headers are ever sent there (PRD 9.3).
 */
export function devCors(allowedOrigins: string[]): RequestHandler {
  const allowed = new Set(allowedOrigins);
  return (req, res, next) => {
    const origin = req.get("origin");
    res.vary("Origin");
    if (origin && allowed.has(origin)) {
      res.setHeader("Access-Control-Allow-Origin", origin);
      res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
      res.setHeader("Access-Control-Allow-Headers", "Content-Type,X-Request-ID,If-Match");
      if (req.method === "OPTIONS") {
        res.status(204).end();
        return;
      }
    }
    next();
  };
}

/** Public, cacheable read. Admin and application routes must use `noStore`. */
export function publicCache(maxAgeSeconds: number): RequestHandler {
  return (_req, res, next) => {
    res.setHeader(
      "Cache-Control",
      `public, max-age=${maxAgeSeconds}, stale-while-revalidate=${maxAgeSeconds * 4}`,
    );
    next();
  };
}

export const noStore: RequestHandler = (_req, res, next) => {
  res.setHeader("Cache-Control", "private, no-store");
  next();
};
