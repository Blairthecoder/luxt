import { createServerFn } from '@tanstack/react-start'
import type { ProductSummary } from '@/lib/listing'

export interface SearchResults {
  q: string
  products: ProductSummary[]
  /** Products matching, before the display cap. */
  total: number
  guides: { slug: string; title: string; excerpt: string; readMinutes: number }[]
  collections: { slug: string; name: string }[]
  categories: { slug: string; name: string }[]
  terms: { slug: string; term: string; definition: string }[]
}

/** Longest query we search; anything beyond is ignored. */
export const MAX_QUERY_LENGTH = 80

export function parseSearchQuery(search: Record<string, unknown>): { q?: string } {
  const q = typeof search.q === 'string' ? search.q.trim().slice(0, MAX_QUERY_LENGTH) : ''
  return q ? { q } : {}
}

export const searchSiteFn = createServerFn({ method: 'GET' })
  .validator((q: string) => q)
  .handler(async ({ data: q }) => {
    const { searchSite } = await import('@/server/search')
    return searchSite(q)
  })
