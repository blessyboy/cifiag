import { useEffect } from "react";
import { useSite } from "./SiteContext";

/** Sets the document title and description for the current page. */
export function usePageMeta(title: string | null | undefined, description?: string | null) {
  const site = useSite();
  const shortName = site?.shortName ?? "CIFIAG";

  useEffect(() => {
    if (!title) return;
    document.title =
      title === "Home" ? [shortName, site?.siteName].filter(Boolean).join(" | ") : `${title} | ${shortName}`;
    const desc = description || site?.defaultSeo.description;
    if (desc) {
      let tag = document.querySelector<HTMLMetaElement>('meta[name="description"]');
      if (!tag) {
        tag = document.createElement("meta");
        tag.name = "description";
        document.head.appendChild(tag);
      }
      tag.content = desc;
    }
  }, [title, description, shortName, site]);
}
