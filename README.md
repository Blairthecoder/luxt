# VELVET & PULSE — Luxury Intimate Pleasure & Wellness

**VELVET & PULSE** is a modern, mobile-responsive e-commerce platform for luxury adult toys, intimate pleasure tech, and sensory wellness. Engineered with sound-dampened acoustic resonance, touchless sonic air waves, medical-grade liquid silicone, and 100% discreet packaging.

---

## Highlights & Features

- **Sensory Catalog & Filterable Grid:**
  - Full search capability across titles, descriptions, categories, and technical features.
  - Multi-category filtering (Dual-Stimulation, Vibrators & Wands, Couples & Wearables, Touchless Sonic Air, Anal Play, Pelvic Health, Luxury Essentials).
  - Price brackets, feature toggles (Sonic Aeropulse, Deep Rumble, Thermal Warming, IPX8 Submersible), and multi-criteria sorting.
- **Interactive Sensory Match Quiz ("Find Your Vibe"):**
  - Interactive 3-step questionnaire assessing intimate intentions, sensation preferences, and priority features to recommend calibrated product matches.
- **Polished Product Detail Experience:**
  - High-resolution multi-view gallery with Netlify Image CDN edge optimization (`/.netlify/images`).
  - Real-time color variant selector with dynamic stock status and finish previews.
  - Dual pricing with original price strike-through, calculated percentage savings, and installment breakdown.
  - Quantity selector with instant haptic-like visual feedback and stock urgency indicators.
  - In-depth tabbed content: Sensory Profile, Engineering Specifications table, Care & Hygiene guide, and Verified Patron reviews.
  - Interactive review submission modal that persists customer evaluations directly to the Netlify Database.
- **Discreet Bag & Cart Slide-Over:**
  - Slide-over drawer with persistent local storage state.
  - Complimentary priority discreet shipping progress bar with real-time threshold calculations.
  - VIP promo code engine (supports `PULSE20` for 20% off, `VELVET15` for 15% off).
  - Full Stripe checkout session integration with simulated discreet fallback for environments without live Stripe credentials.
- **Discreet Packaging Assurance:**
  - Plain, unbranded box promise with tamper-evident seal and anonymous return address.
  - Anonymous billing statement descriptor (`VP STUDIO SERVICES LLC`).
- **Full Netlify Platform Integration:**
  - Managed PostgreSQL storage powered by `@netlify/database` with Drizzle ORM schemas and migrations in `netlify/database/migrations/`.
  - Netlify Image CDN on-demand edge image transformation and WebP conversion.
  - High-definition product visuals generated via Netlify AI Gateway (`gemini-3.1-flash-image`).

---

## Technology Stack

- **Framework:** [TanStack Start](https://tanstack.com/start) with React 19
- **Routing:** [TanStack Router](https://tanstack.com/router) with file-based routing
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) with custom luxury typography (`Playfair Display`, `Cinzel`, `Plus Jakarta Sans`)
- **Database:** Netlify Database (managed PostgreSQL) with [Drizzle ORM](https://orm.drizzle.team/)
- **Image Optimization:** Netlify Image CDN (`/.netlify/images`)
- **Visual Assets:** Netlify AI Gateway (`gemini-3.1-flash-image`)
- **Payments:** Stripe Checkout Server Functions
- **Icons:** [Lucide React](https://lucide.dev/)

---

## Local Development

### Prerequisites

- Node.js 22.13+ or 24+
- `pnpm` (or `npm`)

### Installation & Run

1. Clone repository and install dependencies:
   ```bash
   pnpm install
   ```

2. Start the local development server:
   ```bash
   pnpm dev
   ```

3. Open `http://localhost:3000` in your browser.

---

## Database Migrations

Database schemas are defined in `db/schema.ts` and managed with Drizzle Kit:

```bash
# Generate a new migration after schema modification
npx drizzle-kit generate --name <descriptive_migration_name>
```

Migrations are output to `netlify/database/migrations/` and automatically applied upon Netlify deploy.
