import { useId } from "react";
import type {
  DocumentItem,
  FeeItem,
  MembershipSummary,
  NewsSummary,
  Person,
  ProgramSummary,
  Section,
  TextBlock,
} from "../../api/types";
import { formatBytes, formatDate, formatMoney } from "../../lib/format";
import { useSite } from "../../site/SiteContext";
import { ButtonLink, SmartLink } from "../primitives/SmartLink";
import { EmptyState } from "../states";
import { PersonCard } from "./PersonCard";

type Of<T extends Section["type"]> = Extract<Section, { type: T }>;

export function Hero({ section, isFirst }: { section: Of<"hero">; isFirst: boolean }) {
  const Heading = isFirst ? "h1" : "h2";
  return (
    <section className="hero">
      <div className="container hero__inner">
        <Heading className="hero__heading">{section.heading}</Heading>
        {section.summary && <p className="hero__summary">{section.summary}</p>}
        {section.actions.length > 0 && (
          <div className="action-row">
            {section.actions.map((a) => (
              <ButtonLink key={a.href} href={a.href} variant={a.variant === "primary" ? "primary" : "secondary"} size="lg">
                {a.label}
              </ButtonLink>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export function RichTextBlocks({ blocks }: { blocks: TextBlock[] }) {
  return (
    <div className="prose">
      {blocks.map((b, i) => {
        switch (b.type) {
          case "paragraph":
            return <p key={i}>{b.text}</p>;
          case "heading":
            return b.level === 2 ? <h2 key={i}>{b.text}</h2> : <h3 key={i}>{b.text}</h3>;
          case "list": {
            const List = b.ordered ? "ol" : "ul";
            return (
              <List key={i}>
                {b.items.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </List>
            );
          }
        }
      })}
    </div>
  );
}

const intakeLabel: Record<ProgramSummary["intakeStatus"], string> = {
  open: "Applications open",
  closed: "Applications closed",
  pending: "Intake dates to be announced",
};

const modeLabel: Record<MembershipSummary["applicationMode"], string | null> = {
  open: null,
  closed: "Not accepting applications",
  invitation: "By invitation",
};

export function CardGrid({ section }: { section: Of<"cardGrid"> }) {
  const headingId = useId();
  const cardHeading = section.heading ? "h3" : "h2";
  const CardTitle = cardHeading;

  let content;
  if (section.items.length === 0) {
    content = <EmptyState>{section.emptyState}</EmptyState>;
  } else if (section.source === "people") {
    content = (
      <ul className={`card-grid card-grid--${section.columns}`}>
        {(section.items as Person[]).map((p) => (
          <li key={p.id}>
            <PersonCard person={p} headingLevel={cardHeading} />
          </li>
        ))}
      </ul>
    );
  } else {
    content = (
      <ul className={`card-grid card-grid--${section.columns}`}>
        {section.items.map((raw) => {
          let title: string, href: string, body: string, meta: string | null = null;
          if (section.source === "programs") {
            const p = raw as ProgramSummary;
            [title, href, body, meta] = [p.title, p.href, p.summary, intakeLabel[p.intakeStatus]];
          } else if (section.source === "membershipCategories") {
            const m = raw as MembershipSummary;
            [title, href, body, meta] = [m.name, m.href, m.summary, modeLabel[m.applicationMode]];
          } else {
            const n = raw as NewsSummary;
            [title, href, body, meta] = [n.title, n.href, n.summary, formatDate(n.publishedAt)];
          }
          return (
            <li key={href} className="card">
              <CardTitle className="card__title">
                <SmartLink href={href} className="card__link">
                  {title}
                </SmartLink>
              </CardTitle>
              <p className="card__body">{body}</p>
              {meta && <p className="card__meta">{meta}</p>}
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <section className="section" aria-labelledby={section.heading ? headingId : undefined}>
      <div className="container">
        {section.heading && (
          <h2 id={headingId} className="section__heading">
            {section.heading}
          </h2>
        )}
        {section.intro && <p className="section__intro">{section.intro}</p>}
        {content}
      </div>
    </section>
  );
}

export function Accordion({ section }: { section: Of<"accordion"> }) {
  return (
    <section className="section">
      <div className="container container--narrow">
        {section.heading && <h2 className="section__heading">{section.heading}</h2>}
        <div className="accordion">
          {section.items.map((item) => (
            // Native <details> gives keyboard and screen reader behavior for free.
            <details key={item.question} className="accordion__item">
              <summary className="accordion__summary">{item.question}</summary>
              <div className="accordion__panel">
                <p>{item.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Fees grouped by program stage, each group with a total (one tbody per group). */
function FeeTable({ caption, fees }: { caption: string; fees: FeeItem[] }) {
  if (fees.length === 0) return <EmptyState>No fees are published at the moment.</EmptyState>;

  const groups = new Map<string, FeeItem[]>();
  for (const f of fees) groups.set(f.audience, [...(groups.get(f.audience) ?? []), f]);
  const amount = (f: FeeItem) => (f.amountMinor === null ? "To be confirmed" : formatMoney(f.amountMinor, f.currency));

  return (
    <div className="table-scroll" role="region" aria-label={caption} tabIndex={0}>
      <table className="data-table data-table--fees">
        <caption>{caption}</caption>
        <thead>
          <tr>
            <th scope="col">Fee</th>
            <th scope="col" className="num">
              Amount
            </th>
          </tr>
        </thead>
        {[...groups].map(([audience, items]) => {
          const known = items.every((f) => f.amountMinor !== null);
          const total = items.reduce((sum, f) => sum + (f.amountMinor ?? 0), 0);
          return (
            <tbody key={audience}>
              <tr className="data-table__group">
                <th scope="colgroup" colSpan={2}>
                  {audience}
                </th>
              </tr>
              {items.map((f) => (
                <tr key={f.item}>
                  <th scope="row">
                    {f.item}
                    {f.notes && <span className="data-table__note">{f.notes}</span>}
                  </th>
                  <td className="num">{amount(f)}</td>
                </tr>
              ))}
              {items.length > 1 && known && (
                <tr className="data-table__total">
                  <th scope="row">Total</th>
                  <td className="num">{formatMoney(total, items[0]!.currency)}</td>
                </tr>
              )}
            </tbody>
          );
        })}
      </table>
    </div>
  );
}

export function DataTable({ section }: { section: Of<"dataTable"> }) {
  return (
    <section className="section">
      <div className="container">
        {section.source === "fees" ? (
          <FeeTable caption={section.caption} fees={section.fees ?? []} />
        ) : (
          <div className="table-scroll" role="region" aria-label={section.caption} tabIndex={0}>
            <table className="data-table">
              <caption>{section.caption}</caption>
              <thead>
                <tr>
                  {section.columns.map((c) => (
                    <th key={c.key} scope="col">
                      {c.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {section.rows.map((row, i) => (
                  <tr key={i}>
                    {section.columns.map((c) => (
                      <td key={c.key}>{row[c.key]}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}

function DocumentRow({ doc }: { doc: DocumentItem }) {
  const meta = [doc.fileType, formatBytes(doc.bytes), doc.year ? String(doc.year) : null].filter(Boolean).join(", ");
  return (
    <li className="doc-list__item">
      <div>
        {doc.url ? (
          <a href={doc.url} className="doc-list__title">
            {doc.title}
            <span className="visually-hidden"> ({meta})</span>
          </a>
        ) : (
          <span className="doc-list__title">{doc.title}</span>
        )}
        <p className="doc-list__meta">
          {meta}
          {!doc.url && " · File not yet available"}
        </p>
      </div>
      {doc.archived && <span className="badge badge--muted">Archived</span>}
    </li>
  );
}

export function DocumentList({ section }: { section: Of<"documentList"> }) {
  const current = section.documents.filter((d) => !d.archived);
  const archived = section.documents.filter((d) => d.archived);
  return (
    <section className="section">
      <div className="container container--narrow">
        {section.heading && <h2 className="section__heading">{section.heading}</h2>}
        {section.documents.length === 0 ? (
          <EmptyState>{section.emptyState}</EmptyState>
        ) : (
          <>
            <h2 className="section__subheading">Current</h2>
            {current.length === 0 ? (
              <EmptyState>The current year's document has not been published yet.</EmptyState>
            ) : (
              <ul className="doc-list">{current.map((d) => <DocumentRow key={d.id} doc={d} />)}</ul>
            )}
            {archived.length > 0 && (
              <>
                <h2 className="section__subheading">Archive</h2>
                <p className="section__intro">Archived documents are kept for reference and may be out of date.</p>
                <ul className="doc-list">{archived.map((d) => <DocumentRow key={d.id} doc={d} />)}</ul>
              </>
            )}
          </>
        )}
      </div>
    </section>
  );
}

export function CallToAction({ section }: { section: Of<"callToAction"> }) {
  return (
    <section className="section">
      <div className="container">
        <div className="cta-panel">
          <div>
            <h2 className="cta-panel__heading">{section.heading}</h2>
            {section.text && <p>{section.text}</p>}
          </div>
          <div className="action-row">
            {section.actions.map((a) => (
              <ButtonLink key={a.href} href={a.href} variant={a.variant === "primary" ? "primary" : "secondary"}>
                {a.label}
              </ButtonLink>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function ContactDetails({ section }: { section: Of<"contactDetails"> }) {
  const site = useSite();
  const c = site?.contact;
  const hasAny = !!c && (c.address.length || c.phones.length || c.emails.length);

  return (
    <section className="section">
      <div className="container container--narrow">
        <h2 className="section__heading">{section.heading}</h2>
        {!hasAny ? (
          <EmptyState>
            The Institute's verified address, telephone numbers and email addresses are being confirmed and will be
            published here soon.
          </EmptyState>
        ) : (
          <dl className="contact-list">
            {c!.address.length > 0 && (
              <>
                <dt>Address</dt>
                <dd>
                  <address>{c!.address.map((l) => <span key={l} className="block">{l}</span>)}</address>
                  {c!.mapUrl && <SmartLink href={c!.mapUrl}>View on a map</SmartLink>}
                </dd>
              </>
            )}
            {c!.phones.length > 0 && (
              <>
                <dt>Telephone</dt>
                <dd>{c!.phones.map((p) => <a key={p} className="block" href={`tel:${p.replace(/\s+/g, "")}`}>{p}</a>)}</dd>
              </>
            )}
            {c!.emails.length > 0 && (
              <>
                <dt>Email</dt>
                <dd>{c!.emails.map((e) => <a key={e} className="block" href={`mailto:${e}`}>{e}</a>)}</dd>
              </>
            )}
            {c!.officeHours && (
              <>
                <dt>Office hours</dt>
                <dd>{c!.officeHours}</dd>
              </>
            )}
          </dl>
        )}
        <p className="section__intro">An online enquiry form will be available in a later release.</p>
      </div>
    </section>
  );
}

export function SectionRenderer({ sections }: { sections: Section[] }) {
  return (
    <>
      {sections.map((section, i) => {
        switch (section.type) {
          case "hero":
            return <Hero key={i} section={section} isFirst={i === 0} />;
          case "richText":
            return (
              <section key={i} className="section">
                <div className="container container--narrow">
                  <RichTextBlocks blocks={section.blocks} />
                </div>
              </section>
            );
          case "cardGrid":
            return <CardGrid key={i} section={section} />;
          case "accordion":
            return <Accordion key={i} section={section} />;
          case "dataTable":
            return <DataTable key={i} section={section} />;
          case "documentList":
            return <DocumentList key={i} section={section} />;
          case "callToAction":
            return <CallToAction key={i} section={section} />;
          case "contactDetails":
            return <ContactDetails key={i} section={section} />;
          default:
            return null; // Unknown section types are ignored, never rendered raw.
        }
      })}
    </>
  );
}
