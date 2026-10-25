import { Link, useRouterState } from '@tanstack/react-router'
import { hasShopifyProducts } from '@/content/retired'

const LINGERIE_LIVE = hasShopifyProducts('lingerie')

type Props = {
  shopOpen: boolean
  onShop: () => void
  onSearch: () => void
}

const base = 'press flex flex-1 flex-col items-center justify-end gap-1 pb-2 pt-2.5 text-xs font-medium'

function Icon({ children }: { children: React.ReactNode }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-[1.375rem] w-[1.375rem]" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      {children}
    </svg>
  )
}

/**
 * App-style bottom navigation for phones and small tablets. Desktop keeps the
 * header navigation, and product pages swap this bar for a sticky buy bar.
 */
export function MobileTabBar({ shopOpen, onShop, onSearch }: Props) {
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  if (pathname.startsWith('/products/')) return null

  const onHome = pathname === '/'
  const onMenu = shopOpen
  const onReviews = pathname.startsWith('/reviews')
  const onLingerie = pathname === '/category/lingerie'
  const onGuides = pathname.startsWith('/blog')
  const tone = (active: boolean) => (active ? 'text-ink' : 'text-graphite')

  return (
    <nav
      aria-label="App"
      className="lg:hidden fixed inset-x-0 bottom-0 z-[45] border-t border-line bg-canvas/92 backdrop-blur-xl pb-[env(safe-area-inset-bottom)]"
    >
      <div className="mx-auto flex max-w-xl items-end px-2">
        <Link to="/" aria-current={onHome ? 'page' : undefined} className={`${base} ${tone(onHome)}`}>
          <Icon>
            <path d="M4 11.5 12 5l8 6.5V19a1 1 0 0 1-1 1h-4.5v-5.5h-5V20H5a1 1 0 0 1-1-1v-7.5Z" />
          </Icon>
          Home
        </Link>

        <button type="button" onClick={onShop} aria-haspopup="dialog" aria-expanded={shopOpen} className={`${base} ${tone(onMenu)}`}>
          <Icon>
            <rect x="4" y="4" width="6.5" height="6.5" rx="1.5" />
            <rect x="13.5" y="4" width="6.5" height="6.5" rx="1.5" />
            <rect x="4" y="13.5" width="6.5" height="6.5" rx="1.5" />
            <rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.5" />
          </Icon>
          Menu
        </button>

        <div className="flex flex-1 justify-center">
          <button
            type="button"
            onClick={onSearch}
            aria-label="Search"
            className="press -mt-5 flex h-14 w-14 items-center justify-center rounded-full bg-ink text-canvas ring-[5px] ring-canvas"
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <circle cx="11" cy="11" r="6.5" />
              <path d="m16 16 4 4" />
            </svg>
          </button>
        </div>

        {LINGERIE_LIVE ? (
          <Link to="/category/$slug" params={{ slug: 'lingerie' }} aria-current={onLingerie ? 'page' : undefined} className={`${base} ${tone(onLingerie)}`}>
            <Icon>
              <path d="M12 6.5a1.75 1.75 0 1 1 1.75-1.75M12 6.5v1.5L3.5 15a1.2 1.2 0 0 0 .75 2.1h15.5a1.2 1.2 0 0 0 .75-2.1L12 8" />
            </Icon>
            Lingerie
          </Link>
        ) : (
          <Link to="/reviews" aria-current={onReviews ? 'page' : undefined} className={`${base} ${tone(onReviews)}`}>
            <Icon>
              <path d="m12 4 2.4 4.9 5.4.8-3.9 3.8.9 5.4L12 16.4l-4.8 2.5.9-5.4-3.9-3.8 5.4-.8L12 4Z" />
            </Icon>
            Reviews
          </Link>
        )}

        <Link to="/blog" aria-current={onGuides ? 'page' : undefined} className={`${base} ${tone(onGuides)}`}>
          <Icon>
            <path d="M5 5.5A2.5 2.5 0 0 1 7.5 3H19v15H7.5A2.5 2.5 0 0 0 5 20.5v-15ZM5 20.5A2.5 2.5 0 0 1 7.5 18H19v3H7.5" />
          </Icon>
          Guides
        </Link>
      </div>
    </nav>
  )
}
