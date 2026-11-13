import { Router } from "express";
import { z } from "zod";
import * as content from "../content/service.js";
import { ApiError } from "../http/errors.js";
import { publicCache } from "../http/middleware.js";

const slugPart = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const slug = z.string().regex(slugPart);

function parseSlug(value: unknown): string {
  const result = slug.safeParse(value);
  if (!result.success) throw ApiError.notFound();
  return result.data;
}

export const publicRouter = Router();

publicRouter.use(publicCache(60));

publicRouter.get("/settings", async (_req, res) => {
  const settings = await content.getSettings();
  if (!settings) throw ApiError.notFound("Site settings have not been configured.");
  res.json({ data: settings });
});

// Nested slugs such as /content/pages/about/our-team (Express 5 wildcard).
publicRouter.get("/content/pages/*slug", async (req, res) => {
  const parts = (req.params as { slug: string[] }).slug;
  if (parts.length > 4 || !parts.every((p) => slugPart.test(p))) throw ApiError.notFound();
  const page = await content.getPage(parts.join("/"));
  if (!page) throw ApiError.notFound("This page does not exist or is not published.");
  res.json({ data: page });
});

publicRouter.get("/programs", async (_req, res) => {
  res.json({ data: await content.listPrograms() });
});

publicRouter.get("/programs/:slug", async (req, res) => {
  const program = await content.getProgram(parseSlug(req.params.slug));
  if (!program) throw ApiError.notFound("This program does not exist or is not published.");
  res.json({ data: program });
});

publicRouter.get("/membership-categories", async (_req, res) => {
  res.json({ data: await content.listMembershipCategories() });
});

publicRouter.get("/membership-categories/:slug", async (req, res) => {
  const category = await content.getMembershipCategory(parseSlug(req.params.slug));
  if (!category) throw ApiError.notFound("This membership category does not exist or is not published.");
  res.json({ data: category });
});

const peopleQuery = z.object({ group: z.enum(content.PEOPLE_GROUPS).optional() });

publicRouter.get("/people", async (req, res) => {
  const query = peopleQuery.safeParse(req.query);
  if (!query.success) {
    throw ApiError.validation([
      { path: "group", code: "INVALID_GROUP", message: `Group must be one of: ${content.PEOPLE_GROUPS.join(", ")}.` },
    ]);
  }
  res.json({ data: await content.listPeople(query.data.group) });
});

publicRouter.get("/news", async (_req, res) => {
  res.json({ data: await content.listNews(20) });
});

publicRouter.get("/news/:slug", async (req, res) => {
  const item = await content.getNews(parseSlug(req.params.slug));
  if (!item) throw ApiError.notFound("This article does not exist or is not published.");
  res.json({ data: item });
});

publicRouter.get("/fees", async (_req, res) => {
  res.json({ data: await content.listFees() });
});
