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
    <div className="max-w-[1400px] mx-auto px-5 sm:px-8">
      <div className="pt-10">
        <Breadcrumbs
          items={[
            { name: 'Home', path: '/' },
            { name: hub.name, path: `/category/${hub.slug}` },
            { name: product.title, path: `/products/${product.handle}` },
          ]}
        />
      </div>

      <div className="mt-10 grid lg:grid-cols-[1.15fr_1fr] gap-10 lg:gap-20">
        <div className="space-y-3">
          <div className="relative aspect-square bg-tile">
            <img
              src={getOptimizedImageUrl(product.images[imageIndex]?.src, 1100)}
              alt={`${product.title} by ${product.brand}`}
              width={1100}
              height={1100}
              className="absolute inset-0 w-full h-full object-contain p-10 mix-blend-multiply"
            />
          </div>
          {product.images.length > 1 && (
            <div className="grid grid-cols-5 sm:grid-cols-6 gap-3">
              {product.images.map((img, i) => (
                <button
                  key={img.src}
                  type="button"
                  onClick={() => setImageIndex(i)}
                  aria-label={`Show image ${i + 1}`}
                  aria-pressed={i === imageIndex}
                  className={`relative aspect-square bg-tile border ${
                    i === imageIndex ? 'border-gold' : 'border-transparent hover:border-line'
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
        </div>

        <div className="lg:pt-6">
          <p className="eyebrow text-gold">{product.brand}</p>
          <h1 className="mt-4 text-4xl sm:text-5xl text-ivory leading-[1.08]">{product.title}</h1>

          <p className="mt-6 text-2xl text-ivory">
            {formatPrice(product.price)}
            {product.compareAtPrice && (
              <span className="ml-3 text-base text-faint line-through">{formatPrice(product.compareAtPrice)}</span>
            )}
          </p>

          <p className="mt-8 text-muted leading-relaxed">
            {copy
              ? copy.summary
              : `The ${product.title} from ${product.brand} is part of our ${hub.name.toLowerCase()} collection. Review the details below, compare similar pieces, and buy securely from ${merchant}.`}
          </p>

          <div className="mt-10 space-y-4">
            <BuyButton handle={product.handle} program={product.program} available={product.available} className="w-full" />
            <p className="text-xs text-faint text-center">
              Secure checkout and discreet shipping from {merchant}
            </p>
          </div>

          <dl className="mt-12 border-t border-line">
            {facts.map(([label, value]) => (
              <div key={label} className="grid grid-cols-[140px_1fr] gap-4 py-4 border-b border-line text-sm">
                <dt className="eyebrow text-faint pt-0.5">{label}</dt>
                <dd className="text-ivory/90">{value}</dd>
              </div>
            ))}
          </dl>

          <AffiliateNotice className="mt-6" />
        </div>
      </div>

      {copy && (
        <section className="mt-20 max-w-3xl space-y-6 border-t border-line pt-14">
          <p className="eyebrow text-gold">Our Take</p>
          {copy.body?.map((paragraph) => (
            <p key={paragraph} className="text-muted leading-relaxed text-lg">
              {paragraph}
            </p>
          ))}
          {copy.bestFor && (
            <p className="text-ivory">
              <span className="eyebrow text-gold-deep mr-3">Best For</span>
              {copy.bestFor}
            </p>
          )}
          {(copy.pros?.length || copy.cons?.length) && (
            <div className="grid sm:grid-cols-2 gap-10 pt-4">
              {copy.pros?.length ? <Notes title="What We Like" items={copy.pros} /> : null}
              {copy.cons?.length ? <Notes title="Keep in Mind" items={copy.cons} /> : null}
            </div>
          )}
          {copy.faqs?.length ? (
            <div className="pt-6 space-y-6">
              <h2 className="text-3xl text-ivory">Questions People Ask</h2>
              {copy.faqs.map((faq) => (
                <div key={faq.q} className="border-b border-line pb-6">
                  <h3 className="text-xl text-ivory">{faq.q}</h3>
                  <p className="text-muted mt-2 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          ) : null}
        </section>
      )}

      <section className="mt-20 border-t border-line pt-14 grid lg:grid-cols-2 gap-14">
        <div>
          <p className="eyebrow text-gold">Before You Buy</p>
          <h2 className="mt-3 text-3xl text-ivory">Choosing a {hub.singular}</h2>
          <ol className="mt-6 space-y-4">
            {hub.buyingTips.map((tip, i) => (
              <li key={tip} className="flex gap-5 text-muted leading-relaxed">
                <span className="font-display text-2xl text-gold-deep leading-none">
                  {String(i + 1).padStart(2, '0')}
                </span>
                {tip}
              </li>
            ))}
          </ol>
        </div>
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
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      {related.length > 0 && (
        <section className="mt-20 border-t border-line pt-14">
          <p className="eyebrow text-gold">You May Also Consider</p>
          <h2 className="mt-3 mb-10 text-4xl text-ivory">Similar {hub.name}</h2>
          <ProductGrid products={related} />
        </section>
      )}
    </div>
  )
}

function Notes({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className="eyebrow text-gold-deep mb-4">{title}</h3>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item} className="text-muted leading-relaxed border-b border-line pb-2">
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}
