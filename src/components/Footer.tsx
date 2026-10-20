import { Link } from '@tanstack/react-router'
import { SITE } from '@/config/site'
import { HUBS } from '@/content/hubs'
import { COLLECTIONS } from '@/content/collections'
import { TOPICS } from '@/content/topics'

const SHOP = COLLECTIONS.filter((c) => ['For Him', 'For Her', 'Gift Ideas', 'By Budget'].includes(c.group))

const heading = 'text-xs font-semibold text-ink mb-4'
const list = 'space-y-2.5 text-xs text-graphite'
const link = 'hover:text-ink hover:underline underline-offset-2'

export function Footer() {
  return (
    <footer className="bg-mist mt-28 sm:mt-36">
      <div className="wrap pt-16 pb-10">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div className="space-y-5 max-w-sm">
            <p className="font-display text-2xl font-bold tracking-[-0.045em] text-ink">
              Nightstand<span className="text-graphite font-semibold"> Supply Co.</span>
            </p>
            <p className="text-sm text-graphite leading-relaxed">{SITE.description}</p>
          </div>

          <div>
            <p className={heading}>Shop</p>
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
            shipped by our retail partner.{' '}
            <Link to="/disclosure" className="text-ink underline underline-offset-2">
              Disclosure
            </Link>
          </p>
          <div className="flex flex-col sm:flex-row justify-between gap-2">
            <span>
              Copyright &copy; {new Date().getFullYear()} {SITE.name}. All rights reserved.
            </span>
            <span className="flex flex-wrap items-center gap-x-4 gap-y-1">
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
