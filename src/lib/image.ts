/**
 * Transforms an image path to utilize Netlify Image CDN
 * Format: /.netlify/images?url=/img/<file>&w=<width>&fm=webp
 */
export function getOptimizedImageUrl(src: string, width = 800, quality = 80): string {
  if (!src) return '/placeholder.png'
  
  // If it is already an absolute external URL or special protocol, return as is
  if (src.startsWith('http://') || src.startsWith('https://') || src.startsWith('data:')) {
    return src
  }

  // Ensure leading slash
  const normalizedSrc = src.startsWith('/') ? src : `/${src}`

  // Apply Netlify Image CDN parameters
  return `/.netlify/images?url=${encodeURIComponent(normalizedSrc)}&w=${width}&q=${quality}&fm=webp&fit=cover`
}
