import { getProgram, goPath } from '@/lib/affiliate'
import { formatPrice } from '@/lib/format'

export function BuyButton({
  handle,
  program,
  available = true,
  price,
  context = 'product_page',
  className = '',
}: {
  handle: string
  program?: string
  available?: boolean
  /** Shown on the button so readers see the price before leaving. */
  price?: number
  /** GA4 affiliate_click link_context. */
  context?: string
  className?: string
}) {
  const merchant = getProgram(program).merchantName
  return (
    <a
      href={goPath(handle)}
      target="_blank"
      rel="sponsored nofollow noopener"
      data-link-context={context}
      data-merchant={getProgram(program).id}
      className={`btn btn-lg ${className}`}
    >
      {available
        ? price
          ? `Check Price at ${merchant}: ${formatPrice(price)}`
          : `Check Price at ${merchant}`
        : `Check Stock at ${merchant}`}
    </a>
  )
}
