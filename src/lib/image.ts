/**
 * Returns a resized image URL.
 * - Shopify CDN images are resized with Shopify's `width` parameter.
 * - Local images use the Netlify Image CDN (/.netlify/images).
 */
export function getOptimizedImageUrl(src: string | undefined, width = 800, quality = 80): string {
  if (!src) return '/placeholder.png'

  if (src.startsWith('https://cdn.shopify.com/')) {
    const url = new URL(src)
    url.searchParams.set('width', String(width))
    return url.toString()
  }

  if (src.startsWith('http://') || src.startsWith('https://') || src.startsWith('data:')) {
    return src
  }

  const normalizedSrc = src.startsWith('/') ? src : `/${src}`
  return `/.netlify/images?url=${encodeURIComponent(normalizedSrc)}&w=${width}&q=${quality}&fm=webp&fit=cover`
}

/**
 * A `srcset` of the same image at several widths, so phones and small grid
 * cells download smaller files. Pair it with a `sizes` attribute that matches
 * the layout. Returns undefined when there is no image.
 */
export function getImageSrcSet(src: string | undefined, widths: number[], quality = 80): string | undefined {
  if (!src) return undefined
  return widths.map((w) => `${getOptimizedImageUrl(src, w, quality)} ${w}w`).join(', ')
}

/**
 * True for on-model photography from our Shopify lingerie store. Those photos
 * fill their frame at natural color; the multiply blend, inset padding and
 * desaturation used for cut-out toy shots flatten skin tones and make real
 * models look like renders.
 */
export function isModelPhoto(src: string | undefined): boolean {
  return Boolean(src?.startsWith('https://cdn.shopify.com/'))
}

/** Image classes for a product shot: full-bleed for model photos, `cutout` for packshots. */
export function productImageClass(src: string | undefined, cutout: string): string {
  return isModelPhoto(src) ? 'object-cover object-[50%_25%]' : cutout
}
