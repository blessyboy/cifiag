import type { ErrorRequestHandler, RequestHandler } from "express";

export interface FieldError {
  path: string;
  code: string;
  message: string;
}

/** An error that is safe to show to API clients. */
export class ApiError extends Error {
  constructor(
    public readonly status: number,
    public readonly code: string,
    message: string,
    public readonly fields?: FieldError[],
  ) {
    super(message);
  }

  static notFound(message = "The requested resource was not found.") {
    return new ApiError(404, "NOT_FOUND", message);
  }

  static validation(fields: FieldError[]) {
    return new ApiError(422, "VALIDATION_FAILED", "Check the highlighted fields.", fields);
  }
}

export const notFoundHandler: RequestHandler = (_req, _res, next) => {
  next(ApiError.notFound("No API route matches this request."));
};

/**
 * Final error handler. Never leaks stack traces, database messages or paths
 * (PRD 10.1); unexpected errors are logged with the request id instead.
 */
export const errorHandler: ErrorRequestHandler = (err, req, res, _next) => {
  const requestId = res.locals.requestId as string | undefined;
  let status = 500;
  let body: Record<string, unknown> = {
    code: "INTERNAL_ERROR",
    message: "Something went wrong. Please try again later.",
  };

  if (err instanceof ApiError) {
    status = err.status;
    body = { code: err.code, message: err.message };
    if (err.fields) body.fields = err.fields;
  } else if (err?.type === "entity.parse.failed") {
    status = 400;
    body = { code: "MALFORMED_JSON", message: "The request body is not valid JSON." };
  } else if (err?.type === "entity.too.large") {
    status = 413;
    body = { code: "PAYLOAD_TOO_LARGE", message: "The request body is too large." };
  } else {
    console.error(`[${requestId}] ${req.method} ${req.originalUrl}`, err);
  }

  res.status(status).json({ error: { ...body, requestId } });
};
