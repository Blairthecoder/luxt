import { Link, createFileRoute } from '@tanstack/react-router'
import { ProductCard } from '@/components/ProductCard'
import { SITE } from '@/config/site'
import { parseSearchQuery, searchSiteFn } from '@/lib/search'
import { pageHead } from '@/lib/seo'

export const Route = createFileRoute('/search')({
  validateSearch: parseSearchQuery,
  loaderDeps: ({ search }) => ({ q: search.q ?? '' }),
  loader: async ({ deps }) => (deps.q ? await searchSiteFn({ data: deps.q }) : null),
  // Search results are thin, endless URL variants: never indexed, always followed.
  head: ({ loaderData }) =>
    pageHead({
      title: `${loaderData?.q ? `Search: ${loaderData.q}` : 'Search'} | ${SITE.shortName}`,
      description: `Search ${SITE.name} for toys, guides and answers.`,
      path: '/search',
      noindex: true,
    }),
  component: SearchPage,
})

const SUGGESTIONS = ['quiet vibrator', 'couples', 'lube', 'beginner', 'wand', 'stroker', 'gift set']

function SearchPage() {
  const results = Route.useLoaderData()
  const { q } = Route.useSearch()
  const nothing =
    results &&
    !results.products.length &&
    !results.guides.length &&
    !results.collections.length &&
    !results.categories.length &&
    !results.terms.length

  return (
    <div className="wrap py-16 sm:py-24">
      <h1 className="display-l text-ink">{q ? `Results for “${q}”` : 'Search'}</h1>

      <form action="/search" method="get" role="search" className="mt-8 flex gap-3 max-w-xl">
        <label htmlFor="search-page-q" className="sr-only">
          Search toys and guides
        </label>
        <input
          id="search-page-q"
          name="q"
          type="search"
          defaultValue={q ?? ''}
          maxLength={80}
          autoComplete="off"
          placeholder="Search toys, guides and answers"
          className="flex-1 h-12 rounded-full bg-mist px-5 text-ink placeholder:text-graphite outline-none focus:ring-2 focus:ring-ink"
        />
        <button type="submit" className="btn">
          Search
        </button>
      </form>

      {!results && (
        <div className="mt-10">
          <p className="text-graphite">Try one of these:</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {SUGGESTIONS.map((s) => (
              <li key={s}>
                <Link to="/search" search={{ q: s }} className="chip">
                  {s}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {nothing && (
        <div className="mt-10 max-w-xl">
          <p className="text-ink font-medium">Nothing matched “{results.q}”.</p>
          <p className="mt-2 text-graphite leading-relaxed">
            Check the spelling or try a simpler word like “vibrator” or “lube”. Not sure where to start? Take the{' '}
            <Link to="/quiz" className="text-ink underline underline-offset-2">
              toy finder quiz
            </Link>{' '}
            or browse the{' '}
            <Link to="/blog" className="text-ink underline underline-offset-2">
              guides
            </Link>
            .
          </p>
        </div>
      )}

      {results && !nothing && (
        <div className="mt-12 space-y-16">
          {(results.categories.length > 0 || results.collections.length > 0) && (
            <section aria-labelledby="search-shop">
              <h2 id="search-shop" className="text-sm font-medium text-graphite mb-3">
                Shop pages
              </h2>
              <ul className="flex flex-wrap gap-2">
                {results.categories.map((c) => (
                  <li key={`hub-${c.slug}`}>
                    <Link to="/category/$slug" params={{ slug: c.slug }} className="chip">
                      {c.name}
                    </Link>
                  </li>
                ))}
                {results.collections.map((c) => (
                  <li key={`shop-${c.slug}`}>
                    <Link to="/shop/$slug" params={{ slug: c.slug }} className="chip">
                      {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {results.products.length > 0 && (
            <section aria-labelledby="search-products">
              <h2 id="search-products" className="text-sm font-medium text-graphite mb-6">
                {results.total} {results.total === 1 ? 'product' : 'products'}
                {results.total > results.products.length ? ` (showing ${results.products.length})` : ''}
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-10">
                {results.products.map((p) => (
                  <ProductCard key={p.handle} product={p} context="search_card" />
                ))}
              </div>
            </section>
          )}

          {results.guides.length > 0 && (
            <section aria-labelledby="search-guides">
              <h2 id="search-guides" className="text-sm font-medium text-graphite mb-3">
                Guides
              </h2>
              <ul className="divide-y divide-line border-y border-line">
                {results.guides.map((g) => (
                  <li key={g.slug}>
                    <Link to="/blog/$slug" params={{ slug: g.slug }} className="group block py-5">
                      <p className="font-display text-xl font-bold tracking-[-0.03em] group-hover:underline underline-offset-4">
                        {g.title}
                      </p>
                      <p className="mt-1.5 text-graphite leading-relaxed line-clamp-2">{g.excerpt}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {results.terms.length > 0 && (
            <section aria-labelledby="search-terms">
              <h2 id="search-terms" className="text-sm font-medium text-graphite mb-3">
                Glossary
              </h2>
              <dl className="space-y-4 max-w-2xl">
                {results.terms.map((t) => (
                  <div key={t.slug}>
                    <dt className="font-semibold text-ink">
                      <a href={`/glossary#${t.slug}`} className="hover:underline underline-offset-4">
                        {t.term}
                      </a>
                    </dt>
                    <dd className="text-graphite leading-relaxed">{t.definition}</dd>
                  </div>
                ))}
              </dl>
            </section>
          )}
        </div>
      )}
    </div>
  )
}
