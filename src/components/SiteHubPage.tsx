import type { ReactNode } from 'react'
import { Link } from '@tanstack/react-router'
import { AffiliateNotice } from '@/components/AffiliateNotice'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { NewsletterSignup } from '@/components/NewsletterSignup'
import { resolveHubSections, type SiteHub } from '@/content/site-hubs'
import { absoluteUrl } from '@/config/site'
import { breadcrumbJsonLd } from '@/lib/seo'

const KIND_LABEL = { guide: 'Guide', collection: 'Shop the Picks', topic: 'Topic Hub' } as const

/** Structured data for a hub: breadcrumb trail plus an ItemList of everything it links to. */
export function hubJsonLd(hub: SiteHub) {
  const sections = resolveHubSections(hub)
  const urls = new Set<string>()
  const items = sections
    .flatMap((s) => s.items)
    .map((i) => ({
      name: i.label,
      url: absoluteUrl(i.to.replace('$slug', i.params.slug ?? '').replace('$topic', i.params.topic ?? '')),
    }))
    .filter((i) => !urls.has(i.url) && urls.add(i.url))
  return [
    breadcrumbJsonLd([
      { name: 'Home', path: '/' },
      { name: hub.navLabel, path: hub.path },
    ]),
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: hub.metaTitle,
      description: hub.metaDescription,
      url: absoluteUrl(hub.path),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: hub.title,
      itemListElement: items.map((i, n) => ({ '@type': 'ListItem', position: n + 1, name: i.name, url: i.url })),
    },
  ]
}

/** Shared layout for the Explore, For Couples and Shop Our Picks hubs. */
export function SiteHubPage({
  hub,
  monetized = false,
  extra,
}: {
  hub: SiteHub
  monetized?: boolean
  /** Extra content between the hub sections and the newsletter, e.g. product picks. */
  extra?: ReactNode
}) {
  const sections = resolveHubSections(hub)
  return (
    <div>
      <header className="wrap pt-6 pb-12 sm:pb-16">
        <Breadcrumbs items={[{ name: 'Home', path: '/' }, { name: hub.navLabel, path: hub.path }]} />
        <p className="mt-14 sm:mt-20 eyebrow text-graphite rise">{hub.eyebrow}</p>
        <h1 className="mt-3 display-l max-w-4xl rise">{hub.title}</h1>
        <p className="mt-6 lede text-graphite max-w-2xl rise-delay">{hub.intro}</p>
        {monetized && <AffiliateNotice className="mt-6 max-w-2xl" />}
        <nav aria-label={`${hub.navLabel} sections`} className="mt-8">
          <ul className="flex flex-wrap gap-2">
            {sections.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="chip">
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <div className="wrap space-y-6">
        {sections.map((section, i) => (
          <section
            key={section.id}
            id={section.id}
            aria-labelledby={`${section.id}-title`}
            className={`scroll-mt-32 rounded-3xl p-7 sm:p-10 reveal ${i % 2 === 0 ? 'bg-blush' : 'bg-mist'}`}
          >
            <div className="grid lg:grid-cols-12 gap-8">
              <div className="lg:col-span-4">
                <h2 id={`${section.id}-title`} className="display-m">
                  {section.title}
                </h2>
                <p className="mt-3 text-graphite leading-relaxed max-w-sm">{section.blurb}</p>
              </div>
              <ul className="lg:col-span-8 border-t border-ink">
                {section.items.map((item) => (
                  <li key={`${item.kind}:${item.label}`} className="border-b border-ink/15">
                    <Link to={item.to} params={item.params as never} className="group block py-4">
                      <span className="block text-[0.75rem] font-semibold text-graphite">{KIND_LABEL[item.kind]}</span>
                      <span className="mt-0.5 block font-display text-lg sm:text-xl font-semibold tracking-[-0.02em] leading-snug group-hover:underline underline-offset-4 decoration-1">
                        {item.label}
                      </span>
                      {item.description && item.kind !== 'collection' && (
                        <span className="mt-1 block text-[0.9375rem] text-graphite leading-relaxed line-clamp-2">{item.description}</span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ))}
      </div>

      {extra}

      <div className="wrap mt-16 sm:mt-24 max-w-3xl">
        <NewsletterSignup source={`hub:${hub.path.slice(1)}`} />
        <p className="mt-8 text-sm text-graphite">
          Every recommendation follows our{' '}
          <Link to="/editorial-policy" className="text-ink underline underline-offset-2">
            editorial policy
          </Link>
          . Nightstand Supply is an independent affiliate publisher and may earn a commission from qualifying purchases.
        </p>
      </div>
    </div>
  )
}
