# Nightstand Supply: SEO, Editorial Trust and Growth Notes

Prepared 2026-10-26 with the editorial-authority update. This document separates what was checked in the repository, what shipped in that PR and what is still open. Nothing here is based on Search Console or paid keyword data, which were not available. Anything about demand is marked unverified.

## 1. Audit findings (repository only)

| Area | Finding | Status |
|---|---|---|
| Age gate | `AgeGate.tsx` is a client-only overlay shown after hydration. Server HTML contains the full page, so crawlers receive indexable content. No user-agent sniffing or bot bypass exists. | Compliant with the "do not bypass for ordinary visitors" rule. Live behavior for Googlebot is **unverified** (needs URL Inspection in Search Console). |
| Canonicals and robots | `pageHead()` sets a canonical and robots meta on every page. Deploy previews are noindex through `VITE_NOINDEX`. `/go/` is disallowed and returns `X-Robots-Tag: noindex`. | Fine. |
| Sitemap | `sitemap.xml` lists guides with `lastmod`, topic hubs, hubs, collections with 6+ products and products with copy. | Fine. New guide is included automatically. |
| Internal links | Every `/blog/<slug>` link in `src/` resolves to a post. | Checked by script, no 404s found. |
| Structured data | Article (with dates, publisher, author), BreadcrumbList, FAQPage on guides, WebSite on the homepage, Organization helper. Author is the Organization unless a named author is set. | Now also emits `citation` for guides that use sources. Not run through a live validator (see section 5). |
| Em dashes | No em dash characters in guide, source or component files touched. | Checked by grep. |
| Affiliate links | Buy buttons use `rel="sponsored nofollow"` and `/go/`. Merchant schema is not applied to affiliate-only pages. | No change needed. |

## 2. What changed in this update

- `src/content/sources.ts`: verified reference registry. Each entry's title, journal, year, DOI and abstract were read from the PubMed record before it was added.
- `[[cite:<id>]]` inline markers, numbered by first appearance, plus an end-of-guide References list with source type and plain-language limits (`ArticleSources.tsx`).
- Optional per-guide "How this guide was prepared" note (`howPrepared`) and a link to the corrections process.
- Editorial policy: research standards, editorial review versus medical review, what Nightstand sells, and a corrections process with a `#corrections` anchor.
- Revised guides: confidence in bed, asking for what you want, self-pleasure, sex toys for beginners, clitoris anatomy, cleaning toys, Lovense vs. We-Vibe (disclosure only).
- New guide: sex toy materials (`/blog/sex-toy-materials-guide`).
- Rewritten in place at the same URL: `/blog/best-lube-for-sex-toys`, now a comparison with the evidence and its limits.

## 3. Sources used and what each supports

| Source | Used for | Limits stated on page |
|---|---|---|
| da Silva et al. 2024, J Sex Marital Ther, PMID 39126389 | Body image and sexual function association | 10 studies, young adult women, association only |
| Mallory et al. 2022, J Fam Psychol, PMID 34968095 | Sexual communication and satisfaction | 93 studies, 38,499 people, cross-sectional |
| Herbenick et al. 2009, J Sex Med, PMID 19453881 | Vibrator use prevalence | 2,056 US women aged 18 to 60, self-report |
| Herbenick et al. 2018, J Sex Marital Ther, PMID 28678639 | Orgasm and clitoral stimulation | 1,055 US women, self-report |
| Anderson et al. 2014, Sex Transm Infect, PMID 24739872 | HPV on toys before and after cleaning | 12 women, 2 toys, one cleaner |
| Voeller et al. 1989, Contraception, PMID 2535978 | Mineral oil and latex condoms | Bench test, decades old |

Not usable in this update: the Planned Parenthood toy page and the CDC condom page returned HTTP 403 to automated fetches, and the ACOG page returned HTTP 402. They were not cited. A person with browser access should read them and, if they support specific statements, add them to `sources.ts`.

## 4. Open work that needs a human

- **Medical review.** No guide shows a clinical reviewer. Health-adjacent guides (why sex hurts, menopause, sex after a baby, kegels) should be reviewed by a qualified clinician before `reviewedBy` is set. Do not set it without a real review.
- **Unrevised guides.** The sourcing pass covered the guides above. About 60 guides remain. They have not been audited, so assume some contain unsourced statements.
- **Lingerie and boudoir guides.** Not revised. They need a fit-and-size resource built from the Shopify size charts, which require access to the store data.
- **Product claims.** Product copy for toys was not audited line by line for noise, price attribution or "best" claims. Audit `product-copy-lovense.ts` against Lovense's specification pages.
- **Search Console and analytics.** Not available here. Connect Search Console and confirm the indexed-page report, then confirm Googlebot sees guide content behind the age gate.
- **Contact address.** The corrections process points to the existing contact email in `src/config/site.ts`. Confirm it is monitored.

## 5. Validation status

- `tsc --noEmit`: passes.
- `vite build`: passes (run without the catalog sync scripts, which call external services).
- Structured data: not run through Google's Rich Results Test or the Schema.org validator. Run both on `/blog/sex-toy-materials-guide` and `/blog/best-lube-for-sex-toys` from the deploy preview.
- Mobile and desktop rendering: check the References block and inline `[n]` markers on the deploy preview.

## 6. Content roadmap (ranked, none published automatically)

Demand figures are **unverified**. Rank is by brand fit, evidence availability and gap against the existing library.

| Rank | Topic | Intent | Evidence to verify first | Notes |
|---|---|---|---|---|
| 1 | How to clean sex toys by material | Practical | Clinical or manufacturer cleaning guidance beyond the HPV study | Existing guide updated; extend after a clinical source is confirmed |
| 2 | How to talk about differences in sexual desire | Relationship | Desire discrepancy reviews | Extend `mismatched-libido-in-relationships` rather than add a new URL |
| 3 | Why body image can affect sexual confidence | Research-based | Already have one review | Folded into the confidence guide; a standalone page only if searches justify it |
| 4 | How to protect privacy with app-controlled products | Safety | Maker privacy policies, security research | Needs a read of each maker's policy; no first-hand testing |
| 5 | What to consider before buying your first vibrator | Buying | Vibrator survey (cited) | Already served by `how-to-choose-your-first-vibrator`; audit before adding |
| 6 | How to choose lingerie that fits comfortably | Shopping | Shopify size charts | Needs store data |
| 7 | Are expensive sex toys worth it? | Commercial | Specs by price tier | Only with a fair comparison including non-affiliate brands |
| 8 | Long-distance intimacy | Relationship | Limited | Two guides exist; consolidate first |

## 7. Measurement plan

Not configured in this PR. Confirm what analytics exist before adding anything.

- Search Console: queries, impressions and indexed pages by guide (connect and verify ownership first).
- Engagement: scroll depth and time on guides, with a privacy-conscious tool and no personal data from the quiz.
- Clicks: `/go/` outbound clicks by `data-link-context` (guide pick, top pick, shop-the-guide).
- Newsletter: signups by `source` (already passed as `guide:<slug>`).
- Monthly report sections: traffic, engaged readership, commercial clicks, brand visibility (branded search impressions). Do not report AI citations as a goal.

## 8. Brand discovery plan (research targets, not confirmed)

- Ask qualified sexual health educators or therapists for interviews or expert review. Identify candidates; do not name any as partners until they agree.
- Publish original explainers that others can cite, such as the materials comparison table.
- Nonexplicit educational social posts and newsletter editions adapted from guides, subject to each platform's adult-content policy.
- Outreach to independent publications with a genuinely useful resource. No purchased links, guest-post networks or invented reviews.
