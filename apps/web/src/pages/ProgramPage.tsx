import { useParams } from "react-router";
import type { ProgramDetail, ProgramStage } from "../api/types";
import { useApi } from "../api/useApi";
import { ButtonLink, SmartLink } from "../components/primitives/SmartLink";
import { ErrorState, LoadingState } from "../components/states";
import { usePageMeta } from "../site/usePageMeta";
import { NotFoundPage } from "./NotFoundPage";
import { PageHeader } from "./PageHeader";

const TBC = "To be confirmed";

function Stage({ stage, showName }: { stage: ProgramStage; showName: boolean }) {
  return (
    <section className="stage" aria-label={stage.name}>
      {showName && <h3 className="stage__name">{stage.name}</h3>}
      <div className="stage__grid">
        <div>
          <h4 className="stage__label">Courses</h4>
          <ol className="stage__courses">
            {stage.courses.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ol>
        </div>
        <dl className="stage__facts">
          {stage.examMode && (
            <>
              <dt>Mode of examination</dt>
              <dd>{stage.examMode}</dd>
            </>
          )}
          {stage.entry.length > 0 && (
            <>
              <dt>Entry</dt>
              <dd>
                <ul>
                  {stage.entry.map((e) => (
                    <li key={e}>{e}</li>
                  ))}
                </ul>
              </dd>
            </>
          )}
          {stage.exemptions.length > 0 && (
            <>
              <dt>Exemptions</dt>
              <dd>
                <ul>
                  {stage.exemptions.map((e) => (
                    <li key={e}>{e}</li>
                  ))}
                </ul>
              </dd>
            </>
          )}
        </dl>
      </div>
    </section>
  );
}

export function ProgramPage() {
  const { slug } = useParams();
  const program = useApi<ProgramDetail>(`/programs/${slug}`);
  usePageMeta(program.data ? program.data.seo.title ?? program.data.title : null, program.data?.seo.description ?? program.data?.summary);

  if (program.status === "loading") return <LoadingState />;
  if (program.status === "error") {
    if (program.error.isNotFound) return <NotFoundPage />;
    return (
      <div className="container section">
        <ErrorState error={program.error} onRetry={program.retry} />
      </div>
    );
  }

  const p = program.data;
  const applyState =
    p.intakeStatus === "open"
      ? { text: "Applications are open.", canApply: true }
      : p.intakeStatus === "closed"
        ? { text: "Applications for this program are currently closed.", canApply: false }
        : { text: "Contact the Institute for the next intake date.", canApply: false };

  return (
    <>
      <PageHeader title={p.title} summary={p.summary}>
        <p className="page-header__award">Award: {p.award}</p>
      </PageHeader>

      <div className="container detail-layout">
        <aside className="fact-panel" aria-labelledby="program-facts">
          <h2 id="program-facts" className="fact-panel__heading">
            Key facts
          </h2>
          <dl className="fact-list">
            <dt>Duration</dt>
            <dd>{p.duration ?? TBC}</dd>
            <dt>Delivery</dt>
            <dd>{p.delivery ?? TBC}</dd>
            <dt>Next intake</dt>
            <dd>{p.nextIntake ?? TBC}</dd>
            <dt>Fees</dt>
            <dd>
              <SmartLink href="/programs/registration-fees">See registration fees</SmartLink>
            </dd>
          </dl>
          <p className="fact-panel__status">{applyState.text}</p>
          {applyState.canApply ? (
            <ButtonLink href="/become-a-member" variant="primary">
              Apply for this program
            </ButtonLink>
          ) : (
            <ButtonLink href="/contact" variant="secondary">
              Ask about the next intake
            </ButtonLink>
          )}
          <SmartLink className="fact-panel__more" href="/programs/outlines">
            Program outlines
          </SmartLink>
        </aside>
        <div className="prose prose--wide">
          <h2>Overview</h2>
          {p.overview.map((para, i) => (
            <p key={i}>{para}</p>
          ))}

          {p.audience && (
            <>
              <h2>Who it is for</h2>
              <p>{p.audience}</p>
            </>
          )}

          {p.stages.length > 0 && (
            <>
              <h2>Course content and exemption policy</h2>
              {p.stages.map((s) => (
                <Stage key={s.name} stage={s} showName />
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );
}
