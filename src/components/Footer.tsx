import { Link } from '@tanstack/react-router'
import { SITE } from '@/config/site'
import { HUBS } from '@/content/hubs'
import { COLLECTIONS } from '@/content/collections'
import { TOPICS } from '@/content/topics'
import { NewsletterSignup } from '@/components/NewsletterSignup'
import { Logo } from '@/components/Logo'

const SHOP = COLLECTIONS.filter((c) => ['For Him', 'For Her', 'Gift Ideas', 'By Budget'].includes(c.group))

const heading = 'text-xs font-semibold text-ink mb-4'
const list = 'space-y-2.5 max-lg:space-y-0 max-lg:grid max-lg:grid-cols-2 max-lg:gap-x-4 text-xs text-graphite'
const link = 'hover:text-ink hover:underline underline-offset-2 max-lg:inline-block max-lg:py-2.5'

export function Footer() {
  return (
    <footer className="bg-mist mt-28 sm:mt-36">
      <div className="wrap pt-16 pb-10">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div className="space-y-5 max-w-sm">
            <Logo className="h-12 w-auto" />
            <p className="text-sm text-graphite leading-relaxed">{SITE.description}</p>
            <NewsletterSignup source="footer" variant="footer" />
          </div>

          <div>
            <p className={heading}>Browse Toys</p>
            <ul className={list}>
              {SHOP.map((c) => (
                <li key={c.slug}>
                  <Link to="/shop/$slug" params={{ slug: c.slug }} className={link}>
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className={heading}>Categories</p>
            <ul className={list}>
              {HUBS.map((hub) => (
                <li key={hub.slug}>
                  <Link to="/category/$slug" params={{ slug: hub.slug }} className={link}>
                    {hub.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className={heading}>{SITE.guidesName}</p>
            <ul className={list}>
              <li>
                <Link to="/reviews" className={link}>
                  Reviews
                </Link>
              </li>
              {TOPICS.map((topic) => (
                <li key={topic.slug}>
                  <Link to="/blog/topic/$topic" params={{ topic: topic.slug }} className={link}>
                    {topic.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/gifts" className={link}>
                  The Gift Shop
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-ink font-medium hover:underline underline-offset-2">
                  All Guides
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-line space-y-4 text-xs text-graphite">
          <p className="max-w-3xl leading-relaxed">
            We earn a commission when you buy through our links, at no extra cost to you. Orders are placed and
            shipped by the retailer you buy from.{' '}
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
