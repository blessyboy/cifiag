import mongoose, { Schema, type InferSchemaType } from "mongoose";

/**
 * Governance fields shared by all public content (PRD 1.3, 5.1): every record
 * has an owner, a review date and a workflow status, and is only public while
 * published and inside its publish/expiry window.
 */
const governance = {
  status: {
    type: String,
    enum: ["draft", "review", "scheduled", "published", "archived"],
    default: "draft",
    index: true,
  },
  owner: { type: String, required: true },
  reviewAt: { type: Date, required: true },
  publishAt: { type: Date, default: null },
  expireAt: { type: Date, default: null },
  version: { type: Number, default: 1 },
} as const;

const opts = { timestamps: true } as const;

/** Mongo filter for records visible to the public right now. */
export function publiclyVisible(now = new Date()) {
  return {
    status: "published",
    $and: [
      { $or: [{ publishAt: null }, { publishAt: { $lte: now } }] },
      { $or: [{ expireAt: null }, { expireAt: { $gt: now } }] },
    ],
  };
}

const seo = new Schema({ title: String, description: String }, { _id: false });

const pageSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true }, // e.g. "home", "about/our-team"
    title: { type: String, required: true },
    summary: { type: String, default: "" },
    sections: { type: [Schema.Types.Mixed], default: [] }, // validated by sectionsSchema on write
    seo: { type: seo, default: {} },
    ...governance,
  },
  opts,
);

const programSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    award: { type: String, required: true },
    summary: { type: String, required: true },
    overview: { type: [String], default: [] },
    audience: { type: String, default: "" },
    // A program may span several examination stages (e.g. Parts 2–4 of the
    // Chartered Professional Certification), each with its own courses.
    stages: {
      type: [
        {
          _id: false,
          name: { type: String, required: true },
          courses: { type: [String], default: [] },
          examMode: { type: String, default: null },
          entry: { type: [String], default: [] },
          exemptions: { type: [String], default: [] },
        },
      ],
      default: [],
    },
    duration: { type: String, default: null },
    delivery: { type: String, default: null },
    intakeStatus: { type: String, enum: ["open", "closed", "pending"], default: "pending" },
    nextIntake: { type: String, default: null },
    order: { type: Number, default: 0 },
    seo: { type: seo, default: {} },
    ...governance,
  },
  opts,
);

const membershipCategorySchema = new Schema(
  {
    slug: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    designation: { type: String, default: null },
    summary: { type: String, required: true },
    eligibility: { type: [String], default: [] },
    benefits: { type: [String], default: [] },
    obligations: { type: [String], default: [] },
    evidence: { type: [String], default: [] },
    applicationMode: { type: String, enum: ["open", "closed", "invitation"], default: "open" },
    // Optional card photo; without it the site shows a brand illustration.
    image: { type: { _id: false, src: String, alt: String }, default: null },
    order: { type: Number, default: 0 },
    seo: { type: seo, default: {} },
    ...governance,
  },
  opts,
);

const personSchema = new Schema(
  {
    name: { type: String, default: null }, // null = vacant role
    position: { type: String, required: true },
    group: {
      type: String,
      enum: ["leadership", "council", "committee-heads", "staff", "past-presidents"],
      required: true,
      index: true,
    },
    biography: { type: String, default: "" },
    portrait: { type: { _id: false, src: String, alt: String }, default: null },
    termStart: { type: Date, default: null },
    termEnd: { type: Date, default: null },
    order: { type: Number, default: 0 },
    ...governance,
  },
  opts,
);

const newsSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    summary: { type: String, required: true },
    category: { type: String, enum: ["news", "notice"], default: "news" },
    body: { type: [Schema.Types.Mixed], default: [] }, // TextBlock[], validated on write
    author: { type: String, default: null },
    source: { type: { _id: false, name: String, url: String }, default: null },
    ...governance,
  },
  opts,
);

const feeItemSchema = new Schema(
  {
    item: { type: String, required: true },
    audience: { type: String, required: true },
    amountMinor: { type: Number, default: null }, // integer minor units; null = to be confirmed
    currency: { type: String, default: "GHS" },
    effectiveFrom: { type: Date, default: null },
    effectiveTo: { type: Date, default: null },
    notes: { type: String, default: "" },
    order: { type: Number, default: 0 },
    ...governance,
  },
  opts,
);

const documentSchema = new Schema(
  {
    title: { type: String, required: true },
    docType: { type: String, required: true, index: true }, // e.g. "program-outline"
    year: { type: Number, default: null },
    url: { type: String, default: null }, // null until the file is uploaded
    fileType: { type: String, default: "PDF" },
    bytes: { type: Number, default: null },
    archived: { type: Boolean, default: false },
    ...governance,
  },
  opts,
);

const menuItemSchema = new Schema(
  { label: String, href: String, children: { type: [Schema.Types.Mixed], default: [] } },
  { _id: false },
);

const settingsSchema = new Schema(
  {
    key: { type: String, required: true, unique: true }, // "global"
    siteName: { type: String, required: true },
    shortName: { type: String, required: true },
    tagline: { type: String, default: "" },
    logo: { type: { _id: false, src: String, alt: String }, required: true },
    contact: {
      type: {
        _id: false,
        address: { type: [String], default: [] },
        phones: { type: [String], default: [] },
        emails: { type: [String], default: [] },
        officeHours: { type: String, default: null },
        mapUrl: { type: String, default: null },
        verified: { type: Boolean, default: false },
      },
      default: {},
    },
    social: { type: [{ _id: false, label: String, href: String }], default: [] },
    primaryMenu: { type: [menuItemSchema], default: [] },
    footerMenu: { type: [menuItemSchema], default: [] },
    headerAction: { type: { _id: false, label: String, href: String }, required: true },
    defaultSeo: { type: seo, default: {} },
  },
  opts,
);

export const Page = mongoose.model("Page", pageSchema);
export const Program = mongoose.model("Program", programSchema);
export const MembershipCategory = mongoose.model("MembershipCategory", membershipCategorySchema);
export const Person = mongoose.model("Person", personSchema);
export const News = mongoose.model("News", newsSchema);
export const FeeItem = mongoose.model("FeeItem", feeItemSchema);
export const DocumentAsset = mongoose.model("DocumentAsset", documentSchema);
export const Settings = mongoose.model("Settings", settingsSchema);

export type PageDoc = InferSchemaType<typeof pageSchema>;
export type ProgramDoc = InferSchemaType<typeof programSchema>;
export type MembershipCategoryDoc = InferSchemaType<typeof membershipCategorySchema>;
export type PersonDoc = InferSchemaType<typeof personSchema>;
export type NewsDoc = InferSchemaType<typeof newsSchema>;
export type FeeItemDoc = InferSchemaType<typeof feeItemSchema>;
export type DocumentDoc = InferSchemaType<typeof documentSchema>;
export type SettingsDoc = InferSchemaType<typeof settingsSchema>;
