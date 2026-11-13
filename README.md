# CIFIAG website

Public website and management platform for the Chartered Institute of Financial and Investment Analysts, Ghana (CIFIAG).
Requirements: [CIFIAG_Product_Requirements_Document.docx](CIFIAG_Product_Requirements_Document.docx).

**Stack:** React (Vite, TypeScript) · Node.js (Express 5, TypeScript) · MongoDB (Mongoose).
The PRD body still mentions PHP and MySQL in places. Read those as this Node/MongoDB stack.

## Getting started

Requires Node.js 20 or later.

```sh
npm install
npm run dev
```

- Website: http://localhost:5173
- API: http://localhost:4000/api/v1 (also reachable via the website at `/api/v1`)

Without `MONGODB_URI`, the API starts an in-memory MongoDB and loads development seed content.
Changes are lost on restart. To use a persistent database, copy `.env.example` to `.env`,
set `MONGODB_URI`, then run `npm run seed` once.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | API and website with hot reload |
| `npm test` | API integration tests (in-memory MongoDB) |
| `npm run typecheck` | Type-check both apps |
| `npm run build` | Production builds: `apps/api/dist`, `apps/web/dist` |
| `npm run seed` | Load seed content into an empty database at `MONGODB_URI` |

## Layout

```
apps/
  api/   Express JSON API under /api/v1
    src/content/   section schemas (zod), public serializers, read service
    src/models/    Mongoose collections with governance fields
    src/routes/    route handlers
    src/seed/      development content (not approved for publication)
    tests/         supertest integration tests
  web/   React site
    src/components/  layout, primitives, CMS section renderers, states
    src/pages/       templates: content page, program, membership, 404, search
    src/styles/      design tokens and global CSS
```

## Key design decisions

- **One origin.** Production serves the website at `/` and the API at `/api/v1` from the same host,
  so no CORS is needed. In development, Vite proxies `/api` for the same effect (PRD 9.3).
- **Structured content only.** Pages are lists of approved section types validated by zod
  (`apps/api/src/content/sections.ts`). There is no raw HTML, script or style field (PRD 5.2).
- **Public visibility is enforced on the server.** Every public query filters by
  `status: "published"` and the publish/expiry window. Serializers allowlist fields,
  so governance data never leaks.
- **Migrated content.** Seed content is migrated from cifiag.com; see [docs/content-migration.md](docs/content-migration.md)
  for what was kept, what was dropped, and the decisions CIFIAG still needs to make.
- **No invented facts.** Anything the source site did not state is shown as
  "to be confirmed" until CIFIAG approves it (PRD 1.2, 14.2).

## Status

Done: phase 1 foundations and the read-only public site (navigation, page templates, programs,
membership, council, fees, documents, contact details).

Next: admin authentication with MFA, the CMS editor and publishing workflow, search,
the contact form, and the membership application workflow.
