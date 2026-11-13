import { useEffect, useId, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router";
import type { MenuItem } from "../../api/types";
import { useSite } from "../../site/SiteContext";
import { Icon } from "../primitives/Icon";
import { ButtonLink } from "../primitives/SmartLink";

/**
 * Disclosure-pattern navigation: each parent has a real link plus a toggle
 * button for its children. Escape closes an open submenu and returns focus.
 */
function NavItem({ item, open, onToggle, onClose }: {
  item: MenuItem;
  open: boolean;
  onToggle: () => void;
  onClose: () => void;
}) {
  const submenuId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const hasChildren = !!item.children?.length;
  const { pathname } = useLocation();
  const inSection = item.href !== "/" && pathname.startsWith(item.href);

  return (
    <li
      className={`nav__item${open ? " is-open" : ""}`}
      onKeyDown={(e) => {
        if (e.key === "Escape" && open) {
          e.stopPropagation();
          onClose();
          toggleRef.current?.focus();
        }
      }}
    >
      <div className="nav__row">
        <NavLink to={item.href} end={item.href === "/"} className={({ isActive }) => `nav__link${isActive || inSection ? " is-active" : ""}`}>
          {item.label}
        </NavLink>
        {hasChildren && (
          <button
            ref={toggleRef}
            type="button"
            className="nav__toggle"
            aria-expanded={open}
            aria-controls={submenuId}
            onClick={onToggle}
          >
            <span className="visually-hidden">{`${item.label} pages`}</span>
            <Icon name="chevronDown" size={16} />
          </button>
        )}
      </div>
      {hasChildren && (
        <ul id={submenuId} className="nav__submenu" hidden={!open}>
          {item.children!.map((child) => (
            <li key={child.href}>
              <NavLink to={child.href} className="nav__sublink">
                {child.label}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

export function Header() {
  const site = useSite();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openItem, setOpenItem] = useState<string | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const navId = useId();

  // Close menus after navigation.
  useEffect(() => {
    setMobileOpen(false);
    setOpenItem(null);
  }, [location.pathname]);

  // Close an open submenu when focus or a click moves outside the nav.
  useEffect(() => {
    if (!openItem) return;
    const handler = (e: Event) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpenItem(null);
    };
    document.addEventListener("pointerdown", handler);
    document.addEventListener("focusin", handler);
    return () => {
      document.removeEventListener("pointerdown", handler);
      document.removeEventListener("focusin", handler);
    };
  }, [openItem]);

  const closeMobile = () => {
    setMobileOpen(false);
    menuButtonRef.current?.focus(); // Restore focus (PRD 14.3 navigation criterion).
  };

  return (
    <header className="site-header">
      <div className="container site-header__bar">
        <Link to="/" className="brand">
          {/* Crest source is 300×265; decorative here because the text names the Institute. */}
          <img className="brand__logo" src={site?.logo.src ?? "/logo.png"} alt="" width="68" height="60" />
          <span className="brand__text">
            <span className="brand__short">{site?.shortName ?? "CIFIAG"}</span>
            <span className="brand__long">
              {site?.siteName ?? "Chartered Institute of Financial and Investment Analysts, Ghana"}
            </span>
            {site?.tagline && <span className="brand__motto">{site.tagline}</span>}
          </span>
          <span className="visually-hidden">: home</span>
        </Link>

        <div className="site-header__tools">
          <Link to="/search" className="icon-link" aria-label="Search">
            <Icon name="search" size={22} />
          </Link>
          {site && (
            <ButtonLink href={site.headerAction.href} variant="primary" className="site-header__cta">
              {site.headerAction.label}
            </ButtonLink>
          )}
          <button
            ref={menuButtonRef}
            type="button"
            className="menu-button"
            aria-expanded={mobileOpen}
            aria-controls={navId}
            onClick={() => (mobileOpen ? closeMobile() : setMobileOpen(true))}
          >
            <span className="menu-button__bars" aria-hidden="true" />
            <span>{mobileOpen ? "Close" : "Menu"}</span>
          </button>
        </div>
      </div>

      <nav
        ref={navRef}
        id={navId}
        className={`nav${mobileOpen ? " is-mobile-open" : ""}`}
        aria-label="Main"
        onKeyDown={(e) => {
          if (e.key === "Escape" && mobileOpen) closeMobile();
        }}
      >
        <ul className="container nav__list">
          {site?.primaryMenu.map((item) => (
            <NavItem
              key={item.href}
              item={item}
              open={openItem === item.href}
              onToggle={() => setOpenItem((cur) => (cur === item.href ? null : item.href))}
              onClose={() => setOpenItem(null)}
            />
          ))}
          {site && (
            <li className="nav__item nav__item--cta">
              <ButtonLink href={site.headerAction.href} variant="primary">
                {site.headerAction.label}
              </ButtonLink>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
