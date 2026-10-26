# Luxury Toy X affiliate expansion: status and open items

Branch `claude/luxury-toy-x-affiliate-expansion`, from `origin/sync-live-netlify-site` at 931047a.

## 1. Audit findings

- **Luxury Toy X already existed** in `src/lib/affiliate.ts` (`PROGRAMS.luxurytoyx`) with the approved FlexOffers deep link (`luxurytoyx.fxo.co/g/...`). It was **not changed**. Outbound links are `deepLinkBase?url=<product URL>` through `/go/<handle>`.
- The storefront catalog was moved to Lovense plus our own Shopify lingerie earlier, so Luxury Toy X products had no pages. The `scripts/sync-catalog.mjs` feed still runs at build but only feeds old-URL redirects.
- Lovense links (`lovense-links.json`) and Shopify cart logic were not touched.
- Public retailer data: the product feed (`/products.json`, about 2,000 products) and two policy pages. There is no public affiliate-terms page.

## 2. What was built

| Item | Where |
| --- | --- |
| Merchant profiles (name, site, categories, shipping, returns, sources, verified date) | `src/content/merchants.ts` |
| 13 curated Luxury Toy X picks with fact-only editorial notes | `src/data/luxurytoyx-picks.json` |
| Pick loader and buyer-intent groups | `src/lib/merchant-picks.ts` |
| `MerchantBadge`, `MerchantPickCard`, `MerchantPicksSection`, `GuidePicksStrip` | `src/components/MerchantPicks.tsx` |
| Brand page `/brands/luxury-toy-x` | `src/routes/brands/luxury-toy-x.tsx` |
| CannaWize landing `/guides/intimacy-and-connection` | `src/routes/guides/intimacy-and-connection.tsx` |
| Shop Our Picks gains beginner, couples, under $50, premium and care groups | `src/routes/shop/index.tsx` |
| Guide funnel: next-step cards and pick strips on 7 guides | `src/content/funnel.ts`, `blog/$slug.tsx` |
| Safe feed refresh script | `scripts/refresh-luxurytoyx-picks.mjs` |
| Tracking | `src/routes/__root.tsx`, `src/lib/events.ts` |

Price handling: prices are the retailer's list price on `checkedAt` and are always shown with that date and a "confirm at checkout" note. They are not presented as live prices.

## 3. Tracking

- `cannawize_referral_landing`: fires once per browser session when `utm_source=cannawize`.
- `affiliate_click` (existing) now carries `merchant`, `content_cluster` and `referral_source`.
- `merchant_product_click`: fires with `affiliate_click` for merchant-tagged links.
- `newsletter_signup` and `quiz_completed` (existing) now carry `referral_source`.
- GA4 attributes the session itself from the UTM parameters. **No UTM is added to affiliate destinations.**
- There is no consent banner on the site; GA4 loads for everyone, as before. If consent is required for your audience, that is a separate piece of work.
- Attribution from click to sale needs the affiliate network's reporting; nothing here measures sales.

## 4. Not done, and why

- **Quiet & Discreet products:** the retailer publishes no noise levels, so no product is claimed quiet. A compact group exists in code but is not shown. Discretion is covered by the retailer's verified shipping and billing terms on the brand page, and by the existing Lovense quiet collection.
- **Storage accessories:** none in the retailer feed. Care is limited to two lubricants.
- **"Luxury Toy X vs Lovense":** not published. A retailer and a brand are not comparable. The existing Lovense vs We-Vibe guide covers the real brand comparison.
- **New "Best Under $50" and "Best Quiet" URLs:** not created. The Under $50 group lives on `/shop` and the quiet guide is in open PR #55. Existing guides were upgraded instead of adding URLs.
- **Product schema, ratings, offers:** none added. Our pages do not carry verified reviews or live prices.
- **Hands-on testing:** none claimed; notes come from retailer listings.

## 5. Needs your input before relying on this

1. **Merchant terms** (FlexOffers dashboard): confirm whether brand-name bidding, paid ads, email promotion and merchant product images are allowed. Nothing in the repo assumes yes. Product images are hotlinked from the retailer's CDN.
2. **Link activation:** confirm the existing `fxo.co` link is the approved, active tracking link for this program. It was reused unchanged.
3. **CannaWize links:** point CannaWize at `/guides/intimacy-and-connection?utm_source=cannawize&utm_medium=referral&utm_campaign=cannabis_intimacy`.
4. **GA4:** mark `cannawize_referral_landing` and `merchant_product_click` as key events; register `merchant`, `referral_source` and `content_cluster` as custom dimensions.
5. **Refresh picks:** run `node scripts/refresh-luxurytoyx-picks.mjs`, review the diff and commit. The retailer rate-limits its feed, and the script writes nothing if it cannot read all of it.
6. **Policy facts:** shipping and return terms were read on 2026-10-26. Re-read before relying on them.

## 6. Suggested next content

Best quiet vibrators (merge #55 first), a lube-compatibility explainer, best under $50 as its own guide once more pricing is verified, a long-distance picks guide using Lovense, a gift guide organized by budget, and a beginner "first week" guide linking education to the picks.
