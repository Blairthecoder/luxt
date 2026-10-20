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
- `src/content/posts.ts`: Nightstand Notes guides at `/blog/<slug>`, Markdown rendered server-side with `marked`. Long guides live in `src/content/guides/`. Bodies embed live catalog data with `[[picks:<id>]]` (product cards from the post's `picks` rules), `[[from:<collection>]]` and `[[price:<collection>]]`; `src/server/post-html.ts` resolves them at render, so never type prices into copy.
- `src/content/topics.ts`: guide topic hubs at `/blog/topic/<slug>`. Every post lists its `topics`.
- `src/content/shortcuts.ts`: homepage shortcut tiles, brand grid and the sub-category rows above listing grids.
- `src/routes/gifts.tsx`: the Gift Shop hub at `/gifts`.
- `src/server/listing.ts`: facet extraction (style, designed for, features, price, brand), filtering, sorting, pagination (48 per page). Filtered views are noindex with a canonical to the clean listing; `?page=N` is self-canonical.
- `src/server/catalog-store.ts`: server-only catalog access. Import it dynamically inside server functions or server routes so the catalog stays out of the client bundle.
- `src/lib/catalog.ts`: server functions used by route loaders.
- `src/lib/seo.ts`: `pageHead()` for title, description, robots, canonical and JSON-LD.
- `src/routes/sitemap[.]xml.ts`: lists home, non-empty hubs and products with copy.
- `src/components/AgeGate.tsx`: client-only 18+ overlay; server HTML stays fully crawlable.

## Design

Tokens live in `src/styles.css` (`@theme`): a neutral base (canvas, mist, stone, sand, ink, graphite, silver, line, night), warm shop-window tones (blush, petal, plum) for the hero, promo tiles and bands, and one accent, `signal`, used sparingly for sale flags and small labels. Display type is Inter Tight, body is Inter. Use the `.display-xl/-l/-m` scale for headings, `.lede` for intro copy, `.wrap` for the page gutter, `.btn`/`.btn-ghost`/`.more`/`.chip` for actions, `.section-head` for a heading with a right-aligned link, `.rail` for four-up product rows and `.carousel` (via `Carousel.tsx`) for scrolling rails. Tiles and images use rounded corners. Add `.reveal` to fade a section in on scroll (content stays visible without JS). Headings use Title Case. No icon library (small inline SVG marks are fine), no shadows or gradients.

Homepage and listing tiles come from `src/content/shortcuts.ts` (round shortcuts, featured hubs, brand tiles, sub-category rows) and take their images from the top discreet product on the linked page (`src/server/tiles.ts`). Only label a rail "Best Sellers" from the merchant's own tags, and only show sale prices from `compareAtPrice`.

## Conventions

- `noUnusedLocals` and `noUnusedParameters` are enforced; run `pnpm typecheck`.
- `db/` and `netlify/database/migrations/` are from the earlier store build and are not used by the app.
