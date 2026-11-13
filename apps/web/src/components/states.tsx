import type { ReactNode } from "react";
import { Link } from "react-router";
import type { ApiRequestError } from "../api/client";

/** Reserved-space loading state with a text status for screen readers (PRD 8.3). */
export function LoadingState({ label = "Loading content" }: { label?: string }) {
  return (
    <div className="state state--loading" role="status" aria-live="polite">
      <span className="spinner" aria-hidden="true" />
      <span>{label}…</span>
    </div>
  );
}

export function EmptyState({ children }: { children: ReactNode }) {
  return <p className="state state--empty">{children}</p>;
}

/** Says what happened and how to retry. Technical detail stays in server logs. */
export function ErrorState({ error, onRetry }: { error: ApiRequestError; onRetry?: () => void }) {
  return (
    <div className="state state--error" role="alert">
      <h2>We could not load this content</h2>
      <p>{error.body?.message ?? "Something went wrong. Please try again."}</p>
      <div className="state__actions">
        {onRetry && (
          <button type="button" className="btn btn--primary btn--md" onClick={onRetry}>
            Try again
          </button>
        )}
        <Link className="btn btn--secondary btn--md" to="/contact">
          Contact us
        </Link>
      </div>
      {error.body?.requestId && <p className="state__ref">Reference: {error.body.requestId}</p>}
    </div>
  );
}
