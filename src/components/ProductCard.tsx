import { Link } from '@tanstack/react-router'
import type { ProductSummary } from '@/lib/listing'
import { goPath } from '@/lib/affiliate'
import { getOptimizedImageUrl } from '@/lib/image'
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
  return (
    <div className="group flex flex-col">
      <Link to="/products/$productId" params={{ productId: product.handle }} className="flex flex-col">
        <div className={`relative overflow-hidden ${size === 'small' ? 'aspect-[5/4] bg-stone' : 'aspect-[4/5] bg-mist'}`}>
          <img
            src={getOptimizedImageUrl(product.image, 600)}
            alt={`${product.title} by ${product.brand}`}
            loading="lazy"
            width={600}
            height={750}
            className={`absolute inset-0 w-full h-full object-contain mix-blend-multiply ${size === 'small' ? 'p-[18%] saturate-[0.85]' : 'p-[9%]'} transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]`}
          />
        </div>
        <div className="pt-4 space-y-0.5">
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
          className="mt-2 self-start text-[0.8125rem] font-medium text-graphite underline underline-offset-4 decoration-silver hover:text-ink hover:decoration-ink"
        >
          Check Price
        </a>
      )}
    </div>
  )
}

export function ProductGrid({ products, context }: { products: ProductSummary[]; context?: string }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-3 gap-y-12 sm:gap-x-4">
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
