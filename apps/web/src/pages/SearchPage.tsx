import { Link } from "react-router";
import { PageHeader } from "./PageHeader";
import { usePageMeta } from "../site/usePageMeta";

/** Placeholder until advanced search ships in phase 3 (PRD section 7). */
export function SearchPage() {
  usePageMeta("Search");
  return (
    <>
      <PageHeader title="Search" summary="Site search is coming soon." />
      <div className="container section container--narrow">
        <p>Until search is available, these pages answer the most common questions:</p>
        <ul className="link-list">
          <li><Link to="/programs">Programs and entry requirements</Link></li>
          <li><Link to="/programs/registration-fees">Registration fees</Link></li>
          <li><Link to="/membership">Membership categories</Link></li>
          <li><Link to="/council">Council and leadership</Link></li>
          <li><Link to="/contact">Contact the Institute</Link></li>
        </ul>
      </div>
    </>
  );
}
