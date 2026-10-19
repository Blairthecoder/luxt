import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { Menu, ShieldCheck, X } from 'lucide-react'
import { SITE } from '@/config/site'
import { HUBS_BY_SLUG } from '@/content/hubs'

const NAV_HUBS = ['vibrators', 'strokers', 'dildos', 'anal-toys', 'couples', 'lubricants'] as const

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[#0B0C12]/90 border-b border-[#212330]">
      <div className="bg-[#121626] text-[11px] py-2 px-4 text-center border-b border-[#2A2338]/60 text-slate-300">
        <span className="inline-flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          Honest guidance, current prices, and discreet shipping from our retail partner
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex flex-col">
            <span className="text-lg sm:text-xl font-serif font-black tracking-[0.12em] text-white">
              NIGHTSTAND SUPPLY CO.
            </span>
            <span className="text-[9px] uppercase tracking-[0.3em] text-[#C29E75] font-semibold">
              Adult toys, explained
            </span>
          </Link>

          <nav
            aria-label="Categories"
            className="hidden lg:flex items-center gap-6 text-xs tracking-wider uppercase font-medium text-slate-300"
          >
            {NAV_HUBS.map((slug) => (
              <Link
                key={slug}
                to="/category/$slug"
                params={{ slug }}
                className="hover:text-amber-200 transition-colors"
                activeProps={{ className: 'text-amber-200' }}
              >
                {HUBS_BY_SLUG[slug].name}
              </Link>
            ))}
          </nav>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-slate-300 hover:text-white hover:bg-[#1A1C28]"
            aria-label="Toggle navigation"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <nav
          aria-label={`${SITE.shortName} categories`}
          className="lg:hidden bg-[#0F1017] border-b border-[#252838] px-4 pt-3 pb-6 flex flex-col gap-1 text-sm text-slate-200"
        >
          {NAV_HUBS.map((slug) => (
            <Link
              key={slug}
              to="/category/$slug"
              params={{ slug }}
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-[#1C1E2B]"
            >
              {HUBS_BY_SLUG[slug].name}
            </Link>
          ))}
        </nav>
      )}
    </header>
  )
}
