import { Link } from '@tanstack/react-router'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { ListingView } from '@/components/ListingView'
import { AffiliateNotice } from '@/components/AffiliateNotice'
import type { ListingFilters, ListingResult } from '@/lib/listing'
import type { Post } from '@/content/posts'

export function ListingPage({
  eyebrow,
  title,
  intro,
  breadcrumbs,
  result,
  filters,
  tips,
  guides = [],
}: {
  eyebrow: string
  title: string
  intro: string
  breadcrumbs: { name: string; path: string }[]
  result: ListingResult
  filters: ListingFilters
  tips?: string[]
  guides?: Post[]
}) {
  return (
    <div className="max-w-[1400px] mx-auto px-5 sm:px-8">
      <header className="pt-10 pb-14 border-b border-line">
        <Breadcrumbs items={breadcrumbs} />
        <div className="mt-10 grid lg:grid-cols-[1.2fr_1fr] gap-10 items-end">
          <div>
            <p className="eyebrow text-gold">{eyebrow}</p>
            <h1 className="mt-4 text-5xl sm:text-6xl text-ivory leading-[1.05]">{title}</h1>
          </div>
          <div className="space-y-4">
            <p className="text-muted leading-relaxed">{intro}</p>
            <AffiliateNotice />
          </div>
        </div>
      </header>

      <div className="py-12">
        <ListingView result={result} filters={filters} />
      </div>

      {(tips?.length || guides.length > 0) && (
        <section className="border-t border-line pt-14 grid lg:grid-cols-2 gap-14">
          {tips?.length ? (
            <div>
              <p className="eyebrow text-gold">Before You Buy</p>
              <h2 className="mt-3 text-3xl text-ivory">What to Know</h2>
              <ol className="mt-6 space-y-4">
                {tips.map((tip, i) => (
                  <li key={tip} className="flex gap-5 text-muted leading-relaxed">
                    <span className="font-display text-2xl text-gold-deep leading-none">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {tip}
                  </li>
                ))}
              </ol>
            </div>
          ) : null}
          {guides.length > 0 && (
            <div>
              <p className="eyebrow text-gold">Nightstand Notes</p>
              <h2 className="mt-3 text-3xl text-ivory">Read the Guide</h2>
              <ul className="mt-6 divide-y divide-line border-y border-line">
                {guides.map((post) => (
                  <li key={post.slug}>
                    <Link to="/blog/$slug" params={{ slug: post.slug }} className="group block py-5">
                      <span className="font-display text-xl text-ivory group-hover:text-gold transition-colors">
                        {post.title}
                      </span>
                      <span className="block mt-1 text-sm text-faint">{post.readMinutes} Minute Read</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      )}
    </div>
  )
}
