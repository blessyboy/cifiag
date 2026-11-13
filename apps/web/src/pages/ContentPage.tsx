import { useLocation } from "react-router";
import type { PageContent } from "../api/types";
import { useApi } from "../api/useApi";
import { SectionRenderer } from "../components/sections/Sections";
import { ErrorState, LoadingState } from "../components/states";
import { usePageMeta } from "../site/usePageMeta";
import { NotFoundPage } from "./NotFoundPage";
import { PageHeader } from "./PageHeader";

/** Maps a URL path to a CMS page slug: "/" → "home", "/about/our-team" → "about/our-team". */
export function pathToSlug(pathname: string): string | null {
  const trimmed = pathname.replace(/\/+$/, "");
  if (trimmed === "") return "home";
  const slug = trimmed.slice(1);
  return /^[a-z0-9-]+(\/[a-z0-9-]+){0,3}$/.test(slug) ? slug : null;
}

/** Standard page template: renders any published CMS page by its path. */
export function ContentPage() {
  const { pathname } = useLocation();
  const slug = pathToSlug(pathname);
  const page = useApi<PageContent>(slug ? `/content/pages/${slug}` : null);

  usePageMeta(page.data ? page.data.seo.title ?? page.data.title : null, page.data?.seo.description ?? page.data?.summary);

  if (!slug || (page.status === "error" && page.error.isNotFound)) return <NotFoundPage />;
  if (page.status === "loading") return <LoadingState />;
  if (page.status === "error") {
    return (
      <div className="container section">
        <ErrorState error={page.error} onRetry={page.retry} />
      </div>
    );
  }

  const data = page.data;
  const startsWithHero = data.sections[0]?.type === "hero";
  return (
    <>
      {!startsWithHero && <PageHeader title={data.title} summary={data.summary} />}
      <SectionRenderer sections={data.sections} />
    </>
  );
}
