import { Link } from '@tanstack/react-router'
import type { ProductSummary } from '@/lib/catalog'
import { getOptimizedImageUrl } from '@/lib/image'
import { formatPrice } from '@/lib/format'

export function ProductCard({ product }: { product: ProductSummary }) {
  const discountPercent = product.compareAtPrice
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : null

  return (
    <Link
      to="/products/$productId"
      params={{ productId: product.handle }}
      className="group flex flex-col rounded-3xl bg-[#12131C] border border-[#232535] hover:border-[#4B3D55] transition-all overflow-hidden"
    >
      <div className="relative aspect-square overflow-hidden bg-white">
        <img
          src={getOptimizedImageUrl(product.image, 600)}
          alt={`${product.title} by ${product.brand}`}
          loading="lazy"
          width={600}
          height={600}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
        />
        {discountPercent ? (
          <span className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-rose-600 text-white">
            Save {discountPercent}%
          </span>
        ) : null}
        {!product.available && (
          <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-slate-800 text-slate-200">
            Out of stock
          </span>
        )}
      </div>
      <div className="flex-1 p-5 flex flex-col gap-2">
        <span className="text-[11px] font-medium tracking-wider uppercase text-amber-200/90">
          {product.brand}
        </span>
        <h3 className="text-base font-serif font-bold text-white group-hover:text-amber-200 transition-colors line-clamp-2">
          {product.title}
        </h3>
        <div className="mt-auto pt-3 flex items-baseline gap-2">
          <span className="text-lg font-bold text-white">{formatPrice(product.price)}</span>
          {product.compareAtPrice && (
            <span className="text-xs line-through text-slate-500">
              {formatPrice(product.compareAtPrice)}
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}
