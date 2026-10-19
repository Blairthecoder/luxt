import { Link } from '@tanstack/react-router'

export function AffiliateNotice({ className = '' }: { className?: string }) {
  return (
    <p className={`text-[11px] text-slate-500 leading-relaxed ${className}`}>
      We may earn a commission when you buy through links on this page, at no extra cost to you.{' '}
      <Link to="/disclosure" className="underline hover:text-amber-200">
        How we make money
      </Link>
    </p>
  )
}
