import { Link } from "react-router";
import { usePageMeta } from "../site/usePageMeta";

/** Custom 404 with key destinations (PRD 4.3). */
export function NotFoundPage() {
  usePageMeta("Page not found");
  return (
    <div className="container section container--narrow">
      <h1 className="page-header__title">Page not found</h1>
      <p className="page-header__summary">
        The page you are looking for may have moved or no longer exists. Try one of these instead:
      </p>
      <ul className="link-list">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/programs">Programs</Link></li>
        <li><Link to="/membership">Membership</Link></li>
        <li><Link to="/become-a-member">Become a member</Link></li>
        <li><Link to="/contact">Contact us</Link></li>
        <li><Link to="/search">Search the site</Link></li>
      </ul>
    </div>
  );
}
