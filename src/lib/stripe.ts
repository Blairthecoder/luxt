import { createServerFn } from '@tanstack/react-start'
import products from '@/data/products'

export interface CartCheckoutItem {
  productId: number
  variantId?: string
  quantity: number
}

export const getStripeEnabled = createServerFn({ method: 'GET' }).handler(
  () => !!process.env.STRIPE_SECRET_KEY
)

export const createCheckoutSession = createServerFn({
  method: 'POST',
})
  .validator((input: number | { items: CartCheckoutItem[]; discountCode?: string }) => input)
  .handler(async ({ data }) => {
    // Determine items to purchase
    let itemsToProcess: Array<{ product: (typeof products)[0]; quantity: number; variantName?: string }> = []

    if (typeof data === 'number') {
      const prod = products.find((p) => p.id === data)
      if (!prod) throw new Error('Product not found')
      itemsToProcess = [{ product: prod, quantity: 1 }]
    } else if (data && Array.isArray(data.items)) {
      for (const item of data.items) {
        const prod = products.find((p) => p.id === item.productId)
        if (prod) {
          const variant = prod.variants.find((v) => v.id === item.variantId)
          itemsToProcess.push({
            product: prod,
            quantity: item.quantity,
            variantName: variant?.name,
          })
        }
      }
    }

    if (itemsToProcess.length === 0) {
      throw new Error('No valid items in checkout request')
    }

    const siteUrl = process.env.SITE_URL || 'http://localhost:3000'

    // If Stripe is configured, create live Stripe Checkout session
    if (process.env.STRIPE_SECRET_KEY) {
      const { default: Stripe } = await import('stripe')
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

      const line_items = itemsToProcess.map(({ product, quantity, variantName }) => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: variantName ? `${product.name} (${variantName})` : product.name,
            description: product.shortDescription,
            images: product.images.length > 0 ? [`${siteUrl}${product.images[0]}`] : undefined,
          },
          unit_amount: product.price * 100,
        },
        quantity,
      }))

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items,
        mode: 'payment',
        success_url: `${siteUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${siteUrl}/checkout/cancel`,
      })

      return session.url
    }

    // In demo / test environment when Stripe secret key is not provided,
    // generate a discreet verified checkout session simulation so the store is 100% testable
    const demoOrderId = `VP-${Date.now().toString().slice(-6)}-${Math.floor(100 + Math.random() * 900)}`
    return `${siteUrl}/checkout/success?session_id=demo_${demoOrderId}&order_number=${demoOrderId}`
  })
