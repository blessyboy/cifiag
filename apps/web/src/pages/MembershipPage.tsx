import { useParams } from "react-router";
import type { MembershipDetail } from "../api/types";
import { useApi } from "../api/useApi";
import { ButtonLink, SmartLink } from "../components/primitives/SmartLink";
import { ErrorState, LoadingState } from "../components/states";
import { usePageMeta } from "../site/usePageMeta";
import { NotFoundPage } from "./NotFoundPage";
import { PageHeader } from "./PageHeader";

function ListBlock({ title, items }: { title: string; items: string[] }) {
  if (items.length === 0) return null;
  return (
    <>
      <h2>{title}</h2>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </>
  );
}

export function MembershipPage() {
  const { slug } = useParams();
  const category = useApi<MembershipDetail>(`/membership-categories/${slug}`);
  usePageMeta(category.data ? category.data.seo.title ?? category.data.name : null, category.data?.seo.description ?? category.data?.summary);

  if (category.status === "loading") return <LoadingState />;
  if (category.status === "error") {
    if (category.error.isNotFound) return <NotFoundPage />;
    return (
      <div className="container section">
        <ErrorState error={category.error} onRetry={category.retry} />
      </div>
    );
  }

  const m = category.data;
  return (
    <>
      <PageHeader title={m.name} summary={m.summary}>
        {m.designation && <p className="page-header__award">Designatory letters: {m.designation}</p>}
      </PageHeader>
      <div className="container detail-layout">
        <div className="prose">
          <ListBlock title="Eligibility" items={m.eligibility} />
          <ListBlock title="Benefits" items={m.benefits} />
          <ListBlock title="Obligations" items={m.obligations} />
          <ListBlock title="Evidence you will need" items={m.evidence} />
          <h2>How applications are reviewed</h2>
          <p>
            An application officer checks your evidence and may ask for more information. You will be told the outcome
            by email, quoting your application reference.
          </p>
        </div>

        <aside className="fact-panel" aria-labelledby="membership-apply">
          <h2 id="membership-apply" className="fact-panel__heading">
            Apply
          </h2>
          <dl className="fact-list">
            <dt>Fees</dt>
            <dd>
              <SmartLink href="/programs/registration-fees">See fees and subscriptions</SmartLink>
            </dd>
          </dl>
          {m.applicationMode === "open" && (
            <ButtonLink href="/become-a-member" variant="primary">
              Apply for {m.name.toLowerCase()} membership
            </ButtonLink>
          )}
          {m.applicationMode === "invitation" && (
            <p className="fact-panel__status">This category is conferred by invitation of Council. There is no open application.</p>
          )}
          {m.applicationMode === "closed" && (
            <p className="fact-panel__status">This category is not accepting applications at the moment.</p>
          )}
        </aside>
      </div>
    </>
  );
}
