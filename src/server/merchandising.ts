// Server-only: how products are ranked when a shopper has not picked a sort.
// There is no sales feed, so "popular" is approximated from what tends to sell
// for an affiliate store like this one: design-led brands, approachable prices,
// discounts and discreet product names, with brands mixed so no listing opens
// on a wall of one label.
import type { CatalogProduct } from '@/types/catalog'

export const DESIGN_BRANDS = new Set([
  'lelo', 'womanizer', 'we-vibe', 'we vibe', 'satisfyer', 'lovense', 'tenga', 'arcwave', 'dame',
  'zalo', 'svakom', 'magic wand', 'le wand', 'fun factory', 'kiiroo', 'hot octopuss', 'je joue',
  'iroha', 'smile makers', 'maude', 'unbound', 'vush', 'romp', 'pjur', 'sliquid', 'uberlube',
])

/** Titles and tags that read as explicit on a first visit. */
export const EXPLICIT =
  /slut|fuck|pussy|cock|\bass\b|anal|dildo|dong|doll|vagina|nipple|bondage|bdsm|gag|whip|flog|machine|sling|swing|harness|strap|realistic|porn|celebrity|girls|fetish|chastity|pump/i

const POPULAR_TAG = /best ?sell|top ?sell|popular|staff ?pick|fan fav/i

export type MerchFocus = {
  /** Hubs that belong at the front of this listing. */
  hubs?: string[]
  /** Push products tagged for the other audience back. */
  audience?: 'male' | 'female'
}

/** Collection pages whose lineup needs a lead, so Her, Him and Couples don't open on the same products. */
export const COLLECTION_FOCUS: Record<string, MerchFocus> = {
  'sex-toys-for-women': { hubs: ['vibrators', 'couples', 'lubricants'], audience: 'female' },
  'sex-toys-for-men': { hubs: ['strokers', 'prostate-massagers', 'penis-rings'], audience: 'male' },
  'couples-sex-toys': { hubs: ['couples', 'vibrators', 'penis-rings'] },
  'app-controlled-sex-toys': { hubs: ['vibrators', 'couples'] },
  'luxury-sex-toys': { hubs: ['vibrators', 'couples', 'prostate-massagers', 'strokers'] },
  'sex-toys-under-50': { hubs: ['vibrators', 'strokers', 'lubricants', 'penis-rings'] },
  'sex-toys-under-100': { hubs: ['vibrators', 'strokers', 'prostate-massagers', 'couples'] },
  'stocking-stuffers': { hubs: ['vibrators', 'strokers', 'lubricants'] },
  'sex-toy-gift-sets': { hubs: ['vibrators', 'couples'] },
}

function lower(tags: string[]): string[] {
  return tags.map((t) => t.trim().toLowerCase())
}

export function isDiscreet(p: CatalogProduct): boolean {
  return !EXPLICIT.test(p.title) && !EXPLICIT.test(p.brand) && !p.tags.some((t) => EXPLICIT.test(t))
}

export function merchScore(p: CatalogProduct, focus: MerchFocus = {}): number {
  let score = 0
  if (!p.available || !p.images.length) score -= 20
  if (DESIGN_BRANDS.has(p.brand.toLowerCase())) score += 3
  if (p.tags.some((t) => POPULAR_TAG.test(t))) score += 4
  if (p.price >= 20 && p.price <= 90) score += 3
  else if (p.price > 90 && p.price <= 150) score += 1.5
  else if (p.price > 0 && p.price < 20) score += 1
  else if (p.price > 300) score -= 1
  if (p.compareAtPrice) score += 1
  if (p.images.length > 1) score += 0.5
  if (!isDiscreet(p)) score -= 4
  if (focus.hubs?.includes(p.hub)) score += 2 + (focus.hubs.length - focus.hubs.indexOf(p.hub)) * 0.25
  if (focus.audience) {
    const tags = lower(p.tags)
    const other = focus.audience === 'male' ? 'female' : 'male'
    if (tags.includes(other)) score -= 1.5
  }
  return score
}

/** Ranks by score, then spreads brands so the same label never appears twice in a row of four. */
export function merchandise(products: CatalogProduct[], focus: MerchFocus = {}): CatalogProduct[] {
  const ranked = products
    .map((p, i) => ({ p, i, s: merchScore(p, focus) }))
    .sort((a, b) => b.s - a.s || a.i - b.i)
    .map((x) => x.p)
  const out: CatalogProduct[] = []
  const queue = [...ranked]
  while (queue.length) {
    const recent = new Set(out.slice(-3).map((p) => p.brand.toLowerCase()))
    // Look a short way ahead for a different brand before accepting a repeat.
    const idx = queue.slice(0, 12).findIndex((p) => !recent.has(p.brand.toLowerCase()))
    out.push(queue.splice(idx === -1 ? 0 : idx, 1)[0])
  }
  return out
}
