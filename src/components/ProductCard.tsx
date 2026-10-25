import { Link } from '@tanstack/react-router'
import type { ProductSummary } from '@/lib/listing'
import { goPath } from '@/lib/affiliate'
import { getImageSrcSet, getOptimizedImageUrl, isModelPhoto } from '@/lib/image'
import { formatPrice } from '@/lib/format'

export function ProductCard({
  product,
  size = 'default',
  context = 'listing_card',
}: {
  product: ProductSummary
  size?: 'default' | 'small'
  /** GA4 affiliate_click link_context for the card's price link. */
  context?: string
}) {
  const flag = !product.available ? 'Sold Out' : product.compareAtPrice ? 'Sale' : null
  const savings = product.compareAtPrice ? product.compareAtPrice - product.price : 0
  const photo = isModelPhoto(product.image)
  return (
    <div className="group flex flex-col">
      <Link to="/products/$productId" params={{ productId: product.handle }} className="flex flex-col">
        <div className={`relative overflow-hidden rounded-xl ${size === 'small' ? 'aspect-[5/4] bg-stone' : 'aspect-square bg-mist'}`}>
          <img
            src={getOptimizedImageUrl(product.image, 600)}
            srcSet={getImageSrcSet(product.image, [240, 360, 480, 600])}
            sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
            alt={product.imageAlt ?? `${product.title} by ${product.brand}`}
            loading="lazy"
            decoding="async"
            width={600}
            height={750}
            className={`absolute inset-0 w-full h-full ${photo ? 'object-cover object-[50%_25%]' : `object-contain mix-blend-multiply ${size === 'small' ? 'p-[18%] saturate-[0.85]' : 'p-[9%]'}`} transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]`}
          />
          {flag === 'Sale' && (
            <span className="absolute top-2.5 left-2.5 rounded-full bg-signal px-2.5 py-1 text-xs font-semibold leading-none text-canvas">
              Sale
            </span>
          )}
        </div>
        <div className="pt-3 space-y-0.5">
          {flag && (
            <p className={`text-[0.8125rem] font-semibold ${flag === 'Sale' ? 'text-signal' : 'text-graphite'}`}>
              {flag === 'Sale' && savings >= 1 ? `Save ${formatPrice(savings)}` : flag}
            </p>
          )}
          <h3 className="font-sans text-[0.9375rem] font-medium tracking-[-0.01em] leading-snug text-ink line-clamp-2 group-hover:underline underline-offset-4 decoration-1">
            {product.title}
          </h3>
          <p className="text-[0.9375rem] text-graphite">{product.brand}</p>
          <p className="pt-1.5 text-[0.9375rem] font-medium text-ink">
            {formatPrice(product.price)}
            {product.compareAtPrice && (
              <span className="ml-2 font-normal text-silver line-through">{formatPrice(product.compareAtPrice)}</span>
            )}
          </p>
        </div>
      </Link>
      {/* Product pages without copy are noindex, so offer the merchant link directly as well. */}
      {!product.hasCopy && product.available && (
        <a
          href={goPath(product.handle)}
          target="_blank"
          rel="sponsored nofollow noopener"
          data-link-context={context}
          className="mt-2 max-lg:mt-0 max-lg:py-2.5 self-start text-[0.8125rem] font-medium text-graphite underline underline-offset-4 decoration-silver hover:text-ink hover:decoration-ink"
        >
          Check Price
        </a>
      )}
    </div>
  )
}

export function ProductGrid({
  products,
  context,
  dense = false,
}: {
  products: ProductSummary[]
  context?: string
  /** Five across on wide screens, for full-width listing grids. */
  dense?: boolean
}) {
  return (
    <div
      className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-10 sm:gap-x-4 ${dense ? 'xl:grid-cols-5' : ''}`}
    >
      {products.map((product) => (
        <ProductCard key={product.handle} product={product} context={context} />
      ))}
    </div>
  )
}

/** Horizontal scroller on small screens, four-up grid on desktop. */
export function ProductRail({
  products,
  size,
  context,
}: {
  products: ProductSummary[]
  size?: 'default' | 'small'
  context?: string
}) {
  return (
    <div className="rail">
      {products.map((product) => (
        <ProductCard key={product.handle} product={product} size={size} context={context} />
      ))}
    </div>
  )
}
