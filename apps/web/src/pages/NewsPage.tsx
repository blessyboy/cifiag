import { useParams } from "react-router";
import type { NewsDetail } from "../api/types";
import { useApi } from "../api/useApi";
import { SmartLink } from "../components/primitives/SmartLink";
import { RichTextBlocks } from "../components/sections/Sections";
import { ErrorState, LoadingState } from "../components/states";
import { formatDate } from "../lib/format";
import { usePageMeta } from "../site/usePageMeta";
import { NotFoundPage } from "./NotFoundPage";
import { PageHeader } from "./PageHeader";

export function NewsPage() {
  const { slug } = useParams();
  const article = useApi<NewsDetail>(`/news/${slug}`);
  usePageMeta(article.data?.title, article.data?.summary);

  if (article.status === "loading") return <LoadingState />;
  if (article.status === "error") {
    if (article.error.isNotFound) return <NotFoundPage />;
    return (
      <div className="container section">
        <ErrorState error={article.error} onRetry={article.retry} />
      </div>
    );
  }

  const a = article.data;
  const published = formatDate(a.publishedAt);
  return (
    <>
      <PageHeader title={a.title}>
        {published && (
          <p className="page-header__meta">
            <time dateTime={a.publishedAt ?? undefined}>{published}</time>
            {a.author && ` · ${a.author}`}
          </p>
        )}
      </PageHeader>
      <article className="container container--narrow section">
        <RichTextBlocks blocks={a.body} />
        {a.source && (
          <p className="article-source">
            Source:{" "}
            {a.source.url ? <SmartLink href={a.source.url}>{a.source.name}</SmartLink> : a.source.name}
          </p>
        )}
        <p>
          <SmartLink href="/news">All news</SmartLink>
        </p>
      </article>
    </>
  );
}
