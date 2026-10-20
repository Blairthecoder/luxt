import { SITE } from '@/config/site'

/**
 * The Nightstand Supply logo (moon, nightstand and wordmark) as a transparent
 * image. Pass alt="" when the logo sits inside a link that already has a label.
 */
export function Logo({ className = 'h-10 w-auto', alt = SITE.name }: { className?: string; alt?: string }) {
  return <img src="/logo.webp" alt={alt} width={372} height={120} decoding="async" className={className} />
}
