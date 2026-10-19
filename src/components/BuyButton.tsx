import { ExternalLink } from 'lucide-react'
import { getProgram, goPath } from '@/lib/affiliate'

export function BuyButton({
  handle,
  program,
  available = true,
  className = '',
}: {
  handle: string
  program?: string
  available?: boolean
  className?: string
}) {
  const merchant = getProgram(program).merchantName
  return (
    <a
      href={goPath(handle)}
      target="_blank"
      rel="sponsored nofollow noopener"
      className={`px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#9B2C68] to-[#C88A58] hover:opacity-95 text-white text-sm font-semibold tracking-wide transition-all shadow-md inline-flex items-center justify-center gap-2 ${className}`}
    >
      {available ? `Buy at ${merchant}` : `Check stock at ${merchant}`}
      <ExternalLink className="w-4 h-4" />
    </a>
  )
}
