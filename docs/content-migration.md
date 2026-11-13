# Content migration from cifiag.com

Source: the live WordPress site at https://cifiag.com (pages, posts and media via `/wp-json/wp/v2`), retrieved 13 November 2026.
Migrated content lives in [apps/api/src/seed/data.ts](../apps/api/src/seed/data.ts).

## What was migrated

| Area | Source | Notes |
| --- | --- | --- |
| Logo and favicon | `wp-content/uploads/2023/03/logo2.png`, `favicon.png` | Now `apps/web/public/logo.png` and `favicon.png`. Site colours are sampled from the crest. |
| Name and motto | Crest, news articles | "Chartered Institute of Financial and Investment Analysts, Ghana" and "Competence and Integrity" |
| Contact details | `/contact/` | Accra office address, three phone numbers, info@cifiag.org, map link |
| CEO welcome | Home page | Text from Dr. Moses O. Agoro |
| About, mission, objectives | `/about-us/` | S.T.O.C.K. mission and the Institute's objectives |
| Code of conduct | `/about-us/` | Moved to its own page: `/about/code-of-conduct` |
| Member rights and obligations | `/about-us/` | On `/membership` and on each membership grade |
| Programs | `/diploma/`, `/advanced-diploma/`, `/chartered-professional-certification/` | Courses, exam mode, entry and exemptions for each part |
| Fees | `/registration-fees/` | 14 fee lines in pesewas; the totals match the source |
| 2023 program outline | `/program-outline-for-2023/` | Archived table on `/programs/outlines` |
| Council, leadership, committees | `/council-members/`, `/leadership-of-the-institute/`, `/head-of-committee/` | Portraits for Dr. Anim-Prempeh and Dr. Apotey |
| News | 3 posts dated 5 April 2023 | Republished B&FT articles with source credit |

## What was deliberately not migrated

These are leftovers from the "Consultio" WordPress theme demo, not CIFIAG content (PRD 1.2):

- Australian addresses (30 Commercial Road, Fratton; 380 St Kilda Road, Melbourne), phone 1-888-452-1505 and the conflicting office hours
- The "Consultio" logo (`logo-dark-sidebar.png`, `h2-logo-popup.png`)
- Consulting "services" (Business Planning, SEO Optimization, Market Research and others) and the "20+ years" claim
- The "Our Team" page (stock demo people: Gwen Johnson, Thomas Olsen and others). It is replaced by the secretariat named in news coverage.
- The "History" page (construction-company demo timeline)
- About 80 theme demo pages (Home 2–6, pricing, portfolio, shop and others), which should be removed or redirected
- Lorem-ipsum descriptions of the international affiliations

## Decisions needed from CIFIAG before launch

1. **Legal name.** The PRD says "Institute of Financial and Investment Analysts Ghana", but the crest and site say "Chartered …". The site now uses the Chartered name.
2. **President's name.** "Daniel Amatey" (council page) or "Daniel Amateye" (news articles)?
3. **Council member.** Is "Samuel Eghan Samuel" correct? It is shown as "Samuel Eghan".
4. **Vice President.** The source title "Vice President/Chairman of Council" duplicates the President's title. It is shown as "Vice President".
5. **Address.** The contact page says "Paradise Street, by Apollo Theatre, Asylum Down"; the home page says "Paradise St, Ring Road Central".
6. **Emails.** The source also lists cifiag.gh@gmail.com and info.cfiag.ifis@gmail.com. Only info@cifiag.org is published.
7. **Fees.** No effective date is given. Are these the current amounts or the 2023 schedule?
8. **Fellowship entry.** The source says "work experience less than 4 years". This is probably "not less than 4 years".
9. **Full Member route.** Does Full Member (M.cfia) correspond to passing Part 4 (Chartered Member)?
10. **Designatory letters.** The source writes "cfia", "M.cfia" and "F.cfia" in lower case. Confirm the official form.
11. **Program outline.** Part naming in the 2023 calendar ("Professional Part 1 – Associate") differs from the fee schedule ("Part 3: Professional 1"). The second membership-training session end date is incomplete.
12. **International affiliations.** Six organisations are listed with filler descriptions. Each needs a source, logo permission, description and active dates (PRD 1.2) before it is published.
13. **News articles.** Written by the Business and Financial Times. Confirm permission to republish them in full, or replace them with summaries and links.
14. **Portraits.** Confirm consent to publish, and supply portraits for the other office holders.
15. **Intake dates and program durations** are not on the source site.
