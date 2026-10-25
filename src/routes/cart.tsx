import { createFileRoute, Link } from '@tanstack/react-router'
import { SITE } from '@/config/site'
import { pageHead } from '@/lib/seo'
import { cartTotal, checkoutUrl, setQty, useCart } from '@/lib/cart'
import { formatPrice } from '@/lib/format'
import { SHIPPING_SUMMARY, STORE_POLICY } from '@/content/store-policies'

export const Route = createFileRoute('/cart')({
  head: () =>
    pageHead({
      title: `Your Cart | ${SITE.shortName}`,
      description: 'Review your lingerie order before checking out.',
      path: '/cart',
      noindex: true,
    }),
  component: CartPage,
})

function CartPage() {
  const items = useCart()
  return (
    <div className="wrap py-10 sm:py-16 max-w-3xl">
      <h1 className="display-m">Your Cart</h1>
      {items.length === 0 ? (
        <p className="mt-6 text-graphite">
          Your cart is empty.{' '}
          <Link to="/category/$slug" params={{ slug: 'lingerie' }} className="underline underline-offset-2">
            Shop lingerie
          </Link>
        </p>
      ) : (
        <>
          <ul className="mt-8 divide-y divide-line border-y border-line">
            {items.map((i) => (
              <li key={i.variantId} className="flex gap-4 py-5">
                {i.image && <img src={i.image} alt="" className="h-24 w-20 rounded-lg object-cover bg-mist" />}
                <div className="min-w-0 flex-1">
                  <Link to="/products/$productId" params={{ productId: i.handle }} className="font-medium hover:underline">
                    {i.title}
                  </Link>
                  {i.variantTitle && <p className="text-sm text-graphite">{i.variantTitle}</p>}
                  <p className="mt-1 text-sm">{formatPrice(i.price)}</p>
                  <div className="mt-3 flex items-center gap-3 text-sm">
                    <button type="button" aria-label="Decrease quantity" className="h-8 w-8 rounded-full border border-line" onClick={() => setQty(i.variantId, i.qty - 1)}>
                      -
                    </button>
                    <span aria-live="polite">{i.qty}</span>
                    <button type="button" aria-label="Increase quantity" className="h-8 w-8 rounded-full border border-line" onClick={() => setQty(i.variantId, i.qty + 1)}>
                      +
                    </button>
                    <button type="button" className="ml-3 underline underline-offset-2 text-graphite" onClick={() => setQty(i.variantId, 0)}>
                      Remove
                    </button>
                  </div>
                </div>
                <p className="font-medium">{formatPrice(i.price * i.qty)}</p>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex items-center justify-between">
            <span className="text-graphite">Subtotal</span>
            <span className="text-lg font-semibold">{formatPrice(cartTotal(items))}</span>
          </div>
          <p className="mt-2 text-xs text-graphite">
            Shipping and taxes are calculated at checkout. {SHIPPING_SUMMARY}
          </p>
          <a href={checkoutUrl(items)} data-link-context="cart_checkout" className="btn btn-lg w-full mt-6">
            Checkout
          </a>
          <p className="mt-4 text-center text-xs text-graphite">
            Secure Shopify checkout ·{' '}
            <Link to="/shipping" className="underline underline-offset-2 hover:text-ink">
              Shipping
            </Link>
            {' · '}
            <Link to="/returns" className="underline underline-offset-2 hover:text-ink">
              {STORE_POLICY.returnDays}-Day Returns
            </Link>
            {' · '}
            <Link to="/size-guide" className="underline underline-offset-2 hover:text-ink">
              Size Guide
            </Link>
          </p>
        </>
      )}
    </div>
  )
}
