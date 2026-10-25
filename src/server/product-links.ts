// Server-only: turns the GUIDE_PRODUCTS / EROTICA_PRODUCTS map into in-body
// product links and "Shop This Guide" cards, against the synced catalog.
import { findProduct } from '@/server/catalog-store'
import { PRODUCT_COPY } from '@/content/product-copy'
import { PRODUCT_ANCHORS, type PageProduct } from '@/content/product-links'

export type PageProductCard = {
  handle: string
  title: string
  brand: string
  price: number
  compareAtPrice?: number
  image?: string
  program: string
  available: boolean
  hasCopy: boolean
  note: string
  /** Shopify variants for Add to Cart; empty for affiliate products. */
  variants: { id: number; title: string; price: number; available: boolean }[]
}

function escapeRegExp(text: string): string {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

/**
 * Catalog anchors that start with a capital are product names and match
 * case-sensitively ("Solace", not "solace"); page anchors and generic phrases
 * ignore case. A trailing plural is allowed ("panty vibrators").
 */
function anchorPattern(phrase: string, ignoreCase: boolean): RegExp {
  const flags = ignoreCase || !/^[A-Z]/.test(phrase) ? 'i' : ''
  return new RegExp(`(?<![\\w-])${escapeRegExp(phrase)}(?:s|es)?(?![\\w-])`, flags)
}

function cardFor(entry: PageProduct): PageProductCard | null {
  const p = findProduct(entry.handle)
  if (!p || !p.available || !p.images.length || p.price <= 0) return null
  const copy = PRODUCT_COPY[p.handle]
  return {
    handle: p.handle,
    title: p.title,
    brand: p.brand,
    price: p.price,
    compareAtPrice: p.compareAtPrice,
    image: p.images[0]?.src,
    program: p.program,
    available: p.available,
    hasCopy: Boolean(copy),
    note: entry.note ?? copy?.bestFor ?? copy?.summary ?? '',
    variants:
      p.program === 'shopify'
        ? p.variants.flatMap((v) => (v.id ? [{ id: v.id, title: v.title, price: v.price, available: v.available }] : []))
        : [],
  }
}

/** In-stock cards for a page's mapped products, minus any already shown as picks. */
export function pageProductCards(list: PageProduct[] | undefined, skip: Set<string> = new Set()): PageProductCard[] {
  return (list ?? []).filter((e) => !skip.has(e.handle)).flatMap((e) => cardFor(e) ?? [])
}

const LINKABLE = new Set(['p', 'li', 'td'])
const BLOCKED = new Set(['a', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'strong', 'code', 'pre', 'th'])

/**
 * Links the first natural mention of each product in rendered guide HTML.
 * Only text inside paragraphs, list items and table cells is touched, never
 * headings, bold lead-ins, existing links or picks cards. Products the page
 * already links to (picks cards, hand-written links) are skipped, so each
 * product is linked once. Returns the handles that got a link.
 */
export function linkProductMentions(html: string, list: PageProduct[] | undefined): { html: string; linked: string[] } {
  const already = new Set([...html.matchAll(/href="\/products\/([a-z0-9-]+)"/g)].map((m) => m[1]))
  const pending = (list ?? []).filter((e) => !already.has(e.handle) && findProduct(e.handle)?.available)
  if (!pending.length) return { html, linked: [] }
  const patterns = new Map(
    pending.map((e) => [
      e.handle,
      [
        ...(e.anchor ? [anchorPattern(e.anchor, true)] : []),
        ...(PRODUCT_ANCHORS[e.handle] ?? []).map((a) => anchorPattern(a, false)),
      ],
    ]),
  )
  const linked: string[] = []
  // Open elements; `skip` marks headings, links, bold lead-ins and the picks cards.
  const stack: { tag: string; skip: boolean }[] = []
  const parts = html.split(/(<[^>]+>)/)
  for (let i = 0; i < parts.length; i++) {
    const part = parts[i]
    if (part.startsWith('<')) {
      const m = part.match(/^<(\/?)([a-z0-9]+)/i)
      if (!m || part.endsWith('/>')) continue
      const tag = m[2].toLowerCase()
      if (m[1]) {
        const at = stack.map((e) => e.tag).lastIndexOf(tag)
        if (at >= 0) stack.length = at
      } else if (!['br', 'img', 'hr', 'input'].includes(tag)) {
        stack.push({ tag, skip: BLOCKED.has(tag) || /class="picks"/.test(part) })
      }
      continue
    }
    if (!part.trim() || stack.some((e) => e.skip) || !stack.some((e) => LINKABLE.has(e.tag))) continue
    let text = part
    for (const entry of pending) {
      if (linked.includes(entry.handle)) continue
      for (const re of patterns.get(entry.handle) ?? []) {
        const hit = re.exec(text)
        if (!hit) continue
        // Keep it to one new link per text run so a sentence never turns into a row of links.
        text = `${text.slice(0, hit.index)}<a href="/products/${entry.handle}" data-link-context="guide_inline">${hit[0]}</a>${text.slice(hit.index + hit[0].length)}`
        linked.push(entry.handle)
        break
      }
      if (text !== part) break
    }
    parts[i] = text
  }
  return { html: parts.join(''), linked }
}
