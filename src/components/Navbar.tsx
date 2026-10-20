import { useState } from 'react'
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

function MenuColumn({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div>
      <p className="eyebrow text-gold-deep mb-4">{title}</p>
      <ul className="space-y-2.5 text-sm text-muted">{children}</ul>
    </div>
  )
}

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const close = () => setMobileOpen(false)

  return (
    <header className="sticky top-0 z-40 bg-ink/95 backdrop-blur border-b border-line">
      <div className="text-center py-2 border-b border-line">
        <p className="eyebrow text-faint">
          Discreet Shipping<span className="hidden sm:inline"> From Our Trusted Retail Partner</span>
        </p>
      </div>

      <div className="max-w-[1400px] mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-[1fr_auto_1fr] items-center h-20">
          <nav aria-label="Main" className="hidden lg:flex items-center gap-8">
            {PRIMARY.map((item) => (
              <Link
                key={item.slug}
                to="/shop/$slug"
                params={{ slug: item.slug }}
                className="eyebrow text-ivory hover:text-gold transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <div className="group relative">
              <button type="button" className="eyebrow text-ivory hover:text-gold transition-colors py-8">
                Shop All
              </button>
              <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100 transition-opacity fixed left-0 right-0 top-[7.25rem] bg-surface border-y border-line">
                <div className="max-w-[1400px] mx-auto px-8 py-10 grid grid-cols-5 gap-10">
                  <MenuColumn title="Categories">
                    {HUBS.map((hub) => (
                      <li key={hub.slug}>
                        <Link to="/category/$slug" params={{ slug: hub.slug }} className="hover:text-gold">
                          {hub.name}
                        </Link>
                      </li>
                    ))}
                  </MenuColumn>
                  <MenuColumn title="By Style">
                    {STYLES.map((c) => (
                      <li key={c.slug}>
                        <Link to="/shop/$slug" params={{ slug: c.slug }} className="hover:text-gold">
                          {c.name}
                        </Link>
                      </li>
                    ))}
                  </MenuColumn>
                  <MenuColumn title="Gifts & Couples">
                    <li>
                      <Link to="/gifts" className="text-gold hover:underline">
                        The Gift Shop
                      </Link>
                    </li>
                    {GIFTS_AND_COUPLES.map((c) => (
                      <li key={c.slug}>
                        <Link to="/shop/$slug" params={{ slug: c.slug }} className="hover:text-gold">
                          {c.name}
                        </Link>
                      </li>
                    ))}
                  </MenuColumn>
                  <MenuColumn title="Featured Brands">
                    {BRANDS.map((c) => (
                      <li key={c.slug}>
                        <Link to="/shop/$slug" params={{ slug: c.slug }} className="hover:text-gold">
                          {c.name}
                        </Link>
                      </li>
                    ))}
                  </MenuColumn>
                  <MenuColumn title="By Budget">
                    {BUDGET.map((c) => (
                      <li key={c.slug}>
                        <Link to="/shop/$slug" params={{ slug: c.slug }} className="hover:text-gold">
                          {c.name}
                        </Link>
                      </li>
                    ))}
                    <li className="pt-6">
                      <p className="eyebrow text-gold-deep mb-3">Guides by Topic</p>
                    </li>
                    {TOPICS.map((t) => (
                      <li key={t.slug}>
                        <Link to="/blog/topic/$topic" params={{ topic: t.slug }} className="hover:text-gold">
                          {t.name}
                        </Link>
                      </li>
                    ))}
                  </MenuColumn>
                </div>
              </div>
            </div>
          </nav>

          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden eyebrow text-ivory justify-self-start"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            {mobileOpen ? 'Close' : 'Menu'}
          </button>

          <Link to="/" className="text-center" aria-label={`${SITE.name} home`}>
            <span className="block font-display text-2xl sm:text-[1.75rem] tracking-[0.18em] text-ivory leading-none">
              NIGHTSTAND
            </span>
            <span className="block eyebrow text-gold mt-1.5 !tracking-[0.42em]">Supply Co.</span>
          </Link>

          <nav aria-label="Secondary" className="hidden lg:flex justify-end items-center gap-8">
            <Link to="/gifts" className="eyebrow text-ivory hover:text-gold transition-colors">
              Gifts
            </Link>
            <Link to="/blog" className="eyebrow text-ivory hover:text-gold transition-colors">
              {SITE.guidesName}
            </Link>
          </nav>
        </div>
      </div>

      {mobileOpen && (
        <nav id="mobile-menu" aria-label="Mobile" className="lg:hidden border-t border-line bg-surface px-5 py-8 space-y-8 max-h-[75vh] overflow-y-auto">
          <ul className="space-y-4">
            {PRIMARY.map((item) => (
              <li key={item.slug}>
                <Link to="/shop/$slug" params={{ slug: item.slug }} onClick={close} className="font-display text-2xl text-ivory">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/gifts" onClick={close} className="font-display text-2xl text-ivory">
                Gifts
              </Link>
            </li>
            <li>
              <Link to="/blog" onClick={close} className="font-display text-2xl text-ivory">
                {SITE.guidesName}
              </Link>
            </li>
          </ul>
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
        </nav>
      )}
    </header>
  )
}
