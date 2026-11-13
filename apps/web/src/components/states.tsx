import type { ReactNode } from "react";
import { Link } from "react-router";
import type { ApiRequestError } from "../api/client";
import { Icon } from "./primitives/Icon";

/**
 * Skeleton loading state (PRD 8.3): reserves the shape of a page header and a
 * card row so content does not jump in, with a text status for screen readers.
 */
export function LoadingState({ label = "Loading content" }: { label?: string }) {
  return (
    <div className="skeleton-page" role="status" aria-live="polite">
      <span className="visually-hidden">{label}…</span>
      <div className="page-header" aria-hidden="true">
        <div className="container">
          <span className="skeleton skeleton--text" style={{ width: "8rem" }} />
          <span className="skeleton skeleton--title" />
          <span className="skeleton skeleton--text" style={{ width: "min(32rem, 90%)" }} />
        </div>
      </div>
      <div className="container section" aria-hidden="true">
        <div className="card-grid card-grid--3">
          {[0, 1, 2].map((i) => (
            <span key={i} className="skeleton skeleton--card" />
          ))}
        </div>
      </div>
    </div>
  );
}

export function EmptyState({ children }: { children: ReactNode }) {
  return (
    <div className="state state--empty">
      <Icon name="inbox" size={22} />
      <p>{children}</p>
    </div>
  );
}

/** Says what happened and how to retry. Technical detail stays in server logs. */
export function ErrorState({ error, onRetry }: { error: ApiRequestError; onRetry?: () => void }) {
  return (
    <div className="state state--error" role="alert">
      <Icon name="alert" size={24} className="state__icon" />
      <div>
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
    </div>
  );
}
