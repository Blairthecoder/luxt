import { useEffect, useState } from 'react'
import { Link, createFileRoute } from '@tanstack/react-router'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { useCart } from '@/context/CartContext'
import { ShieldCheck, CheckCircle2, Lock, Truck, ArrowRight, Sparkles } from 'lucide-react'

export const Route = createFileRoute('/checkout/success')({
  component: CheckoutSuccess,
  validateSearch: (search: Record<string, unknown>) => {
    return {
      session_id: (search.session_id as string) || '',
      order_number: (search.order_number as string) || '',
    }
  },
})

function CheckoutSuccess() {
  const { clearCart } = useCart()
  const search = Route.useSearch()
  const [orderId, setOrderId] = useState('')

  useEffect(() => {
    clearCart()
    const genOrder =
      search.order_number ||
      search.session_id?.replace('demo_', '') ||
      `VP-${Math.floor(100000 + Math.random() * 900000)}`
    setOrderId(genOrder)
  }, [search])

  return (
    <div className="min-h-screen bg-[#0A0B10] text-slate-100 flex flex-col justify-between selection:bg-[#B02A6A] selection:text-white">
      <Navbar />

      <main className="max-w-2xl mx-auto px-4 py-16 sm:py-24 text-center space-y-8">
        
        {/* Animated Checkmark Badge */}
        <div className="relative inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-tr from-[#9B2C68] to-[#D4A373] p-1 shadow-2xl shadow-rose-950/50">
          <div className="w-full h-full bg-[#10121C] rounded-full flex items-center justify-center text-emerald-400">
            <CheckCircle2 className="w-12 h-12" />
          </div>
        </div>

        {/* Headline */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 text-xs font-semibold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5" /> Order Confirmed
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-black text-white">
            Thank You for Your Trust
          </h1>
          <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
            Your intimate indulgence has been securely processed and is entering our discreet fulfillment vault.
          </p>
        </div>

        {/* Order Details & Discreet Shipping Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#121420] border border-[#242738] text-left space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#202234] gap-2">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-slate-400 block font-mono">
                Confirmation Number
              </span>
              <span className="font-mono text-base font-bold text-amber-200">
                {orderId || 'VP-849201'}
              </span>
            </div>
            <div className="text-xs text-slate-400">
              Discreet tracking notification will be sent via email.
            </div>
          </div>

          <div className="space-y-4 text-xs text-slate-300">
            <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#171926] border border-[#282B3E]">
              <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block font-semibold mb-0.5">
                  100% Plain Unbranded Box
                </strong>
                <span>
                  No brand names, logos, or toy depictions on the exterior label. Return address reads simply "VP Services Fulfillment".
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#171926] border border-[#282B3E]">
              <Lock className="w-5 h-5 text-amber-300 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block font-semibold mb-0.5">
                  Private Statement Billing
                </strong>
                <span>
                  The charge on your credit card or bank account will appear discreetly as <em className="text-amber-200 not-italic font-medium">"VP STUDIO SERVICES LLC"</em>.
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#171926] border border-[#282B3E]">
              <Truck className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block font-semibold mb-0.5">
                  Priority Discreet Dispatch
                </strong>
                <span>
                  Your parcel will be carefully inspected and dispatched within 24 hours.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Back to Home CTA */}
        <div className="pt-2">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#9B2C68] to-[#C88A58] text-white text-xs font-semibold tracking-widest uppercase hover:opacity-95 transition-all shadow-xl shadow-rose-950/40"
          >
            Explore More Creations <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </main>

      <Footer />
    </div>
  )
}
