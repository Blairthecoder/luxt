export interface ProductVariant {
  id: string
  name: string
  colorCode: string
  hex: string
  inStock: boolean
  image?: string
}

export interface ProductReview {
  id: number
  author: string
  rating: number
  title: string
  date: string
  verified: boolean
  comment: string
  helpfulCount: number
}

export interface Product {
  id: number
  slug: string
  name: string
  tagline: string
  category: string
  price: number
  originalPrice?: number
  rating: string
  reviewsCount: number
  badge?: string
  shortDescription: string
  description: string
  intensityLevel: string
  waterproof: string
  material: string
  batteryLife: string
  noiseLevel: string
  inStock: boolean
  stockCount: number
  images: string[]
  variants: ProductVariant[]
  features: string[]
  specifications: Record<string, string>
  reviews: ProductReview[]
}

export const CATEGORIES = [
  'All Collections',
  'Dual-Stimulation & Sonic',
  'Vibrators & Wands',
  'Couples & Wearables',
  'Suction & Sonic',
  'Anal Play & Wellness',
  'Pelvic & Wellness',
  'Luxury Essentials',
] as const

export const INTENSITY_LEVELS = [
  'Gentle to Medium',
  'Multi-Frequency Pulse',
  'Deep Acoustic Rumble',
  'Custom Programmable',
] as const

export const MATERIALS = [
  'Medical-Grade Liquid Silicone',
  'Rose Gold Alloy & Silicone',
  'Hand-Blown Borosilicate Glass',
  'Organic Botanical & Silk',
] as const

export const products: Product[] = [
  {
    id: 1,
    slug: 'velvet-pulse-arc',
    name: 'Velvet Pulse Arc™',
    tagline: 'Dual-action contactless sonic waves & targeted acoustic resonance',
    category: 'Dual-Stimulation & Sonic',
    price: 169,
    originalPrice: 210,
    rating: '4.96',
    reviewsCount: 248,
    badge: 'Award Winner 2026',
    shortDescription:
      'Engineered for simultaneous clitoral sonic aeration and deep G-spot resonance with whisper-quiet dual motors.',
    description:
      'The Velvet Pulse Arc redefines modern intimate luxury. Utilizing dual independent motors, it harmonizes aerodynamic pressure pulses for clitoral stimulation while delivering deep, low-frequency acoustic vibrations along its ergonomically contoured insertable shaft. Sculpted from ultra-plush, hypoallergenic liquid silicone and accented with polished champagne rose gold, it offers 12 custom vibration rhythms that gently adapt to your body’s unique curves.',
    intensityLevel: '12 Patterns / 4 Resonant Speeds',
    waterproof: '100% IPX8 Waterproof (Submersible up to 2m)',
    material: 'Medical-Grade Liquid Silicone & Rose Gold Alloy',
    batteryLife: 'Up to 2.5 hours continuous use (Magnetic USB fast-charge)',
    noiseLevel: '< 34 dB (Whisper Stealth Mode)',
    inStock: true,
    stockCount: 14,
    images: [
      '/img/velvet-pulse-arc.png',
      '/img/velvet-pulse-arc-detail.png',
      '/img/hero-banner.png',
    ],
    variants: [
      { id: 'plum-velvet', name: 'Plum Velvet', colorCode: 'deep-plum', hex: '#3E103B', inStock: true },
      { id: 'midnight-noir', name: 'Midnight Noir', colorCode: 'noir', hex: '#16171D', inStock: true },
      { id: 'rose-gold', name: 'Rose Gold Blush', colorCode: 'blush', hex: '#D89B84', inStock: true },
      { id: 'champagne-ivory', name: 'Champagne Ivory', colorCode: 'champagne', hex: '#EAE1D2', inStock: false },
    ],
    features: [
      'Simultaneous dual stimulation: Air-pulse clitoral aeroflow and internal resonance',
      'Dual ultra-quiet German micro-brushless motors with independent controls',
      'Ergonomically contoured flex-stem adapts smoothly to your internal anatomy',
      'Magnetic USB rapid charging (0 to 100% in 80 minutes)',
      'Smart memory chip remembers your favorite setting upon reactivation',
      'Travel lock mode & discreet velvet storage pouch included',
    ],
    specifications: {
      'Total Length': '198 mm (7.8 in)',
      'Insertable Length': '118 mm (4.6 in)',
      'Max Diameter': '36 mm (1.4 in)',
      'Motor Frequency': '135 Hz deep rumble harmonic',
      'Submersible Depth': 'Up to 2 meters (6.5 ft) for 60 min',
      'Sound Profile': '< 34 decibels at peak intensity',
      'Body Safety': '100% Phthalate, Latex, & BPA Free',
      'Warranty': '2-Year Full Replacement Guarantee',
    },
    reviews: [
      {
        id: 101,
        author: 'Elena V.',
        rating: 5,
        title: 'Transcendent engineering and design',
        date: 'October 12, 2026',
        verified: true,
        comment:
          'The dual-stimulation feels unlike anything I have ever experienced. The sonic air wave is whisper quiet, and the deep internal rumble avoids the buzzy surface sensation of cheaper toys. Truly luxury grade.',
        helpfulCount: 38,
      },
      {
        id: 102,
        author: 'Marcus & Claire',
        rating: 5,
        title: 'An absolute revelation for couples',
        date: 'September 28, 2026',
        verified: true,
        comment:
          'We were blown away by the quietness. You can barely hear it in a silent bedroom. The velvet finish feels like warm cashmere. Packaging arrived in a completely unbranded discreet brown box.',
        helpfulCount: 22,
      },
      {
        id: 103,
        author: 'Sasha K.',
        rating: 5,
        title: 'Worth every single penny',
        date: 'September 15, 2026',
        verified: true,
        comment:
          'Build quality is 10/10. The magnetic charger snaps into place with a satisfying click, and the buttons are backlit with a soft warm amber glow.',
        helpfulCount: 15,
      },
    ],
  },
  {
    id: 2,
    slug: 'aura-luxe-wand',
    name: 'Aura Luxe Wand™',
    tagline: 'High-torque whisper magic wand with acoustic dampening',
    category: 'Vibrators & Wands',
    price: 149,
    originalPrice: 185,
    rating: '4.94',
    reviewsCount: 312,
    badge: 'Best Seller',
    shortDescription:
      'Iconic full-power wand stimulation without the deafening drone. Engineered with acoustic dampening for deep tissue ecstasy.',
    description:
      'Traditional wand massagers sacrifice discretion for brute strength. The Aura Luxe Wand delivers profound, low-frequency power through a custom high-torque micro-motor isolated inside an acoustic dampening chassis. Its flexible silicone head contours to neck, back, and intimate zones alike, providing whole-body relaxation and intense clitoral release.',
    intensityLevel: '8 Wave Modes / 5 Continuous Speeds',
    waterproof: 'IPX7 Waterproof (Shower Safe)',
    material: 'Silky Medical-Grade Silicone & Brushed Aircraft Aluminum',
    batteryLife: '3 Hours on Single Charge (High Capacity 1200mAh)',
    noiseLevel: '< 36 dB',
    inStock: true,
    stockCount: 23,
    images: [
      '/img/aura-luxe-wand.png',
      '/img/velvet-pulse-arc-detail.png',
      '/img/hero-banner.png',
    ],
    variants: [
      { id: 'obsidian-gold', name: 'Obsidian Noir & Gold', colorCode: 'noir', hex: '#1A1A1E', inStock: true },
      { id: 'rose-blush', name: 'Rose Blush & Bronze', colorCode: 'blush', hex: '#CFA193', inStock: true },
      { id: 'arctic-white', name: 'Arctic White & Platinum', colorCode: 'white', hex: '#EDECE8', inStock: true },
    ],
    features: [
      'Acoustic sound-baffled motor housing reduces decibels by 60% compared to traditional wands',
      'Flexible 360-degree pivoting silicone head cushions impact while transmitting deep vibrations',
      'Ergonomic weighted handle eliminates wrist fatigue during extended solo or partner sessions',
      'Full body versatility for erotic intimacy, trigger points, and neck/lumbar tension release',
      'Discreet button lock prevents accidental activation in travel luggage',
    ],
    specifications: {
      'Total Length': '240 mm (9.4 in)',
      'Head Diameter': '52 mm (2.0 in)',
      'Weight': '310 g (10.9 oz)',
      'Peak RPM': '8,500 RPM low-vibration resonance',
      'Battery Capacity': '1200 mAh Lithium Polymer',
      'Charging Time': '120 Minutes',
      'Body Safety': '100% Medical-Grade Liquid Silicone',
      'Warranty': '2-Year Warranty',
    },
    reviews: [
      {
        id: 201,
        author: 'Jordan T.',
        rating: 5,
        title: 'Finally a wand that does not sound like a lawnmower',
        date: 'October 8, 2026',
        verified: true,
        comment:
          'I have lived in shared apartments where traditional wands are out of the question. The Aura Luxe is practically inaudible under a light blanket, yet hits with serious, thumping bass vibrations.',
        helpfulCount: 44,
      },
      {
        id: 202,
        author: 'Brooke M.',
        rating: 5,
        title: 'Masterpiece of industrial design',
        date: 'September 19, 2026',
        verified: true,
        comment:
          'The tactile matte finish is heaven to hold. The bend in the head is firm yet yielding. Unmatched quality.',
        helpfulCount: 19,
      },
    ],
  },
  {
    id: 3,
    slug: 'nirvana-s-curve',
    name: 'Nirvana S-Curve™ Internal Massager',
    tagline: 'Sculpted anatomical curvature with gentle thermal warming',
    category: 'Vibrators & Wands',
    price: 129,
    originalPrice: 160,
    rating: '4.91',
    reviewsCount: 189,
    badge: 'Staff Pick',
    shortDescription:
      'Designed with an organic anatomical wave and built-in therapeutic thermal warming that warms to body temperature (102°F).',
    description:
      'The Nirvana S-Curve is tailored specifically for targeted internal G-spot and P-spot stimulation. Its anatomical curve effortlessly finds the precise zone of pleasure without wrist strain. Features an internal thermal core that heats up to a luxurious 102°F (39°C) in under 3 minutes, mimicking the sensation of human warmth for unparalleled intimacy.',
    intensityLevel: '10 Harmonic Frequencies',
    waterproof: '100% IPX8 Waterproof (Submersible)',
    material: 'Seamless Liquid Silicone',
    batteryLife: 'Up to 2 hours (1.5 hours with thermal warming active)',
    noiseLevel: '< 32 dB',
    inStock: true,
    stockCount: 19,
    images: [
      '/img/nirvana-s-curve.png',
      '/img/velvet-pulse-arc-detail.png',
      '/img/hero-banner.png',
    ],
    variants: [
      { id: 'wine-purple', name: 'Imperial Plum', colorCode: 'plum', hex: '#441434', inStock: true },
      { id: 'matte-onyx', name: 'Velvet Noir', colorCode: 'noir', hex: '#1C1C22', inStock: true },
      { id: 'forest-emerald', name: 'Deep Emerald', colorCode: 'emerald', hex: '#163529', inStock: true },
    ],
    features: [
      'Rapid thermal warming element reaches 102°F (39°C) body temperature',
      'Dual opposing internal motors deliver harmonic wave pulses along the curved tip',
      'Sleek tapered entry point expands gradually for effortless, comfortable insertion',
      'One-piece hygienic silicone casting leaves zero seams for dirt or water to enter',
      'Quick tap temperature toggle with indicator LED ring',
    ],
    specifications: {
      'Total Length': '185 mm (7.3 in)',
      'Insertable Length': '125 mm (4.9 in)',
      'Max Diameter': '33 mm (1.3 in)',
      'Warm-Up Time': '150 seconds to 102°F',
      'Waterproof Standard': 'Submersible IPX8',
      'Charging Interface': 'Magnetic Dual Pin USB',
      'Safety Auto-Shutoff': '60-minute thermal auto-protection',
      'Warranty': '2-Year Warranty',
    },
    reviews: [
      {
        id: 301,
        author: 'Cassandra P.',
        rating: 5,
        title: 'The warming feature changes the game completely',
        date: 'October 14, 2026',
        verified: true,
        comment:
          'Cold silicone used to always give me a slight shudder at first touch. The warming core makes it feel immediately alive, natural, and deeply relaxing. Combined with the precise curve, it hits the exact right spot every time.',
        helpfulCount: 29,
      },
    ],
  },
  {
    id: 4,
    slug: 'solstice-couples-bond',
    name: 'Solstice Couple’s Bond™',
    tagline: 'Ultra-thin flexible hands-free wearable with wireless remote',
    category: 'Couples & Wearables',
    price: 139,
    originalPrice: 175,
    rating: '4.88',
    reviewsCount: 167,
    badge: 'Couples Choice',
    shortDescription:
      'Ultra-pliant C-shaped wearable designed to be worn during intercourse to stimulate both partners simultaneously.',
    description:
      'Crafted for seamless shared ecstasy, the Solstice Couple’s Bond features an ultra-slim, bendable bridge that rests comfortably between partners during penetration. While the internal motor nestles against the G-spot, the external textured pad delivers synchronized rumbles directly to the clitoris and partner. Controlled via a discrete tactile wireless ring remote.',
    intensityLevel: '10 Shared Pulse Modes',
    waterproof: '100% IPX8 Waterproof',
    material: 'Ultra-Flexible Medical-Grade Liquid Silicone',
    batteryLife: '2 Hours Playtime (Remote battery lasts 6 months)',
    noiseLevel: '< 35 dB',
    inStock: true,
    stockCount: 11,
    images: [
      '/img/solstice-couples-bond.png',
      '/img/hero-banner.png',
      '/img/velvet-pulse-arc-detail.png',
    ],
    variants: [
      { id: 'rose-quartz', name: 'Rose Quartz Blush', colorCode: 'rose', hex: '#D29188', inStock: true },
      { id: 'midnight-slate', name: 'Midnight Slate', colorCode: 'slate', hex: '#23252E', inStock: true },
      { id: 'royal-lavender', name: 'Opal Lilac', colorCode: 'lilac', hex: '#776274', inStock: false },
    ],
    features: [
      'Featherweight 4mm flex-bridge ensures effortless partner comfort during penetration',
      'Dual stimulation zones: internal G-zone and external clitoral contact pad',
      'Discrete wireless ring remote allows easy one-touch speed adjustments mid-intimacy',
      'Sculpted anti-slip ribbed base stays firmly positioned during natural movement',
      'Includes companion travel case with integrated magnetic charging dock',
    ],
    specifications: {
      'External Dimensions': '78 mm × 44 mm',
      'Internal Stem': '70 mm × 27 mm',
      'Flex Bridge Thickness': '4.2 mm ultra-slim',
      'Remote Range': 'Up to 10 meters (33 ft)',
      'Waterproof': '100% Submersible IPX8',
      'Body Safety': 'Hypoallergenic Silicone & ABS',
      'Warranty': '2-Year Warranty',
    },
    reviews: [
      {
        id: 401,
        author: 'Daniel & Sarah',
        rating: 5,
        title: 'Ignited something new in our marriage',
        date: 'October 3, 2026',
        verified: true,
        comment:
          'Other couple vibrators we tried were too bulky and slipped out immediately. The Solstice stays put comfortably and doesn’t crowd the space. The remote is very intuitive to use under sheets.',
        helpfulCount: 31,
      },
    ],
  },
  {
    id: 5,
    slug: 'kipis-air-wave',
    name: 'Kipis Air-Wave™ Contactless Stimulator',
    tagline: 'Gentle aerodynamic pressure waves for touchless euphoria',
    category: 'Suction & Sonic',
    price: 119,
    originalPrice: 145,
    rating: '4.98',
    reviewsCount: 420,
    badge: 'Bestselling Icon',
    shortDescription:
      'Pulsating air cushions envelope and stimulate 8,000+ nerve endings without direct contact or numbing overstimulation.',
    description:
      'Experience the magic of contactless pleasure. The Kipis Air-Wave surrounds the clitoris with rhythmic waves of negative and positive air pressure. By never touching sensitive tissue directly, it avoids the desensitization common with mechanical friction vibrators, leading to rapid, multiple, whole-body orgasms.',
    intensityLevel: '14 Aerodynamic Pulse Intensities',
    waterproof: '100% IPX8 Waterproof (Submersible)',
    material: 'Silky Soft Food-Safe Silicone & Metallic Trim',
    batteryLife: '3 Hours of Use on Quick Charge',
    noiseLevel: '< 30 dB (Stealth Whisper)',
    inStock: true,
    stockCount: 35,
    images: [
      '/img/kipis-air-wave.png',
      '/img/velvet-pulse-arc-detail.png',
      '/img/hero-banner.png',
    ],
    variants: [
      { id: 'matte-noir-gold', name: 'Matte Noir & Gold', colorCode: 'noir', hex: '#17171B', inStock: true },
      { id: 'pearl-blush', name: 'Pearl Blush & Copper', colorCode: 'blush', hex: '#E4AFA5', inStock: true },
      { id: 'pure-white-silver', name: 'Pure White & Silver', colorCode: 'white', hex: '#F0EFF4', inStock: true },
    ],
    features: [
      'Touchless Sonic Air Pulse technology triggers deep internal arousal pathways',
      'Whisper-quiet pneumatic cylinder operates under 30 decibels',
      '2 interchangeable silicone nozzle heads (Petite Focus and Broad Bloom)',
      'Submersible in the bath for ultimate warm hydro-relaxation',
      'Ergonomic palm grip fits effortlessly into the natural cup of your hand',
    ],
    specifications: {
      'Dimensions': '125 mm × 50 mm × 45 mm',
      'Weight': '115 g (4.0 oz)',
      'Nozzle Diameters': '12 mm (Petite) & 16 mm (Bloom)',
      'Waterproof Depth': '2 meters for 60 minutes',
      'Battery': 'Lithium-Ion USB Rechargeable',
      'Cleaning': 'Washable with warm water and mild toy soap',
      'Warranty': '2-Year Warranty',
    },
    reviews: [
      {
        id: 501,
        author: 'Morgan L.',
        rating: 5,
        title: 'I didn’t believe the hype until I tried it',
        date: 'October 15, 2026',
        verified: true,
        comment:
          'This is pure sorcery. It takes about 90 seconds to reach the most intense climax of your life. The two nozzle sizes are great, and cleaning it under the tap takes literally five seconds.',
        helpfulCount: 52,
      },
    ],
  },
  {
    id: 6,
    slug: 'elysium-glass-wand',
    name: 'Elysium Crystal™ Borosilicate Wand',
    tagline: 'Hand-blown artisanal temperature-play crystal scepter',
    category: 'Luxury Essentials',
    price: 89,
    originalPrice: 110,
    rating: '4.92',
    reviewsCount: 94,
    badge: 'Artisanal Luxury',
    shortDescription:
      'Melted from pure medical borosilicate crystal. Can be chilled in ice water or warmed in hot water for thrilling sensory play.',
    description:
      'A true work of intimate art. The Elysium Crystal Wand is hand-crafted from heavy, shatter-resistant borosilicate glass, annealed at 1,000°F for unmatched strength. Glass transmits temperature instantly: chill it in the refrigerator for a cool, breath-taking tingle, or soak in warm bath water for a melting sensation. Smooth, non-porous, and compatible with all lubricants.',
    intensityLevel: 'Sensory Temperature Play (Non-Motorized)',
    waterproof: '100% Non-Porous & Waterproof',
    material: 'Pure Hand-Blown Borosilicate Crystal Glass',
    batteryLife: 'Zero Batteries Required (Forever Lifespan)',
    noiseLevel: '100% Silent (0 dB)',
    inStock: true,
    stockCount: 8,
    images: [
      '/img/elysium-glass-wand.png',
      '/img/hero-banner.png',
      '/img/velvet-pulse-arc-detail.png',
    ],
    variants: [
      { id: 'clear-prism', name: 'Prism Pure Clear', colorCode: 'clear', hex: '#D8E2EC', inStock: true },
      { id: 'smoky-obsidian', name: 'Smoky Obsidian Tint', colorCode: 'smoky', hex: '#2A2930', inStock: true },
      { id: 'amber-sunset', name: 'Amber Sunset Glow', colorCode: 'amber', hex: '#A86C3E', inStock: false },
    ],
    features: [
      'Thermal retention: responds dynamically to warm water or ice bath temperatures',
      'Dual-ended design: smooth bulbous tip for targeted G/P-spot, spiraled end for textural friction',
      'Hypoallergenic, completely non-porous and dishwasher/boil-water safe for surgical sterilization',
      'Compatible with water, silicone, oil, and hybrid lubricants',
      'Includes custom protective velvet hard case for safe keeping',
    ],
    specifications: {
      'Total Length': '205 mm (8.1 in)',
      'Shaft Diameter': '28 mm (1.1 in)',
      'Bulb Diameter': '35 mm (1.4 in)',
      'Weight': '290 g (10.2 oz - weighted feel)',
      'Glass Type': 'Pyrex-grade Borosilicate 3.3',
      'Thermal Range': '30°F (-1°C) to 140°F (60°C)',
      'Warranty': 'Lifetime Shatter-Resistant Guarantee',
    },
    reviews: [
      {
        id: 601,
        author: 'Vivienne R.',
        rating: 5,
        title: 'Sublime aesthetic on a bedside table',
        date: 'October 1, 2026',
        verified: true,
        comment:
          'It looks like a museum sculpture. Leaving it in a bowl of warm water while drawing a bath makes the glass feel deeply comforting and heavy in the best way possible.',
        helpfulCount: 26,
      },
    ],
  },
  {
    id: 7,
    slug: 'eclipse-kinetic-kegel',
    name: 'Eclipse Kinetic™ Biofeedback Trainer',
    tagline: 'Intelligent pelvic floor conditioning with active haptic guidance',
    category: 'Pelvic & Wellness',
    price: 159,
    originalPrice: 195,
    rating: '4.89',
    reviewsCount: 142,
    badge: 'Clinical Grade',
    shortDescription:
      'Engineered with micro-force sensors to measure contraction strength and guide you through restorative pelvic toning.',
    description:
      'Designed in collaboration with women’s health physiotherapists, the Eclipse Kinetic Kegel features precision biofeedback sensors. As you contract your pelvic floor, the egg responds with subtle haptic vibration cues that confirm correct technique, helping rebuild tone, enhance sensitivity, and intensify involuntary orgasmic contractions.',
    intensityLevel: '6 Guided Training Routines + Free Play',
    waterproof: '100% IPX8 Waterproof',
    material: 'Medical-Grade Soft Touch Silicone',
    batteryLife: '4 Hours of Active Training',
    noiseLevel: '< 28 dB',
    inStock: true,
    stockCount: 17,
    images: [
      '/img/eclipse-kinetic-kegel.png',
      '/img/hero-banner.png',
      '/img/velvet-pulse-arc-detail.png',
    ],
    variants: [
      { id: 'slate-rose', name: 'Pastel Slate & Rose Gold', colorCode: 'slate', hex: '#636D79', inStock: true },
      { id: 'blush-petal', name: 'Petal Blush Pink', colorCode: 'pink', hex: '#D7A1A4', inStock: true },
    ],
    features: [
      'Micro-pressure biofeedback detects true Kegel lifting vs counterproductive downward bearing',
      'Progressive vibration strength increases as your contraction strength deepens',
      'Reinforced liquid silicone retrieval cord tested to 15 kg tensile strength',
      'Hypoallergenic, body-safe and ultra-smooth for comfortable insertion and removal',
      'Antimicrobial travel pouch with magnetic charging base',
    ],
    specifications: {
      'Egg Dimensions': '34 mm diameter × 85 mm length',
      'Cord Length': '110 mm soft silicone cord',
      'Weight': '52 g (optimally calibrated training weight)',
      'Sensor Accuracy': '± 0.5 gram force sensitivity',
      'Waterproof': 'Submersible IPX8',
      'Warranty': '2-Year Warranty',
    },
    reviews: [
      {
        id: 701,
        author: 'Dr. Rebecca H.',
        rating: 5,
        title: 'As an OB/GYN, I enthusiastically recommend this',
        date: 'September 22, 2026',
        verified: true,
        comment:
          'Many women perform pelvic contractions incorrectly without knowing. The immediate haptic vibration tells you in real-time whether your form is accurate. Noticeable improvements in muscle tone and sensation within 4 weeks.',
        helpfulCount: 47,
      },
    ],
  },
  {
    id: 8,
    slug: 'onyx-apex-anchor',
    name: 'Onyx Apex Anchor™ Weighted Plug',
    tagline: 'Anatomically curved silhouette with wide flex safety base',
    category: 'Anal Play & Wellness',
    price: 79,
    originalPrice: 95,
    rating: '4.95',
    reviewsCount: 178,
    badge: 'Ergonomic Excellence',
    shortDescription:
      'Seamless velvety silicone plug featuring a weighted steel core, slender tapered neck, and comfortable curved retention base.',
    description:
      'Engineered with careful anatomical awareness, the Onyx Apex Anchor offers a smooth, tapered tip for effortless insertion, widening smoothly to a satisfying fullness before narrowing into a slender, ultra-flexible neck. The weighted internal stainless steel core creates a thrilling sense of presence with every movement, anchored by a wide ergonomic safety base.',
    intensityLevel: 'Sensory Weighted Presence (Non-Electric)',
    waterproof: '100% Submersible & Washable',
    material: 'Silky Medical-Grade Liquid Silicone & Stainless Steel Core',
    batteryLife: 'No Charging Needed',
    noiseLevel: '100% Silent (0 dB)',
    inStock: true,
    stockCount: 28,
    images: [
      '/img/onyx-apex-anchor.png',
      '/img/hero-banner.png',
      '/img/velvet-pulse-arc-detail.png',
    ],
    variants: [
      { id: 'onyx-noir', name: 'Velvet Midnight Noir', colorCode: 'noir', hex: '#19181E', inStock: true },
      { id: 'plum-garnet', name: 'Plum Garnet', colorCode: 'plum', hex: '#421731', inStock: true },
      { id: 'slate-blue', name: 'Nordic Slate', colorCode: 'slate', hex: '#313C4D', inStock: true },
    ],
    features: [
      'Internal stainless steel core provides a luxurious weighted grounding sensation',
      'Ultra-slender flexible neck allows natural muscle retention without uncomfortable stretching',
      'Wide ergonomically curved anchor base conforms naturally to body contours for extended wear',
      'Soft-touch matte silicone finish glides effortlessly with water-based lubricant',
      'Available in Petite (Small), Classic (Medium), and Grande (Large)',
    ],
    specifications: {
      'Total Length': '115 mm (4.5 in)',
      'Insertable Length': '95 mm (3.7 in)',
      'Max Diameter': '32 mm (1.25 in)',
      'Neck Diameter': '10 mm (0.39 in) ultra-slim flex',
      'Weight': '135 g (4.8 oz) weighted core',
      'Base Width': '68 mm safety flare',
      'Warranty': 'Lifetime Guarantee',
    },
    reviews: [
      {
        id: 801,
        author: 'Alex & Sam',
        rating: 5,
        title: 'The perfect shape and weight',
        date: 'October 11, 2026',
        verified: true,
        comment:
          'The slender neck makes all the difference in the world. You can sit, walk, and move without any awkward pinching, and the weighted core feels incredible. 10/10.',
        helpfulCount: 33,
      },
    ],
  },
  {
    id: 9,
    slug: 'silk-elixir-intimate-serum',
    name: 'Silk Elixir™ Botanical Intimate Serum',
    tagline: 'Hybrid moisture with plant hyaluronic acid & organic aloe',
    category: 'Luxury Essentials',
    price: 34,
    originalPrice: 42,
    rating: '4.97',
    reviewsCount: 388,
    badge: 'Organic & Pure',
    shortDescription:
      'Ultra-nourishing pH-balanced 4.0 intimate serum infused with botanical hyaluronic acid, chamomile, and provitamin B5.',
    description:
      'Formulated like luxury facial skincare for your most sensitive intimate skin. Silk Elixir combines organic aloe leaf juice with multi-molecular weight botanical hyaluronic acid for prolonged, frictionless glide that never gets sticky or tacky. Completely free of glycerin, parabens, petrochemicals, or synthetic fragrances. 100% safe for all silicone toys and latex condoms.',
    intensityLevel: 'Ultra-Glide Botanical Hydration',
    waterproof: 'Rinses clean with water, zero residue',
    material: 'Natural Plant Extracts & Pure Hyaluronic Acid (150ml / 5.1 fl oz)',
    batteryLife: 'N/A',
    noiseLevel: 'Silent',
    inStock: true,
    stockCount: 46,
    images: [
      '/img/silk-elixir-intimate-serum.png',
      '/img/hero-banner.png',
      '/img/velvet-pulse-arc-detail.png',
    ],
    variants: [
      { id: 'unscented-pure', name: 'Pure Botanicals (Unscented)', colorCode: 'clear', hex: '#EBEAE6', inStock: true },
      { id: 'french-vanilla', name: 'Warm Tahitian Vanilla & Orchid', colorCode: 'amber', hex: '#D9B48F', inStock: true },
    ],
    features: [
      'Multi-molecular weight hyaluronic acid provides deep, lasting cellular hydration',
      'Optimally pH-balanced at 4.0 to protect and nurture your natural vaginal microbiome',
      'Zero glycerin, zero parabens, zero propylene glycol, and zero synthetic silicones',
      '100% safe to use with all high-end silicone pleasure devices and condoms',
      'Housed in frosted UV-protective glass bottle with measured lockable dispensing pipette',
    ],
    specifications: {
      'Volume': '150 ml (5.1 fl oz)',
      'Key Ingredients': 'Organic Aloe Vera, Botanical Hyaluronic Acid, Chamomile, Vitamin B5',
      'pH Balance': '4.0 ± 0.2',
      'Condom Safe': 'Yes (Latex, Polyisoprene, Polyurethane)',
      'Toy Safe': '100% Safe on all silicone, glass, and metals',
      'Origin': 'Cruelty-Free, Made in France',
    },
    reviews: [
      {
        id: 901,
        author: 'Camille D.',
        rating: 5,
        title: 'Feels like pure silk on skin',
        date: 'October 16, 2026',
        verified: true,
        comment:
          'Most lubes feel chemical or get sticky after two minutes. Silk Elixir glides effortlessly, feels deeply soothing, and leaves skin soft instead of gummy. I will never buy drugstore brands again.',
        helpfulCount: 61,
      },
    ],
  },
  {
    id: 10,
    slug: 'nebula-satin-restraints',
    name: 'Nebula Silk & Vegan Leather Restraints',
    tagline: 'Padded 22-Momme mulberry silk cuffs with rose gold hardware',
    category: 'Luxury Essentials',
    price: 65,
    originalPrice: 85,
    rating: '4.93',
    reviewsCount: 115,
    badge: 'Sensual Elegance',
    shortDescription:
      'Ultra-soft padded cuffs lined with 100% mulberry silk and tailored in supple vegan leather with magnetic quick-release clasps.',
    description:
      'Elevate consensual power exchange and sensory exploration into a refined art form. The Nebula Restraint set pairs rich, buttery vegan leather with thick memory-foam padding enveloped in genuine 22-Momme mulberry silk. Finished with solid alloy hardware in champagne rose gold and high-tensile quick-release safety carabiners.',
    intensityLevel: 'Sensual Power Play & Restraint',
    waterproof: 'Spot clean only with soft damp cloth',
    material: '22-Momme Mulberry Silk, Vegan Napa Leather, Rose Gold Alloy',
    batteryLife: 'N/A',
    noiseLevel: 'Silent',
    inStock: true,
    stockCount: 15,
    images: [
      '/img/nebula-satin-restraints.png',
      '/img/hero-banner.png',
      '/img/velvet-pulse-arc-detail.png',
    ],
    variants: [
      { id: 'noir-gold', name: 'Midnight Noir & Rose Gold', colorCode: 'noir', hex: '#1C1B20', inStock: true },
      { id: 'burgundy-rose', name: 'Burgundy Crimson & Gold', colorCode: 'crimson', hex: '#4E1122', inStock: true },
    ],
    features: [
      '22-Momme high-density mulberry silk lining prevents skin chafing or marks',
      'Memory-foam core distributes tension evenly across wrists or ankles',
      'Dual quick-release safety carabiners ensure immediate release in seconds',
      'Adjustable circumference fits wrists from 5.5 in to 9.5 in (14 to 24 cm)',
      'Includes matching silk blindfold with elasticized non-slip band',
    ],
    specifications: {
      'Cuff Width': '60 mm (2.4 in)',
      'Adjustable Range': '140 mm to 240 mm (5.5 in - 9.5 in)',
      'Hardware Material': 'Zinc alloy with rose gold electroplating',
      'Included Accessories': '2 Padded Cuffs, Connecting Chain, Silk Blindfold, Satin Bag',
      'Tensile Strength': 'Tested to 45 kg break resistance',
      'Warranty': '1-Year Warranty',
    },
    reviews: [
      {
        id: 1001,
        author: 'Taylor & Jordan',
        rating: 5,
        title: 'Luxuriously soft and reassuringly sturdy',
        date: 'October 5, 2026',
        verified: true,
        comment:
          'The silk padding is so gentle on wrists. No pinching whatsoever, and the quick-release clips make both of us feel safe and relaxed while exploring.',
        helpfulCount: 24,
      },
    ],
  },
]

export default products
