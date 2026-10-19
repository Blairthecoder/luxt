import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { useCart } from '@/context/CartContext'
import { ShoppingBag, Sparkles, ShieldCheck, Menu, X } from 'lucide-react'

export function Navbar({ onOpenQuiz }: { onOpenQuiz?: () => void }) {
  const { openCart, totalItems } = useCart()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[#0B0C12]/90 border-b border-[#212330]">
      {/* Discreet Promise Announcement Top Bar */}
      <div className="bg-gradient-to-r from-[#2B0E23] via-[#1A0E28] to-[#121626] text-[11px] py-2 px-4 text-center border-b border-[#2A2338]/60 text-slate-300">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-4 flex-wrap">
          <span className="flex items-center gap-1.5 text-amber-200/90 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            100% Plain Unbranded Packaging
          </span>
          <span className="hidden md:inline text-slate-600">•</span>
          <span className="hidden md:inline text-slate-300">
            Unmarked Billing (<em className="text-amber-200 not-italic">"VP Studio Services"</em>)
          </span>
          <span className="hidden sm:inline text-slate-600">•</span>
          <span className="text-rose-300 flex items-center gap-1 font-medium">
            <Sparkles className="w-3 h-3 text-amber-300" />
            Use Code <strong className="text-amber-200 font-bold tracking-wider">PULSE20</strong> for 20% Off
          </span>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Mobile menu trigger */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-[#1A1C28] transition-colors"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Brand Identity / Logo */}
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#9B2C68] via-[#E24A84] to-[#E5B582] p-0.5 shadow-lg shadow-rose-950/40 group-hover:scale-105 transition-transform">
                <div className="w-full h-full bg-[#0D0E15] rounded-[14px] flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full bg-gradient-to-r from-[#FF2E93] to-[#D4A373] animate-pulse" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-serif font-black tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-[#E5B582]">
                  VELVET &amp; PULSE
                </span>
                <span className="text-[9px] uppercase tracking-[0.3em] text-[#C29E75] font-semibold">
                  Intimate Pleasure Tech
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-7 text-xs tracking-wider uppercase font-medium text-slate-300">
            <Link
              to="/"
              className="hover:text-amber-200 transition-colors"
            >
              All Creations
            </Link>
            <a
              href="#catalog"
              className="hover:text-amber-200 transition-colors"
            >
              Bestsellers
            </a>
            <a
              href="#technology"
              className="hover:text-amber-200 transition-colors"
            >
              Whisper Tech
            </a>
            <a
              href="#promise"
              className="hover:text-amber-200 transition-colors flex items-center gap-1.5"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Discreet Promise
            </a>
            {onOpenQuiz && (
              <button
                onClick={onOpenQuiz}
                className="flex items-center gap-1 text-rose-300 hover:text-rose-200 bg-rose-950/40 hover:bg-rose-900/50 px-3 py-1.5 rounded-full border border-rose-800/40 transition-colors"
              >
                <Sparkles className="w-3 h-3 text-amber-300" />
                Find Your Vibe
              </button>
            )}
          </nav>

          {/* Right Actions: Quiz Button & Cart Bag */}
          <div className="flex items-center gap-3">
            {onOpenQuiz && (
              <button
                onClick={onOpenQuiz}
                className="hidden sm:flex lg:hidden items-center gap-1 text-xs text-rose-300 bg-rose-950/40 px-3 py-1.5 rounded-full border border-rose-800/40"
              >
                <Sparkles className="w-3 h-3 text-amber-300" />
                Vibe Quiz
              </button>
            )}

            {/* Cart Trigger */}
            <button
              onClick={openCart}
              className="relative p-2.5 rounded-2xl bg-[#171824] hover:bg-[#222434] border border-[#2D3044] hover:border-[#424662] text-slate-100 transition-all flex items-center gap-2 group shadow-md"
              aria-label="Open shopping bag"
            >
              <ShoppingBag className="w-5 h-5 text-amber-200/90 group-hover:scale-110 transition-transform" />
              <span className="hidden sm:inline text-xs font-semibold tracking-wide">
                Intimate Bag
              </span>

              {totalItems > 0 && (
                <span className="inline-flex items-center justify-center px-2 py-0.5 text-[11px] font-bold text-white bg-gradient-to-r from-[#B02A6A] to-[#D4A373] rounded-full shadow-lg shadow-rose-900/60 animate-bounce">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0F1017] border-b border-[#252838] px-4 pt-3 pb-6 space-y-3 animate-fade-in">
          <div className="flex flex-col space-y-2 text-sm text-slate-200">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-[#1C1E2B] transition-colors"
            >
              All Creations
            </Link>
            <a
              href="#catalog"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-[#1C1E2B] transition-colors"
            >
              Bestsellers
            </a>
            <a
              href="#technology"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-[#1C1E2B] transition-colors"
            >
              Whisper-Quiet Technology
            </a>
            <a
              href="#promise"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-[#1C1E2B] transition-colors flex items-center gap-2 text-emerald-400"
            >
              <ShieldCheck className="w-4 h-4" />
              100% Discreet Packaging &amp; Billing
            </a>
            {onOpenQuiz && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false)
                  onOpenQuiz()
                }}
                className="text-left px-3 py-2 rounded-lg bg-rose-950/40 text-rose-300 flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                Find Your Vibe Match (Interactive Quiz)
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
