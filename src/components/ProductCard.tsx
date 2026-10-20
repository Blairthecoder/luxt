import { Link } from '@tanstack/react-router'
import type { ProductSummary } from '@/lib/listing'
import { getOptimizedImageUrl } from '@/lib/image'
import { formatPrice } from '@/lib/format'

export function ProductCard({ product, size = 'default' }: { product: ProductSummary; size?: 'default' | 'small' }) {
  const flag = !product.available ? 'Sold Out' : product.compareAtPrice ? 'Sale' : null
  return (
    <Link
      to="/products/$productId"
      params={{ productId: product.handle }}
      className="group flex flex-col"
    >
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
            {flag}
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
  )
}

export function ProductGrid({ products }: { products: ProductSummary[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-3 gap-y-12 sm:gap-x-4">
      {products.map((product) => (
        <ProductCard key={product.handle} product={product} />
      ))}
    </div>
  )
}

/** Horizontal scroller on small screens, four-up grid on desktop. */
export function ProductRail({ products, size }: { products: ProductSummary[]; size?: 'default' | 'small' }) {
  return (
    <div className="rail">
      {products.map((product) => (
        <ProductCard key={product.handle} product={product} size={size} />
      ))}
    </div>
  )
}
