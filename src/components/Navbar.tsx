import { useEffect, useState } from 'react'
import { Link, useRouterState } from '@tanstack/react-router'
import { MENU_PILLARS, PILLARS, type Pillar, type PillarLink } from '@/content/pillars'
import { SearchDialog } from '@/components/SearchDialog'
import { MobileTabBar } from '@/components/MobileTabBar'
import { Logo } from '@/components/Logo'
import { SITE } from '@/config/site'
import { cartCount, useCart } from '@/lib/cart'

/** Renders a nav link; templates like '/blog/topic/$topic' carry their params. */
function PLink({ link, className, onClick }: { link: PillarLink; className?: string; onClick?: () => void }) {
  return (
    <Link
      to={link.to as '/'}
      {...(link.params ? { params: link.params as never } : {})}
      {...(link.hash ? { hash: link.hash } : {})}
      className={className}
      onClick={onClick}
    >
      {link.label}
    </Link>
  )
}

const SearchIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" className="h-[1.15rem] w-[1.15rem]" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
    <circle cx="11" cy="11" r="6.5" />
    <path d="m16 16 4 4" />
  </svg>
)

const navLink = 'text-[0.8125rem] font-medium text-ink/80 hover:text-ink transition-colors'

function MenuColumn({ title, children, size = 'sm' }: { title: string; children: React.ReactNode; size?: 'sm' | 'lg' }) {
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

/** Dropdown for a navigation area: what it is, then its hubs and best guides. */
function PillarMenu({ pillar }: { pillar: Pillar }) {
  return (
    <div className="wrap pt-10 pb-14 grid grid-cols-[1.35fr_1fr_1fr] gap-10">
      <div className="rounded-3xl bg-blush p-8">
        <p className="eyebrow text-graphite">{pillar.name}</p>
        <p className="mt-3 font-display text-xl font-semibold tracking-[-0.02em] leading-snug">{pillar.blurb}</p>
        <PLink link={pillar.href} className="mt-6 more" />
      </div>
      {pillar.columns.map((col, i) => (
        <MenuColumn key={col.title} title={col.title} size={i === 0 && pillar.columns.length > 1 ? 'lg' : 'sm'}>
          {col.links.map((l) => (
            <li key={`${l.label}:${l.hash ?? ''}`}>
              <PLink link={l} className="hover:text-graphite transition-colors" />
            </li>
          ))}
        </MenuColumn>
      ))}
    </div>
  )
}

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openMenu, setOpenMenu] = useState<Pillar['slug'] | null>(null)
  const [searchOpen, setSearchOpen] = useState(false)
  const pathname = useRouterState({ select: (state) => state.location.pathname })
  const close = () => setMobileOpen(false)
  const cartItems = cartCount(useCart())

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
        setOpenMenu(null)
        setSearchOpen((open) => !open)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // The pointer stays over the menu after a click, so hover alone would keep it open over the new page.
  useEffect(() => {
    setOpenMenu(null)
    setSearchOpen(false)
    setMobileOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!openMenu) return
    const dismiss = () => setOpenMenu(null)
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') dismiss()
    }
    window.addEventListener('scroll', dismiss, { passive: true })
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('scroll', dismiss)
      window.removeEventListener('keydown', onKey)
    }
  }, [openMenu])

  return (
    <header className="sticky top-0 z-40">
      <div className="bg-plum text-canvas">
        <div className="wrap flex items-center justify-center sm:justify-between gap-6 min-h-9 py-1.5 text-xs">
          <p className="hidden sm:block text-canvas/80">{SITE.tagline}</p>
          <p className="text-center font-medium">
            <span className="max-sm:hidden">Independent publisher. </span>We may earn a commission.{' '}
            <Link to="/disclosure" className="whitespace-nowrap underline underline-offset-2">
              How We Make Money
            </Link>
          </p>
        </div>
      </div>

      <div className="bg-canvas/85 backdrop-blur-xl backdrop-saturate-150 border-b border-line">
        <div className="wrap grid grid-cols-[1fr_auto] lg:grid-cols-[1fr_auto_1fr] items-center h-14">
          <Link to="/" aria-label={`${SITE.name} home`} className="justify-self-start">
            <Logo alt="" className="h-10 w-auto lg:h-11" />
          </Link>

          <nav aria-label="Main" className="hidden lg:flex items-center gap-6 xl:gap-8 h-full">
            {PILLARS.map((pillar) =>
              pillar.columns.length === 0 ? (
                <PLink key={pillar.slug} link={pillar.href} className={`${navLink} h-full flex items-center`} />
              ) : (
                <div
                  key={pillar.slug}
                  className="h-full flex items-center"
                  onMouseEnter={() => setOpenMenu(pillar.slug)}
                  onMouseLeave={() => setOpenMenu(null)}
                  onFocus={() => setOpenMenu(pillar.slug)}
                  onBlur={(e) => {
                    if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setOpenMenu(null)
                  }}
                >
                  <PLink
                    link={{ ...pillar.href, label: pillar.label }}
                    className={`${navLink} h-full flex items-center ${openMenu === pillar.slug ? '!text-ink' : ''}`}
                  />
                  <div
                    onClick={(e) => {
                      if ((e.target as HTMLElement).closest('a')) setOpenMenu(null)
                    }}
                    className={`absolute left-0 right-0 top-full bg-canvas border-b border-line transition-[opacity,transform,visibility] duration-300 ease-out ${
                      openMenu === pillar.slug ? 'visible opacity-100 translate-y-0' : 'invisible opacity-0 -translate-y-1 pointer-events-none'
                    }`}
                  >
                    <PillarMenu pillar={pillar} />
                  </div>
                </div>
              ),
            )}
          </nav>

          <div className="justify-self-end flex items-center gap-6">
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
            {cartItems > 0 && (
              <Link to="/cart" className={`${navLink} ml-4 flex items-center`} aria-label={`Cart, ${cartItems} items`}>
                Cart ({cartItems})
              </Link>
            )}
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
            aria-label="Site menu"
            className="sheet-up absolute inset-x-0 bottom-0 max-h-[88vh] overflow-y-auto overscroll-contain rounded-t-[28px] bg-canvas"
          >
            <div className="sticky top-0 z-10 bg-canvas px-5 pb-3 pt-3">
              <span aria-hidden="true" className="mx-auto mb-3 block h-1 w-10 rounded-full bg-line" />
              <div className="flex items-center justify-between">
                <p className="font-display text-xl font-semibold tracking-[-0.02em]">Menu</p>
                <button type="button" onClick={close} className="press rounded-full bg-mist px-4 py-2 text-sm font-medium">
                  Close
                </button>
              </div>
            </div>
            <div className="px-5 pb-[calc(1.5rem+env(safe-area-inset-bottom))] pt-1">
              <ul className="space-y-2">
                <li>
                  <PLink
                    link={PILLARS[0].href}
                    onClick={close}
                    className="press flex h-[3.75rem] items-center justify-between rounded-2xl bg-mist px-5 text-[1.0625rem] font-semibold tracking-[-0.01em]"
                  />
                </li>
                {MENU_PILLARS.map((pillar) => (
                  <li key={pillar.slug}>
                    <details className="group rounded-2xl bg-mist">
                      <summary className="press flex h-[3.75rem] cursor-pointer list-none items-center justify-between px-5 text-[1.0625rem] font-semibold tracking-[-0.01em] [&::-webkit-details-marker]:hidden">
                        {pillar.label}
                        <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 text-graphite transition-transform group-open:rotate-90" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="m9 6 6 6-6 6" />
                        </svg>
                      </summary>
                      <ul className="flex flex-wrap gap-2 px-4 pb-4">
                        <li>
                          <PLink link={pillar.href} onClick={close} className="chip !min-h-[2.5rem] !bg-ink !border-ink text-canvas" />
                        </li>
                        {pillar.columns
                          .flatMap((col) => col.links)
                          .filter((l) => l.label !== pillar.href.label)
                          .map((l) => (
                            <li key={`${l.label}:${l.hash ?? ''}`}>
                              <PLink link={l} onClick={close} className="chip !min-h-[2.5rem] !bg-canvas" />
                            </li>
                          ))}
                      </ul>
                    </details>
                  </li>
                ))}
              </ul>
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
