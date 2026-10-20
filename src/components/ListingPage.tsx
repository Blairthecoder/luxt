import { Link } from '@tanstack/react-router'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { ListingView } from '@/components/ListingView'
import { AffiliateNotice } from '@/components/AffiliateNotice'
import type { ListingFilters, ListingResult } from '@/lib/listing'
import type { Post } from '@/content/posts'
import type { ListingExtra } from '@/content/listing-extras'

export function ListingPage({
  eyebrow,
  title,
  intro,
  breadcrumbs,
  result,
  filters,
  tips,
  guides = [],
  extra,
  extraName,
}: {
  eyebrow: string
  title: string
  intro: string
  breadcrumbs: { name: string; path: string }[]
  result: ListingResult
  filters: ListingFilters
  tips?: string[]
  guides?: Post[]
  extra?: ListingExtra | null
  extraName?: string
}) {
  return (
    <div className="wrap">
      <header className="pt-6 pb-12 sm:pb-16">
        <Breadcrumbs items={breadcrumbs} />
        <div className="mt-14 sm:mt-20 grid lg:grid-cols-12 gap-8 lg:gap-12 items-end">
          <div className="lg:col-span-7 rise">
            <p className="eyebrow text-graphite">{eyebrow}</p>
            <h1 className="mt-3 display-l">{title}</h1>
          </div>
          <div className="lg:col-span-5 space-y-4 rise-delay">
            <p className="text-[1.0625rem] leading-relaxed text-graphite">{intro}</p>
            <AffiliateNotice />
          </div>
        </div>
      </header>

      <div className="pb-8">
        <ListingView result={result} filters={filters} />
      </div>

      {extra && (
        <section className="mt-24 pt-14 border-t border-ink grid lg:grid-cols-12 gap-10 lg:gap-16 reveal">
          <h2 className="lg:col-span-4 display-m">
            About {extraName}. <span className="text-graphite">The Short Version.</span>
          </h2>
          <div className="lg:col-span-8 max-w-3xl space-y-5 text-[1.0625rem] leading-relaxed text-[#3a3a3c]">
            {extra.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          {extra.faqs.length > 0 && (
            <>
              <h2 className="lg:col-span-4 display-m lg:pt-6">Questions People Ask.</h2>
              <dl className="lg:col-span-8 max-w-3xl border-t border-line lg:mt-6">
                {extra.faqs.map((faq) => (
                  <div key={faq.q} className="py-6 border-b border-line">
                    <dt className="font-display text-xl font-semibold tracking-[-0.02em]">{faq.q}</dt>
                    <dd className="mt-2 text-graphite text-[1.0625rem] leading-relaxed">{faq.a}</dd>
                  </div>
                ))}
              </dl>
            </>
          )}
        </section>
      )}

      {(tips?.length || guides.length > 0) && (
        <section className="mt-24 pt-14 border-t border-ink grid lg:grid-cols-2 gap-16">
          {tips?.length ? (
            <div className="reveal">
              <h2 className="display-m">
                What to Know. <span className="text-graphite">Before You Buy.</span>
              </h2>
              <ol className="mt-10 border-t border-line">
                {tips.map((tip, i) => (
                  <li key={tip} className="grid grid-cols-[2.5rem_1fr] gap-4 py-5 border-b border-line leading-relaxed">
                    <span className="font-display text-sm font-semibold text-graphite tabular-nums pt-0.5">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="text-[1.0625rem]">{tip}</span>
                  </li>
                ))}
              </ol>
            </div>
          ) : null}
          {guides.length > 0 && (
            <div className="reveal">
              <h2 className="display-m">
                Read the Guide. <span className="text-graphite">Nightstand Notes.</span>
              </h2>
              <ul className="mt-10 border-t border-line">
                {guides.map((post) => (
                  <li key={post.slug} className="border-b border-line">
                    <Link
                      to="/blog/$slug"
                      params={{ slug: post.slug }}
                      className="group flex items-baseline justify-between gap-6 py-5"
                    >
                      <span className="font-display text-xl font-semibold tracking-[-0.02em] group-hover:underline underline-offset-4 decoration-1">
                        {post.title}
                      </span>
                      <span className="shrink-0 text-xs text-graphite">{post.readMinutes} min read</span>
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
