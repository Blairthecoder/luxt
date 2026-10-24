# AGENTS.md — Nightstand Supply Co.

Independent sex toy review site (editorial publication, not a store) built on **TanStack Start**, **React 19**, **Tailwind CSS v4** and Netlify. Products are presented on-site with original copy; every purchase goes to the merchant through a tracked affiliate redirect. There is no cart or checkout.

## How a click earns credit

1. Buy buttons link to `/go/<handle>` (`src/components/BuyButton.tsx`, `rel="sponsored nofollow"`).
2. `src/routes/go/$handle.ts` builds the deep link with `buildAffiliateUrl()` from `src/lib/affiliate.ts` and returns a 302 with `X-Robots-Tag: noindex`.
3. Deep link format: `<program.deepLinkBase>?url=<encodeURIComponent(merchant product URL)>`.

Never hardcode an affiliate URL in content or components. Add a new program as an entry in `PROGRAMS`.

## Key files

- **The store is Lovense-only.** `catalog-store.ts` serves `src/data/lovense.json` alone. `scripts/sync-catalog.mjs` still pulls the LuxuryToyX feed into `src/data/catalog.json`, but only so old product URLs can 301 to their closest live category. Retired hubs and collections, and LuxuryToyX handles of Lovense toys, are listed in `src/content/retired.ts`; their URLs 301 and they drop out of nav, tiles and the sitemap.
- **Lingerie comes from our own Shopify store.** `scripts/sync-shopify.mjs` reads the store's `lingerie` collection through the Storefront API at build time (env `SHOPIFY_STORE_DOMAIN`, `SHOPIFY_STOREFRONT_TOKEN`, optional `SHOPIFY_COLLECTION`, `SHOPIFY_HUB`, set in Netlify, never committed) and writes `src/data/shopify.json`, `shopify-links.json` (store product URLs with UTM tags, served by `/go/<handle>` under the `shopify` program) and `shopify-meta.json` (shop name, store URL, product count per hub). Checkout happens on Shopify. The `lingerie` hub stays retired and 301s until the sync finds products, then it returns to nav, tiles and the sitemap automatically. Without credentials the sync keeps the existing files. A Shopify product webhook pointed at a Netlify build hook redeploys on product changes.
- `src/content/product-copy-lingerie.ts`: original copy (summary, fit notes, pros and cons, FAQs) for the Shopify lingerie, keyed by Shopify handle; products without an entry stay noindex. Lingerie collection pages (`group: 'Lingerie'` in `collections.ts`) match on the Shopify tags (`bodysuit`, `set`, `babydoll`, `chemise`, `plus-size`, `comfort`, `bridal`, `gift`, `under-30`), so tag new products accordingly. Collections under 6 products render but are noindex and out of the sitemap.
- `src/content/product-copy-lovense.ts`: original copy for Lovense products.
- `scripts/sync-lovense.mjs`: builds `src/data/lovense.json` (products, prices, images) from lovense.com product pages and `src/data/lovense-links.json` (per-product affiliate links) from `src/data/lovense-affiliate-links.json`, the dashboard export of item names and links. Lovense links are per-item short links, not deep links. `catalog-store.ts` merges Lovense over any LuxuryToyX product with the same handle. Keeps existing files on failure.
- `src/data/hub-rules.json`: ordered regex rules mapping each product to one category hub.
- `src/content/hubs.ts`: category names, meta and original intro copy.
- `src/content/product-copy.ts`: original product copy keyed by handle. Product pages are `noindex` until they have an entry. Never paste merchant descriptions.
- `src/content/collections.ts`: search-led collection pages at `/shop/<slug>`, each a rule over the catalog (tags, title regex, brand, price).
- `src/content/posts.ts`: Nightstand Notes guides at `/blog/<slug>`, Markdown rendered server-side with `marked`. Long guides live in `src/content/guides/`. Bodies embed live catalog data with `[[picks:<id>]]` (product cards from the post's `picks` rules), `[[from:<collection>]]` and `[[price:<collection>]]`; `src/server/post-html.ts` resolves them at render, so never type prices into copy.
- `src/content/topics.ts`: guide topic hubs at `/blog/topic/<slug>`. Every post lists its `topics`; the first one sets the breadcrumb, so add `buying-guides` (best-of roundups) or `comparisons` (X vs. Y) after the audience topic.
- `src/routes/reviews.tsx`: the `/reviews` index of every product with original copy, grouped by hub. Product pages with copy are the reviews (title "<Product> Review", Product schema with an editorial `review` carrying pros and cons as `positiveNotes`/`negativeNotes`, no star rating).
- `src/content/shortcuts.ts`: the sub-category rows above listing grids.
- `src/routes/gifts.tsx`: the Gift Shop hub at `/gifts`.
- `src/server/listing.ts`: facet extraction (style, designed for, features, price, brand), filtering, sorting, pagination (48 per page). Filtered views are noindex with a canonical to the clean listing; `?page=N` is self-canonical.
- `src/server/catalog-store.ts`: server-only catalog access. Import it dynamically inside server functions or server routes so the catalog stays out of the client bundle.
- `src/lib/catalog.ts`: server functions used by route loaders.
- `src/lib/seo.ts`: `pageHead()` for title, description, robots, canonical and JSON-LD.
- `src/routes/sitemap[.]xml.ts`: lists home, non-empty hubs and products with copy.
- `src/components/AgeGate.tsx`: client-only 18+ overlay; server HTML stays fully crawlable.

## Editorial voice

The site is an editorial publication on sex education, intimacy, women's empowerment and confidence; toy reviews support the guides. Navigation leads with Reviews, Buying Guides, Comparisons, Gift Guides and Learn; the catalog sits under Browse Toys. Outbound buttons say "Check Price", never "Buy" or "Shop Now". The homepage H1 and title target adult sex education, intimacy and confidence; it leads with the women's empowerment pillar guide, the latest guides, the four-pillar band and "How We Write", then reviewed picks and buying guides. Only products with original copy appear there. Never claim hands-on testing or invent ratings: reviews are based on manufacturer specs, manuals and materials, as the editorial policy says. Guides may cover brands we do not link to (Fleshlight, Tenga, Womanizer, LELO); mention them as plain text and point to the closest Lovense review.

## Design

Tokens live in `src/styles.css` (`@theme`): a neutral base (canvas, mist, stone, sand, ink, graphite, silver, line, night), warm shop-window tones (blush, petal, plum) for the hero, promo tiles and bands, and one accent, `signal`, used sparingly for sale flags and small labels. Display type is Inter Tight, body is Inter. Use the `.display-xl/-l/-m` scale for headings, `.lede` for intro copy, `.wrap` for the page gutter, `.btn`/`.btn-ghost`/`.more`/`.chip` for actions, `.section-head` for a heading with a right-aligned link, `.rail` for four-up product rows and `.carousel` (via `Carousel.tsx`) for scrolling rails. Tiles and images use rounded corners. Add `.reveal` to fade a section in on scroll (content stays visible without JS). Headings use Title Case. No icon library (small inline SVG marks are fine), no shadows or gradients.

Homepage and listing tiles come from `src/content/shortcuts.ts` (round shortcuts, featured hubs, brand tiles, sub-category rows) and take their images from the top discreet product on the linked page, or the top product when none is discreet, so every live category has a cover (`src/server/tiles.ts`). Listings with fewer than four products get a "More to Explore" row from `moreToExplore()` (sets that include a listed toy, then `RELATED_HUBS`, sub-category pages and the listing's own hub). Only label a rail "Best Sellers" from the merchant's own tags, and only show sale prices from `compareAtPrice`.

## Conventions

- `noUnusedLocals` and `noUnusedParameters` are enforced; run `pnpm typecheck`.
- `db/` and `netlify/database/migrations/` are from the earlier store build and are not used by the app.
