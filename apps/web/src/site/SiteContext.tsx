import { createContext, useContext, type ReactNode } from "react";
import type { SiteSettings } from "../api/types";

const SiteContext = createContext<SiteSettings | null>(null);

export function SiteProvider({ value, children }: { value: SiteSettings | null; children: ReactNode }) {
  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
}

/** Global settings (logo, menus, contacts). Null while loading or unavailable. */
export function useSite(): SiteSettings | null {
  return useContext(SiteContext);
}
