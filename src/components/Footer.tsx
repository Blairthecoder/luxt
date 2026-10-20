import { Link } from '@tanstack/react-router'
import { SITE } from '@/config/site'
import { HUBS } from '@/content/hubs'
import { COLLECTIONS } from '@/content/collections'
import { TOPICS } from '@/content/topics'

const SHOP = COLLECTIONS.filter((c) => ['For Him', 'For Her', 'Gift Ideas', 'By Budget'].includes(c.group))

export function Footer() {
  return (
    <footer className="border-t border-line mt-24">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 py-16 grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="space-y-5 max-w-sm">
          <p>
            <span className="block font-display text-2xl tracking-[0.18em] text-ivory">NIGHTSTAND</span>
            <span className="block eyebrow text-gold mt-1 !tracking-[0.42em]">Supply Co.</span>
          </p>
          <p className="text-sm text-muted leading-relaxed">{SITE.description}</p>
          <p className="text-xs text-faint leading-relaxed">
            We earn a commission when you buy through our links, at no extra cost to you. Orders are placed and
            shipped by our retail partner.{' '}
            <Link to="/disclosure" className="underline underline-offset-2 hover:text-gold">
              Disclosure
            </Link>
          </p>
        </div>

        <div>
          <p className="eyebrow text-gold-deep mb-4">Shop</p>
          <ul className="space-y-2.5 text-sm text-muted">
            {SHOP.map((c) => (
              <li key={c.slug}>
                <Link to="/shop/$slug" params={{ slug: c.slug }} className="hover:text-gold">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="eyebrow text-gold-deep mb-4">Categories</p>
          <ul className="space-y-2.5 text-sm text-muted">
            {HUBS.map((hub) => (
              <li key={hub.slug}>
                <Link to="/category/$slug" params={{ slug: hub.slug }} className="hover:text-gold">
                  {hub.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="eyebrow text-gold-deep mb-4">{SITE.guidesName}</p>
          <ul className="space-y-2.5 text-sm text-muted">
            {TOPICS.map((topic) => (
              <li key={topic.slug}>
                <Link to="/blog/topic/$topic" params={{ topic: topic.slug }} className="hover:text-gold">
                  {topic.name}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/gifts" className="hover:text-gold">
                The Gift Shop
              </Link>
            </li>
            <li>
              <Link to="/blog" className="text-gold hover:underline">
                All Guides
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 py-6 flex flex-col sm:flex-row justify-between gap-3 eyebrow text-faint">
          <span>
            &copy; {new Date().getFullYear()} {SITE.name}
          </span>
          <span>For Adults 18+ Only</span>
        </div>
      </div>
    </footer>
  )
}
