/**
 * Mirrors the public JSON contract of apps/api (src/content/serializers.ts and
 * sections.ts). To be replaced by types generated from the OpenAPI contract
 * once it is approved (PRD 9.2).
 */

export interface MenuItem {
  label: string;
  href: string;
  children?: MenuItem[];
}

export interface SiteSettings {
  siteName: string;
  shortName: string;
  tagline: string;
  logo: { src: string; alt: string };
  contact: {
    address: string[];
    phones: string[];
    emails: string[];
    officeHours: string | null;
    mapUrl: string | null;
    verified: boolean;
  };
  social: { label: string; href: string }[];
  primaryMenu: MenuItem[];
  footerMenu: MenuItem[];
  headerAction: { label: string; href: string };
  defaultSeo: { title: string; description: string };
}

export interface Seo {
  title: string | null;
  description: string | null;
}

export interface ProgramSummary {
  slug: string;
  title: string;
  award: string;
  summary: string;
  intakeStatus: "open" | "closed" | "pending";
  href: string;
}

export interface ProgramDetail extends ProgramSummary {
  overview: string[];
  audience: string;
  stages: ProgramStage[];
  duration: string | null;
  delivery: string | null;
  nextIntake: string | null;
  seo: Seo;
  updatedAt: string | null;
}

export interface ProgramStage {
  name: string;
  courses: string[];
  examMode: string | null;
  entry: string[];
  exemptions: string[];
}

export interface MembershipSummary {
  slug: string;
  name: string;
  designation: string | null;
  summary: string;
  applicationMode: "open" | "closed" | "invitation";
  href: string;
}

export interface MembershipDetail extends MembershipSummary {
  eligibility: string[];
  benefits: string[];
  obligations: string[];
  evidence: string[];
  seo: Seo;
  updatedAt: string | null;
}

export interface Person {
  id: string;
  name: string | null;
  vacant: boolean;
  position: string;
  group: string;
  biography: string;
  portrait: { src: string; alt: string } | null;
  termStart: string | null;
  termEnd: string | null;
}

export interface NewsSummary {
  slug: string;
  title: string;
  summary: string;
  category: "news" | "notice";
  publishedAt: string | null;
  href: string;
}

export interface NewsDetail extends NewsSummary {
  author: string | null;
  body: TextBlock[];
  source: { name: string; url: string | null } | null;
}

export interface FeeItem {
  item: string;
  audience: string;
  amountMinor: number | null;
  currency: string;
  effectiveFrom: string | null;
  effectiveTo: string | null;
  notes: string;
}

export interface DocumentItem {
  id: string;
  title: string;
  docType: string;
  year: number | null;
  url: string | null;
  fileType: string;
  bytes: number | null;
  archived: boolean;
  publishedAt: string | null;
}

export interface Action {
  label: string;
  href: string;
  variant: "primary" | "secondary";
}

export type TextBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; level: 2 | 3; text: string }
  | { type: "list"; ordered: boolean; items: string[] };

export type Section =
  | { type: "hero"; heading: string; summary?: string; image?: { src: string; alt: string }; actions: Action[] }
  | { type: "richText"; blocks: TextBlock[] }
  | {
      type: "cardGrid";
      heading?: string;
      intro?: string;
      source: "programs" | "membershipCategories" | "people" | "news";
      columns: 2 | 3 | 4;
      emptyState: string;
      items: unknown[];
    }
  | { type: "accordion"; heading?: string; items: { question: string; answer: string }[] }
  | {
      type: "dataTable";
      caption: string;
      source: "static" | "fees";
      columns: { key: string; label: string }[];
      rows: Record<string, string>[];
      fees?: FeeItem[];
    }
  | { type: "documentList"; heading?: string; emptyState: string; documents: DocumentItem[] }
  | { type: "callToAction"; heading: string; text?: string; actions: Action[] }
  | { type: "contactDetails"; heading: string };

export interface PageContent {
  slug: string;
  title: string;
  summary: string;
  seo: Seo;
  sections: Section[];
  updatedAt: string | null;
}

export interface ApiErrorBody {
  code: string;
  message: string;
  requestId?: string;
  fields?: { path: string; code: string; message: string }[];
}
