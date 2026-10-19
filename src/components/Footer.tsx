import { Link } from '@tanstack/react-router'
import { SITE } from '@/config/site'
import { HUBS } from '@/content/hubs'

export function Footer() {
  const half = Math.ceil(HUBS.length / 2)

  return (
    <footer className="bg-[#090A0E] text-slate-300 border-t border-[#1F212D] pt-14 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5 space-y-4">
            <span className="text-lg font-serif font-black tracking-[0.12em] text-white">
              NIGHTSTAND SUPPLY CO.
            </span>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">{SITE.description}</p>
            <p className="text-[11px] text-slate-400 bg-[#10121B] border border-[#212332] p-3 rounded-xl max-w-sm leading-relaxed">
              <strong className="text-slate-200">How we make money:</strong> we earn a commission when you
              buy through our links, at no extra cost to you. Orders are placed and shipped by our retail
              partner.{' '}
              <Link to="/disclosure" className="underline hover:text-amber-200">
                Read our disclosure
              </Link>
            </p>
          </div>

          {[HUBS.slice(0, half), HUBS.slice(half)].map((column, i) => (
            <div key={i} className="lg:col-span-3 space-y-3">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-white">
                {i === 0 ? 'Shop by category' : 'More categories'}
              </h2>
              <ul className="space-y-2 text-xs text-slate-400">
                {column.map((hub) => (
                  <li key={hub.slug}>
                    <Link
                      to="/category/$slug"
                      params={{ slug: hub.slug }}
                      className="hover:text-amber-200 transition-colors"
                    >
                      {hub.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-[#1A1C26] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <span>
            &copy; {new Date().getFullYear()} {SITE.name} For adults 18+ only.
          </span>
          <Link to="/disclosure" className="hover:text-amber-200">
            Affiliate disclosure
          </Link>
        </div>
      </div>
    </footer>
  )
}
