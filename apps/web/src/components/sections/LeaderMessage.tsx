import { useId } from "react";
import type { Section } from "../../api/types";
import { ButtonLink } from "../primitives/SmartLink";

type LeaderMessageSection = Extract<Section, { type: "leaderMessage" }>;

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter((p) => !/^(dr|mr|mrs|ms|prof|engr)\.?$/i.test(p))
    .slice(0, 2)
    .map((p) => p[0]!.toUpperCase())
    .join("");
}

/**
 * A signed message from an office holder (e.g. the CEO's welcome).
 *
 * The portrait, quote and signature form one "message card" — a <figure>
 * whose <figcaption> attributes the <blockquote>. The heading comes first in
 * source order so assistive technology meets it before the card; CSS grid
 * places the card beside the heading and priorities on wide screens.
 */
export function LeaderMessage({ section }: { section: LeaderMessageSection }) {
  const headingId = useId();
  const { person } = section;

  return (
    <section className="leader" aria-labelledby={headingId}>
      <div className="container leader__grid">
        <h2 id={headingId} className="section__heading leader__heading">
          {section.heading}
        </h2>

        <figure className="leader__card">
          <div className="leader__portrait">
            {person.portrait ? (
              <img
                className="leader__photo"
                src={person.portrait.src}
                alt={person.portrait.alt}
                width="306"
                height="306"
                loading="lazy"
                decoding="async"
              />
            ) : (
              <div className="leader__photo leader__photo--placeholder" aria-hidden="true">
                {initials(person.name)}
              </div>
            )}
          </div>

          <div className="leader__message">
            <blockquote className="leader__quote">
              <p>{section.quote}</p>
            </blockquote>
            <figcaption className="leader__signature">
              <span className="leader__name">{person.name}</span>
              <span className="leader__role">{person.role}</span>
            </figcaption>
          </div>
        </figure>

        <div className="leader__body">
          {section.intro && <p className="leader__intro">{section.intro}</p>}

          {section.points.length > 0 && (
            <ol className="leader__points">
              {section.points.map((point, i) => (
                <li key={point} className="leader__point">
                  <span className="leader__num" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="leader__point-text">{point}</p>
                </li>
              ))}
            </ol>
          )}

          {section.action && (
            <ButtonLink href={section.action.href} variant={section.action.variant === "primary" ? "primary" : "secondary"}>
              {section.action.label}
            </ButtonLink>
          )}
        </div>
      </div>
    </section>
  );
}
