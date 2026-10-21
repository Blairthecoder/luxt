import { useEffect, useState } from 'react'
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
  const [open, setOpen] = useState<FilterKey | null>(null)
  const pathname = useRouterState({ select: (st) => st.location.pathname })
  const unfiltered = active.length === 0

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])
  const collectionFor = (key: FilterKey, value: string) => {
    const slug = COLLECTION_FOR[key]?.[value]
    return unfiltered && slug && pathname !== `/shop/${slug}` ? slug : null
  }
  const facets = FACET_ORDER.filter((key) => {
    const options = result.facets[key]
    return options.length > 0 && !(options.length === 1 && !filters[key])
  })

  return (
    <div>
      <div className="sticky top-[5.75rem] z-20 -mx-[clamp(1.25rem,4vw,3rem)] px-[clamp(1.25rem,4vw,3rem)] bg-canvas/95 backdrop-blur-xl max-lg:backdrop-blur-none max-lg:bg-canvas border-y border-line">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-x-6 gap-y-2 py-3">
          <div className="flex items-center gap-2 overflow-x-auto [scrollbar-width:none] -mx-1 px-1">
            <span className="text-sm font-semibold pr-2 whitespace-nowrap">Filter</span>
            {facets.map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => setOpen(open === key ? null : key)}
                aria-expanded={open === key}
                aria-controls={`facet-${key}`}
                className={`chip press gap-2 max-lg:!min-h-[2.5rem] ${filters[key] && open !== key ? '!border-ink' : ''}`}
              >
                {FILTER_LABELS[key]}
                {filters[key] && <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-signal" />}
                <span
                  aria-hidden="true"
                  className={`block w-1.5 h-1.5 border-b-[1.5px] border-r-[1.5px] border-current transition-transform ${open === key ? '-rotate-[135deg] mt-1' : 'rotate-45 -mt-0.5'}`}
                />
              </button>
            ))}
          </div>
          <div className="flex items-center gap-5 overflow-x-auto [scrollbar-width:none]">
            <p className="text-sm text-graphite whitespace-nowrap">
              {result.total.toLocaleString()} {result.total === 1 ? 'Product' : 'Products'}
            </p>
            <span aria-hidden="true" className="h-4 w-px bg-line" />
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
                  className={`text-sm whitespace-nowrap transition-colors max-lg:py-2.5 ${
                    current ? 'text-ink font-medium underline underline-offset-[6px] decoration-[1.5px]' : 'text-graphite hover:text-ink'
                  }`}
                >
                  {s.label}
                </Link>
              )
            })}
          </div>
        </div>

        {open && (
          <button
            type="button"
            aria-label="Close filters"
            tabIndex={-1}
            onClick={() => setOpen(null)}
            className="lg:hidden fixed inset-0 z-[54] bg-ink/40 fade-in"
          />
        )}

        {/* Every panel stays in the HTML so its links are crawlable; only the open one shows. */}
        {facets.map((key) => (
          <div
            key={key}
            id={`facet-${key}`}
            role="region"
            aria-label={FILTER_LABELS[key]}
            className={`${open === key ? 'block' : 'hidden'} border-t border-line py-5 max-h-[50vh] overflow-y-auto max-lg:animate-[sheet-up_0.32s_cubic-bezier(0.22,1,0.36,1)_both] max-lg:fixed max-lg:inset-x-0 max-lg:bottom-0 max-lg:z-[55] max-lg:max-h-[78vh] max-lg:rounded-t-[28px] max-lg:border-0 max-lg:bg-canvas max-lg:px-5 max-lg:pb-[calc(1.5rem+env(safe-area-inset-bottom))] max-lg:pt-3`}
          >
            <div className="lg:hidden sticky top-0 -mx-5 -mt-3 mb-2 bg-canvas px-5 pb-3 pt-3">
              <span aria-hidden="true" className="mx-auto mb-3 block h-1 w-10 rounded-full bg-line" />
              <div className="flex items-center justify-between">
                <p className="font-display text-xl font-semibold tracking-[-0.02em]">{FILTER_LABELS[key]}</p>
                <button type="button" onClick={() => setOpen(null)} className="press rounded-full bg-mist px-4 py-2 text-sm font-medium">
                  Done
                </button>
              </div>
            </div>
            <ul className="grid max-lg:grid-cols-1 lg:grid-cols-5 gap-x-8 gap-y-2 max-lg:gap-y-0">
              {result.facets[key].map((opt) => {
                const selected = filters[key] === opt.value
                const collection = collectionFor(key, opt.value)
                const rowClass = `flex items-center justify-between gap-3 text-[0.9375rem] transition-colors max-lg:min-h-[3.25rem] max-lg:border-b max-lg:border-line ${
                  selected ? 'text-ink font-medium' : 'text-graphite hover:text-ink'
                }`
                const row = (
                  <>
                    <span className="flex items-center gap-2.5 min-w-0">
                      <span
                        aria-hidden="true"
                        className={`w-3.5 h-3.5 shrink-0 rounded-[3px] border ${selected ? 'bg-ink border-ink' : 'border-silver'}`}
                      />
                      <span className="truncate">{opt.label}</span>
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
                        onClick={() => setOpen(null)}
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
        ))}
      </div>

      <div className="pt-8 space-y-8 min-w-0">
        {active.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            {active.map((key) => {
              const label = result.facets[key].find((o) => o.value === filters[key])?.label ?? filters[key]
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
          <ProductGrid products={result.products} dense />
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
