import { Link, createFileRoute } from '@tanstack/react-router'
import { ProductCard } from '@/components/ProductCard'
import { MobileSearchField } from '@/components/MobileSearchField'
import { Carousel } from '@/components/Carousel'
import { AffiliateNotice } from '@/components/AffiliateNotice'
import { HUBS } from '@/content/hubs'
import { COLLECTIONS_BY_SLUG } from '@/content/collections'
import { POSTS, POSTS_BY_SLUG } from '@/content/posts'
import { BRAND_TILES, FEATURED_HUBS } from '@/content/shortcuts'
import { SITE } from '@/config/site'
import { getHomeData } from '@/lib/catalog'
import { formatPrice } from '@/lib/format'
import { getOptimizedImageUrl } from '@/lib/image'
import type { ProductSummary } from '@/lib/listing'
import { organizationJsonLd, pageHead } from '@/lib/seo'
import { absoluteUrl } from '@/config/site'

function itemList(name: string, products: ProductSummary[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    itemListElement: products.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: absoluteUrl(`/products/${p.handle}`),
      name: p.title,
    })),
  }
}

export const Route = createFileRoute('/')({
  loader: () => getHomeData(),
  head: ({ loaderData }) => {
    const from = loaderData?.firstPicks.length ? Math.min(...loaderData.firstPicks.map((p) => p.price)) : null
    return pageHead({
      title: `Adult Toys for Confidence & Pleasure | ${SITE.shortName}`,
      description: from
        ? `Adult toys that help you and your partner feel comfortable, confident and close, from ${formatPrice(from)}. Honest guides, body-safe picks, discreet delivery.`
        : SITE.description,
      path: '/',
      jsonLd: [
        organizationJsonLd(),
        { '@context': 'https://schema.org', '@type': 'WebSite', name: SITE.name, url: SITE.url },
        ...(loaderData
          ? [
              itemList('Easy First Picks', loaderData.firstPicks),
              itemList('For Her', loaderData.forHer),
              itemList('For Him', loaderData.forHim),
              itemList('For Couples', loaderData.forCouples),
            ].filter((l) => l.itemListElement.length > 0)
          : []),
      ],
    })
  },
  component: HomePage,
})

const AUDIENCES = [
  {
    key: 'forHer',
    id: 'for-her',
    slug: 'sex-toys-for-women',
    label: 'For Her',
    line: 'Toys that put her pleasure first, from quiet, palm-sized starters to cult-favorite air-pulse toys. Go at whatever pace feels right.',
    links: ['clitoral-vibrators', 'wand-vibrators', 'rabbit-vibrators', 'bullet-vibrators'],
  },
  {
    key: 'forHim',
    id: 'for-him',
    slug: 'sex-toys-for-men',
    label: 'For Him',
    line: 'Strokers, rings and prostate toys that make it easier to relax and enjoy yourself. Many of the best cost less than a nice dinner.',
    links: ['automatic-strokers', 'prostate-vibrators', 'vibrating-cock-rings', 'pocket-pussies'],
  },
  {
    key: 'forCouples',
    id: 'for-couples',
    slug: 'couples-sex-toys',
    label: 'For Couples',
    line: 'Wearables and app-controlled toys that help you feel closer and try something new together, in the same room or miles apart.',
    links: ['app-controlled-sex-toys', 'remote-control-vibrators', 'vibrating-cock-rings', 'lovense'],
  },
] as const

const PROMISES = [
  ['Discreet Delivery', 'A private checkout with our retail partners, and a guide to buying discreetly.', 'box'],
  ['Body-Safe Picks', 'We favor medical-grade silicone, glass and steel from brands that list their materials.', 'drop'],
  ['Honest Guides', 'Plain answers and real specs, so you know what you are getting before you buy.', 'book'],
  ['Comfort First', 'Gentle starting points and no judgment, solo or together.', 'heart'],
] as const

/** Small line marks for the trust row. Drawn inline, no icon library. */
function Mark({ name }: { name: (typeof PROMISES)[number][2] }) {
  const paths: Record<typeof name, string> = {
    box: 'M4 8l8-4 8 4v8l-8 4-8-4V8zm0 0l8 4 8-4M12 12v8',
    drop: 'M12 3.5c3 4 6 7.2 6 10.5a6 6 0 01-12 0c0-3.3 3-6.5 6-10.5z',
    book: 'M5 5.5A2.5 2.5 0 017.5 3H19v15H7.5A2.5 2.5 0 005 20.5v-15zM5 20.5A2.5 2.5 0 017.5 18H19v3H7.5',
    heart: 'M12 20s-7-4.4-7-10a4 4 0 017-2.6A4 4 0 0119 10c0 5.6-7 10-7 10z',
  }
  return (
    <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true" className="shrink-0 text-ink">
      <path d={paths[name]} fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  )
}

type Tile = { kind: 'shop' | 'hub'; slug: string; label?: string; name: string; line: string; image: string | null; count: number }

function TileLink({ tile, className, children }: { tile: Tile; className?: string; children: React.ReactNode }) {
  return tile.kind === 'hub' ? (
    <Link to="/category/$slug" params={{ slug: tile.slug }} className={className}>
      {children}
    </Link>
  ) : (
    <Link to="/shop/$slug" params={{ slug: tile.slug }} className={className}>
      {children}
    </Link>
  )
}

function TileImage({ tile, width, className }: { tile: Tile; width: number; className: string }) {
  if (!tile.image) return null
  return (
    <img
      src={getOptimizedImageUrl(tile.image, width)}
      alt=""
      loading="lazy"
      width={width}
      height={width}
      className={`object-contain mix-blend-multiply saturate-[0.85] ${className}`}
    />
  )
}

const PROMO_COPY: Record<string, { eyebrow: string; title: string; line: string; cta: string; tone: string }> = {
  'remote-control-vibrators': {
    eyebrow: 'Gift Ideas',
    title: 'Gifts That Feel Thoughtful, Not Awkward',
    line: 'Remote-control favorites for birthdays, anniversaries and just because.',
    cta: 'Shop Remote Picks',
    tone: 'bg-blush',
  },
  'sex-toys-for-beginners': {
    eyebrow: 'New to This?',
    title: 'Gentle Places to Start',
    line: 'Small, simple, body-safe toys that make a first try feel relaxed instead of intimidating.',
    cta: 'Shop Beginner Picks',
    tone: 'bg-sand',
  },
  'quiet-vibrators': {
    eyebrow: 'Shared Walls',
    title: 'Quiet Enough to Relax',
    line: 'Low-noise vibrators for roommates, kids down the hall or simply peace of mind.',
    cta: 'Shop Quiet Picks',
    tone: 'bg-mist',
  },
  'app-controlled-sex-toys': {
    eyebrow: 'Closer, Even Apart',
    title: 'Hand Over the Controls',
    line: 'App and remote toys for date nights in, playful days out and long-distance love.',
    cta: 'Shop App-Controlled',
    tone: 'bg-petal',
  },
}

function PromoPair({ tiles: all }: { tiles: Tile[] }) {
  const tiles = all.filter((t) => PROMO_COPY[t.slug])
  if (!tiles.length) return null
  return (
    <section className={`wrap pt-10 sm:pt-20 grid gap-4 reveal ${tiles.length > 1 ? 'md:grid-cols-2' : ''}`}>
      {tiles.map((tile) => {
        const copy = PROMO_COPY[tile.slug]
        return (
          <TileLink
            key={tile.slug}
            tile={tile}
            className={`group relative grid grid-cols-[1fr_38%] md:[&:only-child]:grid-cols-[1fr_22%] items-center gap-4 overflow-hidden rounded-2xl ${copy.tone} p-7 sm:p-10 min-h-[15rem]`}
          >
            <span className="block">
              <span className="eyebrow text-graphite">{copy.eyebrow}</span>
              <span className="mt-2 block font-display text-[1.625rem] sm:text-[2rem] font-semibold leading-[1.08] tracking-[-0.03em]">
                {copy.title}
              </span>
              <span className="mt-3 block text-[0.9375rem] text-graphite leading-relaxed max-w-xs">{copy.line}</span>
              <span className="mt-5 more">{copy.cta}</span>
            </span>
            <span className="relative block aspect-square">
              <TileImage
                tile={tile}
                width={360}
                className="absolute inset-0 w-full h-full p-[8%] transition-transform duration-700 group-hover:scale-[1.05]"
              />
            </span>
          </TileLink>
        )
      })}
    </section>
  )
}

const EDITOR_GUIDES = ['sex-toys-for-beginners', 'how-to-use-sex-toys-with-a-partner', 'how-to-clean-sex-toys']

function ProductRow({ products }: { products: ProductSummary[] }) {
  return (
    <div className="rail">
      {products.map((product) => (
        <ProductCard key={product.handle} product={product} size="small" context="home_card" />
      ))}
    </div>
  )
}

function HomePage() {
  const data = Route.useLoaderData()
  const { hubCounts, firstPicks, splurge, shortcuts, promoTiles, categoryTiles, topPicks, topPicksLabel, onSale } = data
  const hubs = HUBS.filter((hub) => (hubCounts[hub.slug] ?? 0) > 0)
  const otherHubs = hubs.filter((h) => !FEATURED_HUBS.includes(h.slug))
  const [lead] = POSTS
  const editorGuides = EDITOR_GUIDES.map((slug) => POSTS_BY_SLUG[slug]).filter((p) => p !== undefined && p !== lead)

  return (
    <div>
      <section className="wrap pt-3 sm:pt-6">
        <MobileSearchField className="mb-3" />
        <div className="rounded-3xl bg-blush px-5 sm:px-12 lg:px-16 pt-7 sm:pt-20 pb-6 sm:pb-12">
          <div className="grid lg:grid-cols-12 max-sm:gap-0 gap-8 items-end">
            <div className="lg:col-span-7 rise">
              <p className="eyebrow text-graphite">For You. For Two. No Judgment.</p>
              <h1 className="mt-3 sm:mt-4 display-l max-sm:!text-[2.125rem]">Adult Toys for Confidence, Comfort and Connection.</h1>
            </div>
            <div className="lg:col-span-5 rise-delay">
              <p className="lede text-graphite max-sm:hidden">
                Feeling good should feel easy. We help you find toys that suit your body, your pace and your
                relationship, with honest advice and discreet delivery.
              </p>
              <div className="mt-5 sm:mt-7 flex flex-wrap gap-2 sm:gap-3">
                <Link to="/shop/$slug" params={{ slug: 'sex-toys-under-50' }} className="btn max-sm:!px-4 max-sm:!text-sm whitespace-nowrap">
                  Shop Picks Under $50
                </Link>
                <Link to="/gifts" className="btn-ghost bg-canvas border-transparent max-sm:!px-4 max-sm:!text-sm whitespace-nowrap">
                  Find a Gift
                </Link>
              </div>
            </div>
          </div>

          {shortcuts.length > 0 && (
            <nav aria-label="Shop by need" className="mt-7 sm:mt-16 shortcuts">
              {shortcuts.map((tile) => (
                <TileLink key={tile.slug} tile={tile} className="group shrink-0 w-[4.75rem] sm:w-[6rem] lg:w-auto flex flex-col items-center text-center">
                  <span className="relative block w-full aspect-square rounded-full bg-canvas overflow-hidden ring-1 ring-ink/5 group-hover:ring-ink/40 transition">
                    <TileImage tile={tile} width={240} className="absolute inset-0 w-full h-full p-[20%] transition-transform duration-700 group-hover:scale-[1.06]" />
                  </span>
                  <span className="mt-3 text-[0.8125rem] sm:text-sm font-semibold tracking-[-0.01em] leading-tight">
                    {tile.label ?? tile.name}
                  </span>
                </TileLink>
              ))}
            </nav>
          )}
        </div>
      </section>

      <section className="wrap pt-8">
        <ul className="max-sm:-mx-5 max-sm:px-5 max-sm:flex max-sm:gap-3 max-sm:overflow-x-auto max-sm:snap-x max-sm:scroll-pl-5 max-sm:[scrollbar-width:none] sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-5 sm:border-y border-line sm:py-7">
          {PROMISES.map(([title, body, mark]) => (
            <li key={title} className="flex gap-3.5 max-sm:w-[17rem] max-sm:shrink-0 max-sm:snap-start max-sm:rounded-2xl max-sm:bg-mist max-sm:p-4">
              <Mark name={mark} />
              <span>
                <span className="block text-sm font-semibold tracking-[-0.01em]">{title}</span>
                <span className="mt-0.5 block text-[0.8125rem] text-graphite leading-relaxed">{body}</span>
              </span>
            </li>
          ))}
        </ul>
      </section>

      {firstPicks.length > 0 && (
        <section className="wrap pt-10 sm:pt-20 reveal">
          <div className="section-head">
            <div>
              <h2 className="display-m">Easy First Picks</h2>
              <p className="mt-2 text-graphite">Gentle, simple to use and under $50. A comfortable place to start, solo or together.</p>
            </div>
            <Link to="/shop/$slug" params={{ slug: 'sex-toys-under-50' }} className="more hidden sm:inline-flex">
              Shop Under $50
            </Link>
          </div>
          <ProductRow products={firstPicks} />
        </section>
      )}

      <PromoPair tiles={promoTiles.slice(0, 2)} />

      {categoryTiles.length > 0 && (
        <section className="wrap pt-10 sm:pt-24 reveal">
          <div className="section-head">
            <h2 className="display-m">Featured Categories</h2>
            <Link to="/blog" className="more hidden sm:inline-flex">
              Not Sure? Read the Guides
            </Link>
          </div>
          <ul className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {categoryTiles.map((tile) => (
              <li key={tile.slug}>
                <TileLink tile={tile} className="group block">
                  <span className="relative block aspect-[4/3] rounded-2xl bg-stone overflow-hidden">
                    <TileImage tile={tile} width={420} className="absolute inset-0 w-full h-full p-[16%] transition-transform duration-700 group-hover:scale-[1.05]" />
                  </span>
                  <span className="mt-3 flex items-baseline justify-between gap-3">
                    <span className="font-display text-lg font-semibold tracking-[-0.02em] group-hover:underline underline-offset-4 decoration-1">
                      {tile.name}
                    </span>
                    <span className="text-xs text-graphite tabular-nums">{tile.count.toLocaleString()}</span>
                  </span>
                </TileLink>
              </li>
            ))}
          </ul>
        </section>
      )}

      {topPicks.length > 0 && (
        <section className="wrap pt-10 sm:pt-24 reveal">
          <Carousel
            title={topPicksLabel}
            action={
              <Link to="/shop/$slug" params={{ slug: 'sex-toys-under-100' }} className="more hidden md:inline-flex">
                Shop Under $100
              </Link>
            }
          >
            {topPicks.map((product) => (
              <ProductCard key={product.handle} product={product} context="home_card" />
            ))}
          </Carousel>
        </section>
      )}

      {AUDIENCES.map((a) => {
        const products = data[a.key]
        return (
          <section key={a.slug} id={a.id} className="scroll-mt-28 wrap pt-10 sm:pt-24 reveal">
            <div className="rounded-3xl border border-line p-6 sm:p-10">
              <div className="grid lg:grid-cols-12 gap-6 items-end mb-8">
                <div className="lg:col-span-6">
                  <h2 className="display-m">{a.label}</h2>
                  <p className="mt-3 text-graphite leading-relaxed max-w-lg">{a.line}</p>
                </div>
                <div className="lg:col-span-6 flex flex-wrap lg:justify-end gap-2">
                  {a.links.map((slug) => (
                    <Link key={slug} to="/shop/$slug" params={{ slug }} className="chip">
                      {COLLECTIONS_BY_SLUG[slug]?.name}
                    </Link>
                  ))}
                  <Link to="/shop/$slug" params={{ slug: a.slug }} className="chip !bg-ink !border-ink text-canvas">
                    Shop All {a.label}
                  </Link>
                </div>
              </div>
              {products.length > 0 && <ProductRow products={products} />}
            </div>
          </section>
        )
      })}

      <PromoPair tiles={promoTiles.slice(2, 4)} />

      {onSale.length > 0 && (
        <section className="wrap pt-10 sm:pt-24 reveal">
          <Carousel
            title="On Sale Now"
            action={
              <Link to="/shop/$slug" params={{ slug: 'lovense' }} className="more hidden md:inline-flex">
                Shop All
              </Link>
            }
          >
            {onSale.map((product) => (
              <ProductCard key={product.handle} product={product} context="home_card" />
            ))}
          </Carousel>
        </section>
      )}

      {splurge.length > 0 && (
        <section className="wrap pt-10 sm:pt-24 grid lg:grid-cols-12 gap-10 reveal">
          <div className="lg:col-span-4">
            <h2 className="display-m">When You Want to Treat Yourself</h2>
            <p className="mt-4 text-graphite leading-relaxed max-w-xs">
              Quieter motors, softer materials and builds that last. Three we think are worth it.
            </p>
            <Link to="/shop/$slug" params={{ slug: 'luxury-sex-toys' }} className="mt-6 more">
              Shop Premium Picks
            </Link>
          </div>
          <ul className="lg:col-span-8 border-t border-ink">
            {splurge.map((p) => (
              <li key={p.handle} className="border-b border-line">
                <Link
                  to="/products/$productId"
                  params={{ productId: p.handle }}
                  className="group grid grid-cols-[4.5rem_1fr_auto] sm:grid-cols-[6rem_1fr_auto] items-center gap-5 py-4"
                >
                  <span className="relative block aspect-square rounded-xl bg-stone overflow-hidden">
                    <img
                      src={getOptimizedImageUrl(p.image, 240)}
                      alt={`${p.title} by ${p.brand}`}
                      loading="lazy"
                      width={240}
                      height={240}
                      className="absolute inset-0 w-full h-full object-contain p-[14%] mix-blend-multiply saturate-[0.85]"
                    />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-display text-lg sm:text-xl font-semibold tracking-[-0.02em] leading-snug group-hover:underline underline-offset-4 decoration-1">
                      {p.title}
                    </span>
                    <span className="block mt-0.5 text-sm text-graphite">
                      {p.brand}
                      {p.why && <span className="hidden sm:inline"> · {p.why}</span>}
                    </span>
                  </span>
                  <span className="text-[0.9375rem] font-medium tabular-nums">
                    {formatPrice(p.price)}
                    {p.compareAtPrice && (
                      <span className="block text-xs font-normal text-silver line-through text-right">{formatPrice(p.compareAtPrice)}</span>
                    )}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="wrap pt-10 sm:pt-24 reveal">
        <div className="section-head">
          <h2 className="display-m">Shop by Brand</h2>
        </div>
        <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {BRAND_TILES.filter((b) => COLLECTIONS_BY_SLUG[b.slug]).map((b) => (
            <li key={b.slug}>
              <Link
                to="/shop/$slug"
                params={{ slug: b.slug }}
                className="group flex flex-col items-center justify-center text-center h-36 rounded-2xl border border-line px-4 hover:border-ink transition-colors"
              >
                <span className="font-display text-2xl font-bold tracking-[-0.04em]">{b.name}</span>
                <span className="mt-2 text-xs text-graphite leading-snug">{b.line}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-16 sm:mt-24 bg-plum text-canvas">
        <div className="wrap py-16 sm:py-24 grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5 reveal">
            <p className="eyebrow text-petal">Meet {SITE.guidesName}</p>
            <h2 className="mt-4 display-m">Picked and Explained by People Who Want You to Feel Good.</h2>
            <p className="mt-5 text-canvas/70 leading-relaxed max-w-md">
              {SITE.editorialTeam} compare materials, noise, power and price so you can choose without guesswork. We
              write the way a trusted friend would talk: plainly, kindly and without judgment.
            </p>
            <Link to="/blog" className="mt-8 btn btn-light">
              Read {SITE.guidesName}
            </Link>
          </div>
          <ul className="lg:col-span-6 lg:col-start-7 border-t border-plum-line reveal">
            {[lead, ...editorGuides].filter((p) => p !== undefined).map((post) => (
              <li key={post.slug} className="border-b border-plum-line">
                <Link to="/blog/$slug" params={{ slug: post.slug }} className="group block py-6">
                  <span className="block font-display text-xl sm:text-2xl font-semibold tracking-[-0.02em] text-canvas/90 group-hover:text-canvas">
                    {post.title}
                  </span>
                  <span className="mt-1.5 block text-sm text-canvas/60 leading-relaxed line-clamp-2">{post.excerpt}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="wrap pt-10 sm:pt-24 grid lg:grid-cols-12 gap-10 reveal">
        <h2 className="lg:col-span-4 display-m">Adult Toys That Help You Feel at Ease</h2>
        <div className="lg:col-span-8 grid md:grid-cols-2 gap-x-10 gap-y-5 text-[0.9375rem] leading-relaxed text-[#3a3a3c]">
          <p>
            The right toy should make you feel more comfortable in your body and more confident asking for what you
            want. That might be a small{' '}
            <Link to="/shop/$slug" params={{ slug: 'bullet-vibrators' }} className="underline underline-offset-4">
              bullet vibrator
            </Link>{' '}
            for a first try, a{' '}
            <Link to="/shop/$slug" params={{ slug: 'vibrating-cock-rings' }} className="underline underline-offset-4">
              vibrating ring
            </Link>{' '}
            to share with a partner or a{' '}
            <Link to="/shop/$slug" params={{ slug: 'quiet-vibrators' }} className="underline underline-offset-4">
              quiet vibrator
            </Link>{' '}
            you can relax with at home.
          </p>
          <p>
            Every product here is sold and shipped by our retail partners. We focus on body-safe
            materials, brands that stand behind their products and honest notes on what each toy does well. Pair any
            toy with a{' '}
            <Link to="/shop/$slug" params={{ slug: 'water-based-lube' }} className="underline underline-offset-4">
              water-based lube
            </Link>{' '}
            and you are ready to go.
          </p>
          {otherHubs.length > 0 && (
            <p className="md:col-span-2 text-sm text-graphite">
              Also browse{' '}
              {otherHubs.map((hub, i) => (
                <span key={hub.slug}>
                  {i > 0 && (i === otherHubs.length - 1 ? ' and ' : ', ')}
                  <Link to="/category/$slug" params={{ slug: hub.slug }} className="text-ink underline underline-offset-4 decoration-silver">
                    {hub.name}
                  </Link>
                </span>
              ))}
              .
            </p>
          )}
        </div>
      </section>

      <section className="wrap pt-16">
        <AffiliateNotice />
      </section>
    </div>
  )
}

