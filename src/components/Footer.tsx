import { useState } from 'react'
import { ShieldCheck, Lock, Sparkles, CheckCircle2 } from 'lucide-react'

export function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail('')
    }
  }

  return (
    <footer className="bg-[#090A0E] text-slate-300 border-t border-[#1F212D] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Top Feature Strip: The Discreet & Luxury Guarantees */}
        <div id="promise" className="grid grid-cols-1 md:grid-cols-4 gap-6 p-8 rounded-3xl bg-[#10121B] border border-[#212332]">
          
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-300 flex-shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">100% Discreet Delivery</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Shipped in unmarked plain boxes with tamper-proof security tape. Zero product mention.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-300 flex-shrink-0">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Private Billing</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Bank statements appear as non-descript <span className="text-amber-200">"VP Studio Services LLC"</span>.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-300 flex-shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Medical-Grade Purity</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Phthalate-free, non-porous liquid silicone tested to European biocompatibility standards.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 flex-shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">2-Year Warranty</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Full replacement peace of mind against mechanical or motor defects.
              </p>
            </div>
          </div>

        </div>

        {/* Main Footer Links & Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#9B2C68] to-[#E5B582] p-0.5">
                <div className="w-full h-full bg-[#0D0E15] rounded-[10px] flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-gradient-to-r from-[#FF2E93] to-[#D4A373]" />
                </div>
              </div>
              <span className="text-xl font-serif font-black tracking-widest text-white">
                VELVET &amp; PULSE
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Dedicated to the modern elevation of human intimacy, sensual exploration, and anatomical ecstasy through whisper-quiet engineering and sculptural design.
            </p>

            <div className="pt-2 text-[11px] text-amber-200/80 bg-amber-950/20 border border-amber-800/30 p-3 rounded-xl max-w-sm">
              <strong>Discreet Billing Guarantee:</strong> Your credit card or PayPal statement will show only <em>"VP Studio Services"</em>. Your privacy is paramount.
            </div>
          </div>

          {/* Navigation Columns */}
          <div className="lg:col-span-2 space-y-3">
            <h5 className="text-xs font-semibold uppercase tracking-wider text-white">Collections</h5>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="#catalog" className="hover:text-amber-200 transition-colors">Dual-Stimulation</a></li>
              <li><a href="#catalog" className="hover:text-amber-200 transition-colors">Aura Magic Wands</a></li>
              <li><a href="#catalog" className="hover:text-amber-200 transition-colors">Touchless Sonic Air</a></li>
              <li><a href="#catalog" className="hover:text-amber-200 transition-colors">Couple's Wearables</a></li>
              <li><a href="#catalog" className="hover:text-amber-200 transition-colors">Borosilicate Glass</a></li>
              <li><a href="#catalog" className="hover:text-amber-200 transition-colors">Botanical Serums</a></li>
            </ul>
          </div>

          <div className="lg:col-span-2 space-y-3">
            <h5 className="text-xs font-semibold uppercase tracking-wider text-white">Pleasure Care</h5>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><span className="hover:text-amber-200 cursor-pointer">Cleaning &amp; Sanitization</span></li>
              <li><span className="hover:text-amber-200 cursor-pointer">Lube Compatibility Guide</span></li>
              <li><span className="hover:text-amber-200 cursor-pointer">Whisper Decibel Lab</span></li>
              <li><span className="hover:text-amber-200 cursor-pointer">Kegel Trainer Manual</span></li>
              <li><span className="hover:text-amber-200 cursor-pointer">Discreet Tracking Portal</span></li>
            </ul>
          </div>

          {/* Newsletter Box */}
          <div className="lg:col-span-4 space-y-3">
            <h5 className="text-xs font-semibold uppercase tracking-wider text-white">The Intimacy Journal</h5>
            <p className="text-xs text-slate-400 leading-relaxed">
              Subscribe to receive private member invitations, erotic literature, and 15% off your next creation.
            </p>

            {subscribed ? (
              <div className="p-3.5 rounded-2xl bg-emerald-950/40 border border-emerald-800 text-xs text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>You are on the private VIP list. Check your inbox for code <strong>VELVET15</strong>.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter private email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-[#161824] border border-[#2B2E40] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-300"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#9B2C68] to-[#C88A58] text-white text-xs font-semibold hover:opacity-90 transition-opacity"
                >
                  Join
                </button>
              </form>
            )}
            <span className="text-[10px] text-slate-500 block">We respect your absolute privacy. Unsubscribe anytime.</span>
          </div>

        </div>

        {/* Bottom Legal, Age Disclaimer, and Payment Badges */}
        <div className="pt-8 border-t border-[#1A1C26] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-3 flex-wrap text-center sm:text-left">
            <span>&copy; {new Date().getFullYear()} VELVET &amp; PULSE. All Rights Reserved.</span>
            <span>•</span>
            <span>18+ Adult Novelty &amp; Intimate Wellness Only.</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-slate-400">
            <span>Plain Box Packaging</span>
            <span>•</span>
            <span>256-Bit Encrypted</span>
            <span>•</span>
            <span>Discreet Card Statement</span>
          </div>
        </div>

      </div>
    </footer>
  )
}
