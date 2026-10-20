import { useEffect, useState } from 'react'
import { Link } from '@tanstack/react-router'
import { HUBS } from '@/content/hubs'
import { COLLECTIONS } from '@/content/collections'
import { TOPICS } from '@/content/topics'
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

function SearchIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <circle cx="8.5" cy="8.5" r="5.5" />
      <path d="m13 13 4 4" />
    </svg>
  )
}

function SearchForm({ id, className = '', onSubmit }: { id: string; className?: string; onSubmit?: () => void }) {
  return (
    <form action="/search" method="get" role="search" onSubmit={onSubmit} className={`relative ${className}`}>
      <label htmlFor={id} className="sr-only">
        Search toys and guides
      </label>
      <input
        id={id}
        name="q"
        type="search"
        maxLength={80}
        autoComplete="off"
        placeholder="Search"
        className="w-full h-9 rounded-full bg-mist pl-4 pr-10 text-[0.8125rem] text-ink placeholder:text-graphite outline-none focus:ring-2 focus:ring-ink"
      />
      <button type="submit" aria-label="Search" className="absolute right-0 top-0 h-9 w-10 flex items-center justify-center text-graphite hover:text-ink">
        <SearchIcon />
      </button>
    </form>
  )
}

function Wordmark() {
  return (
    <span className="font-display text-[1.25rem] font-bold tracking-[-0.045em] text-ink leading-none">
      Nightstand<span className="text-graphite font-semibold"> Supply Co.</span>
    </span>
  )
}

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const close = () => setMobileOpen(false)

  useEffect(() => {
    document.documentElement.style.overflow = mobileOpen ? 'hidden' : ''
  }, [mobileOpen])

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
            <div className="group h-full flex items-center">
              <button type="button" className={`${navLink} h-full`} aria-haspopup="true">
                Shop All
              </button>
              <div className="invisible opacity-0 -translate-y-1 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:visible group-focus-within:opacity-100 group-focus-within:translate-y-0 transition-[opacity,transform,visibility] duration-300 ease-out absolute left-0 right-0 top-full bg-canvas border-b border-line">
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
            <SearchForm id="header-search" className="hidden lg:block w-44 xl:w-52" />
            <Link to="/search" aria-label="Search" className="lg:hidden w-8 h-8 -mr-3 flex items-center justify-center text-ink">
              <SearchIcon />
            </Link>
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden relative w-8 h-8 -mr-1.5"
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
              <span
                aria-hidden="true"
                className={`absolute left-1.5 right-1.5 h-[1.5px] bg-ink transition-transform duration-300 ${
                  mobileOpen ? 'top-1/2 rotate-45' : 'top-[11px]'
                }`}
              />
              <span
                aria-hidden="true"
                className={`absolute left-1.5 right-1.5 h-[1.5px] bg-ink transition-transform duration-300 ${
                  mobileOpen ? 'top-1/2 -rotate-45' : 'top-[19px]'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <nav
          id="mobile-menu"
          aria-label="Mobile"
          className="lg:hidden fixed inset-x-0 bottom-0 top-[5.75rem] bg-canvas overflow-y-auto"
        >
          <div className="wrap pt-6 pb-16 space-y-12">
            <SearchForm id="mobile-search" onSubmit={close} />
            <ul className="space-y-1 font-display text-[2rem] font-bold tracking-[-0.04em] leading-tight">
              {PRIMARY.map((item) => (
                <li key={item.slug} className="rise">
                  <Link to="/shop/$slug" params={{ slug: item.slug }} onClick={close}>
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="rise">
                <Link to="/gifts" onClick={close}>
                  Gifts
                </Link>
              </li>
              <li className="rise">
                <Link to="/blog" onClick={close}>
                  {SITE.guidesName}
                </Link>
              </li>
            </ul>
            <div className="grid grid-cols-2 gap-x-6 gap-y-10">
              <MenuColumn title="Categories">
                {HUBS.map((hub) => (
                  <li key={hub.slug}>
                    <Link to="/category/$slug" params={{ slug: hub.slug }} onClick={close}>
                      {hub.name}
                    </Link>
                  </li>
                ))}
              </MenuColumn>
              <MenuColumn title="By Style">
                {STYLES.map((c) => (
                  <li key={c.slug}>
                    <Link to="/shop/$slug" params={{ slug: c.slug }} onClick={close}>
                      {c.name}
                    </Link>
                  </li>
                ))}
              </MenuColumn>
              <MenuColumn title="Gifts & Couples">
                {GIFTS_AND_COUPLES.map((c) => (
                  <li key={c.slug}>
                    <Link to="/shop/$slug" params={{ slug: c.slug }} onClick={close}>
                      {c.name}
                    </Link>
                  </li>
                ))}
              </MenuColumn>
              <MenuColumn title="Guides by Topic">
                {TOPICS.map((t) => (
                  <li key={t.slug}>
                    <Link to="/blog/topic/$topic" params={{ topic: t.slug }} onClick={close}>
                      {t.name}
                    </Link>
                  </li>
                ))}
              </MenuColumn>
            </div>
          </div>
        </nav>
      )}
    </header>
  )
}
