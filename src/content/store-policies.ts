/**
 * Store policy values for lingerie sold through our Shopify checkout. The
 * Shipping, Returns and Size Guide pages, the product-page trust row and the
 * Product schema (shippingDetails, hasMerchantReturnPolicy) all read from
 * here, so a policy change is one edit. Keep these in step with the policies
 * and shipping profiles in Shopify admin.
 *
 * Return terms mirror the Refund policy published in Shopify admin.
 * TO CONFIRM: handling and transit days (the Shopify Shipping policy still has
 * placeholders) and the shipping rates, which come from the General profile;
 * Shopify Collective items may be quoted by the supplier's carrier instead.
 */
export const STORE_POLICY = {
  /** Countries Shopify checkout ships to. */
  shipsTo: ['US', 'CA'],
  /** Business days to prepare an order for shipment. TO CONFIRM. */
  handlingDays: { min: 1, max: 3 },
  /** Business days in transit inside the US after shipment. TO CONFIRM. */
  transitDays: { min: 3, max: 7 },
  /** US standard shipping rate in USD, from the General shipping profile. TO CONFIRM for Collective items. */
  standardRate: 8,
  /** US express shipping rate in USD, from the General shipping profile. TO CONFIRM for Collective items. */
  expressRate: 15,
  /** Order subtotal in USD at which US standard shipping is free. */
  freeShippingThreshold: 70,
  /** Days after delivery to start a return. */
  returnDays: 14,
  /** Business days to issue an approved refund. */
  refundDays: 10,
  /** Hours after ordering in which a cancellation is guaranteed. */
  cancelHours: 1,
  /**
   * Shopify tag that marks a product final sale (no change-of-mind returns).
   * Tagged products get a final-sale note and MerchantReturnNotPermitted schema.
   */
  finalSaleTag: 'final-sale',
  /** Item types the Refund policy names as final sale for hygiene reasons. */
  finalSaleTypes: ['panties and thongs', 'hosiery and bodystockings', 'lingerie sets marked final sale at checkout'],
} as const

export function isFinalSale(tags: readonly string[]): boolean {
  return tags.some((t) => t.toLowerCase() === STORE_POLICY.finalSaleTag)
}

const p = STORE_POLICY

/** One-line shipping and returns summary for product pages and the cart. */
export const SHIPPING_SUMMARY = `Free US shipping on orders of $${p.freeShippingThreshold}+. Ships in ${p.handlingDays.min} to ${p.handlingDays.max} business days.`

/** schema.org OfferShippingDetails for a lingerie offer at the given price. */
export function shippingDetailsJsonLd(price: number) {
  return {
    '@type': 'OfferShippingDetails',
    shippingRate: {
      '@type': 'MonetaryAmount',
      value: price >= p.freeShippingThreshold ? 0 : p.standardRate,
      currency: 'USD',
    },
    shippingDestination: { '@type': 'DefinedRegion', addressCountry: 'US' },
    deliveryTime: {
      '@type': 'ShippingDeliveryTime',
      handlingTime: { '@type': 'QuantitativeValue', minValue: p.handlingDays.min, maxValue: p.handlingDays.max, unitCode: 'DAY' },
      transitTime: { '@type': 'QuantitativeValue', minValue: p.transitDays.min, maxValue: p.transitDays.max, unitCode: 'DAY' },
    },
  }
}

/** schema.org MerchantReturnPolicy for a lingerie product. */
export function returnPolicyJsonLd(tags: readonly string[], policyUrl: string) {
  if (isFinalSale(tags)) {
    return {
      '@type': 'MerchantReturnPolicy',
      applicableCountry: 'US',
      returnPolicyCategory: 'https://schema.org/MerchantReturnNotPermitted',
      merchantReturnLink: policyUrl,
    }
  }
  return {
    '@type': 'MerchantReturnPolicy',
    applicableCountry: 'US',
    returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
    merchantReturnDays: p.returnDays,
    returnMethod: 'https://schema.org/ReturnByMail',
    returnFees: 'https://schema.org/ReturnFeesCustomerResponsibility',
    merchantReturnLink: policyUrl,
  }
}
