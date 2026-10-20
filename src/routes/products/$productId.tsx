import { useState } from 'react'
import { Link, createFileRoute, notFound } from '@tanstack/react-router'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { BuyButton } from '@/components/BuyButton'
import { ProductGrid } from '@/components/ProductCard'
import { AffiliateNotice } from '@/components/AffiliateNotice'
import { HUBS_BY_SLUG } from '@/content/hubs'
import { postsForHub } from '@/content/posts'
import { SITE, absoluteUrl } from '@/config/site'
import { getProgram } from '@/lib/affiliate'
import { getProductData } from '@/lib/catalog'
import { formatPrice } from '@/lib/format'
import { getOptimizedImageUrl } from '@/lib/image'
import { breadcrumbJsonLd, pageHead } from '@/lib/seo'

export const Route = createFileRoute('/products/$productId')({
  loader: async ({ params }) => {
    const data = await getProductData({ data: params.productId })
    if (!data) throw notFound()
    return { ...data, hub: HUBS_BY_SLUG[data.product.hub] ?? HUBS_BY_SLUG['more-toys'] }
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {}
    const { product, copy, hub } = loaderData
    const path = `/products/${product.handle}`
    const priceText = formatPrice(product.price)
    const description =
      copy?.summary ??
      `${product.title} by ${product.brand}, ${priceText}. Compare options and specs, read our ${hub.singular.toLowerCase()} buying tips, then buy discreetly.`
    const image = product.images[0]?.src

    return pageHead({
      title: `${product.title}: Price & Details | ${SITE.shortName}`,
      description,
      path,
      image,
      // Pages stay out of the index until they carry original copy.
      noindex: !copy,
      jsonLd: [
        breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: hub.name, path: `/category/${hub.slug}` },
          { name: product.title, path },
        ]),
        {
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: product.title,
          brand: { '@type': 'Brand', name: product.brand },
          category: hub.name,
          image: product.images.slice(0, 4).map((img) => img.src),
          ...(copy ? { description: copy.summary } : {}),
          offers: {
            '@type': 'Offer',
            url: absoluteUrl(path),
            priceCurrency: 'USD',
            price: product.price.toFixed(2),
            availability: product.available
              ? 'https://schema.org/InStock'
              : 'https://schema.org/OutOfStock',
            seller: { '@type': 'Organization', name: getProgram(product.program).merchantName },
          },
        },
        ...(copy?.faqs?.length
          ? [
              {
                '@context': 'https://schema.org',
                '@type': 'FAQPage',
                mainEntity: copy.faqs.map((f) => ({
                  '@type': 'Question',
                  name: f.q,
                  acceptedAnswer: { '@type': 'Answer', text: f.a },
                })),
              },
            ]
          : []),
      ],
    })
  },
  component: ProductPage,
})

function ProductPage() {
  const { product, copy, related, hub } = Route.useLoaderData()
  const [imageIndex, setImageIndex] = useState(0)
  const merchant = getProgram(product.program).merchantName
  const options = product.variants.filter((v) => v.title !== 'Default Title')
  const guides = postsForHub(hub.slug)

  const facts: [string, string][] = [
    ['Brand', product.brand],
    ['Category', hub.name],
    ...(product.productType ? ([['Type', product.productType]] as [string, string][]) : []),
    ...(options.length ? ([['Options', options.map((v) => v.title).join(', ')]] as [string, string][]) : []),
    ['Availability', product.available ? 'In Stock' : 'Sold Out'],
    ['Sold and Shipped By', merchant],
  ]

  return (
    <div className="wrap">
      <div className="pt-6">
        <Breadcrumbs
          items={[
            { name: 'Home', path: '/' },
            { name: hub.name, path: `/category/${hub.slug}` },
            { name: product.title, path: `/products/${product.handle}` },
          ]}
        />
      </div>

      <div className="mt-8 grid lg:grid-cols-12 gap-10 lg:gap-16">
        <div className="lg:col-span-7 flex flex-col-reverse lg:flex-row gap-3">
          {product.images.length > 1 && (
            <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible lg:w-20 shrink-0">
              {product.images.map((img, i) => (
                <button
                  key={img.src}
                  type="button"
                  onClick={() => setImageIndex(i)}
                  onMouseEnter={() => setImageIndex(i)}
                  aria-label={`Show image ${i + 1}`}
                  aria-pressed={i === imageIndex}
                  className={`relative aspect-square w-16 lg:w-20 shrink-0 bg-mist transition-opacity ${
                    i === imageIndex ? 'opacity-100 ring-1 ring-inset ring-ink' : 'opacity-60 hover:opacity-100'
                  }`}
                >
                  <img
                    src={getOptimizedImageUrl(img.src, 200)}
                    alt=""
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-contain p-2 mix-blend-multiply"
                  />
                </button>
              ))}
            </div>
          )}
          <div className="relative aspect-square flex-1 bg-mist overflow-hidden">
            <img
              key={imageIndex}
              src={getOptimizedImageUrl(product.images[imageIndex]?.src, 1400)}
              alt={`${product.title} by ${product.brand}`}
              width={1400}
              height={1400}
              fetchPriority="high"
              className="absolute inset-0 w-full h-full object-contain p-[8%] mix-blend-multiply rise"
            />
          </div>
        </div>

        <div className="lg:col-span-5 lg:sticky lg:top-28 lg:self-start lg:pt-4">
          <p className="text-[0.9375rem] font-medium text-graphite">
            {product.compareAtPrice && <span className="text-signal mr-3">Sale</span>}
            {product.brand}
          </p>
          <h1 className="mt-2 font-display text-[2.25rem] sm:text-5xl font-bold tracking-[-0.04em] leading-[1.02]">
            {product.title}
          </h1>

          <p className="mt-5 text-xl font-medium">
            {formatPrice(product.price)}
            {product.compareAtPrice && (
              <span className="ml-3 text-base font-normal text-silver line-through">
                {formatPrice(product.compareAtPrice)}
              </span>
            )}
          </p>

          <p className="mt-8 text-[1.0625rem] leading-relaxed text-[#3a3a3c]">
            {copy
              ? copy.summary
              : `The ${product.title} from ${product.brand} is part of our ${hub.name.toLowerCase()} collection. Review the details below, compare similar pieces, and buy securely from ${merchant}.`}
          </p>

          <div className="mt-10 space-y-3">
            <BuyButton handle={product.handle} program={product.program} available={product.available} className="w-full" />
            <p className="text-xs text-graphite text-center">
              Secure checkout and discreet shipping from {merchant}
            </p>
          </div>

          <dl className="mt-12 border-t border-ink">
            {facts.map(([label, value]) => (
              <div key={label} className="grid grid-cols-[9rem_1fr] gap-4 py-4 border-b border-line text-sm">
                <dt className="text-graphite">{label}</dt>
                <dd className="text-ink">{value}</dd>
              </div>
            ))}
          </dl>

          <AffiliateNotice className="mt-6" />
        </div>
      </div>

      {copy && (
        <section className="mt-28 sm:mt-36 grid lg:grid-cols-12 gap-10 lg:gap-16 reveal">
          <h2 className="lg:col-span-4 display-m">
            Our Take.
          </h2>
          <div className="lg:col-span-8 max-w-3xl space-y-6">
            {copy.body?.map((paragraph) => (
              <p key={paragraph} className="lede text-[#3a3a3c]">
                {paragraph}
              </p>
            ))}
            {copy.bestFor && (
              <p className="pt-2 text-[1.0625rem]">
                <span className="font-semibold mr-2">Best For.</span>
                <span className="text-graphite">{copy.bestFor}</span>
              </p>
            )}
            {(copy.pros?.length || copy.cons?.length) && (
              <div className="grid sm:grid-cols-2 gap-10 pt-6">
                {copy.pros?.length ? <Notes title="What We Like" items={copy.pros} /> : null}
                {copy.cons?.length ? <Notes title="Keep in Mind" items={copy.cons} /> : null}
              </div>
            )}
          </div>
          {copy.faqs?.length ? (
            <>
              <h2 className="lg:col-span-4 display-m pt-10 lg:pt-16">Questions People Ask.</h2>
              <div className="lg:col-span-8 max-w-3xl lg:pt-16 border-t border-ink">
                {copy.faqs.map((faq) => (
                  <div key={faq.q} className="py-6 border-b border-line">
                    <h3 className="text-xl tracking-[-0.02em]">{faq.q}</h3>
                    <p className="text-graphite mt-2 leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </>
          ) : null}
        </section>
      )}

      <section className="mt-28 sm:mt-36 pt-14 border-t border-ink grid lg:grid-cols-2 gap-16 reveal">
        <div>
          <h2 className="display-m">
            Choosing a {hub.singular}. <span className="text-graphite">Before You Buy.</span>
          </h2>
          <ol className="mt-10 border-t border-line">
            {hub.buyingTips.map((tip, i) => (
              <li key={tip} className="grid grid-cols-[2.5rem_1fr] gap-4 py-5 border-b border-line leading-relaxed">
                <span className="font-display text-sm font-semibold text-graphite tabular-nums pt-0.5">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-[1.0625rem]">{tip}</span>
              </li>
            ))}
          </ol>
        </div>
        {guides.length > 0 && (
          <div>
            <h2 className="display-m">
              Read the Guide. <span className="text-graphite">Nightstand Notes.</span>
            </h2>
            <ul className="mt-10 border-t border-line">
              {guides.map((post) => (
                <li key={post.slug} className="border-b border-line">
                  <Link to="/blog/$slug" params={{ slug: post.slug }} className="group block py-5">
                    <span className="font-display text-xl font-semibold tracking-[-0.02em] group-hover:underline underline-offset-4 decoration-1">
                      {post.title}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      {related.length > 0 && (
        <section className="mt-28 sm:mt-36 reveal">
          <h2 className="mb-10 display-m">
            Similar {hub.name}. <span className="text-graphite">You may also consider.</span>
          </h2>
          <ProductGrid products={related} />
        </section>
      )}
    </div>
  )
}

function Notes({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className="font-sans text-[0.9375rem] font-semibold tracking-[-0.01em] mb-3">{title}</h3>
      <ul className="border-t border-line">
        {items.map((item) => (
          <li key={item} className="text-graphite leading-relaxed border-b border-line py-3">
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}
