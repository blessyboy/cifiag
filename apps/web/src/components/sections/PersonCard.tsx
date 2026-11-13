import type { Person } from "../../api/types";

const HONORIFICS = /^(the|late|dr|mr|mrs|ms|miss|prof|engr|rev|hon)\.?$/i;

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter((part) => !HONORIFICS.test(part))
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]!.toUpperCase())
    .join("");
}

/** Handles the PRD's people edge states: no image, vacant role. */
export function PersonCard({ person, headingLevel = "h3" }: { person: Person; headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  return (
    <article className={`person-card${person.vacant ? " person-card--vacant" : ""}`}>
      {person.portrait ? (
        <img className="person-card__portrait" src={person.portrait.src} alt={person.portrait.alt} loading="lazy" width="96" height="96" />
      ) : (
        <div className="person-card__portrait person-card__portrait--placeholder" aria-hidden="true">
          {person.vacant ? "—" : initials(person.name!)}
        </div>
      )}
      <div>
        <Heading className="person-card__name">{person.vacant ? "To be announced" : person.name}</Heading>
        <p className="person-card__position">{person.position}</p>
        {person.biography && <p className="person-card__bio">{person.biography}</p>}
      </div>
    </article>
  );
}
