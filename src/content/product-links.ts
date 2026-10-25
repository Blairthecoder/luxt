/**
 * Product interlinking for Nightstand Notes guides and Erotica.
 *
 * - `PRODUCT_ANCHORS`: phrases that may link to a product inside a guide body.
 *   The renderer (src/server/product-links.ts) links the first phrase it finds
 *   in a paragraph, list item or table cell, never inside a heading or an
 *   existing link, and links each product once per page.
 * - `GUIDE_PRODUCTS` / `EROTICA_PRODUCTS`: the 2-5 products each page features,
 *   most relevant first. They get an in-body link where an anchor matches and
 *   a "Shop This Guide" card (Check Price for Lovense, Add to Cart for our own
 *   lingerie). Products already shown in the guide's own picks are skipped.
 * - Product pages read the same map backwards for their "Read Next" guides.
 *
 * Handles must exist in src/data/lovense.json or src/data/shopify.json. Cards
 * take their note from the product's `bestFor` copy unless `note` is set. Keep
 * notes factual: no health claims, no testing claims.
 */

export interface PageProduct {
  handle: string
  /** Overrides the product's `bestFor` line on this page's card. */
  note?: string
  /** A phrase from this page's body to link, tried before PRODUCT_ANCHORS. */
  anchor?: string
}

/** Most specific phrase first: the renderer tries them in order. */
export const PRODUCT_ANCHORS: Record<string, string[]> = {
  // Lovense
  'lovense-lush-4': ['Lovense Lush 4', 'Lush 4', 'Lovense Lush', 'wearable G-spot vibrator', 'wearable vibrator', 'remote-control vibrator', 'remote control vibrator'],
  'lovense-ambi': ['Lovense Ambi', 'Ambi', 'bullet vibrator', 'bullet vibe'],
  'lovense-exomoon': ['Lovense Exomoon', 'Exomoon', 'lipstick vibrator'],
  'lovense-flexer': ['Lovense Flexer', 'Flexer', 'panty vibrator', 'vibrating panties'],
  'lovense-tenera-2': ['Lovense Tenera 2', 'Tenera 2', 'Tenera', 'clitoral suction', 'suction vibrator', 'suction toy', 'air-pulse toy', 'air-pulse'],
  'lovense-fizz-dual-head-clitoral-vibrator': ['Lovense Fizz', 'Fizz'],
  'lovense-hyphy': ['Lovense Hyphy', 'Hyphy', 'dual-end vibrator'],
  'lovense-dolce': ['Lovense Dolce', 'Dolce', 'couples vibrator', 'C-shaped vibrator'],
  'lovense-nora': ['Lovense Nora', 'Nora', 'rabbit vibrator'],
  'lovense-velvo-rotating-rabbit-vibrator-app-controlled-silicone-dual-stimulator': ['Lovense Velvo', 'Velvo'],
  'lovense-vulse': ['Lovense Vulse', 'Vulse', 'thrusting egg'],
  'lovense-gravity': ['Lovense Gravity', 'Gravity', 'thrusting dildo', 'thrusting vibrator'],
  'lovense-spinel-app-controlled-thrusting-vibrating-heating-dildo': ['Lovense Spinel', 'Spinel', 'heating dildo'],
  'lovense-lapis': ['Lovense Lapis', 'Lapis', 'strapless strap-on', 'strap-on'],
  'lovense-strapless-harness-for-lapis-adjustable-o-ring-support-harness': ['Lapis harness', 'harness'],
  'lovense-mini-sex-machine': ['Lovense Mini Sex Machine', 'Mini Sex Machine', 'sex machine'],
  'lovense-sex-machine': ['Lovense Sex Machine', 'sex machine'],
  'lovense-hush-2': ['Lovense Hush 2', 'Hush 2', 'Hush', 'vibrating butt plug', 'vibrating plug', 'butt plug'],
  'lovense-glint': ['Lovense Glint', 'Glint'],
  'lovense-lush-anal-app-controlled-vibrating-plug-light-up-silicone-remote-toy': ['Lush Anal'],
  'lovense-ridge': ['Lovense Ridge', 'Ridge', 'anal beads'],
  'lovense-diamo': ['Lovense Diamo', 'Diamo', 'vibrating cock ring', 'vibrating penis ring', 'vibrating ring', 'cock ring', 'penis ring'],
  'lovense-gemini': ['Lovense Gemini', 'Gemini', 'nipple clamps', 'nipple clips', 'nipple stimulators', 'nipple toys'],
  'lovense-calor': ['Lovense Calor', 'Calor'],
  'lovense-gush-2-motion': ['Lovense Gush 2', 'Gush 2', 'Gush'],
  'lovense-solace': ['Lovense Solace', 'automatic stroker', 'thrusting stroker'],
  'lovense-solace-pro': ['Lovense Solace Pro', 'Solace Pro', 'Solace'],
  'lovense-max-2': ['Lovense Max 2', 'Max 2', 'app-controlled stroker', 'interactive stroker'],
  'lovense-kraken': ['Lovense Kraken', 'Kraken', 'pocket masturbator', 'pocket stroker'],
  'lovense-water-based-lubricant': ['water-based lubricant', 'water-based lube'],
  'lovense-personal-lubricant-jelly': ['lube jelly', 'thicker water-based', 'thick water-based'],
  'lovense-toy-cleaner': ['toy cleaner spray', 'toy cleaner', 'toy-cleaning spray'],
  'lovense-webcam-2': ['Lovense Webcam 2', 'Webcam 2', 'webcam'],
  'lovense-domi-2': ['Lovense Domi 2', 'Domi 2', 'Domi', 'mini wand', 'wand vibrator'],
  'lovense-edge-2': ['Lovense Edge 2', 'Edge 2', 'prostate massager'],
  'lovense-mission-2': ['Lovense Mission 2', 'Mission 2'],
  'lovense-osci-3': ['Lovense Osci 3', 'Osci 3', 'Osci'],
  'lovense-ferri': ['Lovense Ferri', 'Ferri', 'magnetic panty vibrator'],
  // Lingerie (our Shopify store)
  'lace-fishnet-bodysuit': ['fishnet bodysuit', 'lace bodysuit', 'bodysuit'],
  'alessandra-lace-mesh-teddy': ['plunge teddy', 'lace teddy', 'teddy'],
  'contrast-daisy-lace-bra-set': ['lace bralette', 'bralette'],
  'french-dot-mesh-bra-set': ['bra and panty set', 'mesh set'],
  'strapless-lace-bralette-set': ['strapless bralette', 'strapless'],
  'seamless-wire-free-push-up-bra': ['push-up bra', 'everyday bra', 'wire-free bra'],
  'embroidered-lace-wire-free-bra-set': ['wire-free set', 'wire-free lingerie', 'comfortable lingerie', 'lingerie set'],
  'plus-size-eyelash-lace-babydoll-thong': ['plus size babydoll', 'plus-size babydoll', 'babydoll'],
  'plus-size-eyelash-lace-mesh-babydoll': ['plus size lingerie', 'plus-size lingerie', 'babydoll'],
  'plus-size-eyelash-lace-mini-babydoll': ['mini babydoll', 'babydoll'],
  'plus-size-keyhole-lace-mesh-babydoll': ['keyhole babydoll', 'babydoll'],
  'plus-size-velvet-corset-babydoll': ['corset', 'velvet'],
  'green-daisy-lace-babydoll-slip': ['babydoll slip', 'daisy lace'],
  'lace-kimono-robe-babydoll': ['kimono robe', 'lace robe', 'kimono', 'robe'],
  'satin-lace-chemise-nightgown': ['satin chemise', 'chemise', 'nightgown', 'satin slip'],
  '5-piece-black-lingerie-set-garters': ['garter set', 'garters', 'garter', 'lingerie set'],
  'sheer-striped-mesh-bra-panty-set': ['sheer set', 'sheer mesh'],
  'two-set-lingerie-gift-bundle': ['lingerie gift', 'gift bundle'],
}

const p = (handle: string, note?: string, anchor?: string): PageProduct => ({
  handle,
  ...(note ? { note } : {}),
  ...(anchor ? { anchor } : {}),
})

/** Guide slug -> featured products, most relevant first. */
export const GUIDE_PRODUCTS: Record<string, PageProduct[]> = {
  // Body confidence and empowerment
  'how-to-feel-confident-in-lingerie': [p('contrast-daisy-lace-bra-set'), p('seamless-wire-free-push-up-bra'), p('plus-size-eyelash-lace-babydoll-thong'), p('lace-kimono-robe-babydoll')],
  'boudoir-photoshoot-tips': [p('lace-fishnet-bodysuit'), p('strapless-lace-bralette-set', undefined, 'Matching bra and panty set'), p('plus-size-eyelash-lace-babydoll-thong'), p('satin-lace-chemise-nightgown')],
  'how-to-feel-confident-in-bed': [p('green-daisy-lace-babydoll-slip', undefined, 'A slip'), p('lace-fishnet-bodysuit'), p('plus-size-eyelash-lace-mini-babydoll')],
  'sexual-empowerment-for-women': [p('lovense-tenera-2'), p('lace-fishnet-bodysuit'), p('lovense-ambi')],
  'sexual-confidence-after-divorce': [p('lovense-tenera-2'), p('lace-fishnet-bodysuit'), p('alessandra-lace-mesh-teddy')],
  'solo-date-night-ideas': [p('lace-kimono-robe-babydoll'), p('satin-lace-chemise-nightgown'), p('lovense-ambi')],
  'self-pleasure-guide-for-women': [p('lovense-water-based-lubricant'), p('lovense-fizz-dual-head-clitoral-vibrator'), p('lovense-toy-cleaner')],
  'benefits-of-masturbation': [p('lovense-ambi'), p('lovense-kraken')],
  'kegel-exercises-for-pleasure': [p('lovense-water-based-lubricant'), p('lovense-vulse')],
  'sex-after-having-a-baby': [p('lovense-personal-lubricant-jelly'), p('satin-lace-chemise-nightgown'), p('lovense-ambi')],
  // Sex education
  'clitoris-anatomy-guide': [p('lovense-hyphy'), p('lovense-dolce')],
  'how-to-orgasm-for-women': [p('lovense-water-based-lubricant'), p('lovense-fizz-dual-head-clitoral-vibrator')],
  'how-to-find-the-g-spot': [p('lovense-lush-4'), p('lovense-velvo-rotating-rabbit-vibrator-app-controlled-silicone-dual-stimulator'), p('lovense-water-based-lubricant')],
  'why-does-sex-hurt': [p('lovense-personal-lubricant-jelly'), p('lovense-ambi')],
  'sex-myths-adults-still-believe': [p('lovense-tenera-2'), p('lovense-diamo')],
  'responsive-vs-spontaneous-desire': [p('satin-lace-chemise-nightgown'), p('lovense-water-based-lubricant')],
  // Intimacy and couples
  'how-to-ask-for-what-you-want-in-bed': [p('lovense-lush-4'), p('lovense-tenera-2')],
  'mismatched-libido-in-relationships': [p('lovense-lush-4'), p('lovense-dolce')],
  'sensate-focus-exercises-for-couples': [p('satin-lace-chemise-nightgown'), p('lovense-personal-lubricant-jelly')],
  'what-is-aftercare': [p('lace-kimono-robe-babydoll'), p('satin-lace-chemise-nightgown'), p('lovense-toy-cleaner')],
  'non-sexual-intimacy-ideas': [p('satin-lace-chemise-nightgown'), p('lace-kimono-robe-babydoll')],
  'reconnect-with-your-husband-when-you-feel-unseen': [p('lovense-tenera-2'), p('lovense-diamo'), p('satin-lace-chemise-nightgown'), p('lovense-dolce')],
  'how-to-spice-up-your-marriage': [p('lovense-lush-4'), p('lovense-lapis'), p('lace-fishnet-bodysuit', undefined, 'Stretch lace'), p('lovense-gemini')],
  'how-to-introduce-kink-to-your-marriage': [p('lovense-diamo'), p('lovense-gemini'), p('lovense-hush-2'), p('5-piece-black-lingerie-set-garters')],
  'bondage-for-beginners': [p('lovense-gemini'), p('lovense-hush-2'), p('5-piece-black-lingerie-set-garters')],
  'how-to-talk-to-your-partner-about-sex-toys': [p('lovense-ambi'), p('lovense-diamo'), p('lovense-dolce')],
  'how-to-use-sex-toys-with-a-partner': [p('lovense-dolce'), p('lovense-toy-cleaner'), p('lovense-lush-4')],
  'sexy-advent-calendar-ideas-for-couples': [p('lovense-diamo'), p('lovense-water-based-lubricant'), p('satin-lace-chemise-nightgown', undefined, 'Something that feels good to wear'), p('lovense-gemini')],
  'long-distance-sex-toys': [p('lovense-max-2'), p('lovense-lush-4'), p('lovense-nora'), p('lovense-diamo')],
  'long-distance-relationship-video-call-intimacy': [p('lovense-flexer'), p('lovense-max-2'), p('lovense-diamo'), p('lovense-lush-4')],
  'pegging-for-beginners': [p('lovense-lapis'), p('lovense-hush-2'), p('lovense-personal-lubricant-jelly'), p('lovense-toy-cleaner')],
  // For him
  'how-to-use-a-penis-ring': [p('lovense-water-based-lubricant'), p('lovense-toy-cleaner'), p('lovense-gush-2-motion')],
  'prostate-massage-for-beginners': [p('lovense-personal-lubricant-jelly'), p('lovense-toy-cleaner'), p('lovense-hush-2')],
  'sex-toy-questions-men-are-afraid-to-ask': [p('lovense-diamo'), p('lovense-solace'), p('lovense-water-based-lubricant'), p('lovense-edge-2'), p('lovense-kraken')],
  'best-automatic-strokers': [p('lovense-solace-pro'), p('lovense-max-2', undefined, 'interactive experience'), p('lovense-water-based-lubricant'), p('lovense-toy-cleaner')],
  'best-fleshlight-for-beginners': [p('lovense-kraken'), p('lovense-water-based-lubricant'), p('lovense-toy-cleaner')],
  'how-to-clean-a-fleshlight': [p('lovense-water-based-lubricant'), p('lovense-kraken')],
  'fleshlight-vs-tenga': [p('lovense-kraken'), p('lovense-water-based-lubricant'), p('lovense-toy-cleaner')],
  // How-to and care
  'how-to-clean-sex-toys': [p('lovense-water-based-lubricant'), p('lovense-personal-lubricant-jelly')],
  'best-lube-for-sex-toys': [p('lovense-water-based-lubricant'), p('lovense-personal-lubricant-jelly'), p('lovense-kraken')],
  'buying-sex-toys-discreetly': [p('lovense-exomoon'), p('lovense-ambi'), p('lovense-tenera-2')],
  'sex-toys-for-beginners': [p('lovense-ambi'), p('lovense-tenera-2'), p('lovense-domi-2'), p('lovense-dolce'), p('lovense-water-based-lubricant')],
  'how-to-choose-your-first-vibrator': [p('lovense-tenera-2'), p('lovense-ambi'), p('lovense-exomoon'), p('lovense-water-based-lubricant')],
  'sex-toys-for-menopause': [p('lovense-tenera-2'), p('lovense-personal-lubricant-jelly')],
  // Buying guides and comparisons
  'best-wand-vibrators': [p('lovense-domi-2'), p('lovense-water-based-lubricant'), p('lovense-toy-cleaner')],
  'le-wand-vs-magic-wand': [p('lovense-domi-2'), p('lovense-water-based-lubricant'), p('lovense-toy-cleaner')],
  'clitoral-vs-g-spot-vibrators': [p('lovense-fizz-dual-head-clitoral-vibrator'), p('lovense-nora'), p('lovense-lush-4'), p('lovense-dolce')],
  'womanizer-vs-lelo-sona': [p('lovense-fizz-dual-head-clitoral-vibrator'), p('lovense-water-based-lubricant'), p('lovense-toy-cleaner')],
  'lovense-vs-we-vibe': [p('lovense-lush-4'), p('lovense-gush-2-motion'), p('lovense-max-2'), p('lovense-edge-2'), p('lovense-ferri')],
  'best-couples-sex-toys': [p('lovense-dolce'), p('lovense-lapis'), p('lovense-gemini'), p('lovense-water-based-lubricant')],
  // Gift guides
  'sex-toy-gifts-for-her': [p('lace-kimono-robe-babydoll'), p('green-daisy-lace-babydoll-slip'), p('lovense-lush-4'), p('lovense-water-based-lubricant')],
  'sex-toy-gifts-for-him': [p('lovense-gush-2-motion'), p('lovense-water-based-lubricant'), p('lovense-toy-cleaner')],
  'anniversary-sex-toy-gifts': [p('5-piece-black-lingerie-set-garters', undefined, 'lingerie you chose in her size'), p('lovense-diamo'), p('lovense-domi-2'), p('alessandra-lace-mesh-teddy')],
  'valentines-day-sex-toy-gifts': [p('alessandra-lace-mesh-teddy', undefined, 'Lingerie in their size'), p('lovense-tenera-2'), p('lovense-water-based-lubricant'), p('lovense-ambi')],
  'naughty-stocking-stuffers': [p('lovense-ambi'), p('lovense-diamo'), p('lovense-toy-cleaner'), p('lace-kimono-robe-babydoll')],
  'black-friday-sex-toy-deals': [p('lovense-tenera-2'), p('lovense-dolce'), p('lovense-diamo'), p('lovense-toy-cleaner')],
  'best-time-to-buy-sex-toys': [p('lovense-tenera-2'), p('lovense-lush-4'), p('lovense-water-based-lubricant')],
  // Creators
  'best-sex-toys-for-adult-content-creators': [p('lovense-webcam-2'), p('lovense-max-2'), p('lovense-edge-2'), p('lovense-tenera-2')],
  'adult-content-creator-strategy-by-level': [p('lovense-webcam-2'), p('lovense-lush-4', undefined, 'App-controlled toys'), p('lovense-max-2')],
  'onlyfans-solo-creator-content-ideas': [p('lovense-lush-4'), p('lovense-webcam-2'), p('lovense-tenera-2'), p('lace-fishnet-bodysuit', undefined, 'Lingerie')],
  'onlyfans-couple-creator-guide': [p('lovense-dolce'), p('lovense-diamo'), p('lovense-lush-4'), p('lovense-webcam-2')],
  'how-to-price-and-paywall-adult-content': [p('lovense-lush-4', undefined, 'app-controlled toys'), p('lovense-webcam-2')],
  'privacy-and-safety-for-adult-content-creators': [p('lovense-webcam-2'), p('lovense-lush-4')],
  // Left out on purpose: consent-in-long-term-relationships, how-to-set-sexual-boundaries.
}

/** Erotica slug -> products that suit the mood. Kept to 2-3: the story comes first. */
export const EROTICA_PRODUCTS: Record<string, PageProduct[]> = {
  'the-black-lace-bodysuit': [p('lace-fishnet-bodysuit'), p('alessandra-lace-mesh-teddy'), p('lace-kimono-robe-babydoll')],
  'slow-sunday': [p('lace-kimono-robe-babydoll'), p('satin-lace-chemise-nightgown'), p('lovense-dolce')],
  'the-second-first-date': [p('contrast-daisy-lace-bra-set'), p('plus-size-velvet-corset-babydoll'), p('lovense-diamo')],
  'erotica-books-for-women': [p('satin-lace-chemise-nightgown'), p('lace-kimono-robe-babydoll')],
  'books-on-sexual-confidence-for-women': [p('lovense-tenera-2'), p('lace-fishnet-bodysuit')],
}

/** Product handle -> guide slugs that feature it, guides that list it first leading. */
export function guidesForProduct(handle: string): string[] {
  return Object.entries(GUIDE_PRODUCTS)
    .map(([slug, list]) => ({ slug, rank: list.findIndex((x) => x.handle === handle) }))
    .filter((g) => g.rank >= 0)
    .sort((x, y) => x.rank - y.rank)
    .map((g) => g.slug)
}

