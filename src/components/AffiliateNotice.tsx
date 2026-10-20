import { Link } from '@tanstack/react-router'

export function AffiliateNotice({ className = '' }: { className?: string }) {
  return (
    <p className={`text-xs text-graphite leading-relaxed ${className}`}>
      We may earn a commission when you buy through our links, at no extra cost to you.{' '}
      <Link to="/disclosure" className="text-ink underline underline-offset-2">
        How We Make Money
      </Link>
    </p>
  )
}
