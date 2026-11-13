import type { ApiErrorBody } from "./types";

const BASE = "/api/v1";

export class ApiRequestError extends Error {
  constructor(
    public readonly status: number,
    public readonly body: ApiErrorBody | null,
  ) {
    super(body?.message ?? `Request failed with status ${status}`);
  }

  get isNotFound() {
    return this.status === 404;
  }
}

/** GET a `{ data }` envelope from the same-origin API. */
export async function apiGet<T>(path: string, signal?: AbortSignal): Promise<T> {
  let res: Response;
  try {
    res = await fetch(`${BASE}${path}`, {
      headers: { Accept: "application/json" },
      credentials: "same-origin",
      signal,
    });
  } catch (err) {
    if (err instanceof DOMException && err.name === "AbortError") throw err;
    throw new ApiRequestError(0, {
      code: "NETWORK_ERROR",
      message: "We could not reach the server. Check your connection and try again.",
    });
  }

  const json = await res.json().catch(() => null);
  if (!res.ok) throw new ApiRequestError(res.status, json?.error ?? null);
  return json.data as T;
}
