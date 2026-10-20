// Server-only: renders a Nightstand Notes post to HTML and resolves its live
// catalog embeds ([[picks:id]] and [[from:slug]]) against the synced feed, so
// prices in guides always match the catalog the site was built with.
import { marked } from 'marked'
import { productsMatchingRule } from '@/server/catalog-store'
import { isDiscreet } from '@/server/merchandising'
import { COLLECTIONS_BY_SLUG, type CollectionRule } from '@/content/collections'
import type { PickBlock, PickSlot, Post } from '@/content/posts'
import type { CatalogProduct } from '@/types/catalog'
import { getProgram, goPath } from '@/lib/affiliate'
import { getOptimizedImageUrl } from '@/lib/image'
import { formatPrice } from '@/lib/format'

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function inStock(p: CatalogProduct): boolean {
  return p.available && p.images.length > 0 && p.price > 0
}

function candidates(rule: CollectionRule): CatalogProduct[] {
  return productsMatchingRule(`rule:${JSON.stringify(rule)}`, rule).filter(inStock)
}

function fillSlot(slot: PickSlot, used: Set<string>): CatalogProduct | undefined {
  for (const rule of slot.rules) {
    const open = candidates(rule).filter((p) => !used.has(p.handle))
    // Guides sit next to LELO and Womanizer: explicit novelty names only fill a slot when nothing else can.
    const discreet = open.filter(isDiscreet)
    const matches = (discreet.length ? discreet : open).sort((a, b) => a.price - b.price)
    if (!matches.length) continue
    if (slot.prefer === 'price-asc') return matches[0]
    if (slot.prefer === 'price-desc') return matches[matches.length - 1]
    // Middle of the range: representative of the slot, not its outliers.
    return matches[Math.floor(matches.length / 2)]
  }
  return undefined
}

/** Resolves a picks block to products; slots with no in-stock match are dropped. */
export function resolvePicks(block: PickBlock, used = new Set<string>()) {
  const picks: { slot: PickSlot; product: CatalogProduct }[] = []
  for (const slot of block.slots) {
    const product = fillSlot(slot, used)
    if (!product) continue
    used.add(product.handle)
    picks.push({ slot, product })
  }
  return picks
}

function pickCard(slot: PickSlot, p: CatalogProduct): string {
  const merchant = getProgram(p.program).merchantName
  const title = escapeHtml(p.title)
  const price = p.compareAtPrice
    ? `${formatPrice(p.price)} <s>${formatPrice(p.compareAtPrice)}</s>`
    : formatPrice(p.price)
  return `<li class="pick">
  <a class="pick-image" href="/products/${p.handle}"><img src="${getOptimizedImageUrl(p.images[0]?.src, 400)}" alt="${title} by ${escapeHtml(p.brand)}" width="400" height="500" loading="lazy" /></a>
  <div class="pick-body">
    <p class="pick-label">${escapeHtml(slot.label)}</p>
    <h3 class="pick-title"><a href="/products/${p.handle}">${title}</a></h3>
    <p class="pick-meta">${escapeHtml(p.brand)} · <span class="pick-price">${price}</span></p>
    <p class="pick-note">${escapeHtml(slot.note)}</p>
    <a class="pick-buy" data-link-context="guide_pick" href="${goPath(p.handle)}" target="_blank" rel="sponsored nofollow noopener">Check Price<span class="pick-buy-merchant"> at ${escapeHtml(merchant)}</span></a>
  </div>
</li>`
}

function lowestPrice(slug: string): number | undefined {
  const collection = COLLECTIONS_BY_SLUG[slug]
  if (!collection) return undefined
  const prices = productsMatchingRule(collection.slug, collection.rule)
    .filter(inStock)
    .map((p) => p.price)
  return prices.length ? Math.min(...prices) : undefined
}

export type TopPick = {
  handle: string
  title: string
  brand: string
  price: number
  image?: string
  program: string
  label: string
  note: string
}

export async function renderPostHtml(post: Post): Promise<{ html: string; topPick: TopPick | null }> {
  const used = new Set<string>()
  let topPick: TopPick | null = null
  let html = await marked.parse(post.body.trim())

  html = html.replace(/<p>\[\[picks:([a-z0-9-]+)\]\]<\/p>/g, (_, id: string) => {
    const block = post.picks?.[id]
    if (!block) return ''
    const picks = resolvePicks(block, used)
    if (!picks.length) return ''
    if (!topPick) {
      const { slot, product } = picks[0]
      topPick = {
        handle: product.handle,
        title: product.title,
        brand: product.brand,
        price: product.price,
        image: product.images[0]?.src,
        program: product.program,
        label: slot.label,
        note: slot.note,
      }
    }
    return `<ul class="picks">${picks.map(({ slot, product }) => pickCard(slot, product)).join('')}</ul>`
  })

  html = html.replace(/\[\[from:([a-z0-9-]+)\]\]/g, (_, slug: string) => {
    const price = lowestPrice(slug)
    return price === undefined ? '' : ` (from ${formatPrice(price)})`
  })

  html = html.replace(/\[\[price:([a-z0-9-]+)\]\]/g, (_, slug: string) => {
    const price = lowestPrice(slug)
    return price === undefined ? 'See current prices' : formatPrice(price)
  })

  return { html, topPick }
}

