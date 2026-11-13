import { useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router";
import type { SiteSettings } from "../../api/types";
import { useApi } from "../../api/useApi";
import { SiteProvider } from "../../site/SiteContext";
import { Footer } from "./Footer";
import { Header } from "./Header";

export function Layout() {
  const settings = useApi<SiteSettings>("/settings");
  const { pathname } = useLocation();
  const mainRef = useRef<HTMLElement>(null);
  const lastPath = useRef(pathname);

  // On client-side navigation, scroll to top and move focus to the main
  // region so screen reader users hear the new page. Comparing paths (not a
  // first-render flag) keeps this correct when StrictMode re-runs effects.
  useEffect(() => {
    if (lastPath.current === pathname) return;
    lastPath.current = pathname;
    window.scrollTo(0, 0);
    mainRef.current?.focus({ preventScroll: true });
  }, [pathname]);

  return (
    <SiteProvider value={settings.data ?? null}>
      <a className="skip-link" href="#main">
        Skip to main content
      </a>
      <Header />
      <main id="main" ref={mainRef} tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
    </SiteProvider>
  );
}
