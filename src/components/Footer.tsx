import { Link } from '@tanstack/react-router'
import { SITE } from '@/config/site'
import { PILLARS, type PillarLink } from '@/content/pillars'
import { NewsletterSignup } from '@/components/NewsletterSignup'
import { Logo } from '@/components/Logo'

/** Each pillar's landing link, then its dropdown links, without repeats. */
function pillarLinks(href: PillarLink, columns: { links: PillarLink[] }[]) {
  const seen = new Set<string>()
  return [href, ...columns.flatMap((c) => c.links)].filter((l) => {
    const key = `${l.to}${JSON.stringify(l.params ?? {})}`
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })
}

const heading = 'text-xs font-semibold text-ink mb-4'
const list = 'space-y-2.5 max-lg:space-y-0 max-lg:grid max-lg:grid-cols-2 max-lg:gap-x-4 text-xs text-graphite'
const link = 'hover:text-ink hover:underline underline-offset-2 max-lg:inline-block max-lg:py-2.5'

export function Footer() {
  return (
    <footer className="bg-mist mt-28 sm:mt-36">
      <div className="wrap pt-16 pb-10">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.6fr_repeat(5,1fr)] lg:gap-8">
          <div className="space-y-5 max-w-sm">
            <Logo className="h-12 w-auto" />
            <p className="text-sm text-graphite leading-relaxed">{SITE.description}</p>
            <NewsletterSignup source="footer" variant="footer" />
          </div>

          {PILLARS.map((pillar) => (
            <div key={pillar.slug}>
              <p className={heading}>{pillar.name}</p>
              <ul className={list}>
                {pillarLinks(pillar.href, pillar.columns)
                  .slice(0, 8)
                  .map((l) => (
                    <li key={l.label}>
                      <Link to={l.to as '/'} {...(l.params ? { params: l.params as never } : {})} className={link}>
                        {l.label}
                      </Link>
                    </li>
                  ))}
                {pillar.slug === 'toys' && (
                  <li>
                    <Link to="/gifts" className={link}>
                      The Gift Shop
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-10 text-xs text-graphite">
          <Link to="/blog" className="text-ink font-medium hover:underline underline-offset-2">
            All {SITE.guidesName} Guides
          </Link>
        </p>

        <div className="mt-14 pt-6 border-t border-line space-y-4 text-xs text-graphite">
          <p className="max-w-3xl leading-relaxed">
            Lingerie is sold by {SITE.name} through our Shopify checkout. Toys are sold by the retailer you buy from,
            and we earn a commission when you buy through our links, at no extra cost to you.{' '}
            <Link to="/disclosure" className="text-ink underline underline-offset-2">
              Disclosure
            </Link>
          </p>
          <div className="flex flex-col sm:flex-row justify-between gap-2">
            <span>
              Copyright &copy; {new Date().getFullYear()} {SITE.name}. All rights reserved.
            </span>
            <span className="flex flex-wrap items-center gap-x-4 gap-y-1">
              <Link to="/about" className={link}>
                About
              </Link>
              <Link to="/editorial-policy" className={link}>
                Editorial Policy
              </Link>
              <Link to="/disclosure" className={link}>
                Affiliate Disclosure
              </Link>
              <Link to="/partners" className={link}>
                Partners
              </Link>
              <Link to="/contact" className={link}>
                Contact
              </Link>
              <Link to="/shipping" className={link}>
                Shipping
              </Link>
              <Link to="/returns" className={link}>
                Returns
              </Link>
              <Link to="/size-guide" className={link}>
                Size Guide
              </Link>
              <Link to="/privacy" className={link}>
                Privacy
              </Link>
              <Link to="/terms" className={link}>
                Terms
              </Link>
              <span>For adults 18+ only</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
