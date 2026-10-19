import { hasActiveFilters, type ListingFilters } from '@/lib/listing'

/**
 * Canonical path and index rules for a paginated, filterable listing:
 * - filtered or sorted views: noindex, canonical to the clean listing
 * - page 2+: indexable, self-canonical with ?page=N
 */
export function listingIndexing(basePath: string, filters: ListingFilters, total: number) {
  if (hasActiveFilters(filters)) return { path: basePath, noindex: true }
  const page = filters.page ?? 1
  return {
    path: page > 1 ? `${basePath}?page=${page}` : basePath,
    noindex: total === 0,
  }
}
