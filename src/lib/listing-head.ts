import { hasActiveFilters, type ListingFilters } from '@/lib/listing'

/**
 * Canonical path and index rules for a paginated, filterable listing:
 * - filtered or sorted views: noindex, canonical to the clean listing
 * - pages 2-3: indexable, self-canonical with ?page=N
 * - page 4+: self-canonical but noindex, follow, so deep thin pages don't dilute the listing
 */
const MAX_INDEXED_PAGE = 3

export function listingIndexing(basePath: string, filters: ListingFilters, total: number) {
  if (hasActiveFilters(filters)) return { path: basePath, noindex: true }
  const page = filters.page ?? 1
  return {
    path: page > 1 ? `${basePath}?page=${page}` : basePath,
    noindex: total === 0 || page > MAX_INDEXED_PAGE,
  }
}
