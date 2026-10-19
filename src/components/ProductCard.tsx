import { Link } from '@tanstack/react-router'
import type { ProductSummary } from '@/lib/listing'
import { getOptimizedImageUrl } from '@/lib/image'
import { formatPrice } from '@/lib/format'

export function ProductCard({ product }: { product: ProductSummary }) {
  return (
    <Link
      to="/products/$productId"
      params={{ productId: product.handle }}
      className="group flex flex-col"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-tile">
        <img
          src={getOptimizedImageUrl(product.image, 600)}
          alt={`${product.title} by ${product.brand}`}
          loading="lazy"
          width={600}
          height={750}
          className="absolute inset-0 w-full h-full object-contain p-6 mix-blend-multiply transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
        {product.compareAtPrice ? (
          <span className="eyebrow absolute top-3 left-3 bg-ink text-gold px-2.5 py-1">Sale</span>
        ) : null}
        {!product.available && (
          <span className="eyebrow absolute top-3 right-3 bg-ink/80 text-muted px-2.5 py-1">Sold Out</span>
        )}
      </div>
      <div className="pt-4 space-y-1.5">
        <p className="eyebrow text-gold-deep">{product.brand}</p>
        <h3 className="font-display text-lg leading-snug text-ivory group-hover:text-gold transition-colors line-clamp-2">
          {product.title}
        </h3>
        <p className="text-sm text-ivory/90">
          {formatPrice(product.price)}
          {product.compareAtPrice && (
            <span className="ml-2 text-faint line-through">{formatPrice(product.compareAtPrice)}</span>
          )}
        </p>
      </div>
    </Link>
  )
}

export function ProductGrid({ products }: { products: ProductSummary[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-10 sm:gap-x-8">
      {products.map((product) => (
        <ProductCard key={product.handle} product={product} />
      ))}
    </div>
  )
}
