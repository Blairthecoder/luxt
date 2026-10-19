import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { ProductGrid } from '@/components/ProductCard'
import {
  FILTER_KEYS,
  FILTER_LABELS,
  SORTS,
  type FilterKey,
  type ListingFilters,
  type ListingResult,
} from '@/lib/listing'

const FACET_ORDER: FilterKey[] = ['for', 'type', 'feature', 'price', 'brand']

/** Product grid with facet filters, sorting and numbered pagination. */
export function ListingView({ result, filters }: { result: ListingResult; filters: ListingFilters }) {
  const active = FILTER_KEYS.filter((key) => filters[key])
  const [showFilters, setShowFilters] = useState(false)

  return (
    <div className="grid lg:grid-cols-[240px_1fr] gap-10 lg:gap-14">
      <aside aria-label="Filters" className="lg:sticky lg:top-28 lg:self-start">
        <button
          type="button"
          onClick={() => setShowFilters(!showFilters)}
          aria-expanded={showFilters}
          className="eyebrow text-ivory w-full flex items-center justify-between border-b border-line pb-3 lg:pointer-events-none"
        >
          Refine
          <span className="lg:hidden text-gold">{showFilters ? 'Hide' : 'Show'}</span>
        </button>
        <div className={`pt-6 space-y-8 ${showFilters ? 'block' : 'hidden'} lg:block`}>
            {FACET_ORDER.map((key) => {
              const options = result.facets[key]
              if (!options.length || (options.length === 1 && !filters[key])) return null
              return (
                <div key={key}>
                  <h2 className="eyebrow text-gold-deep mb-3">{FILTER_LABELS[key]}</h2>
                  <ul className="space-y-2 max-h-64 overflow-y-auto pr-2">
                    {options.map((opt) => {
                      const selected = filters[key] === opt.value
                      return (
                        <li key={opt.value}>
                          <Link
                            to="."
                            search={(prev: ListingFilters) => ({
                              ...prev,
                              [key]: selected ? undefined : opt.value,
                              page: undefined,
                            })}
                            className={`flex items-baseline justify-between gap-3 text-sm transition-colors ${
                              selected ? 'text-gold' : 'text-muted hover:text-ivory'
                            }`}
                          >
                            <span>
                              {selected && <span aria-hidden="true">— </span>}
                              {opt.label}
                            </span>
                            <span className="text-xs text-faint">{opt.count}</span>
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              )
            })}
        </div>
      </aside>

      <div className="space-y-8 min-w-0">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-4">
          <p className="eyebrow text-muted">
            {result.total.toLocaleString()} {result.total === 1 ? 'Product' : 'Products'}
          </p>
          <div className="flex items-center gap-5">
            {SORTS.map((s) => {
              const current = (filters.sort ?? 'featured') === s.id
              return (
                <Link
                  key={s.id}
                  to="."
                  search={(prev: ListingFilters) => ({
                    ...prev,
                    sort: s.id === 'featured' ? undefined : s.id,
                    page: undefined,
                  })}
                  className={`eyebrow transition-colors ${current ? 'text-gold' : 'text-faint hover:text-ivory'}`}
                >
                  {s.label}
                </Link>
              )
            })}
          </div>
        </div>

        {active.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            {active.map((key) => {
              const label =
                result.facets[key].find((o) => o.value === filters[key])?.label ?? filters[key]
              return (
                <Link
                  key={key}
                  to="."
                  search={(prev: ListingFilters) => ({ ...prev, [key]: undefined, page: undefined })}
                  className="text-xs border border-line px-3 py-1.5 text-ivory hover:border-gold"
                >
                  {label} <span className="text-faint">×</span>
                </Link>
              )
            })}
            <Link to="." search={{}} className="eyebrow text-faint hover:text-gold ml-2">
              Clear All
            </Link>
          </div>
        )}

        {result.products.length === 0 ? (
          <p className="text-muted py-16">Nothing matches those filters yet. Try removing one.</p>
        ) : (
          <ProductGrid products={result.products} />
        )}

        {result.pageCount > 1 && <Pagination page={result.page} pageCount={result.pageCount} />}
      </div>
    </div>
  )
}

function pageWindow(page: number, pageCount: number): (number | null)[] {
  const pages = new Set([1, pageCount, page - 1, page, page + 1])
  const sorted = [...pages].filter((p) => p >= 1 && p <= pageCount).sort((a, b) => a - b)
  const out: (number | null)[] = []
  sorted.forEach((p, i) => {
    if (i > 0 && p - sorted[i - 1] > 1) out.push(null)
    out.push(p)
  })
  return out
}

function Pagination({ page, pageCount }: { page: number; pageCount: number }) {
  const to = (p: number) => (prev: ListingFilters) => ({ ...prev, page: p > 1 ? p : undefined })
  return (
    <nav aria-label="Pagination" className="flex items-center justify-center gap-1 pt-6">
      {page > 1 && (
        <Link to="." search={to(page - 1)} rel="prev" className="eyebrow px-3 py-2 text-muted hover:text-gold">
          Previous
        </Link>
      )}
      {pageWindow(page, pageCount).map((p, i) =>
        p === null ? (
          <span key={`gap-${i}`} className="px-2 text-faint">
            …
          </span>
        ) : (
          <Link
            key={p}
            to="."
            search={to(p)}
            aria-current={p === page ? 'page' : undefined}
            className={`min-w-10 text-center px-3 py-2 text-sm border ${
              p === page ? 'border-gold text-gold' : 'border-transparent text-muted hover:text-ivory'
            }`}
          >
            {p}
          </Link>
        )
      )}
      {page < pageCount && (
        <Link to="." search={to(page + 1)} rel="next" className="eyebrow px-3 py-2 text-muted hover:text-gold">
          Next
        </Link>
      )}
    </nav>
  )
}
