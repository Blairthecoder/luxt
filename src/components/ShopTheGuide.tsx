import { useId, useState } from 'react'
import { Link } from '@tanstack/react-router'
import { getProgram, goPath } from '@/lib/affiliate'
import { addToCart } from '@/lib/cart'
import { formatPrice } from '@/lib/format'
import { getOptimizedImageUrl } from '@/lib/image'
import type { PageProductCard } from '@/server/product-links'

/**
 * Products featured in a guide or story (src/content/product-links.ts).
 * Lovense cards send readers to the merchant through /go/ ("Check Price");
 * lingerie from our own Shopify store adds straight to the cart.
 */
export function ShopTheGuide({
  products,
  title = 'Shop This Guide',
  context = 'guide_products',
  className = '',
}: {
  products: PageProductCard[]
  title?: string
  /** GA4 link_context for the card buttons. */
  context?: string
  className?: string
}) {
  if (!products.length) return null
  const affiliate = products.some((p) => p.program !== 'shopify')
  const ownStore = products.some((p) => p.program === 'shopify')

  return (
    <section aria-labelledby={`${context}-title`} className={className}>
      <h2 id={`${context}-title`} className="display-m">
        {title}
      </h2>
      <p className="mt-3 text-xs text-graphite leading-relaxed">
        {affiliate && 'Check Price links go to Lovense, and we may earn a commission at no extra cost to you. '}
        {ownStore && `Lingerie is sold and shipped by ${getProgram('shopify').merchantName}, our own store, with checkout on Shopify. `}
        <Link to="/disclosure" className="text-ink underline underline-offset-2">
          How We Make Money
        </Link>
      </p>
      <ul className="mt-8 grid sm:grid-cols-2 gap-3">
        {products.map((p) => (
          <li key={p.handle} className="grid grid-cols-[5.5rem_1fr] gap-4 p-4 bg-stone rounded-2xl">
            <Link to="/products/$productId" params={{ productId: p.handle }} className="relative block aspect-[4/5] bg-canvas rounded-xl overflow-hidden">
              <img
                src={getOptimizedImageUrl(p.image, 240)}
                alt={`${p.title} by ${p.brand}`}
                width={240}
                height={300}
                loading="lazy"
                className={`absolute inset-0 w-full h-full ${p.program === 'shopify' ? 'object-cover' : 'object-contain p-2 mix-blend-multiply'}`}
              />
            </Link>
            <div className="min-w-0 flex flex-col">
              <p className="text-[0.8125rem] text-graphite">{p.brand}</p>
              <h3 className="mt-0.5 font-sans text-[0.9375rem] font-semibold leading-snug line-clamp-2">
                <Link to="/products/$productId" params={{ productId: p.handle }} className="hover:underline underline-offset-4">
                  {p.title}
                </Link>
              </h3>
              <p className="mt-1 text-sm font-medium">
                {formatPrice(p.price)}
                {p.compareAtPrice && <s className="ml-2 font-normal text-silver">{formatPrice(p.compareAtPrice)}</s>}
              </p>
              {p.note && <p className="mt-1.5 text-[0.8125rem] text-graphite leading-snug line-clamp-3">{p.note}</p>}
              <div className="mt-auto pt-3">
                {p.program === 'shopify' ? (
                  <QuickAdd product={p} context={context} />
                ) : (
                  <a
                    href={goPath(p.handle)}
                    target="_blank"
                    rel="sponsored nofollow noopener"
                    data-link-context={context}
                    className="btn !min-h-[2.5rem] !px-4 !text-[0.8125rem]"
                  >
                    Check Price
                  </a>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}

function QuickAdd({ product, context }: { product: PageProductCard; context: string }) {
  const id = useId()
  const open = product.variants.filter((v) => v.available)
  const [variantId, setVariantId] = useState(open[0]?.id)
  const [added, setAdded] = useState(false)
  const variant = product.variants.find((v) => v.id === variantId)
  const hasOptions = product.variants.length > 1 || (product.variants[0] && product.variants[0].title !== 'Default Title')

  if (!variant) {
    return (
      <Link to="/products/$productId" params={{ productId: product.handle }} className="more text-[0.8125rem]">
        See Sizes
      </Link>
    )
  }

  return (
    <div className="space-y-2">
      {hasOptions && (
        <>
          <label htmlFor={id} className="sr-only">
            Size and color for {product.title}
          </label>
          <select
            id={id}
            value={variantId}
            onChange={(e) => {
              setVariantId(Number(e.target.value))
              setAdded(false)
            }}
            className="w-full rounded-lg border border-line bg-canvas px-2.5 py-2 text-[0.8125rem]"
          >
            {open.map((v) => (
              <option key={v.id} value={v.id}>
                {v.title}
              </option>
            ))}
          </select>
        </>
      )}
      <button
        type="button"
        data-link-context={`${context}_add_to_cart`}
        onClick={() => {
          addToCart({
            variantId: variant.id,
            handle: product.handle,
            title: product.title,
            variantTitle: hasOptions ? variant.title : '',
            price: variant.price,
            image: product.image,
          })
          setAdded(true)
        }}
        className="btn !min-h-[2.5rem] !px-4 !text-[0.8125rem]"
      >
        Add to Cart
      </button>
      <p aria-live="polite" className="text-[0.8125rem] min-h-4">
        {added && (
          <>
            Added.{' '}
            <Link to="/cart" className="underline underline-offset-2">
              View cart
            </Link>
          </>
        )}
      </p>
    </div>
  )
}
