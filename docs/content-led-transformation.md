# Content-led brand transformation: implementation report

Branch `claude/content-led-brand-transformation`, from `origin/sync-live-netlify-site` at 44138dd.

## 1. What already existed (audit)

- **Stack:** TanStack Start, React 19, Tailwind v4, Netlify. Build: `sync-catalog` + `sync-lovense` + `vite build`.
- **Affiliate model:** every buy link is `/go/<handle>` (`src/lib/affiliate.ts`, programs LuxuryToyX, Lovense, own Shopify store). Links carry `rel="sponsored nofollow noopener"`. **Untouched by this change.**
- **Content:** 62 Nightstand Notes guides (`src/content/guides/` plus three inline in `posts.ts`), 12 topic hubs under `/blog/topic/*`, about 45 `/shop/<slug>` collections, `/category/*`, `/reviews`, `/gifts`, Erotica, legal and trust pages.
- **SEO:** `pageHead()` supplies title, description, canonical, robots, Open Graph and Twitter tags. JSON-LD existed for Organization, WebSite, BreadcrumbList, Article, FAQPage and ItemList. The sitemap and `robots.txt` are in place and previews are `noindex`.
- **Analytics:** GA4 `G-QQ0NJL2W40` plus the Impact tag, both already in `__root.tsx`. An `affiliate_click` event already existed.
- **Email:** `NewsletterSignup` posts to Netlify Forms (`public/newsletter-form.html`). It is functional and detects a failed submission.

## 2. Changed in this branch

| Area | Change |
| --- | --- |
| Design tokens | `styles.css`: ivory `#FAF7F3`, blush `#EEDAD5`, plum `#493348`, charcoal `#29252B`, plus mauve and sage tokens. |
| Brand | `site.ts`: tagline "Feel Good. Get Closer. Discover More.", new positioning description. Root and homepage titles use the new brand wording. |
| Navigation | Home, Explore, For Couples, Shop Our Picks, Nightstand Notes, About (`pillars.ts`, `Navbar`, `Footer`, `MobileTabBar`). No indexed URL moved. Lingerie, Erotica, Gift Shop and reviews stay linked from the dropdowns and footer. |
| New hubs | `/explore`, `/for-couples`, `/shop` (`site-hubs.ts`, `SiteHubPage`). They organize existing guides and collections; items whose target does not exist are dropped at render. |
| Homepage | Seven requested sections: hero, starting point, Nightstand Notes, Thoughtfully Chosen, discovery quiz, The Nightstand Edit, Trust & Transparency. The existing lingerie and Erotica sections stay below. |
| Components | `PickCard` (editorial product card), `DiscoveryQuiz` (rule-based, nothing stored). |
| Articles | Guide-type label and research-based note on buying guides and comparisons, H2 anchor ids, table of contents on guides of 6 or more minutes, Article schema gains image and publisher logo. |
| Tracking | `affiliate_click` (with cluster), `product_card_click`, `comparison_click` (delegated in `__root.tsx`), `newsletter_signup` and `quiz_completed` (`src/lib/events.ts`). No answers or emails are sent. |
| Trust pages | About rewritten for the new positioning. Editorial Policy gains "Types of Content". |
| Sitemap | Adds `/explore`, `/for-couples`, `/shop`. |

## 3. Cluster inventory

| Priority topic | Status |
| --- | --- |
| Feel confident in bed; confident in lingerie; beginners; first vibrator | Existing guides, linked from Explore |
| Best quiet vibrators | Collection `/shop/quiet-vibrators`; the guide is in open PR #55 |
| Comfortable lingerie for beginners | Collection `/shop/comfortable-lingerie` (no guide yet) |
| Rebuild intimacy; introduce toys; long-distance; gifts; Lovense vs We-Vibe | Existing guides, linked from For Couples |
| Best couples intimacy games | **Missing**; needs sources before drafting |
| Water-based vs silicone lube; clean and store | Partly covered by `best-lube-for-sex-toys` and `how-to-clean-sex-toys` |
| Body-safe materials; lube for sensitive skin; rechargeable vs battery; choosing safe materials | **Missing**; health-adjacent, needs qualified review and cited sources |

## 4. Not done, and why

- **Hero lifestyle imagery:** no approved lifestyle assets in the repo, so the hero is typographic.
- **"Storage & Accessories" picks:** no verified merchant products, so the section is left out.
- **Eight guide upgrades:** done at template level only (type label, TOC, anchors). Per-guide source citations need real sources.
- **Lead magnet and double opt-in:** open PR #54 (Confidence Kit) already builds this. It touches `NewsletterSignup`, so expect a small merge conflict there.
- **Author pages, review-methodology page, social profile `sameAs`:** need real author details and verified profiles.
- **New articles for missing topics:** held until source evidence exists.
- **Revenue KPIs:** need affiliate-network reporting; none is integrated.
- **Core Web Vitals / Lighthouse:** not run against a deploy preview.

## 5. Overlap with open PRs

Open PRs #52 to #56 touch `__root.tsx`, `index.tsx`, `NewsletterSignup.tsx`, `Footer.tsx`, `site.ts`, `posts.ts` and the sitemap. This branch will conflict with them in those files. #56 adds a Black Friday band to the old homepage, which this branch replaces. Merge order matters; resolve by merging `sync-live-netlify-site` into this branch after the others land.

## 6. KPI framework (GA4 `G-QQ0NJL2W40`)

In GA4, mark `affiliate_click`, `newsletter_signup` and `quiz_completed` as key events. Register `product_handle`, `link_context` and `content_cluster` as custom dimensions. Build an Exploration of `affiliate_click` by `content_cluster` and landing page. AI referral traffic: filter session source on `chatgpt.com`, `perplexity.ai`, `gemini.google.com` and `copilot.microsoft.com`. Search Console covers organic clicks and impressions. Earnings per click needs commission data exported from the affiliate networks.
