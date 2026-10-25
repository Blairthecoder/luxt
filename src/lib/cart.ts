import { useEffect, useState, useSyncExternalStore } from 'react'
import shopifyMeta from '@/data/shopify-meta.json'
import {
  getGaIds,
  readAttribution,
  trackAddToCart,
  trackRemoveFromCart,
  type Attribution,
  type Ga4Item,
  type GaIds,
} from '@/lib/analytics'

export interface CartItem {
  variantId: number
  handle: string
  title: string
  variantTitle: string
  price: number
  image?: string
  brand?: string
  qty: number
}

const KEY = 'ns_cart'
const MAX_QTY = 10
const DEFAULT_UTM = { utm_source: 'nightstandsupply', utm_medium: 'referral', utm_campaign: 'lingerie' }
const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'] as const
const EMPTY: CartItem[] = []

let items: CartItem[] = EMPTY
let loaded = false
const listeners = new Set<() => void>()

function load() {
  if (loaded || typeof window === 'undefined') return
  loaded = true
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) ?? '[]')
    if (Array.isArray(raw)) items = raw.filter((i) => i && Number(i.variantId) > 0 && i.qty > 0)
  } catch {
    // Storage blocked or corrupt: start with an empty cart.
  }
}

function commit(next: CartItem[]) {
  items = next.length ? next : EMPTY
  try {
    localStorage.setItem(KEY, JSON.stringify(items))
  } catch {
    // Cart still works for this page view.
  }
  listeners.forEach((l) => l())
}

function subscribe(cb: () => void) {
  load()
  listeners.add(cb)
  const onStorage = (e: StorageEvent) => {
    if (e.key !== KEY) return
    loaded = false
    load()
    cb()
  }
  window.addEventListener('storage', onStorage)
  return () => {
    listeners.delete(cb)
    window.removeEventListener('storage', onStorage)
  }
}

export function useCart(): CartItem[] {
  return useSyncExternalStore(
    subscribe,
    () => {
      load()
      return items
    },
    () => EMPTY,
  )
}

/** GA4 ecommerce item for a cart line. The Shopify store sells lingerie only. */
export function ga4Item(i: Omit<CartItem, 'qty'>, quantity: number): Ga4Item {
  return {
    item_id: i.handle,
    item_name: i.title,
    item_brand: i.brand,
    item_category: 'Lingerie',
    item_variant: i.variantTitle || undefined,
    price: i.price,
    quantity,
  }
}

export const ga4Items = (list: CartItem[]) => list.map((i) => ga4Item(i, i.qty))

/** `context` is where the add happened (GA4 add_to_cart link_context), e.g. "product_page". */
export function addToCart(item: Omit<CartItem, 'qty'>, qty = 1, context = 'product_page') {
  load()
  const found = items.find((i) => i.variantId === item.variantId)
  const added = Math.min(MAX_QTY, (found?.qty ?? 0) + qty) - (found?.qty ?? 0)
  if (added > 0) trackAddToCart(ga4Item(item, added), { link_context: context, page_path: location.pathname })
  commit(
    found
      ? items.map((i) => (i === found ? { ...i, qty: Math.min(MAX_QTY, i.qty + qty) } : i))
      : [...items, { ...item, qty: Math.min(MAX_QTY, qty) }],
  )
}

export function setQty(variantId: number, qty: number) {
  load()
  const found = items.find((i) => i.variantId === variantId)
  if (found) {
    const delta = Math.min(MAX_QTY, Math.max(0, qty)) - found.qty
    if (delta > 0) trackAddToCart(ga4Item(found, delta), { link_context: 'cart', page_path: location.pathname })
    if (delta < 0) trackRemoveFromCart(ga4Item(found, -delta))
  }
  commit(
    qty <= 0
      ? items.filter((i) => i.variantId !== variantId)
      : items.map((i) => (i.variantId === variantId ? { ...i, qty: Math.min(MAX_QTY, qty) } : i)),
  )
}

export const cartCount = (list: CartItem[]) => list.reduce((n, i) => n + i.qty, 0)
export const cartTotal = (list: CartItem[]) => list.reduce((n, i) => n + i.price * i.qty, 0)

export interface CheckoutContext {
  /** Button that sent the shopper, e.g. "buy_now" or "cart_checkout". */
  source?: string
  attribution?: Attribution
  ga?: GaIds
}

/**
 * Shopify cart permalink: the store builds the cart and sends the shopper to its own checkout.
 * The visitor's original UTMs (or our referral defaults) ride on the URL for Shopify's
 * attribution reports, and the same values plus the GA4 client and session ids are saved as
 * cart attributes, which Shopify copies onto the order (underscore keys mark them as internal).
 */
export function checkoutUrl(list: { variantId: number; qty: number }[], ctx: CheckoutContext = {}): string {
  const lines = list.map((i) => `${i.variantId}:${i.qty}`).join(',')
  const attr = ctx.attribution ?? {}
  const params = new URLSearchParams()
  const utm: Record<string, string | undefined> = attr.utm_source
    ? { ...attr }
    : { ...DEFAULT_UTM, utm_content: ctx.source }
  for (const key of UTM_KEYS) {
    const value = utm[key]
    if (value) params.set(key, value)
  }
  const attributes: Record<string, string | undefined> = {
    _ga_client_id: ctx.ga?.clientId,
    _ga_session_id: ctx.ga?.sessionId,
    _checkout_source: ctx.source,
    _utm_source: attr.utm_source,
    _utm_medium: attr.utm_medium,
    _utm_campaign: attr.utm_campaign,
    _utm_content: attr.utm_content,
    _utm_term: attr.utm_term,
    _gclid: attr.gclid,
    _landing_page: attr.landing_page,
  }
  for (const [key, value] of Object.entries(attributes)) {
    if (value) params.set(`attributes[${key}]`, value.slice(0, 250))
  }
  return `${shopifyMeta.storeUrl}/cart/${lines}?${params.toString()}`
}

/**
 * checkoutUrl with attribution and GA ids filled in after hydration. The first render
 * matches the server HTML; the full link is in place before anyone can click it, so
 * gtag's cross-domain linker can still add _gl on top.
 */
export function useCheckoutUrl(list: { variantId: number; qty: number }[], source: string): string {
  const [ctx, setCtx] = useState<CheckoutContext>({ source })
  useEffect(() => {
    let live = true
    const attribution = readAttribution()
    setCtx({ source, attribution })
    getGaIds().then((ga) => {
      if (live) setCtx({ source, attribution, ga })
    })
    return () => {
      live = false
    }
  }, [source])
  return checkoutUrl(list, ctx)
}
