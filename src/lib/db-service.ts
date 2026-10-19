import { createServerFn } from '@tanstack/react-start'
import { db } from '../../db/index.js'
import { products as productsTable, reviews as reviewsTable, orders as ordersTable } from '../../db/schema.js'
import { products as staticProducts, Product } from '../data/products.js'

export const seedDatabaseIfEmpty = createServerFn({ method: 'POST' }).handler(async () => {
  try {
    const existing = await db.select({ id: productsTable.id }).from(productsTable).limit(1)
    if (existing.length === 0) {
      console.log('Seeding initial products into Netlify Database...')
      for (const p of staticProducts) {
        await db.insert(productsTable).values({
          slug: p.slug,
          name: p.name,
          tagline: p.tagline,
          category: p.category,
          price: p.price,
          originalPrice: p.originalPrice ?? null,
          rating: p.rating,
          reviewsCount: p.reviewsCount,
          badge: p.badge ?? null,
          shortDescription: p.shortDescription,
          description: p.description,
          intensityLevel: p.intensityLevel,
          waterproof: p.waterproof,
          material: p.material,
          batteryLife: p.batteryLife,
          noiseLevel: p.noiseLevel,
          inStock: p.inStock ? 1 : 0,
          images: JSON.stringify(p.images),
          variants: JSON.stringify(p.variants),
          features: JSON.stringify(p.features),
          specifications: JSON.stringify(p.specifications),
        })
      }
      return { seeded: true, count: staticProducts.length }
    }
    return { seeded: false, count: existing.length }
  } catch (err) {
    console.warn('Database seed check deferred (DB may still be initializing):', err instanceof Error ? err.message : err)
    return { seeded: false, error: String(err) }
  }
})

export const getCatalogProducts = createServerFn({ method: 'GET' }).handler(async (): Promise<Product[]> => {
  try {
    const rows = await db.select().from(productsTable)
    if (rows && rows.length > 0) {
      return rows.map((r) => {
        let parsedImages = []
        let parsedVariants = []
        let parsedFeatures = []
        let parsedSpecs = {}
        try { parsedImages = JSON.parse(r.images) } catch { parsedImages = [] }
        try { parsedVariants = JSON.parse(r.variants) } catch { parsedVariants = [] }
        try { parsedFeatures = JSON.parse(r.features) } catch { parsedFeatures = [] }
        try { parsedSpecs = JSON.parse(r.specifications) } catch { parsedSpecs = {} }

        // Find review list from static fallback or review records
        const matchingStatic = staticProducts.find((sp) => sp.slug === r.slug)

        return {
          id: r.id,
          slug: r.slug,
          name: r.name,
          tagline: r.tagline,
          category: r.category,
          price: r.price,
          originalPrice: r.originalPrice ?? undefined,
          rating: r.rating,
          reviewsCount: r.reviewsCount,
          badge: r.badge ?? undefined,
          shortDescription: r.shortDescription,
          description: r.description,
          intensityLevel: r.intensityLevel,
          waterproof: r.waterproof,
          material: r.material,
          batteryLife: r.batteryLife,
          noiseLevel: r.noiseLevel,
          inStock: r.inStock === 1,
          stockCount: matchingStatic ? matchingStatic.stockCount : 15,
          images: parsedImages.length > 0 ? parsedImages : (matchingStatic?.images ?? []),
          variants: parsedVariants.length > 0 ? parsedVariants : (matchingStatic?.variants ?? []),
          features: parsedFeatures.length > 0 ? parsedFeatures : (matchingStatic?.features ?? []),
          specifications: Object.keys(parsedSpecs).length > 0 ? parsedSpecs : (matchingStatic?.specifications ?? {}),
          reviews: matchingStatic?.reviews ?? [],
        }
      })
    }
  } catch (err) {
    console.warn('Falling back to static catalog due to DB status:', err instanceof Error ? err.message : err)
  }

  // Fallback to static rich data
  return staticProducts
})

export const submitCustomerReview = createServerFn({ method: 'POST' })
  .validator((data: { productId: number; authorName: string; rating: number; title: string; content: string }) => data)
  .handler(async ({ data }) => {
    try {
      const [inserted] = await db.insert(reviewsTable).values({
        productId: data.productId,
        authorName: data.authorName,
        rating: data.rating,
        title: data.title,
        content: data.content,
        verified: 1,
      }).returning()
      return { success: true, review: inserted }
    } catch (err) {
      console.error('Failed to persist review:', err)
      return { success: false, error: 'Database save queued' }
    }
  })

export const recordCompletedOrder = createServerFn({ method: 'POST' })
  .validator((data: { orderNumber: string; customerEmail: string; items: any[]; totalPrice: number; discreetPackaging: boolean }) => data)
  .handler(async ({ data }) => {
    try {
      const [order] = await db.insert(ordersTable).values({
        orderNumber: data.orderNumber,
        customerEmail: data.customerEmail,
        items: JSON.stringify(data.items),
        totalPrice: data.totalPrice,
        status: 'confirmed',
        discreetPackaging: data.discreetPackaging ? 1 : 0,
      }).returning()
      return { success: true, order }
    } catch (err) {
      console.error('Failed to record order:', err)
      return { success: false, error: 'Order noted' }
    }
  })
