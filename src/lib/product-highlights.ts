import type { CatalogProduct } from '@/types/catalog'

const HIGHLIGHTS: [RegExp, string][] = [
  [/\b(app|bluetooth)\b/i, 'App-controlled from your phone'],
  [/\bremote\b/i, 'Remote control included'],
  [/rechargeable|usb/i, 'Rechargeable, no batteries to buy'],
  [/waterproof|water-?resistant|submersible/i, 'Waterproof for the bath or shower'],
  [/\bsilicone\b/i, 'Body-safe silicone; pair with water-based lube'],
  [/\b(quiet|whisper|silent)\b/i, 'Designed to run quietly'],
  [/warming|heat(ed|ing)/i, 'Warming function'],
  [/wearable|panty/i, 'Wearable and hands-free'],
]

/** Up to three plain facts read from the product title and tags, for pages without editorial copy. */
export function productHighlights(product: Pick<CatalogProduct, 'title' | 'tags'>): string[] {
  const text = `${product.title} | ${product.tags.join(' | ')}`
  return HIGHLIGHTS.filter(([re]) => re.test(text))
    .map(([, line]) => line)
    .slice(0, 3)
}
