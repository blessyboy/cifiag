import { useCallback, useEffect, useState } from "react";
import { apiGet, ApiRequestError } from "./client";

export type ApiState<T> =
  | { status: "loading"; data?: undefined; error?: undefined }
  | { status: "success"; data: T; error?: undefined }
  | { status: "error"; data?: undefined; error: ApiRequestError };

const cache = new Map<string, unknown>();

/**
 * Fetches a public API resource. Responses are kept in a small in-memory
 * cache so back/forward navigation renders instantly.
 */
export function useApi<T>(path: string | null): ApiState<T> & { retry: () => void } {
  const [attempt, setAttempt] = useState(0);
  const [state, setState] = useState<ApiState<T>>(() =>
    path && cache.has(path) ? { status: "success", data: cache.get(path) as T } : { status: "loading" },
  );

  useEffect(() => {
    if (!path) return;
    if (cache.has(path)) {
      setState({ status: "success", data: cache.get(path) as T });
      return;
    }
    const controller = new AbortController();
    setState({ status: "loading" });
    apiGet<T>(path, controller.signal)
      .then((data) => {
        cache.set(path, data);
        setState({ status: "success", data });
      })
      .catch((err) => {
        if (controller.signal.aborted) return;
        setState({
          status: "error",
          error: err instanceof ApiRequestError ? err : new ApiRequestError(0, null),
        });
      });
    return () => controller.abort();
  }, [path, attempt]);

  const retry = useCallback(() => {
    if (path) cache.delete(path);
    setAttempt((n) => n + 1);
  }, [path]);

  return { ...state, retry };
}
