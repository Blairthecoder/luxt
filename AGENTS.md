# AGENTS.md — Nightstand Supply Co.

Affiliate storefront for adult toys built on **TanStack Start**, **React 19**, **Tailwind CSS v4** and Netlify. Products are presented on-site with original copy; every purchase goes to the merchant through a tracked affiliate redirect. There is no cart or checkout.

## How a click earns credit

1. Buy buttons link to `/go/<handle>` (`src/components/BuyButton.tsx`, `rel="sponsored nofollow"`).
2. `src/routes/go/$handle.ts` builds the deep link with `buildAffiliateUrl()` from `src/lib/affiliate.ts` and returns a 302 with `X-Robots-Tag: noindex`.
3. Deep link format: `<program.deepLinkBase>?url=<encodeURIComponent(merchant product URL)>`.

Never hardcode an affiliate URL in content or components. Add a new program as an entry in `PROGRAMS`.

## Key files

- `scripts/sync-catalog.mjs`: pulls `https://www.luxurytoyx.com/products.json` into `src/data/catalog.json` before every build. Keeps the existing file on failure.
- `src/data/hub-rules.json`: ordered regex rules mapping each product to one category hub.
- `src/content/hubs.ts`: category names, meta and original intro copy.
- `src/content/product-copy.ts`: original product copy keyed by handle. Product pages are `noindex` until they have an entry. Never paste merchant descriptions.
- `src/content/collections.ts`: search-led collection pages at `/shop/<slug>`, each a rule over the catalog (tags, title regex, brand, price).
- `src/content/posts.ts`: Nightstand Notes guides at `/blog/<slug>`, Markdown rendered server-side with `marked`.
- `src/server/listing.ts`: facet extraction (style, designed for, features, price, brand), filtering, sorting, pagination (48 per page). Filtered views are noindex with a canonical to the clean listing; `?page=N` is self-canonical.
- `src/server/catalog-store.ts`: server-only catalog access. Import it dynamically inside server functions or server routes so the catalog stays out of the client bundle.
- `src/lib/catalog.ts`: server functions used by route loaders.
- `src/lib/seo.ts`: `pageHead()` for title, description, robots, canonical and JSON-LD.
- `src/routes/sitemap[.]xml.ts`: lists home, non-empty hubs and products with copy.
- `src/components/AgeGate.tsx`: client-only 18+ overlay; server HTML stays fully crawlable.

## Design

Tokens live in `src/styles.css` (`@theme`): ink/surface/line backgrounds, ivory text, gold accent. Display type is Cormorant Garamond, body is Jost. Headings use Title Case; small labels use the `.eyebrow` class. No icon library.

## Conventions

- `noUnusedLocals` and `noUnusedParameters` are enforced; run `pnpm typecheck`.
- `db/` and `netlify/database/migrations/` are from the earlier store build and are not used by the app.
