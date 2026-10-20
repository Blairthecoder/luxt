import { useState } from 'react'
import { Link, useRouterState } from '@tanstack/react-router'
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

/**
 * Facet values that have their own indexable collection page. With no other
 * filter active, these link to /shop/<slug> instead of a noindex ?filter= view,
 * so the strongest internal-link slot on every listing feeds a ranking page.
 */
const COLLECTION_FOR: Partial<Record<FilterKey, Record<string, string>>> = {
  for: { women: 'sex-toys-for-women', men: 'sex-toys-for-men', couples: 'couples-sex-toys' },
  type: {
    rabbit: 'rabbit-vibrators',
    clitoral: 'clitoral-vibrators',
    'g-spot': 'g-spot-vibrators',
    bullet: 'bullet-vibrators',
    wand: 'wand-vibrators',
    realistic: 'realistic-dildos',
    'butt-plug': 'butt-plugs',
    'butt-plugs': 'butt-plugs',
    'anal-beads': 'anal-beads',
    'pocket-pussy': 'pocket-pussies',
  },
  feature: {
    'app-controlled': 'app-controlled-sex-toys',
    'remote-control': 'remote-control-vibrators',
    thrusting: 'thrusting-vibrators',
    automatic: 'automatic-strokers',
  },
  brand: { lelo: 'lelo', womanizer: 'womanizer', lovense: 'lovense', 'we-vibe': 'we-vibe', tenga: 'tenga', fleshlight: 'fleshlight' },
}

/** Product grid with facet filters, sorting and numbered pagination. */
export function ListingView({ result, filters }: { result: ListingResult; filters: ListingFilters }) {
  const active = FILTER_KEYS.filter((key) => filters[key])
  const [showFilters, setShowFilters] = useState(false)
  const pathname = useRouterState({ select: (st) => st.location.pathname })
  const unfiltered = active.length === 0
  const collectionFor = (key: FilterKey, value: string) => {
    const slug = COLLECTION_FOR[key]?.[value]
    return unfiltered && slug && pathname !== `/shop/${slug}` ? slug : null
  }

  return (
    <div>
      <div className="sticky top-[5.5rem] z-20 -mx-[clamp(1.25rem,4vw,3rem)] px-[clamp(1.25rem,4vw,3rem)] bg-canvas/90 backdrop-blur-xl border-b border-line">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-x-4 gap-y-2 py-3 sm:py-0 sm:h-14">
          <div className="flex items-center gap-6 whitespace-nowrap">
            <button
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              aria-expanded={showFilters}
              aria-controls="listing-filters"
              className="lg:hidden text-sm font-medium"
            >
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </button>
            <p className="text-sm text-graphite">
              {result.total.toLocaleString()} {result.total === 1 ? 'Product' : 'Products'}
            </p>
          </div>
          <div className="flex items-center gap-5 overflow-x-auto [scrollbar-width:none]">
            {SORTS.map((s) => {
              const current = (filters.sort ?? 'featured') === s.id
              return (
                <Link
                  key={s.id}
                  to="."
                  rel="nofollow"
                  search={(prev: ListingFilters) => ({
                    ...prev,
                    sort: s.id === 'featured' ? undefined : s.id,
                    page: undefined,
                  })}
                  className={`text-sm whitespace-nowrap transition-colors ${
                    current ? 'text-ink font-medium underline underline-offset-[6px] decoration-[1.5px]' : 'text-graphite hover:text-ink'
                  }`}
                >
                  {s.label}
                </Link>
              )
            })}
          </div>
        </div>
      </div>

      <div className="pt-8 grid lg:grid-cols-[220px_1fr] gap-10 lg:gap-12">
        <aside
          id="listing-filters"
          aria-label="Filters"
          className={`${showFilters ? 'block' : 'hidden'} lg:block lg:sticky lg:top-[9.5rem] lg:self-start lg:max-h-[calc(100vh-10.5rem)] lg:overflow-y-auto lg:pr-2`}
        >
          <div className="space-y-8">
            {FACET_ORDER.map((key) => {
              const options = result.facets[key]
              if (!options.length || (options.length === 1 && !filters[key])) return null
              return (
                <div key={key} className="border-b border-line pb-7 last:border-0">
                  <h2 className="font-sans text-[0.9375rem] font-semibold tracking-[-0.01em] mb-3">
                    {FILTER_LABELS[key]}
                  </h2>
                  <ul className="space-y-1.5">
                    {options.map((opt) => {
                      const selected = filters[key] === opt.value
                      const collection = collectionFor(key, opt.value)
                      const rowClass = `flex items-center justify-between gap-3 text-[0.9375rem] transition-colors ${
                        selected ? 'text-ink font-medium' : 'text-graphite hover:text-ink'
                      }`
                      const row = (
                        <>
                          <span className="flex items-center gap-2.5">
                            <span
                              aria-hidden="true"
                              className={`w-3.5 h-3.5 shrink-0 border ${selected ? 'bg-ink border-ink' : 'border-silver'}`}
                            />
                            {opt.label}
                          </span>
                          <span className="text-xs text-silver tabular-nums">{opt.count}</span>
                        </>
                      )
                      return (
                        <li key={opt.value}>
                          {collection ? (
                            <Link to="/shop/$slug" params={{ slug: collection }} className={rowClass}>
                              {row}
                            </Link>
                          ) : (
                          <Link
                            to="."
                            rel="nofollow"
                            search={(prev: ListingFilters) => ({
                              ...prev,
                              [key]: selected ? undefined : opt.value,
                              page: undefined,
                            })}
                            className={rowClass}
                          >
                            {row}
                          </Link>
                          )}
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
                    className="inline-flex items-center gap-2 text-sm bg-mist rounded-full px-4 h-9 hover:bg-line transition-colors"
                  >
                    {label} <span className="text-graphite" aria-label="Remove">×</span>
                  </Link>
                )
              })}
              <Link to="." search={{}} className="text-sm text-graphite underline underline-offset-4 hover:text-ink ml-2">
                Clear All
              </Link>
            </div>
          )}

          {result.products.length === 0 ? (
            <p className="text-graphite py-16 lede">Nothing matches those filters yet. Try removing one.</p>
          ) : (
            <ProductGrid products={result.products} />
          )}

          {result.pageCount > 1 && <Pagination page={result.page} pageCount={result.pageCount} />}
        </div>
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
    <nav aria-label="Pagination" className="flex items-center justify-center gap-1 pt-12">
      {page > 1 && (
        <Link to="." search={to(page - 1)} rel="prev" className="text-sm font-medium px-4 py-2 hover:underline underline-offset-4">
          Previous
        </Link>
      )}
      {pageWindow(page, pageCount).map((p, i) =>
        p === null ? (
          <span key={`gap-${i}`} className="px-2 text-silver">
            …
          </span>
        ) : (
          <Link
            key={p}
            to="."
            search={to(p)}
            aria-current={p === page ? 'page' : undefined}
            className={`w-10 h-10 inline-flex items-center justify-center rounded-full text-sm tabular-nums transition-colors ${
              p === page ? 'bg-ink text-canvas' : 'text-graphite hover:bg-mist hover:text-ink'
            }`}
          >
            {p}
          </Link>
        )
      )}
      {page < pageCount && (
        <Link to="." search={to(page + 1)} rel="next" className="text-sm font-medium px-4 py-2 hover:underline underline-offset-4">
          Next
        </Link>
      )}
    </nav>
  )
}
