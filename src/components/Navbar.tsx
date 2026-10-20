import { useEffect, useState } from 'react'
import { Link, useRouterState } from '@tanstack/react-router'
import { HUBS } from '@/content/hubs'
import { COLLECTIONS } from '@/content/collections'
import { TOPICS } from '@/content/topics'
import { SearchDialog } from '@/components/SearchDialog'
import { MobileTabBar } from '@/components/MobileTabBar'
import { Logo } from '@/components/Logo'
import { SITE } from '@/config/site'

const PRIMARY = [
  { label: 'For Her', slug: 'sex-toys-for-women' },
  { label: 'For Him', slug: 'sex-toys-for-men' },
  { label: 'For Couples', slug: 'couples-sex-toys' },
] as const

const STYLES = COLLECTIONS.filter((c) => c.group === 'By Style')
const BRANDS = COLLECTIONS.filter((c) => c.group === 'By Brand')
const BUDGET = COLLECTIONS.filter((c) => c.group === 'By Budget')
const GIFTS_AND_COUPLES = [
  ...COLLECTIONS.filter((c) => c.group === 'Gift Ideas'),
  ...COLLECTIONS.filter((c) => c.group === 'For Couples'),
]

const SHEET_LINKS = [
  { label: 'For Her', to: '/shop/$slug', params: { slug: 'sex-toys-for-women' } },
  { label: 'For Him', to: '/shop/$slug', params: { slug: 'sex-toys-for-men' } },
  { label: 'For Couples', to: '/shop/$slug', params: { slug: 'couples-sex-toys' } },
  { label: 'Gifts', to: '/gifts' },
  { label: SITE.guidesName, to: '/blog' },
] as const

const SearchIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" className="h-[1.15rem] w-[1.15rem]" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
    <circle cx="11" cy="11" r="6.5" />
    <path d="m16 16 4 4" />
  </svg>
)

const navLink = 'text-[0.8125rem] font-medium text-ink/80 hover:text-ink transition-colors'

function MenuColumn({
  title,
  children,
  size = 'sm',
}: {
  title: string
  children: React.ReactNode
  size?: 'sm' | 'lg'
}) {
  return (
    <div>
      <p className="text-xs font-medium text-graphite mb-4">{title}</p>
      <ul
        className={
          size === 'lg'
            ? 'space-y-1.5 font-display text-xl font-semibold tracking-[-0.02em] text-ink'
            : 'space-y-2.5 text-[0.8125rem] font-medium text-ink/75'
        }
      >
        {children}
      </ul>
    </div>
  )
}

function Wordmark() {
  return <Logo alt="" className="h-10 w-auto lg:h-11" />
}

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [shopOpen, setShopOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const pathname = useRouterState({ select: (state) => state.location.pathname })
  const close = () => setMobileOpen(false)

  useEffect(() => {
    document.documentElement.style.overflow = mobileOpen || searchOpen ? 'hidden' : ''
  }, [mobileOpen, searchOpen])

  // Search fields elsewhere on the page ask the header to open the dialog.
  useEffect(() => {
    const open = () => {
      setMobileOpen(false)
      setSearchOpen(true)
    }
    window.addEventListener('open-search', open)
    return () => window.removeEventListener('open-search', open)
  }, [])

  useEffect(() => {
    if (!mobileOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [mobileOpen])

  // Cmd+K (Mac) or Ctrl+K opens search from anywhere on the site.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setMobileOpen(false)
        setShopOpen(false)
        setSearchOpen((open) => !open)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // The pointer stays over the menu after a click, so hover alone would keep it open over the new page.
  useEffect(() => {
    setShopOpen(false)
    setSearchOpen(false)
    setMobileOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!shopOpen) return
    const dismiss = () => setShopOpen(false)
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') dismiss()
    }
    window.addEventListener('scroll', dismiss, { passive: true })
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('scroll', dismiss)
      window.removeEventListener('keydown', onKey)
    }
  }, [shopOpen])

  return (
    <header className="sticky top-0 z-40">
      <div className="bg-plum text-canvas">
        <div className="wrap flex items-center justify-center sm:justify-between gap-6 h-9 text-xs">
          <p className="hidden sm:block text-canvas/70">Discreet shipping from our trusted retail partner</p>
          <p className="font-medium">
            Good first toys from under $50.{' '}
            <Link to="/shop/$slug" params={{ slug: 'sex-toys-under-50' }} className="underline underline-offset-2">
              Shop Now
            </Link>
          </p>
          <p className="hidden lg:block text-canvas/70">Body-safe picks. Honest guides.</p>
        </div>
      </div>

      <div className="bg-canvas/85 backdrop-blur-xl backdrop-saturate-150 border-b border-line">
        <div className="wrap grid grid-cols-[1fr_auto] lg:grid-cols-[1fr_auto_1fr] items-center h-14">
          <Link to="/" aria-label={`${SITE.name} home`} className="justify-self-start">
            <Wordmark />
          </Link>

          <nav aria-label="Main" className="hidden lg:flex items-center gap-9 h-full">
            {PRIMARY.map((item) => (
              <Link key={item.slug} to="/shop/$slug" params={{ slug: item.slug }} className={navLink}>
                {item.label}
              </Link>
            ))}
            <div
              className="h-full flex items-center"
              onMouseEnter={() => setShopOpen(true)}
              onMouseLeave={() => setShopOpen(false)}
              onFocus={() => setShopOpen(true)}
              onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setShopOpen(false)
              }}
            >
              <button
                type="button"
                className={`${navLink} h-full`}
                aria-haspopup="true"
                aria-expanded={shopOpen}
                onClick={() => setShopOpen(true)}
              >
                Shop All
              </button>
              <div
                onClick={(e) => {
                  if ((e.target as HTMLElement).closest('a')) setShopOpen(false)
                }}
                className={`absolute left-0 right-0 top-full bg-canvas border-b border-line transition-[opacity,transform,visibility] duration-300 ease-out ${
                  shopOpen ? 'visible opacity-100 translate-y-0' : 'invisible opacity-0 -translate-y-1 pointer-events-none'
                }`}
              >
                <div className="wrap pt-10 pb-14 grid grid-cols-[1.35fr_1fr_1fr_1fr_1fr] gap-10">
                  <MenuColumn title="Categories" size="lg">
                    {HUBS.map((hub) => (
                      <li key={hub.slug}>
                        <Link to="/category/$slug" params={{ slug: hub.slug }} className="hover:text-graphite transition-colors">
                          {hub.name}
                        </Link>
                      </li>
                    ))}
                  </MenuColumn>
                  <MenuColumn title="By Style">
                    {STYLES.map((c) => (
                      <li key={c.slug}>
                        <Link to="/shop/$slug" params={{ slug: c.slug }} className="hover:text-ink">
                          {c.name}
                        </Link>
                      </li>
                    ))}
                  </MenuColumn>
                  <MenuColumn title="Gifts & Couples">
                    <li>
                      <Link to="/gifts" className="text-ink font-semibold hover:underline underline-offset-4">
                        The Gift Shop
                      </Link>
                    </li>
                    {GIFTS_AND_COUPLES.map((c) => (
                      <li key={c.slug}>
                        <Link to="/shop/$slug" params={{ slug: c.slug }} className="hover:text-ink">
                          {c.name}
                        </Link>
                      </li>
                    ))}
                  </MenuColumn>
                  <MenuColumn title="Featured Brands">
                    {BRANDS.map((c) => (
                      <li key={c.slug}>
                        <Link to="/shop/$slug" params={{ slug: c.slug }} className="hover:text-ink">
                          {c.name}
                        </Link>
                      </li>
                    ))}
                  </MenuColumn>
                  <div className="space-y-10">
                    <MenuColumn title="By Budget">
                      {BUDGET.map((c) => (
                        <li key={c.slug}>
                          <Link to="/shop/$slug" params={{ slug: c.slug }} className="hover:text-ink">
                            {c.name}
                          </Link>
                        </li>
                      ))}
                    </MenuColumn>
                    <MenuColumn title="Guides by Topic">
                      {TOPICS.map((t) => (
                        <li key={t.slug}>
                          <Link to="/blog/topic/$topic" params={{ topic: t.slug }} className="hover:text-ink">
                            {t.name}
                          </Link>
                        </li>
                      ))}
                    </MenuColumn>
                  </div>
                </div>
              </div>
            </div>
            <Link to="/gifts" className={navLink}>
              Gifts
            </Link>
          </nav>

          <div className="justify-self-end flex items-center gap-6">
            <Link to="/blog" className={`hidden lg:inline ${navLink}`}>
              {SITE.guidesName}
            </Link>
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false)
                setSearchOpen(true)
              }}
              className={`${navLink} hidden lg:flex items-center gap-2`}
              aria-label="Search"
              aria-keyshortcuts="Control+K Meta+K"
            >
              <SearchIcon />
              <span>Search</span>
              <kbd className="rounded border border-line px-1.5 py-0.5 text-[0.6875rem] font-sans text-graphite">⌘K</kbd>
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false)
                setSearchOpen(true)
              }}
              className="press lg:hidden -mr-2 flex h-10 w-10 items-center justify-center text-ink"
              aria-label="Search"
            >
              <SearchIcon />
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-[55]">
          <button type="button" aria-label="Close menu" tabIndex={-1} className="absolute inset-0 bg-ink/40 fade-in" onClick={close} />
          <nav
            id="mobile-menu"
            aria-label="Shop menu"
            className="sheet-up absolute inset-x-0 bottom-0 max-h-[88vh] overflow-y-auto overscroll-contain rounded-t-[28px] bg-canvas"
          >
            <div className="sticky top-0 z-10 bg-canvas px-5 pb-3 pt-3">
              <span aria-hidden="true" className="mx-auto mb-3 block h-1 w-10 rounded-full bg-line" />
              <div className="flex items-center justify-between">
                <p className="font-display text-xl font-semibold tracking-[-0.02em]">Shop</p>
                <button type="button" onClick={close} className="press rounded-full bg-mist px-4 py-2 text-sm font-medium">
                  Close
                </button>
              </div>
            </div>
          <div className="px-5 pb-[calc(1.5rem+env(safe-area-inset-bottom))] pt-1">
            <ul className="space-y-2">
              {SHEET_LINKS.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    {...('params' in item ? { params: item.params } : {})}
                    onClick={close}
                    className="press flex h-[3.75rem] items-center justify-between rounded-2xl bg-mist px-5 text-[1.0625rem] font-semibold tracking-[-0.01em]"
                  >
                    {item.label}
                    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 text-graphite" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m9 6 6 6-6 6" />
                    </svg>
                  </Link>
                </li>
              ))}
            </ul>
            <details className="group mt-3 rounded-2xl border border-line">
              <summary className="flex h-14 cursor-pointer list-none items-center justify-between px-5 text-[0.9375rem] font-medium [&::-webkit-details-marker]:hidden">
                All Categories
                <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 text-graphite transition-transform group-open:rotate-90" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m9 6 6 6-6 6" />
                </svg>
              </summary>
              <ul className="flex flex-wrap gap-2 px-4 pb-4">
                {HUBS.map((hub) => (
                  <li key={hub.slug}>
                    <Link to="/category/$slug" params={{ slug: hub.slug }} onClick={close} className="chip !min-h-[2.5rem]">
                      {hub.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </details>
          </div>
          </nav>
        </div>
      )}
      <MobileTabBar
        shopOpen={mobileOpen}
        onShop={() => {
          setSearchOpen(false)
          setMobileOpen((open) => !open)
        }}
        onSearch={() => {
          setMobileOpen(false)
          setSearchOpen(true)
        }}
      />
      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  )
}
