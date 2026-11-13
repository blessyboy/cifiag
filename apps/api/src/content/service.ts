import {
  DocumentAsset,
  FeeItem,
  MembershipCategory,
  News,
  Page,
  Person,
  Program,
  Settings,
  publiclyVisible,
} from "../models/index.js";
import type {
  DocumentDoc,
  FeeItemDoc,
  MembershipCategoryDoc,
  NewsDoc,
  PageDoc,
  PersonDoc,
  ProgramDoc,
  SettingsDoc,
} from "../models/index.js";
import * as dto from "./serializers.js";
import type { WithMeta } from "./serializers.js";
import { sectionsSchema, textBlocksSchema, type Section } from "./sections.js";

/** Read-only queries over published content. All filters go through `publiclyVisible`. */

export async function getSettings() {
  const s = await Settings.findOne({ key: "global" }).lean<SettingsDoc>();
  return s ? dto.siteSettings(s) : null;
}

export async function listPrograms() {
  const rows = await Program.find(publiclyVisible()).sort({ order: 1, title: 1 }).lean<WithMeta<ProgramDoc>[]>();
  return rows.map(dto.programSummary);
}

export async function getProgram(slug: string) {
  const p = await Program.findOne({ ...publiclyVisible(), slug }).lean<WithMeta<ProgramDoc>>();
  return p ? dto.programDetail(p) : null;
}

export async function listMembershipCategories() {
  const rows = await MembershipCategory.find(publiclyVisible()).sort({ order: 1 }).lean<WithMeta<MembershipCategoryDoc>[]>();
  return rows.map(dto.membershipSummary);
}

export async function getMembershipCategory(slug: string) {
  const m = await MembershipCategory.findOne({ ...publiclyVisible(), slug }).lean<WithMeta<MembershipCategoryDoc>>();
  return m ? dto.membershipDetail(m) : null;
}

export const PEOPLE_GROUPS = ["leadership", "council", "committee-heads", "staff", "past-presidents"] as const;

export async function getNews(slug: string) {
  const n = await News.findOne({ ...publiclyVisible(), slug }).lean<WithMeta<NewsDoc>>();
  if (!n) return null;
  const body = textBlocksSchema.safeParse(n.body);
  return { ...dto.newsDetail(n), body: body.success ? body.data : [] };
}

export async function listPeople(group?: string) {
  const filter: Record<string, unknown> = publiclyVisible();
  if (group) filter.group = group;
  const rows = await Person.find(filter).sort({ group: 1, order: 1 }).lean<WithMeta<PersonDoc>[]>();
  return rows.map(dto.person);
}

export async function listNews(limit = 10) {
  const rows = await News.find(publiclyVisible()).sort({ publishAt: -1, updatedAt: -1 }).limit(limit).lean<WithMeta<NewsDoc>[]>();
  return rows.map(dto.newsSummary);
}

export async function listFees() {
  const now = new Date();
  const rows = await FeeItem.find({
    ...publiclyVisible(now),
    $or: [{ effectiveTo: null }, { effectiveTo: { $gt: now } }],
  })
    .sort({ order: 1 })
    .lean<WithMeta<FeeItemDoc>[]>();
  return rows.map(dto.feeItem);
}

export async function listDocuments(docType?: string) {
  const filter: Record<string, unknown> = publiclyVisible();
  if (docType) filter.docType = docType;
  const rows = await DocumentAsset.find(filter).sort({ archived: 1, year: -1, title: 1 }).lean<WithMeta<DocumentDoc>[]>();
  return rows.map(dto.documentItem);
}

/**
 * Resolves data-backed sections (card grids, fee tables, document lists) on
 * the server so the client receives a page in one request.
 */
async function resolveSection(section: Section) {
  switch (section.type) {
    case "cardGrid": {
      let items: unknown[];
      switch (section.source) {
        case "programs":
          items = await listPrograms();
          break;
        case "membershipCategories":
          items = await listMembershipCategories();
          break;
        case "people":
          items = await listPeople(section.filter.group);
          break;
        case "news":
          items = await listNews(section.limit ?? 6);
          break;
      }
      if (section.limit) items = items.slice(0, section.limit);
      return { ...section, items };
    }
    case "dataTable":
      if (section.source === "fees") {
        return { ...section, fees: await listFees() };
      }
      return section;
    case "documentList":
      return { ...section, documents: await listDocuments(section.docType) };
    default:
      return section;
  }
}

export async function getPage(slug: string) {
  const page = await Page.findOne({ ...publiclyVisible(), slug }).lean<WithMeta<PageDoc>>();
  if (!page) return null;

  // Stored sections are re-validated on read; an invalid section is dropped
  // and logged rather than rendered.
  const parsed = sectionsSchema.safeParse(page.sections);
  let sections: Section[];
  if (parsed.success) {
    sections = parsed.data;
  } else {
    console.error(`Page "${slug}" has invalid sections`, parsed.error.issues);
    sections = (page.sections as unknown[]).flatMap((s) => {
      const one = sectionsSchema.element.safeParse(s);
      return one.success ? [one.data] : [];
    });
  }

  return {
    slug: page.slug,
    title: page.title,
    summary: page.summary,
    seo: { title: page.seo?.title ?? null, description: page.seo?.description ?? null },
    sections: await Promise.all(sections.map(resolveSection)),
    updatedAt: page.updatedAt?.toISOString() ?? null,
  };
}
