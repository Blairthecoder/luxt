import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { searchCatalog } from '@/lib/catalog'
import { COLLECTIONS } from '@/content/collections'
import { formatPrice } from '@/lib/format'
import { getOptimizedImageUrl } from '@/lib/image'
import type { SearchResults } from '@/server/search'

type Row =
  | { kind: 'product'; key: string; label: string; note: string; image?: string; sale?: boolean; handle: string }
  | { kind: 'hub' | 'collection' | 'guide'; key: string; label: string; note: string; slug: string }

const EMPTY: SearchResults = { products: [], hubs: [], collections: [], guides: [] }
const BRANDS = COLLECTIONS.filter((c) => c.group === 'By Brand')

function rowsFrom(results: SearchResults): Row[] {
  return [
    ...results.products.map(
      (p): Row => ({
        kind: 'product',
        key: `p:${p.handle}`,
        handle: p.handle,
        label: p.title,
        note: `${p.brand} · ${formatPrice(p.price)}${p.available ? '' : ' · Sold out'}`,
        image: p.image,
        sale: !!p.compareAtPrice && p.compareAtPrice > p.price,
      })
    ),
    ...results.hubs.map((h): Row => ({ kind: 'hub', key: `h:${h.slug}`, slug: h.slug, label: h.name, note: 'Category' })),
    ...results.collections.map((c): Row => ({ kind: 'collection', key: `c:${c.slug}`, slug: c.slug, label: c.name, note: c.note ?? 'Collection' })),
    ...results.guides.map((g): Row => ({ kind: 'guide', key: `g:${g.slug}`, slug: g.slug, label: g.name, note: `Guide · ${g.note ?? ''}`.replace(/ · $/, '') })),
  ]
}

export function SearchDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const navigate = useNavigate()
  const inputRef = useRef<HTMLInputElement>(null)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResults>(EMPTY)
  const [active, setActive] = useState(0)
  const [loading, setLoading] = useState(false)
  const rows = useMemo(() => rowsFrom(results), [results])
  const trimmed = query.trim()

  useEffect(() => {
    if (!open) return
    setQuery('')
    setResults(EMPTY)
    setActive(0)
    const id = window.setTimeout(() => inputRef.current?.focus(), 30)
    return () => window.clearTimeout(id)
  }, [open])

  useEffect(() => {
    if (!open) return
    if (trimmed.length < 2) {
      setResults(EMPTY)
      setLoading(false)
      return
    }
    let cancelled = false
    setLoading(true)
    const id = window.setTimeout(async () => {
      try {
        const next = await searchCatalog({ data: trimmed })
        if (!cancelled) {
          setResults(next)
          setActive(0)
        }
      } catch {
        if (!cancelled) setResults(EMPTY)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }, 160)
    return () => {
      cancelled = true
      window.clearTimeout(id)
    }
  }, [trimmed, open])

  if (!open) return null

  const go = (row: Row) => {
    onClose()
    if (row.kind === 'product') void navigate({ to: '/products/$productId', params: { productId: row.handle } })
    else if (row.kind === 'hub') void navigate({ to: '/category/$slug', params: { slug: row.slug } })
    else if (row.kind === 'collection') void navigate({ to: '/shop/$slug', params: { slug: row.slug } })
    else void navigate({ to: '/blog/$slug', params: { slug: row.slug } })
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault()
      onClose()
    } else if (e.key === 'ArrowDown' && rows.length) {
      e.preventDefault()
      setActive((i) => (i + 1) % rows.length)
    } else if (e.key === 'ArrowUp' && rows.length) {
      e.preventDefault()
      setActive((i) => (i - 1 + rows.length) % rows.length)
    } else if (e.key === 'Enter' && rows[active]) {
      e.preventDefault()
      go(rows[active])
    }
  }

  const sections: { title: string; kinds: Row['kind'][] }[] = [
    { title: 'Products', kinds: ['product'] },
    { title: 'Categories and Collections', kinds: ['hub', 'collection'] },
    { title: 'Guides', kinds: ['guide'] },
  ]

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center px-3 pt-[8vh] sm:pt-[12vh]" onKeyDown={onKeyDown}>
      <button type="button" aria-label="Close search" tabIndex={-1} className="absolute inset-0 bg-ink/40 backdrop-blur-sm" onClick={onClose} />
      <div role="dialog" aria-modal="true" aria-label="Search" className="relative w-full max-w-2xl overflow-hidden rounded-2xl bg-canvas border border-line">
        <div className="flex items-center gap-3 border-b border-line px-4">
          <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 shrink-0 text-graphite" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
            <circle cx="11" cy="11" r="6.5" />
            <path d="m16 16 4 4" />
          </svg>
          <input
            ref={inputRef}
            type="search"
            role="combobox"
            aria-expanded={rows.length > 0}
            aria-controls="search-results"
            aria-activedescendant={rows[active] ? `search-row-${active}` : undefined}
            aria-autocomplete="list"
            autoComplete="off"
            spellCheck={false}
            enterKeyHint="search"
            placeholder="Search toys, brands and guides"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{ outline: 'none' }}
            className="h-14 w-full bg-transparent text-base placeholder:text-graphite/70 [&::-webkit-search-cancel-button]:hidden"
          />
          <button type="button" onClick={onClose} className="shrink-0 rounded-md border border-line px-2 py-1 text-xs text-graphite hover:text-ink">
            Esc
          </button>
        </div>

        <div id="search-results" role="listbox" aria-label="Search results" className="max-h-[60vh] overflow-y-auto p-2">
          {trimmed.length < 2 && (
            <div className="p-3">
              <p className="text-xs font-medium text-graphite">Popular Brands</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {BRANDS.map((brand) => (
                  <li key={brand.slug}>
                    <button
                      type="button"
                      className="chip"
                      onClick={() => {
                        onClose()
                        void navigate({ to: '/shop/$slug', params: { slug: brand.slug } })
                      }}
                    >
                      {brand.name}
                    </button>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-xs text-graphite">Try “wand”, “waterproof”, “couples” or a brand name.</p>
            </div>
          )}

          {trimmed.length >= 2 && !loading && rows.length === 0 && (
            <p className="p-4 text-sm text-graphite">Nothing found for “{trimmed}”. Try a brand, a style or a shorter word.</p>
          )}

          {sections.map((section) => {
            const items = rows.map((row, index) => ({ row, index })).filter(({ row }) => section.kinds.includes(row.kind))
            if (!items.length) return null
            return (
              <div key={section.title} className="py-1">
                <p className="px-3 pb-1 pt-2 text-xs font-medium text-graphite">{section.title}</p>
                <ul>
                  {items.map(({ row, index }) => (
                    <li key={row.key} role="presentation">
                      <button
                        type="button"
                        id={`search-row-${index}`}
                        role="option"
                        aria-selected={index === active}
                        onMouseEnter={() => setActive(index)}
                        onClick={() => go(row)}
                        className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left ${index === active ? 'bg-mist' : ''}`}
                      >
                        {row.kind === 'product' && (
                          <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-mist">
                            {row.image && (
                              <img
                                src={getOptimizedImageUrl(row.image, 96)}
                                alt=""
                                width={96}
                                height={96}
                                loading="lazy"
                                className="absolute inset-0 h-full w-full object-contain p-1 mix-blend-multiply"
                              />
                            )}
                          </span>
                        )}
                        <span className="min-w-0">
                          <span className="block truncate text-sm font-medium">{row.label}</span>
                          <span className="block truncate text-xs text-graphite">
                            {row.note}
                            {row.kind === 'product' && row.sale ? ' · On sale' : ''}
                          </span>
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
