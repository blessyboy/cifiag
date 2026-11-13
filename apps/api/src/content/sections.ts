import { z } from "zod";

/**
 * Approved, reusable page sections (PRD 5.2). Editors compose pages only from
 * these schemas. There is no raw HTML, script, iframe or style field anywhere.
 * Rich text is stored as structured blocks so it never needs sanitizing.
 */

const internalPath = z
  .string()
  .regex(/^\/[a-z0-9/-]*$/, "Must be an internal path such as /programs/diploma");
const httpsUrl = z.string().url().startsWith("https://");
const linkTarget = z.union([internalPath, httpsUrl]);

const action = z.object({
  label: z.string().min(1).max(60),
  href: linkTarget,
  variant: z.enum(["primary", "secondary"]).default("primary"),
});

const image = z.object({
  src: z.string().min(1),
  alt: z.string(), // An empty alt is allowed only for decorative images.
});

export const textBlockSchema = z.discriminatedUnion("type", [
  z.object({ type: z.literal("paragraph"), text: z.string().min(1) }),
  z.object({ type: z.literal("heading"), level: z.union([z.literal(2), z.literal(3)]), text: z.string().min(1) }),
  z.object({ type: z.literal("list"), ordered: z.boolean().default(false), items: z.array(z.string().min(1)).min(1) }),
]);

export const sectionSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("hero"),
    heading: z.string().min(1).max(120),
    summary: z.string().max(400).optional(),
    image: image.optional(),
    actions: z.array(action).max(2).default([]),
  }),
  z.object({
    type: z.literal("richText"),
    blocks: z.array(textBlockSchema).min(1),
  }),
  z.object({
    type: z.literal("cardGrid"),
    heading: z.string().optional(),
    intro: z.string().optional(),
    source: z.enum(["programs", "membershipCategories", "people", "news"]),
    filter: z.object({ group: z.string().optional() }).default({}),
    columns: z.union([z.literal(2), z.literal(3), z.literal(4)]).default(3),
    limit: z.number().int().positive().max(24).optional(),
    emptyState: z.string().default("There is nothing to show here yet."),
  }),
  z.object({
    type: z.literal("accordion"),
    heading: z.string().optional(),
    items: z.array(z.object({ question: z.string().min(1), answer: z.string().min(1) })).min(1),
  }),
  z.object({
    type: z.literal("dataTable"),
    caption: z.string().min(1),
    source: z.enum(["static", "fees"]).default("static"),
    columns: z.array(z.object({ key: z.string(), label: z.string() })).default([]),
    rows: z.array(z.record(z.string())).default([]),
  }),
  z.object({
    type: z.literal("documentList"),
    heading: z.string().optional(),
    docType: z.string().optional(),
    emptyState: z.string().default("No documents are published yet."),
  }),
  z.object({
    type: z.literal("callToAction"),
    heading: z.string().min(1),
    text: z.string().optional(),
    actions: z.array(action).min(1).max(2),
  }),
  z.object({
    type: z.literal("contactDetails"),
    heading: z.string().default("Contact details"),
  }),
]);

export type Section = z.infer<typeof sectionSchema>;
export type TextBlock = z.infer<typeof textBlockSchema>;
export const sectionsSchema = z.array(sectionSchema);
export const textBlocksSchema = z.array(textBlockSchema);
