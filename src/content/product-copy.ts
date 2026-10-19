import type { ProductCopy } from '@/types/catalog'

/**
 * Original editorial copy keyed by product handle. A product page is indexable
 * only once it has an entry here; do not paste merchant descriptions.
 *
 * Example:
 * 'doc-johnson-main-squeeze-lulu-chu': {
 *   summary: 'One or two sentences in our own words on what it is and who it suits.',
 *   body: ['Paragraph on how it feels and how it compares.'],
 *   bestFor: 'First-time stroker buyers who want a realistic feel.',
 *   pros: ['...'],
 *   cons: ['...'],
 *   faqs: [{ q: 'Is it easy to clean?', a: '...' }],
 * },
 */
export const PRODUCT_COPY: Record<string, ProductCopy> = {}
