import { useState } from 'react'
import { createFileRoute, notFound } from '@tanstack/react-router'
import { CheckCircle2, MinusCircle, PlusCircle, ShieldCheck, Truck } from 'lucide-react'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { BuyButton } from '@/components/BuyButton'
import { ProductCard } from '@/components/ProductCard'
import { AffiliateNotice } from '@/components/AffiliateNotice'
import { HUBS_BY_SLUG } from '@/content/hubs'
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

  const facts: [string, string][] = [
    ['Brand', product.brand],
    ['Category', hub.name],
    ...(product.productType ? ([['Type', product.productType]] as [string, string][]) : []),
    ...(options.length ? ([['Options', options.map((v) => v.title).join(', ')]] as [string, string][]) : []),
    ['Price', formatPrice(product.price)],
    ['Availability', product.available ? 'In stock' : 'Out of stock'],
    ['Sold and shipped by', merchant],
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-14">
      <Breadcrumbs
        items={[
          { name: 'Home', path: '/' },
          { name: hub.name, path: `/category/${hub.slug}` },
          { name: product.title, path: `/products/${product.handle}` },
        ]}
      />

      <div className="grid lg:grid-cols-2 gap-10">
        <div className="space-y-3">
          <div className="aspect-square rounded-3xl overflow-hidden bg-white">
            <img
              src={getOptimizedImageUrl(product.images[imageIndex]?.src, 1000)}
              alt={`${product.title} by ${product.brand}`}
              width={1000}
              height={1000}
              className="w-full h-full object-contain"
            />
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto">
              {product.images.map((img, i) => (
                <button
                  key={img.src}
                  type="button"
                  onClick={() => setImageIndex(i)}
                  aria-label={`Show image ${i + 1}`}
                  className={`w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden bg-white border-2 ${
                    i === imageIndex ? 'border-amber-300' : 'border-transparent'
                  }`}
                >
                  <img
                    src={getOptimizedImageUrl(img.src, 160)}
                    alt=""
                    loading="lazy"
                    className="w-full h-full object-contain"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-wider text-amber-200/90">{product.brand}</p>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white">{product.title}</h1>
          </div>

          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-bold text-white">{formatPrice(product.price)}</span>
            {product.compareAtPrice && (
              <span className="text-base line-through text-slate-500">
                {formatPrice(product.compareAtPrice)}
              </span>
            )}
          </div>

          {copy ? (
            <p className="text-slate-300 leading-relaxed">{copy.summary}</p>
          ) : (
            <p className="text-slate-300 leading-relaxed">
              The {product.title} from {product.brand} is part of our {hub.name.toLowerCase()} collection.
              Check the details below, compare it with similar picks, and buy securely from {merchant}.
            </p>
          )}

          <div className="space-y-3">
            <BuyButton handle={product.handle} program={product.program} available={product.available} className="w-full sm:w-auto" />
            <ul className="text-xs text-slate-400 space-y-1.5">
              <li className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-emerald-400" /> Ships discreetly from {merchant}
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> Secure checkout on {merchant}'s site
              </li>
            </ul>
            <AffiliateNotice />
          </div>

          <dl className="rounded-2xl border border-[#232535] divide-y divide-[#232535] text-sm">
            {facts.map(([label, value]) => (
              <div key={label} className="grid grid-cols-3 gap-4 px-4 py-3">
                <dt className="text-slate-400">{label}</dt>
                <dd className="col-span-2 text-slate-200">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {copy && (
        <section className="max-w-3xl space-y-6">
          {copy.body?.map((paragraph) => (
            <p key={paragraph} className="text-slate-300 leading-relaxed">
              {paragraph}
            </p>
          ))}
          {copy.bestFor && (
            <p className="text-slate-200">
              <strong>Best for:</strong> {copy.bestFor}
            </p>
          )}
          {(copy.pros?.length || copy.cons?.length) && (
            <div className="grid sm:grid-cols-2 gap-6">
              {copy.pros?.length ? (
                <ProsCons title="What we like" items={copy.pros} positive />
              ) : null}
              {copy.cons?.length ? <ProsCons title="Keep in mind" items={copy.cons} /> : null}
            </div>
          )}
          {copy.faqs?.length ? (
            <div className="space-y-4">
              <h2 className="text-xl font-serif font-bold text-white">Questions people ask</h2>
              {copy.faqs.map((faq) => (
                <div key={faq.q}>
                  <h3 className="font-semibold text-slate-100">{faq.q}</h3>
                  <p className="text-slate-300 mt-1">{faq.a}</p>
                </div>
              ))}
            </div>
          ) : null}
        </section>
      )}

      <section aria-labelledby="tips" className="rounded-3xl bg-[#10121B] border border-[#212332] p-6 max-w-3xl">
        <h2 id="tips" className="text-lg font-serif font-bold text-white mb-3">
          Buying a {hub.singular.toLowerCase()}? What to know
        </h2>
        <ul className="space-y-2">
          {hub.buyingTips.map((tip) => (
            <li key={tip} className="flex gap-2 text-sm text-slate-300">
              <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0 text-emerald-400" />
              {tip}
            </li>
          ))}
        </ul>
      </section>

      {related.length > 0 && (
        <section aria-labelledby="related">
          <h2 id="related" className="text-xl font-serif font-bold text-white mb-5">
            Similar {hub.name.toLowerCase()}
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {related.map((p) => (
              <ProductCard key={p.handle} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

function ProsCons({ title, items, positive = false }: { title: string; items: string[]; positive?: boolean }) {
  const Icon = positive ? PlusCircle : MinusCircle
  return (
    <div>
      <h3 className="font-semibold text-white mb-2">{title}</h3>
      <ul className="space-y-1.5">
        {items.map((item) => (
          <li key={item} className="flex gap-2 text-sm text-slate-300">
            <Icon className={`w-4 h-4 mt-0.5 flex-shrink-0 ${positive ? 'text-emerald-400' : 'text-amber-300'}`} />
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}
