// Server-only: facet extraction, filtering and pagination over the catalog.
import type { CatalogProduct } from '@/types/catalog'
import {
  FILTER_KEYS,
  PAGE_SIZE,
  PRICE_BANDS,
  type FacetOption,
  type Facets,
  type FilterKey,
  type ListingFilters,
  type ListingResult,
  type ProductSummary,
} from '@/lib/listing'
import { merchandise, type MerchFocus } from '@/server/merchandising'
import hubRules from '@/data/hub-rules.json'

const SKIP_GROUPS = new Set(['category', 'celebrity', 'holiday 2021', 'holiday 2022'])
const BLOCK_VALUES = new Set(hubRules.facets.blockValues)
const BLOCK_GROUPS = hubRules.facets.blockGroups

/** False for materials, power types, internal feed tags and values that restate the product's own category. */
function isShopperFacing(group: string, label: string, hub: string): boolean {
  const value = label.toLowerCase()
  if (/[\d_]/.test(label) || label.length > 32) return false
  if (BLOCK_VALUES.has(value)) return false
  if (BLOCK_GROUPS.some((g) => group.startsWith(g))) return false
  const slug = slugify(label)
  return slug !== hub && `${slug}s` !== hub && !hub.startsWith(`${slug}-`)
}
const FEEL_LABELS: Record<string, string> = {
  vagina: 'Vaginal Entry',
  anal: 'Anal Entry',
  butt: 'Anal Entry',
  mouth: 'Mouth Entry',
}

// Features shoppers filter by that LuxuryToyX only states in product titles.
const TITLE_FEATURES: [RegExp, string, string][] = [
  [/\bremote\b/i, 'remote-control', 'Remote Control'],
  [/rechargeable/i, 'rechargeable', 'Rechargeable'],
  [/waterproof|water-?resistant|submersible/i, 'waterproof', 'Waterproof'],
  [/thrust/i, 'thrusting', 'Thrusting'],
  [/warming|heat(ed|ing)/i, 'warming', 'Warming'],
  [/\b(quiet|whisper|silent)\b/i, 'quiet', 'Quiet'],
]

function unique(values: [string, string][]): [string, string][] {
  const seen = new Set<string>()
  return values.filter(([slug]) => !seen.has(slug) && Boolean(seen.add(slug)))
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

function titleCase(text: string): string {
  return text.replace(/\b([a-z])/g, (m) => m.toUpperCase())
}

/** Values a product carries for each facet, as [slug, label] pairs. */
function productFacetValues(p: CatalogProduct): Record<FilterKey, [string, string][]> {
  const types: [string, string][] = []
  const features: [string, string][] = []
  const audience: [string, string][] = []

  for (const raw of p.tags) {
    const tag = raw.trim()
    const lower = tag.toLowerCase()
    if (lower === 'male') audience.push(['men', 'Men'])
    else if (lower === 'female') audience.push(['women', 'Women'])
    else if (lower === 'app') features.push(['app-controlled', 'App-Controlled'])
    else if (lower === 'vibrating_yes') features.push(['vibrating', 'Vibrating'])
    else if (lower === 'celebrity') features.push(['celebrity', 'Celebrity Molded'])
    else if (lower === 'masturbation type_automatic') features.push(['automatic', 'Automatic'])

    const idx = tag.indexOf('_')
    if (idx <= 0) continue
    const group = tag.slice(0, idx).trim().toLowerCase()
    const value = tag.slice(idx + 1).trim()
    if (SKIP_GROUPS.has(group) || group.startsWith('other') || /^(yes|no)$/i.test(value)) continue
    // "Vibrators_Vibrator" and "Dildos_Dildo" just restate the category.
    if (group.replace(/s$/, '') === value.toLowerCase()) continue
    const label = group.includes('feel')
      ? FEEL_LABELS[value.toLowerCase()] ?? `${titleCase(value)} Entry`
      : titleCase(value)
    if (!isShopperFacing(group, label, p.hub)) continue
    types.push([slugify(label), label])
  }

  if (/\b(app|bluetooth)\b/i.test(p.title)) features.push(['app-controlled', 'App-Controlled'])
  for (const [re, slug, label] of TITLE_FEATURES) if (re.test(p.title)) features.push([slug, label])
  if (/couple/i.test(p.title) || p.hub === 'couples') audience.push(['couples', 'Couples'])

  const band = PRICE_BANDS.find((b) => p.price >= b.min && p.price < b.max)

  return {
    brand: p.brand ? [[slugify(p.brand), p.brand]] : [],
    type: unique(types),
    for: unique(audience),
    feature: unique(features),
    price: band ? [[band.id, band.label]] : [],
  }
}

const valueCache = new WeakMap<CatalogProduct, Record<FilterKey, [string, string][]>>()

function valuesFor(p: CatalogProduct) {
  let v = valueCache.get(p)
  if (!v) {
    v = productFacetValues(p)
    valueCache.set(p, v)
  }
  return v
}

function matches(p: CatalogProduct, filters: ListingFilters, skip?: FilterKey): boolean {
  const values = valuesFor(p)
  return FILTER_KEYS.every((key) => {
    if (key === skip) return true
    const wanted = filters[key]
    return !wanted || values[key].some(([slug]) => slug === wanted)
  })
}

export function toSummary(p: CatalogProduct): ProductSummary {
  return {
    handle: p.handle,
    title: p.title,
    brand: p.brand,
    hub: p.hub,
    price: p.price,
    compareAtPrice: p.compareAtPrice,
    available: p.available,
    image: p.images[0]?.src,
  }
}

const MIN_STYLE_COUNT = 3
const FACET_LIMITS: Record<FilterKey, number> = { brand: 24, type: 14, for: 3, feature: 10, price: 5 }

export function buildListing(source: CatalogProduct[], filters: ListingFilters, focus?: MerchFocus): ListingResult {
  const facets = {} as Facets
  for (const key of FILTER_KEYS) {
    // Counts reflect every other active filter, so options never lead to zero results.
    const counts = new Map<string, FacetOption>()
    for (const p of source) {
      if (!matches(p, filters, key)) continue
      for (const [value, label] of valuesFor(p)[key]) {
        const opt = counts.get(value)
        if (opt) opt.count++
        else counts.set(value, { value, label, count: 1 })
      }
    }
    let options = [...counts.values()]
    options =
      key === 'price'
        ? PRICE_BANDS.map((b) => counts.get(b.id)).filter((o): o is FacetOption => Boolean(o))
        : options
            // One-off style values are usually feed typos ("Neckless", "Chasity"); keep the selected one visible.
            .filter((o) => key !== 'type' || o.count >= MIN_STYLE_COUNT || filters.type === o.value)
            .sort((a, b) => b.count - a.count)
            .slice(0, FACET_LIMITS[key])
    facets[key] = options
  }

  const filtered = source.filter((p) => matches(p, filters))
  const sorted =
    filters.sort === 'price-asc'
      ? [...filtered].sort((a, b) => a.price - b.price)
      : filters.sort === 'price-desc'
        ? [...filtered].sort((a, b) => b.price - a.price)
        : merchandise(filtered, focus)

  const pageCount = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE))
  const page = Math.min(filters.page ?? 1, pageCount)
  return {
    products: sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE).map(toSummary),
    total: sorted.length,
    page,
    pageCount,
    facets,
  }
}
