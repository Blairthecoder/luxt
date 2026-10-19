import React, { createContext, useContext, useEffect, useState } from 'react'
import { Product } from '@/data/products'
import { createCheckoutSession } from '@/lib/stripe'
import { recordCompletedOrder } from '@/lib/db-service'

export interface CartItem {
  product: Product
  variantId: string
  variantName: string
  colorHex: string
  quantity: number
}

interface CartContextType {
  items: CartItem[]
  isOpen: boolean
  openCart: () => void
  closeCart: () => void
  addToCart: (product: Product, variantId?: string, quantity?: number) => void
  removeFromCart: (productId: number, variantId: string) => void
  updateQuantity: (productId: number, variantId: string, quantity: number) => void
  clearCart: () => void
  totalItems: number
  subtotal: number
  discountCode: string
  discountPercent: number
  discountAmount: number
  totalPrice: number
  applyDiscount: (code: string) => { success: boolean; message: string }
  freeShippingThreshold: number
  freeShippingRemaining: number
  freeShippingProgress: number
  isCheckingOut: boolean
  checkoutError: string | null
  proceedToCheckout: () => Promise<void>
}

const CartContext = createContext<CartContextType | undefined>(undefined)

const STORAGE_KEY = 'velvet_pulse_cart_v1'
const FREE_SHIPPING_THRESHOLD = 120

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [discountCode, setDiscountCode] = useState('')
  const [discountPercent, setDiscountPercent] = useState(0)
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const [checkoutError, setCheckoutError] = useState<string | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  // Load from local storage on mount (browser-only)
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        setItems(JSON.parse(saved))
      }
    } catch (e) {
      console.warn('Failed to read cart from local storage:', e)
    }
    setIsLoaded(true)
  }, [])

  // Save to local storage on change
  useEffect(() => {
    if (!isLoaded) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch (e) {
      console.warn('Failed to save cart to local storage:', e)
    }
  }, [items, isLoaded])

  const openCart = () => setIsOpen(true)
  const closeCart = () => {
    setIsOpen(false)
    setCheckoutError(null)
  }

  const addToCart = (product: Product, variantId?: string, quantity: number = 1) => {
    const selectedVariant = variantId
      ? product.variants.find((v) => v.id === variantId) || product.variants[0]
      : product.variants[0]

    const actualVariantId = selectedVariant?.id || 'standard'
    const variantName = selectedVariant?.name || 'Standard'
    const colorHex = selectedVariant?.hex || '#999999'

    setItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.variantId === actualVariantId
      )

      if (existingIndex > -1) {
        const copy = [...prev]
        copy[existingIndex] = {
          ...copy[existingIndex],
          quantity: copy[existingIndex].quantity + quantity,
        }
        return copy
      }

      return [
        ...prev,
        {
          product,
          variantId: actualVariantId,
          variantName,
          colorHex,
          quantity,
        },
      ]
    })

    setIsOpen(true)
  }

  const removeFromCart = (productId: number, variantId: string) => {
    setItems((prev) => prev.filter((item) => !(item.product.id === productId && item.variantId === variantId)))
  }

  const updateQuantity = (productId: number, variantId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, variantId)
      return
    }

    setItems((prev) =>
      prev.map((item) => {
        if (item.product.id === productId && item.variantId === variantId) {
          return { ...item, quantity }
        }
        return item
      })
    )
  }

  const clearCart = () => {
    setItems([])
    setDiscountCode('')
    setDiscountPercent(0)
  }

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)

  const applyDiscount = (code: string) => {
    const normalized = code.trim().toUpperCase()
    if (normalized === 'PULSE20' || normalized === 'INTIMACY20') {
      setDiscountCode(normalized)
      setDiscountPercent(20)
      return { success: true, message: '20% VIP pleasure discount applied!' }
    } else if (normalized === 'WELCOME15' || normalized === 'VELVET15') {
      setDiscountCode(normalized)
      setDiscountPercent(15)
      return { success: true, message: '15% welcome indulgence code applied!' }
    } else if (normalized === 'DISCREET10') {
      setDiscountCode(normalized)
      setDiscountPercent(10)
      return { success: true, message: '10% discreet delivery discount applied!' }
    } else {
      return { success: false, message: 'Invalid code. Try PULSE20 or VELVET15.' }
    }
  }

  const discountAmount = Math.round((subtotal * discountPercent) / 100)
  const totalPrice = Math.max(0, subtotal - discountAmount)

  const freeShippingRemaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal)
  const freeShippingProgress = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100))

  const proceedToCheckout = async () => {
    if (items.length === 0) return
    setIsCheckingOut(true)
    setCheckoutError(null)

    try {
      const checkoutPayload = {
        items: items.map((item) => ({
          productId: item.product.id,
          variantId: item.variantId,
          quantity: item.quantity,
        })),
        discountCode: discountCode || undefined,
      }

      // Record simulated order in Netlify DB
      const orderNumber = `VP-${Date.now().toString().slice(-6)}-${Math.floor(100 + Math.random() * 900)}`
      try {
        await recordCompletedOrder({
          data: {
            orderNumber,
            customerEmail: 'guest-patron@velvetpulse.com',
            items: items.map((i) => ({
              id: i.product.id,
              name: i.product.name,
              variant: i.variantName,
              quantity: i.quantity,
              price: i.product.price,
            })),
            totalPrice,
            discreetPackaging: true,
          },
        })
      } catch (e) {
        console.warn('Order DB recording deferred:', e)
      }

      const checkoutUrl = await createCheckoutSession({ data: checkoutPayload })
      if (checkoutUrl) {
        window.location.href = checkoutUrl
      } else {
        throw new Error('Unable to redirect to checkout')
      }
    } catch (err) {
      console.error('Checkout failure:', err)
      setCheckoutError(err instanceof Error ? err.message : 'Checkout encountered an error')
      setIsCheckingOut(false)
    }
  }

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        openCart,
        closeCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        discountCode,
        discountPercent,
        discountAmount,
        totalPrice,
        applyDiscount,
        freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
        freeShippingRemaining,
        freeShippingProgress,
        isCheckingOut,
        checkoutError,
        proceedToCheckout,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
