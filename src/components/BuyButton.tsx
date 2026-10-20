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
      className={`btn btn-lg ${className}`}
    >
      {available ? `Buy Now at ${merchant}` : `Check Stock at ${merchant}`}
    </a>
  )
}
