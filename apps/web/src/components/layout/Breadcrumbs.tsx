import { Link, useLocation } from "react-router";
import type { MenuItem } from "../../api/types";
import { useSite } from "../../site/SiteContext";

function findLabel(menu: MenuItem[], href: string): string | null {
  for (const item of menu) {
    if (item.href === href) return item.label;
    const child = item.children && findLabel(item.children, href);
    if (child) return child;
  }
  return null;
}

const humanize = (segment: string) =>
  segment.replace(/-/g, " ").replace(/^\w/, (c) => c.toUpperCase());

/** Breadcrumbs for every page below home (PRD 4.3). Labels come from the menu where possible. */
export function Breadcrumbs({ currentTitle }: { currentTitle: string }) {
  const { pathname } = useLocation();
  const site = useSite();
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 0) return null;

  const trail = segments.slice(0, -1).map((_, i) => {
    const href = "/" + segments.slice(0, i + 1).join("/");
    return { href, label: (site && findLabel(site.primaryMenu, href)) ?? humanize(segments[i]) };
  });

  return (
    <nav aria-label="Breadcrumb" className="breadcrumbs">
      <ol>
        <li>
          <Link to="/">Home</Link>
        </li>
        {trail.map((crumb) => (
          <li key={crumb.href}>
            <Link to={crumb.href}>{crumb.label}</Link>
          </li>
        ))}
        <li>
          <span aria-current="page">{currentTitle}</span>
        </li>
      </ol>
    </nav>
  );
}
