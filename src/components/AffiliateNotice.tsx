import { Link } from '@tanstack/react-router'

export function AffiliateNotice({ className = '' }: { className?: string }) {
  return (
    <p className={`text-xs text-faint leading-relaxed ${className}`}>
      We may earn a commission when you buy through our links, at no extra cost to you.{' '}
      <Link to="/disclosure" className="underline underline-offset-2 hover:text-gold">
        How We Make Money
      </Link>
    </p>
  )
}
