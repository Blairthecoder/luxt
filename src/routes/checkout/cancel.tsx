import { Link, createFileRoute } from '@tanstack/react-router'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { useCart } from '@/context/CartContext'
import { ArrowLeft, ShoppingBag, ShieldCheck } from 'lucide-react'

export const Route = createFileRoute('/checkout/cancel')({
  component: CheckoutCancel,
})

function CheckoutCancel() {
  const { openCart } = useCart()

  return (
    <div className="min-h-screen bg-[#0A0B10] text-slate-100 flex flex-col justify-between selection:bg-[#B02A6A] selection:text-white">
      <Navbar />

      <main className="max-w-md mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-[#1A1C29] border border-[#2E3146] flex items-center justify-center mx-auto text-amber-300">
          <ShoppingBag className="w-8 h-8 opacity-80" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-serif font-black text-white">
            Checkout Paused
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            Your intimate bag remains securely preserved. You were not charged, and you can resume anytime.
          </p>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row gap-3">
          <button
            onClick={openCart}
            className="flex-1 py-3 px-5 rounded-full bg-gradient-to-r from-[#9B2C68] to-[#C88A58] text-white text-xs font-semibold tracking-wider uppercase hover:opacity-95 transition-all shadow-md"
          >
            Review Bag
          </button>
          <Link
            to="/"
            className="flex-1 py-3 px-5 rounded-full bg-[#181A27] hover:bg-[#222538] border border-[#2F3348] text-slate-300 text-xs font-semibold tracking-wider uppercase flex items-center justify-center gap-1.5 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Continue Shopping
          </Link>
        </div>

        <div className="pt-6 border-t border-[#1C1E2B] flex items-center justify-center gap-2 text-xs text-slate-500">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>100% Secure &amp; Discreet Session Protection</span>
        </div>
      </main>

      <Footer />
    </div>
  )
}
