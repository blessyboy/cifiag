import type {
  DocumentDoc,
  FeeItemDoc,
  MembershipCategoryDoc,
  NewsDoc,
  PersonDoc,
  ProgramDoc,
  SettingsDoc,
} from "../models/index.js";

/**
 * Public representations. Every field is listed explicitly so internal
 * governance data (owner, status, version) can never leak by accident.
 */

export type WithMeta<T> = T & { _id: unknown; updatedAt?: Date };

const iso = (d?: Date | null) => (d ? d.toISOString() : null);

export function programSummary(p: WithMeta<ProgramDoc>) {
  return {
    slug: p.slug,
    title: p.title,
    award: p.award,
    summary: p.summary,
    intakeStatus: p.intakeStatus,
    href: `/programs/${p.slug}`,
  };
}

export function programDetail(p: WithMeta<ProgramDoc>) {
  return {
    ...programSummary(p),
    overview: p.overview,
    audience: p.audience,
    stages: p.stages.map((s) => ({
      name: s.name,
      courses: s.courses,
      examMode: s.examMode ?? null,
      entry: s.entry,
      exemptions: s.exemptions,
    })),
    duration: p.duration,
    delivery: p.delivery,
    nextIntake: p.nextIntake,
    seo: { title: p.seo?.title ?? null, description: p.seo?.description ?? null },
    updatedAt: iso(p.updatedAt),
  };
}

export function membershipSummary(m: WithMeta<MembershipCategoryDoc>) {
  return {
    slug: m.slug,
    name: m.name,
    designation: m.designation,
    summary: m.summary,
    applicationMode: m.applicationMode,
    image: m.image?.src ? { src: m.image.src, alt: m.image.alt ?? "" } : null,
    href: `/membership/${m.slug}`,
  };
}

export function membershipDetail(m: WithMeta<MembershipCategoryDoc>) {
  return {
    ...membershipSummary(m),
    eligibility: m.eligibility,
    benefits: m.benefits,
    obligations: m.obligations,
    evidence: m.evidence,
    seo: { title: m.seo?.title ?? null, description: m.seo?.description ?? null },
    updatedAt: iso(m.updatedAt),
  };
}

export function person(p: WithMeta<PersonDoc>) {
  return {
    id: String(p._id),
    name: p.name,
    vacant: !p.name,
    position: p.position,
    group: p.group,
    biography: p.biography,
    portrait: p.portrait?.src ? { src: p.portrait.src, alt: p.portrait.alt ?? "" } : null,
    termStart: iso(p.termStart),
    termEnd: iso(p.termEnd),
  };
}

export function newsSummary(n: WithMeta<NewsDoc>) {
  return {
    slug: n.slug,
    title: n.title,
    summary: n.summary,
    category: n.category,
    publishedAt: iso(n.publishAt ?? n.updatedAt),
    href: `/news/${n.slug}`,
  };
}

export function newsDetail(n: WithMeta<NewsDoc>) {
  return {
    ...newsSummary(n),
    author: n.author ?? null,
    body: n.body,
    source: n.source?.name ? { name: n.source.name, url: n.source.url ?? null } : null,
  };
}

export function feeItem(f: WithMeta<FeeItemDoc>) {
  return {
    item: f.item,
    audience: f.audience,
    amountMinor: f.amountMinor ?? null,
    currency: f.currency,
    effectiveFrom: iso(f.effectiveFrom),
    effectiveTo: iso(f.effectiveTo),
    notes: f.notes,
  };
}

export function documentItem(d: WithMeta<DocumentDoc>) {
  return {
    id: String(d._id),
    title: d.title,
    docType: d.docType,
    year: d.year,
    url: d.url,
    fileType: d.fileType,
    bytes: d.bytes,
    archived: d.archived,
    publishedAt: iso(d.publishAt ?? d.updatedAt),
  };
}

export function siteSettings(s: SettingsDoc) {
  return {
    siteName: s.siteName,
    shortName: s.shortName,
    tagline: s.tagline,
    logo: { src: s.logo.src ?? "", alt: s.logo.alt ?? s.siteName },
    contact: s.contact,
    social: s.social,
    primaryMenu: s.primaryMenu,
    footerMenu: s.footerMenu,
    headerAction: s.headerAction,
    defaultSeo: { title: s.defaultSeo?.title ?? s.siteName, description: s.defaultSeo?.description ?? "" },
  };
}
