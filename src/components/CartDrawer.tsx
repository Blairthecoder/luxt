import { useState } from 'react'
import { useCart } from '@/context/CartContext'
import { getOptimizedImageUrl } from '@/lib/image'
import { X, Trash2, Plus, Minus, ShoppingBag, ShieldCheck, Truck, Lock, ArrowRight, Tag, Sparkles } from 'lucide-react'
import { Link } from '@tanstack/react-router'

export function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    totalItems,
    subtotal,
    discountCode,
    discountAmount,
    totalPrice,
    applyDiscount,
    freeShippingThreshold,
    freeShippingRemaining,
    freeShippingProgress,
    isCheckingOut,
    checkoutError,
    proceedToCheckout,
  } = useCart()

  const [inputCode, setInputCode] = useState('')
  const [promoMessage, setPromoMessage] = useState<{ text: string; isError: boolean } | null>(null)

  if (!isOpen) return null

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputCode.trim()) return
    const res = applyDiscount(inputCode)
    setPromoMessage({ text: res.message, isError: !res.success })
    if (res.success) {
      setInputCode('')
    }
  }

  const shippingCost = subtotal >= freeShippingThreshold || items.length === 0 ? 0 : 9

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fade-in">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={closeCart}
      />

      <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
        <div className="w-screen max-w-md bg-[#101117] border-l border-[#2B2836] shadow-2xl flex flex-col text-slate-100">
          
          {/* Header */}
          <div className="p-6 border-b border-[#242230] flex items-center justify-between bg-[#151620]">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-tr from-[#9B2C68] to-[#D4A373] text-white shadow-lg">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-serif tracking-wide font-bold text-slate-50">
                  Sensual Collection
                </h2>
                <p className="text-xs text-slate-400">
                  {totalItems} {totalItems === 1 ? 'item' : 'items'} reserved for you
                </p>
              </div>
            </div>

            <button
              onClick={closeCart}
              className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-[#232432] transition-colors"
              aria-label="Close bag"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Discreet Shipping Progress */}
          <div className="px-6 py-3.5 bg-[#171824] border-b border-[#242230]">
            <div className="flex items-center justify-between text-xs mb-1.5 font-medium">
              <span className="flex items-center gap-1.5 text-amber-200">
                <Truck className="w-3.5 h-3.5" />
                {freeShippingRemaining === 0 ? (
                  <span className="font-semibold text-emerald-400">
                    Complimentary Discreet Priority Shipping Unlocked!
                  </span>
                ) : (
                  <span>
                    Add <strong className="text-white">${freeShippingRemaining}</strong> for Free
                    Discreet Shipping
                  </span>
                )}
              </span>
              <span className="text-slate-400 text-[11px]">{freeShippingProgress}%</span>
            </div>
            <div className="w-full h-1.5 bg-[#252737] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#9B2C68] via-[#E24A84] to-[#E5B582] rounded-full transition-all duration-500 ease-out"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 text-slate-400 space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-[#1C1D2A] border border-[#2B2D3F] flex items-center justify-center text-slate-500">
                  <ShoppingBag className="w-8 h-8 opacity-40" />
                </div>
                <h3 className="text-base font-serif font-medium text-slate-200">
                  Your intimate bag is empty
                </h3>
                <p className="text-xs text-slate-400 max-w-xs leading-relaxed">
                  Explore our luxury whisper-quiet collection curated for profound personal and partner ecstasy.
                </p>
                <button
                  onClick={closeCart}
                  className="mt-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#9B2C68] to-[#C88A58] text-white text-xs font-semibold tracking-wider uppercase hover:opacity-95 transition-all shadow-md"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={`${item.product.id}-${item.variantId}`}
                  className="flex gap-4 p-3.5 rounded-2xl bg-[#171822] border border-[#262838] hover:border-[#383B52] transition-colors"
                >
                  {/* Thumbnail */}
                  <Link
                    to="/products/$productId"
                    params={{ productId: item.product.id.toString() }}
                    onClick={closeCart}
                    className="w-20 h-20 rounded-xl overflow-hidden bg-[#0C0D13] flex-shrink-0 border border-[#232535] relative block group"
                  >
                    <img
                      src={getOptimizedImageUrl(item.product.images[0], 200)}
                      alt={item.product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </Link>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <Link
                          to="/products/$productId"
                          params={{ productId: item.product.id.toString() }}
                          onClick={closeCart}
                          className="text-sm font-semibold text-slate-100 hover:text-amber-200 line-clamp-1 transition-colors"
                        >
                          {item.product.name}
                        </Link>
                        <button
                          onClick={() => removeFromCart(item.product.id, item.variantId)}
                          className="text-slate-500 hover:text-rose-400 p-1 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Variant Badge */}
                      <div className="flex items-center gap-1.5 mt-1">
                        <span
                          className="w-2.5 h-2.5 rounded-full border border-black/40 flex-shrink-0"
                          style={{ backgroundColor: item.colorHex }}
                        />
                        <span className="text-xs text-slate-400 truncate">
                          {item.variantName}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity Stepper */}
                      <div className="flex items-center rounded-lg bg-[#202230] border border-[#303348] text-xs">
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.variantId, item.quantity - 1)
                          }
                          className="px-2 py-1 text-slate-300 hover:text-white transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 font-mono font-medium text-slate-200">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.variantId, item.quantity + 1)
                          }
                          className="px-2 py-1 text-slate-300 hover:text-white transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <span className="text-sm font-serif font-bold text-amber-200">
                          ${(item.product.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer / Checkout */}
          {items.length > 0 && (
            <div className="p-6 border-t border-[#242230] bg-[#141520] space-y-4">
              
              {/* Promo Code Input */}
              <form onSubmit={handleApplyPromo} className="space-y-1.5">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input
                      type="text"
                      placeholder="Promo code (e.g. PULSE20)"
                      value={inputCode}
                      onChange={(e) => setInputCode(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-[#1C1E2B] border border-[#2E3146] rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-300 transition-colors uppercase"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-[#282B3E] hover:bg-[#343850] text-xs font-semibold text-slate-200 transition-colors"
                  >
                    Apply
                  </button>
                </div>
                {promoMessage && (
                  <p
                    className={`text-[11px] ${
                      promoMessage.isError ? 'text-rose-400' : 'text-emerald-400'
                    }`}
                  >
                    {promoMessage.text}
                  </p>
                )}
                {discountCode && !promoMessage && (
                  <p className="text-[11px] text-emerald-400 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> Code <strong>{discountCode}</strong> applied!
                  </p>
                )}
              </form>

              {/* Cost Summary Breakdown */}
              <div className="space-y-1.5 text-xs text-slate-300 pt-2 border-t border-[#232535]">
                <div className="flex justify-between">
                  <span className="text-slate-400">Subtotal</span>
                  <span className="font-medium text-slate-200">${subtotal.toLocaleString()}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400 font-medium">
                    <span>VIP Code Discount</span>
                    <span>-${discountAmount.toLocaleString()}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span className="text-slate-400">Discreet Blind Delivery</span>
                  <span className="font-medium text-slate-200">
                    {shippingCost === 0 ? (
                      <span className="text-emerald-400 font-semibold">FREE</span>
                    ) : (
                      `$${shippingCost}.00`
                    )}
                  </span>
                </div>

                <div className="flex justify-between text-base font-serif font-bold text-white pt-2 border-t border-[#2B2D40]">
                  <span>Total Investment</span>
                  <span className="text-amber-200">${(totalPrice + shippingCost).toLocaleString()}</span>
                </div>
              </div>

              {/* 100% Discreet Packaging Guarantee */}
              <div className="p-3 rounded-xl bg-[#1B1D28] border border-[#2E3144] flex items-center gap-2.5 text-slate-300">
                <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <div className="text-[11px] leading-tight text-slate-300">
                  <span className="font-semibold text-white">100% Discreet Packaging:</span> Shipped in plain, unbranded box. Billing appears as <em className="text-amber-200 not-italic font-medium">"VP Studio Services"</em>.
                </div>
              </div>

              {/* Checkout Button */}
              {checkoutError && (
                <div className="p-2.5 rounded-lg bg-rose-950/60 border border-rose-800 text-xs text-rose-200">
                  {checkoutError}
                </div>
              )}

              <button
                onClick={proceedToCheckout}
                disabled={isCheckingOut}
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#B02A6A] via-[#E24A84] to-[#C88A58] hover:opacity-95 text-white font-medium text-sm tracking-wide flex items-center justify-center gap-2 shadow-xl shadow-rose-950/40 transition-all disabled:opacity-60 disabled:cursor-wait active:scale-[0.99]"
              >
                {isCheckingOut ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Securing Discreet Session...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4 text-amber-200" />
                    <span>Proceed to Discreet Checkout</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-4 text-[10px] text-slate-400 pt-1">
                <span>256-Bit SSL Encryption</span>
                <span>•</span>
                <span>Discreet Billing</span>
                <span>•</span>
                <span>2-Year Warranty</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
