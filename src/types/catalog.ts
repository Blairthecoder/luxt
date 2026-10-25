export interface CatalogImage {
  src: string
  width?: number
  height?: number
  /** Alt text from the store's media library, when set. */
  alt?: string
}

export interface CatalogVariant {
  id?: number
  title: string
  price: number
  compareAtPrice?: number
  available: boolean
}

export interface CatalogProduct {
  handle: string
  title: string
  brand: string
  productType: string
  tags: string[]
  hub: string
  price: number
  compareAtPrice?: number
  available: boolean
  images: CatalogImage[]
  variants: CatalogVariant[]
  program: string
  updatedAt?: string
}

export interface Catalog {
  syncedAt: string | null
  source: string
  products: CatalogProduct[]
}

/** Original editorial copy for a product. Pages without it stay noindex. */
export interface ProductCopy {
  summary: string
  body?: string[]
  bestFor?: string
  pros?: string[]
  cons?: string[]
  faqs?: { q: string; a: string }[]
}

/** Step-by-step guide shown on a product page, written from the maker's own instructions. */
export interface HowToUse {
  /** Short numbered steps for a first try. */
  start: string[]
  /** Honest, hedged description of what it tends to feel like. */
  expect: string
  /** Practical facts: waterproofing, charging, cleaning, sizing. */
  goodToKnow?: string[]
}

export interface Hub {
  slug: string
  name: string
  singular: string
  metaTitle: string
  metaDescription: string
  intro: string
  buyingTips: string[]
}
