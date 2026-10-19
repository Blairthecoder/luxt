# AGENTS.md — Architecture & Engineering Guidelines

This document provides architectural guidance, directory structure maps, and engineering conventions for AI agents working with the **VELVET & PULSE** e-commerce codebase.

---

## Architecture Overview

This project is a high-performance SSR and client-hydrated e-commerce store built on **TanStack Start** with **React 19**, **Tailwind CSS v4**, and Netlify serverless platform primitives.

### Key Directories

- `db/`: Database configuration and ORM schema.
  - `db/schema.ts`: Drizzle ORM table definitions (`products`, `reviews`, `orders`).
  - `db/index.ts`: Netlify Database native adapter initialization using `drizzle-orm/netlify-db`.
- `netlify/database/migrations/`: Generated SQL migration files automatically detected and applied during Netlify deployment.
- `src/`: Application source code.
  - `src/routes/`: File-based routing managed by TanStack Router.
    - `src/routes/__root.tsx`: Document root, meta tags (`siteName`, `siteDescription`), global CSS imports, and `CartProvider` wrapper.
    - `src/routes/index.tsx`: Main catalog landing page featuring hero banner, live search, multi-category filters, price filters, and product grid.
    - `src/routes/products/$productId.tsx`: Detail page featuring multi-angle image gallery, color variant swatches, live stock indicators, specifications, and review modal.
    - `src/routes/checkout/success.tsx`: Order confirmation with discreet tracking instructions and generated order ID.
    - `src/routes/checkout/cancel.tsx`: Order pause and bag restoration page.
  - `src/components/`: Reusable modular UI components.
    - `Navbar.tsx`: Top announcement bar, logo, desktop & mobile menu, and cart trigger with badge.
    - `ProductCard.tsx`: Grid card with image hover zoom, category tags, ratings, color dots, and quick add.
    - `CartDrawer.tsx`: Slide-over drawer with item stepper, discount voucher engine, and free shipping progress.
    - `VibeQuizModal.tsx`: 3-step interactive questionnaire recommending calibrated toys based on user preferences.
    - `Footer.tsx`: Discreet shipping assurance, warranty highlights, newsletter, and age verification notices.
  - `src/context/`:
    - `CartContext.tsx`: React Context for cart items, quantities, promo vouchers, and local storage synchronization.
  - `src/data/`:
    - `products.ts`: Authoritative product inventory with detailed descriptions, variants, features, and specs.
  - `src/lib/`:
    - `image.ts`: Netlify Image CDN helper generating `/.netlify/images?url=...&w=...&fm=webp` URLs.
    - `stripe.ts`: Server functions creating Stripe Checkout sessions or demo fallbacks.
    - `db-service.ts`: Server functions reading and writing to the Netlify Database with static fallbacks.
- `public/`: Static files served directly by the web server.
  - `public/img/`: Studio-quality visual assets generated through Netlify AI Gateway.

---

## Coding Conventions & Decisions

1. **TypeScript & Strictness:**
   - `"noUnusedLocals": true` and `"noUnusedParameters": true` are strictly enforced. All unused imports or declarations must be pruned.
   - Use typed routes and params via TanStack Router (`params.productId`).
2. **Netlify Database & Drizzle:**
   - Always install `drizzle-orm@beta` and `drizzle-kit@beta` for Netlify Database compatibility.
   - Any schema modification in `db/schema.ts` requires running `npx drizzle-kit generate --name <migration_name>` to produce a new SQL migration in `netlify/database/migrations/`.
   - Never apply migrations directly via `drizzle-kit push` or manual DDL; Netlify automatically executes pending migrations in `netlify/database/migrations/` on deploy.
   - Database operations in `src/lib/db-service.ts` are wrapped in try-catch with static fallback data to ensure resilience during initial database provisioning.
3. **Netlify Image CDN:**
   - Image assets are transformed on-demand via `getOptimizedImageUrl()` in `src/lib/image.ts`, transforming source paths into `/.netlify/images?url=/img/<file>&w=<width>&q=80&fm=webp`.
4. **Checkout Integration:**
   - Server function in `src/lib/stripe.ts` creates real Stripe Checkout sessions when `STRIPE_SECRET_KEY` is present.
   - When no Stripe key is configured, it produces a simulated order verification session redirecting to `/checkout/success?session_id=demo_...` so that checkout workflows remain fully verifiable in staging environments.
