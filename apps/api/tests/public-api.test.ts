import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createApp } from "../src/app.js";
import { connectDatabase, disconnectDatabase } from "../src/db.js";
import { Page, Person, Program } from "../src/models/index.js";
import { seedDatabase } from "../src/seed/seed.js";

const app = createApp();
const owner = "test";
const reviewAt = new Date("2030-01-01");

beforeAll(async () => {
  await connectDatabase();
  await seedDatabase();

  // Content that must never be public.
  await Page.create({ slug: "secret-draft", title: "Draft", owner, reviewAt, status: "draft" });
  await Page.create({
    slug: "future-page",
    title: "Future",
    owner,
    reviewAt,
    status: "published",
    publishAt: new Date(Date.now() + 86_400_000),
  });
  await Program.create({
    slug: "expired-program",
    title: "Expired",
    award: "x",
    summary: "x",
    owner,
    reviewAt,
    status: "published",
    expireAt: new Date(Date.now() - 1000),
  });
  await Person.create({ name: "Archived Person", position: "Former", group: "council", owner, reviewAt, status: "archived" });
});

afterAll(async () => {
  await disconnectDatabase();
});

describe("health and conventions", () => {
  it("reports health with no-store caching", async () => {
    const res = await request(app).get("/api/v1/health");
    expect(res.status).toBe(200);
    expect(res.body.data).toEqual({ status: "ok", database: true });
    expect(res.headers["cache-control"]).toBe("private, no-store");
  });

  it("echoes a valid X-Request-ID and replaces an invalid one", async () => {
    const ok = await request(app).get("/api/v1/health").set("X-Request-ID", "client-abc-123");
    expect(ok.headers["x-request-id"]).toBe("client-abc-123");
    const bad = await request(app).get("/api/v1/health").set("X-Request-ID", "<script>");
    expect(bad.headers["x-request-id"]).toMatch(/^req_/);
  });

  it("returns the error envelope for unknown routes", async () => {
    const res = await request(app).get("/api/v1/does-not-exist");
    expect(res.status).toBe(404);
    expect(res.body.error).toMatchObject({ code: "NOT_FOUND", requestId: expect.any(String) });
    expect(JSON.stringify(res.body)).not.toMatch(/stack|at .*\.ts/);
  });

  it("sets security headers and hides the framework", async () => {
    const res = await request(app).get("/api/v1/health");
    expect(res.headers["x-content-type-options"]).toBe("nosniff");
    expect(res.headers["x-powered-by"]).toBeUndefined();
  });
});

describe("public content", () => {
  it("returns site settings with the approved navigation", async () => {
    const res = await request(app).get("/api/v1/settings");
    expect(res.status).toBe(200);
    const labels = res.body.data.primaryMenu.map((m: { label: string }) => m.label);
    expect(labels).toEqual(["Home", "About Us", "Programs", "Membership", "Council", "Contact Us"]);
    expect(res.body.data.headerAction.href).toBe("/become-a-member");
  });

  it("returns a nested page with resolved card grid items", async () => {
    const res = await request(app).get("/api/v1/content/pages/council/leadership");
    expect(res.status).toBe(200);
    const grid = res.body.data.sections[0];
    expect(grid.type).toBe("cardGrid");
    expect(grid.items.length).toBe(4);
    expect(grid.items.every((p: { group: string }) => p.group === "leadership")).toBe(true);
    const past = res.body.data.sections[1];
    expect(past.items.every((p: { group: string }) => p.group === "past-presidents")).toBe(true);
  });

  it("returns a program with its examination stages", async () => {
    const res = await request(app).get("/api/v1/programs/chartered-professional-certification");
    expect(res.body.data.stages.map((s: { name: string }) => s.name)).toEqual([
      "Part 2 – Intermediate",
      "Part 3 – Professional 1 (Associate Member)",
      "Part 4 – Professional 2 (Chartered Member)",
      "Fellowship",
    ]);
  });

  it("returns news newest first and article detail with source", async () => {
    const list = await request(app).get("/api/v1/news");
    expect(list.body.data[0].slug).toBe("cifiag-pays-courtesy-call-on-management-of-the-gse");
    const article = await request(app).get(`/api/v1/news/${list.body.data[0].slug}`);
    expect(article.status).toBe(200);
    expect(article.body.data.body[0].type).toBe("paragraph");
    expect(article.body.data.source.name).toMatch(/Business and Financial Times/);
    expect((await request(app).get("/api/v1/news/missing-article")).status).toBe(404);
  });

  it("does not expose governance fields", async () => {
    const res = await request(app).get("/api/v1/programs/diploma");
    expect(res.status).toBe(200);
    for (const field of ["owner", "status", "version", "_id", "reviewAt"]) {
      expect(res.body.data).not.toHaveProperty(field);
    }
  });

  it("hides drafts, scheduled, expired and archived content", async () => {
    expect((await request(app).get("/api/v1/content/pages/secret-draft")).status).toBe(404);
    expect((await request(app).get("/api/v1/content/pages/future-page")).status).toBe(404);
    expect((await request(app).get("/api/v1/programs/expired-program")).status).toBe(404);

    const programs = await request(app).get("/api/v1/programs");
    expect(programs.body.data.map((p: { slug: string }) => p.slug)).not.toContain("expired-program");

    const people = await request(app).get("/api/v1/people?group=council");
    expect(people.body.data.map((p: { name: string }) => p.name)).not.toContain("Archived Person");
  });

  it("rejects malformed slugs and unknown filters", async () => {
    expect((await request(app).get("/api/v1/programs/..%2Fadmin")).status).toBe(404);
    expect((await request(app).get("/api/v1/content/pages/About")).status).toBe(404);
    const res = await request(app).get("/api/v1/people?group=admins");
    expect(res.status).toBe(422);
    expect(res.body.error.fields[0].path).toBe("group");
  });

  it("resolves the fee table in integer pesewas", async () => {
    const res = await request(app).get("/api/v1/content/pages/programs/registration-fees");
    const table = res.body.data.sections.find((s: { type: string }) => s.type === "dataTable");
    expect(table.fees.length).toBe(14);
    expect(table.fees[0]).toMatchObject({ item: "Student form", amountMinor: 10_000, currency: "GHS" });
    const chartered = table.fees.filter((f: { audience: string }) => f.audience.startsWith("Part 4"));
    expect(chartered.reduce((sum: number, f: { amountMinor: number }) => sum + f.amountMinor, 0)).toBe(535_000);
  });

  it("orders membership categories", async () => {
    const res = await request(app).get("/api/v1/membership-categories");
    expect(res.body.data.map((m: { slug: string }) => m.slug)).toEqual([
      "students",
      "associate-members",
      "full-members",
      "fellows",
    ]);
  });
});
