// Server-only: picks the homepage rows. The homepage is the shop window, so it
// favours design-led brands and categories that photograph discreetly, and
// never repeats a product across rows.
import type { CatalogProduct } from '@/types/catalog'

const DESIGN_BRANDS = new Set(
  [
    'lelo', 'womanizer', 'we-vibe', 'we vibe', 'satisfyer', 'lovense', 'tenga', 'arcwave', 'dame',
    'zalo', 'svakom', 'magic wand', 'le wand', 'fun factory', 'kiiroo', 'hot octopuss', 'je joue',
    'iroha', 'smile makers', 'maude', 'unbound', 'vush', 'romp', 'pjur', 'sliquid', 'uberlube',
  ]
)

// Titles and tags that read as explicit on a first visit.
const EXPLICIT =
  /slut|fuck|pussy|cock|\bass\b|anal|dildo|dong|doll|vagina|nipple|bondage|bdsm|gag|whip|flog|machine|sling|swing|harness|strap|realistic|porn|celebrity|girls|fetish|chastity|pump/i

export type HomeRow = {
  hubs: string[]
  tags?: string[]
  minPrice?: number
}

function eligible(p: CatalogProduct, row: HomeRow): boolean {
  if (!p.available || !p.images.length || p.price <= 0) return false
  if (!row.hubs.includes(p.hub)) return false
  if (row.minPrice !== undefined && p.price < row.minPrice) return false
  if (row.tags && !p.tags.some((t) => row.tags!.includes(t.trim().toLowerCase()))) return false
  if (EXPLICIT.test(p.title) || EXPLICIT.test(p.brand) || p.tags.some((t) => EXPLICIT.test(t))) return false
  return true
}

/** Up to `n` products for a row, design-led brands first, one per brand where possible. */
export function pickRow(products: CatalogProduct[], row: HomeRow, used: Set<string>, n = 4): CatalogProduct[] {
  const pool = products.filter((p) => !used.has(p.handle) && eligible(p, row))
  const designed = pool.filter((p) => DESIGN_BRANDS.has(p.brand.toLowerCase()))
  const rest = pool.filter((p) => !DESIGN_BRANDS.has(p.brand.toLowerCase()))
  const picks: CatalogProduct[] = []
  const brands = new Set<string>()
  // First pass: one per brand; second pass: fill remaining slots.
  for (const pass of [true, false]) {
    for (const p of [...designed, ...rest]) {
      if (picks.length >= n) break
      if (picks.includes(p)) continue
      if (pass && brands.has(p.brand.toLowerCase())) continue
      picks.push(p)
      brands.add(p.brand.toLowerCase())
    }
  }
  picks.forEach((p) => used.add(p.handle))
  return picks
}
