import { Link } from '@tanstack/react-router'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { ListingView } from '@/components/ListingView'
import { AffiliateNotice } from '@/components/AffiliateNotice'
import { MobileSearchField } from '@/components/MobileSearchField'
import { FaqAccordion } from '@/components/FaqAccordion'
import type { ListingFilters, ListingResult, ProductSummary } from '@/lib/listing'
import { ProductGrid } from '@/components/ProductCard'
import type { Post } from '@/content/posts'
import type { ListingExtra } from '@/content/listing-extras'
import { getOptimizedImageUrl } from '@/lib/image'

type SubcategoryTile = { slug: string; name: string; line: string; image: string | null }

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
  subcats = [],
  more = [],
  otherBrands = [],
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
  subcats?: SubcategoryTile[]
  /** Related products shown under listings too small to fill a row. */
  more?: ProductSummary[]
  otherBrands?: { slug: string; name: string }[]
}) {
  return (
    <div className="wrap">
      <header className="pt-6 pb-8 sm:pb-10">
        <Breadcrumbs items={breadcrumbs} />
        <MobileSearchField className="mt-4" />
        <div className="mt-6 sm:mt-12 grid lg:grid-cols-12 gap-6 lg:gap-12 items-end">
          <div className="lg:col-span-6 rise">
            <p className="eyebrow text-graphite">{eyebrow}</p>
            <h1 className="mt-2 display-m">{title}</h1>
          </div>
          <div className="lg:col-span-6 space-y-3 rise-delay">
            <p className="text-[1rem] leading-relaxed text-graphite">{intro}</p>
            <AffiliateNotice />
          </div>
        </div>
      </header>

      {subcats.length > 0 && (
        <nav aria-label="Shop by type" className="pb-8">
          <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-3">
            {subcats.map((tile) => (
              <li key={tile.slug}>
                <Link
                  to="/shop/$slug"
                  params={{ slug: tile.slug }}
                  className="group flex items-center gap-3 h-full rounded-2xl bg-mist p-2.5 pr-4 hover:bg-line/70 transition-colors"
                >
                  <span className="relative shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-canvas overflow-hidden">
                    {tile.image && (
                      <img
                        src={getOptimizedImageUrl(tile.image, 160)}
                        alt=""
                        loading="lazy"
                        width={160}
                        height={160}
                        className="absolute inset-0 w-full h-full object-contain p-[14%] mix-blend-multiply saturate-[0.85]"
                      />
                    )}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold tracking-[-0.01em] leading-snug group-hover:underline underline-offset-4">
                      {tile.name}
                    </span>
                    {tile.line && <span className="hidden sm:block mt-0.5 text-xs text-graphite leading-snug">{tile.line}</span>}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}

      <div className="pb-8">
        <ListingView result={result} filters={filters} />
      </div>

      {more.length > 0 && (
        <section className="mt-16 pt-14 border-t border-line reveal">
          <h2 className="display-m mb-8">More to Explore</h2>
          <ProductGrid products={more} context="listing_more" />
        </section>
      )}

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
              <div className="lg:col-span-8 max-w-3xl lg:mt-6">
                <FaqAccordion faqs={extra.faqs} />
              </div>
            </>
          )}
        </section>
      )}

      {otherBrands.length > 0 && (
        <nav aria-label="Shop other brands" className="mt-24 pt-14 border-t border-ink reveal">
          <h2 className="display-m">
            Shop More Brands. <span className="text-graphite">Compare Side by Side.</span>
          </h2>
          <ul className="mt-8 flex flex-wrap gap-2.5">
            {otherBrands.map((brand) => (
              <li key={brand.slug}>
                <Link to="/shop/$slug" params={{ slug: brand.slug }} className="chip">
                  {brand.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
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
                {guides.length > 1 ? 'Read the Guides.' : 'Read the Guide.'} <span className="text-graphite">Nightstand Notes.</span>
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
