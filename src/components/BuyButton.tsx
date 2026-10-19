import { useState } from 'react'
import { createCheckoutSession } from '@/lib/stripe'
import { Lock } from 'lucide-react'

export function BuyButton({
  productId,
  className = '',
}: {
  productId: number
  className?: string
}) {
  const [loading, setLoading] = useState(false)

  const handleClick = async () => {
    setLoading(true)
    try {
      const url = await createCheckoutSession({ data: productId })
      if (url) {
        window.location.href = url
      }
    } catch (error) {
      console.error('Checkout error:', error)
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={`px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#9B2C68] to-[#C88A58] hover:opacity-95 text-white text-xs font-semibold tracking-wider uppercase transition-all shadow-md flex items-center justify-center gap-1.5 disabled:opacity-60 disabled:cursor-wait ${className}`}
    >
      <Lock className="w-3.5 h-3.5 text-amber-200" />
      {loading ? 'Processing...' : 'Discreet Checkout'}
    </button>
  )
}
