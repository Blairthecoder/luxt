import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import type { CatalogProduct } from '@/types/catalog'
import { addToCart, ga4Item, useCheckoutUrl } from '@/lib/cart'
import { trackBeginCheckout } from '@/lib/analytics'
import { formatPrice } from '@/lib/format'

/** Variant picker plus Add to cart / Buy now for products sold from our own Shopify store. */
export function ShopifyBuy({ product }: { product: CatalogProduct }) {
  const variants = product.variants.filter((v) => v.id)
  const firstOpen = variants.find((v) => v.available) ?? variants[0]
  const [variantId, setVariantId] = useState(firstOpen?.id)
  const [added, setAdded] = useState(false)
  const variant = variants.find((v) => v.id === variantId)
  const hasOptions = variants.length > 1 || (variants[0] && variants[0].title !== 'Default Title')
  const buyNowUrl = useCheckoutUrl(variant?.id ? [{ variantId: variant.id, qty: 1 }] : [], 'buy_now')

  if (!variant?.id) return null
  const id = variant.id
  const ready = variant.available
  const line = {
    variantId: id,
    handle: product.handle,
    title: product.title,
    variantTitle: hasOptions ? variant.title : '',
    price: variant.price,
    image: product.images[0]?.src,
    brand: product.brand,
  }

  const onAdd = () => {
    addToCart(line, 1, 'product_page')
    setAdded(true)
  }

  return (
    <div className="space-y-4">
      {hasOptions && (
        <div>
          <label htmlFor="variant" className="block text-sm font-medium mb-2">
            Option
          </label>
          <select
            id="variant"
            value={variantId}
            onChange={(e) => {
              setVariantId(Number(e.target.value))
              setAdded(false)
            }}
            className="w-full rounded-xl border border-line bg-canvas px-4 py-3 text-sm"
          >
            {variants.map((v) => (
              <option key={v.id} value={v.id}>
                {v.title}
                {v.available ? '' : ' (sold out)'} - {formatPrice(v.price)}
              </option>
            ))}
          </select>
        </div>
      )}

      <p className="text-lg font-semibold">
        {formatPrice(variant.price)}
        {variant.compareAtPrice && (
          <span className="ml-2 text-sm font-normal text-silver line-through">{formatPrice(variant.compareAtPrice)}</span>
        )}
      </p>

      {ready ? (
        <div className="grid gap-3">
          <button type="button" onClick={onAdd} className="btn btn-lg w-full" data-link-context="add_to_cart">
            Add to Cart
          </button>
          <a
            href={buyNowUrl}
            onClick={() => trackBeginCheckout([ga4Item(line, 1)], 'buy_now')}
            data-link-context="buy_now"
            className="btn btn-lg btn-ghost w-full"
          >
            Buy Now
          </a>
        </div>
      ) : (
        <button type="button" disabled className="btn btn-lg w-full opacity-50 cursor-not-allowed">
          Sold Out
        </button>
      )}

      <p aria-live="polite" className="text-sm text-center min-h-5">
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
