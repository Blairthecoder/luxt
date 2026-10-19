# Nightstand Supply Co.

Affiliate storefront for adult toys at https://nightstandsupply.co. Product and category pages live on-site; purchases go to LuxuryToyX through tracked `/go/<handle>` redirects.

## Commands

```bash
pnpm install
pnpm sync:catalog   # refresh src/data/catalog.json from LuxuryToyX
pnpm dev            # http://localhost:3000
pnpm build          # sync catalog, then build
pnpm typecheck
```

Test the seed catalog without network access:

```bash
node scripts/sync-catalog.mjs --from-file scripts/fixtures/seed-products.json
```

See `AGENTS.md` for architecture.
