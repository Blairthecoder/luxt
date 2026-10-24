import { Link, createFileRoute } from '@tanstack/react-router'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { AffiliateNotice } from '@/components/AffiliateNotice'
import { HUBS_BY_SLUG } from '@/content/hubs'
import { SITE, absoluteUrl } from '@/config/site'
import { getReviewsData } from '@/lib/catalog'
import { goPath } from '@/lib/affiliate'
import { formatPrice } from '@/lib/format'
import { getOptimizedImageUrl } from '@/lib/image'
import { breadcrumbJsonLd, pageHead } from '@/lib/seo'

export const Route = createFileRoute('/reviews')({
  loader: () => getReviewsData(),
  head: ({ loaderData }) =>
    pageHead({
      title: `Lovense Reviews: Every Toy We Have Reviewed | ${SITE.shortName}`,
      description: `Independent reviews of ${loaderData?.reviews.length ?? 'every'} Lovense toys: who each one suits, what we like, what to keep in mind and the current price.`,
      path: '/reviews',
      jsonLd: [
        breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Reviews', path: '/reviews' },
        ]),
        {
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          name: 'Lovense Reviews',
          itemListElement: (loaderData?.reviews ?? []).map((p, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            url: absoluteUrl(`/products/${p.handle}`),
            name: `${p.title} Review`,
          })),
        },
      ],
    }),
  component: ReviewsPage,
})

type Review = Awaited<ReturnType<typeof getReviewsData>>['reviews'][number]

/** Reviews grouped by category, largest group first. */
function byHub(reviews: Review[]) {
  const groups = new Map<string, Review[]>()
  for (const r of reviews) groups.set(r.hub, [...(groups.get(r.hub) ?? []), r])
  return [...groups.entries()]
    .map(([slug, items]) => ({ slug, name: HUBS_BY_SLUG[slug]?.name ?? 'More Toys', items }))
    .sort((a, b) => b.items.length - a.items.length)
}

function ReviewsPage() {
  const { reviews } = Route.useLoaderData()
  const groups = byHub(reviews)

  return (
    <div className="wrap">
      <header className="pt-6 pb-10 sm:pb-14">
        <Breadcrumbs
          items={[
            { name: 'Home', path: '/' },
            { name: 'Reviews', path: '/reviews' },
          ]}
        />
        <div className="mt-14 sm:mt-20 grid lg:grid-cols-12 gap-8 lg:gap-12 items-end">
          <div className="lg:col-span-7 rise">
            <p className="eyebrow text-graphite">{reviews.length} Toys Reviewed</p>
            <h1 className="mt-3 display-l">Lovense Reviews</h1>
          </div>
          <div className="lg:col-span-5 rise-delay">
            <p className="text-[1.0625rem] leading-relaxed text-graphite">
              Our take on every Lovense toy we cover: who it suits, what we like and what to keep in mind before you
              buy. Read{' '}
              <Link to="/editorial-policy" className="text-ink underline underline-offset-4">
                how we review
              </Link>
              .
            </p>
          </div>
        </div>
        {groups.length > 1 && (
          <nav aria-label="Review categories" className="mt-10">
            <ul className="flex flex-wrap gap-2">
              {groups.map((g) => (
                <li key={g.slug}>
                  <a href={`#${g.slug}`} className="chip">
                    {g.name} <span className="ml-1.5 text-graphite tabular-nums">{g.items.length}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </header>

      <AffiliateNotice className="pb-6" />

      {groups.map((g) => (
        <section key={g.slug} id={g.slug} className="scroll-mt-32 pt-10 sm:pt-16 reveal">
          <div className="section-head">
            <h2 className="display-m">{g.name}</h2>
            {HUBS_BY_SLUG[g.slug] && (
              <Link to="/category/$slug" params={{ slug: g.slug }} className="more hidden sm:inline-flex">
                Browse {g.name}
              </Link>
            )}
          </div>
          <ul className="border-t border-ink">
            {g.items.map((r) => (
              <li key={r.handle} className="border-b border-line">
                <article className="grid grid-cols-[5.5rem_1fr] sm:grid-cols-[8rem_1fr_auto] gap-x-5 sm:gap-x-8 gap-y-4 py-6 items-start">
                  <Link to="/products/$productId" params={{ productId: r.handle }} className="relative block aspect-square rounded-xl bg-stone overflow-hidden">
                    {r.image && (
                      <img
                        src={getOptimizedImageUrl(r.image, 280)}
                        alt={`${r.title} by ${r.brand}`}
                        loading="lazy"
                        width={280}
                        height={280}
                        className="absolute inset-0 w-full h-full object-contain p-[12%] mix-blend-multiply saturate-[0.85]"
                      />
                    )}
                  </Link>
                  <div className="min-w-0">
                    <h3 className="font-display text-xl sm:text-2xl font-semibold tracking-[-0.02em] leading-snug">
                      <Link to="/products/$productId" params={{ productId: r.handle }} className="hover:underline underline-offset-4 decoration-1">
                        {r.title} Review
                      </Link>
                    </h3>
                    {r.bestFor && (
                      <p className="mt-1.5 text-sm">
                        <span className="font-semibold">Best for:</span> <span className="text-graphite">{r.bestFor}</span>
                      </p>
                    )}
                    <p className="mt-2 text-[0.9375rem] text-graphite leading-relaxed line-clamp-3">{r.summary}</p>
                    <Link to="/products/$productId" params={{ productId: r.handle }} className="mt-3 more">
                      Read Our Review
                    </Link>
                  </div>
                  <div className="col-span-2 sm:col-span-1 flex sm:flex-col items-center sm:items-end justify-between gap-3 sm:min-w-[9rem]">
                    <span className="text-[0.9375rem] font-medium tabular-nums">
                      {formatPrice(r.price)}
                      {r.compareAtPrice && (
                        <span className="ml-2 sm:ml-0 sm:block text-xs font-normal text-silver line-through sm:text-right">
                          {formatPrice(r.compareAtPrice)}
                        </span>
                      )}
                    </span>
                    <a
                      href={goPath(r.handle)}
                      target="_blank"
                      rel="sponsored nofollow noopener"
                      data-link-context="reviews_index"
                      className="btn-ghost !min-h-[2.5rem] !px-4 !text-sm whitespace-nowrap"
                    >
                      Check Price
                    </a>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  )
}
