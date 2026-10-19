import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { Product } from '@/data/products'
import { useCart } from '@/context/CartContext'
import { getOptimizedImageUrl } from '@/lib/image'
import { Star, ShoppingBag, Check, Eye } from 'lucide-react'

export function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart()
  const [selectedVariantId, setSelectedVariantId] = useState(
    product.variants[0]?.id || ''
  )
  const [isAdded, setIsAdded] = useState(false)

  const selectedVariant =
    product.variants.find((v) => v.id === selectedVariantId) || product.variants[0]

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product, selectedVariantId, 1)
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 2000)
  }

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null

  return (
    <div className="group relative flex flex-col rounded-3xl bg-[#12131C] border border-[#232535] hover:border-[#4B3D55] transition-all duration-300 hover:shadow-2xl hover:shadow-rose-950/20 overflow-hidden">
      
      {/* Top Media Area */}
      <Link
        to="/products/$productId"
        params={{ productId: product.id.toString() }}
        className="block relative w-full aspect-[4/3] sm:aspect-square overflow-hidden bg-[#0A0B10]"
      >
        <img
          src={getOptimizedImageUrl(product.images[0], 600)}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
        />

        {/* Ambient Overlay Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#12131C] via-transparent to-black/30 pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2 pointer-events-none">
          {product.badge ? (
            <span className="px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase bg-[#181926]/90 backdrop-blur-md text-amber-200 border border-amber-300/30 shadow-md">
              {product.badge}
            </span>
          ) : (
            <span />
          )}

          {discountPercent && (
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-rose-600/90 text-white shadow-md">
              Save {discountPercent}%
            </span>
          )}
        </div>

        {/* Floating Quick View hint on desktop hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px] pointer-events-none">
          <span className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-semibold tracking-wider uppercase flex items-center gap-1.5 shadow-xl">
            <Eye className="w-3.5 h-3.5" /> View Creation
          </span>
        </div>
      </Link>

      {/* Product Content Details */}
      <div className="flex-1 p-5 sm:p-6 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="text-[11px] font-medium tracking-wider uppercase text-amber-200/90">
              {product.category}
            </span>
            <div className="flex items-center gap-1 text-amber-400">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span className="font-mono text-xs text-slate-200 font-semibold">{product.rating}</span>
              <span className="text-slate-500 text-[11px]">({product.reviewsCount})</span>
            </div>
          </div>

          {/* Title */}
          <Link
            to="/products/$productId"
            params={{ productId: product.id.toString() }}
            className="block text-base sm:text-lg font-serif font-bold text-white group-hover:text-amber-200 transition-colors line-clamp-1"
          >
            {product.name}
          </Link>

          {/* Tagline / Short description */}
          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
            {product.tagline}
          </p>

          {/* Specifications Pills */}
          <div className="flex items-center gap-2 pt-1 flex-wrap">
            <span className="text-[10px] px-2 py-0.5 rounded-md bg-[#1C1E2B] text-slate-300 border border-[#2B2E40]">
              {product.noiseLevel}
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-md bg-[#1C1E2B] text-slate-300 border border-[#2B2E40]">
              {product.waterproof.includes('Submersible') ? 'IPX8 Submersible' : 'Waterproof'}
            </span>
          </div>

          {/* Color Variant Dots */}
          {product.variants.length > 1 && (
            <div className="pt-2 flex items-center gap-2">
              <span className="text-[11px] text-slate-400">Color:</span>
              <div className="flex items-center gap-1.5">
                {product.variants.map((v) => (
                  <button
                    key={v.id}
                    type="button"
                    onClick={(e) => {
                      e.preventDefault()
                      setSelectedVariantId(v.id)
                    }}
                    title={v.name}
                    className={`w-4 h-4 rounded-full border transition-all ${
                      selectedVariantId === v.id
                        ? 'ring-2 ring-amber-300 ring-offset-2 ring-offset-[#12131C] scale-110'
                        : 'border-white/20 hover:scale-105 opacity-80 hover:opacity-100'
                    }`}
                    style={{ backgroundColor: v.hex }}
                    aria-label={`Select ${v.name}`}
                  />
                ))}
              </div>
              <span className="text-[11px] text-slate-400 font-medium truncate max-w-[120px]">
                {selectedVariant?.name}
              </span>
            </div>
          )}
        </div>

        {/* Pricing & Add to Bag CTA */}
        <div className="pt-4 border-t border-[#1F212E] flex items-center justify-between gap-3">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg sm:text-xl font-serif font-bold text-white">
                ${product.price}
              </span>
              {product.originalPrice && (
                <span className="text-xs line-through text-slate-500 font-sans">
                  ${product.originalPrice}
                </span>
              )}
            </div>
            <span className="text-[10px] text-slate-400">Discreet Delivery</span>
          </div>

          <button
            onClick={handleQuickAdd}
            disabled={!product.inStock}
            className={`py-2 px-3.5 sm:px-4 rounded-xl text-xs font-semibold tracking-wider flex items-center gap-1.5 transition-all shadow-md active:scale-95 ${
              isAdded
                ? 'bg-emerald-600 text-white'
                : 'bg-gradient-to-r from-[#9B2C68] to-[#C88A58] hover:opacity-95 text-white shadow-rose-950/40'
            }`}
          >
            {isAdded ? (
              <>
                <Check className="w-3.5 h-3.5" /> Added
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" /> Add
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  )
}
