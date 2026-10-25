import { useSyncExternalStore } from 'react'
import shopifyMeta from '@/data/shopify-meta.json'

export interface CartItem {
  variantId: number
  handle: string
  title: string
  variantTitle: string
  price: number
  image?: string
  qty: number
}

const KEY = 'ns_cart'
const MAX_QTY = 10
const UTM = 'utm_source=nightstandsupply&utm_medium=referral&utm_campaign=lingerie'
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

export function addToCart(item: Omit<CartItem, 'qty'>, qty = 1) {
  load()
  const found = items.find((i) => i.variantId === item.variantId)
  commit(
    found
      ? items.map((i) => (i === found ? { ...i, qty: Math.min(MAX_QTY, i.qty + qty) } : i))
      : [...items, { ...item, qty: Math.min(MAX_QTY, qty) }],
  )
}

export function setQty(variantId: number, qty: number) {
  load()
  commit(
    qty <= 0
      ? items.filter((i) => i.variantId !== variantId)
      : items.map((i) => (i.variantId === variantId ? { ...i, qty: Math.min(MAX_QTY, qty) } : i)),
  )
}

export const cartCount = (list: CartItem[]) => list.reduce((n, i) => n + i.qty, 0)
export const cartTotal = (list: CartItem[]) => list.reduce((n, i) => n + i.price * i.qty, 0)

/** Shopify cart permalink: the store builds the cart and sends the shopper to its own checkout. */
export function checkoutUrl(list: { variantId: number; qty: number }[]): string {
  const lines = list.map((i) => `${i.variantId}:${i.qty}`).join(',')
  return `${shopifyMeta.storeUrl}/cart/${lines}?${UTM}`
}
