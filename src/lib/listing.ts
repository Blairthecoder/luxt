import type { CatalogProduct } from '@/types/catalog'

export const PAGE_SIZE = 48

export const PRICE_BANDS = [
  { id: 'under-25', label: 'Under $25', min: 0, max: 25 },
  { id: '25-50', label: '$25 to $50', min: 25, max: 50 },
  { id: '50-100', label: '$50 to $100', min: 50, max: 100 },
  { id: '100-200', label: '$100 to $200', min: 100, max: 200 },
  { id: '200-plus', label: '$200 and Up', min: 200, max: Infinity },
] as const

export const SORTS = [
  { id: 'featured', label: 'Featured' },
  { id: 'price-asc', label: 'Price: Low to High' },
  { id: 'price-desc', label: 'Price: High to Low' },
] as const

export type SortId = (typeof SORTS)[number]['id']

/** Filters a shopper can apply on a listing page. All optional. */
export interface ListingFilters {
  page?: number
  brand?: string
  type?: string
  for?: string
  feature?: string
  price?: string
  sort?: SortId
}

export const FILTER_KEYS = ['brand', 'type', 'for', 'feature', 'price'] as const
export type FilterKey = (typeof FILTER_KEYS)[number]

export const FILTER_LABELS: Record<FilterKey, string> = {
  for: 'Designed For',
  type: 'Style',
  feature: 'Features',
  price: 'Price',
  brand: 'Brand',
}

export interface FacetOption {
  value: string
  label: string
  count: number
}

export type Facets = Record<FilterKey, FacetOption[]>

/** Card-sized product data for grids. */
export type ProductSummary = Pick<
  CatalogProduct,
  'handle' | 'title' | 'brand' | 'hub' | 'price' | 'compareAtPrice' | 'available'
> & { image?: string }

export interface ListingResult {
  products: ProductSummary[]
  total: number
  page: number
  pageCount: number
  facets: Facets
}

export function parseListingSearch(search: Record<string, unknown>): ListingFilters {
  const str = (v: unknown) => (typeof v === 'string' && v.length > 0 && v.length < 80 ? v : undefined)
  const page = Number(search.page)
  const sort = SORTS.some((s) => s.id === search.sort) ? (search.sort as SortId) : undefined
  return {
    page: Number.isInteger(page) && page > 1 ? page : undefined,
    brand: str(search.brand),
    type: str(search.type),
    for: str(search.for),
    feature: str(search.feature),
    price: str(search.price),
    sort,
  }
}

export function hasActiveFilters(filters: ListingFilters): boolean {
  return FILTER_KEYS.some((key) => filters[key]) || Boolean(filters.sort)
}
