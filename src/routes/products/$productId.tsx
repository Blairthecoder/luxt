import { useState } from 'react'
import { Link, createFileRoute } from '@tanstack/react-router'
import { products, Product } from '@/data/products'
import { useCart } from '@/context/CartContext'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { CartDrawer } from '@/components/CartDrawer'
import { VibeQuizModal } from '@/components/VibeQuizModal'
import { ProductCard } from '@/components/ProductCard'
import { getOptimizedImageUrl } from '@/lib/image'
import { submitCustomerReview } from '@/lib/db-service'
import {
  Star,
  ShoppingBag,
  ShieldCheck,
  Truck,
  RotateCcw,
  Volume2,
  Droplets,
  BatteryCharging,
  Sparkles,
  Check,
  Plus,
  Minus,
  Lock,
  ArrowLeft,
  MessageSquare,
} from 'lucide-react'

export const Route = createFileRoute('/products/$productId')({
  component: ProductDetailPage,
  loader: async ({ params }) => {
    const product = products.find(
      (p) => p.id === +params.productId || p.slug === params.productId
    )
    if (!product) {
      throw new Error(`Product not found for ${params.productId}`)
    }
    // Pick related products
    const related = products
      .filter((p) => p.id !== product.id)
      .slice(0, 3)

    return { product, related }
  },
})

function ProductDetailPage() {
  const { product, related } = Route.useLoaderData()
  const { addToCart, openCart } = useCart()

  // State
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [selectedVariantId, setSelectedVariantId] = useState(
    product.variants[0]?.id || ''
  )
  const [quantity, setQuantity] = useState(1)
  const [addedSuccess, setAddedSuccess] = useState(false)
  const [activeTab, setActiveTab] = useState<'details' | 'specs' | 'care' | 'reviews'>('details')
  const [quizOpen, setQuizOpen] = useState(false)

  // Review modal state
  const [reviewModalOpen, setReviewModalOpen] = useState(false)
  const [reviewerName, setReviewerName] = useState('')
  const [reviewRating, setReviewRating] = useState(5)
  const [reviewTitle, setReviewTitle] = useState('')
  const [reviewComment, setReviewComment] = useState('')
  const [reviewSubmitted, setReviewSubmitted] = useState(false)
  const [localReviews, setLocalReviews] = useState(product.reviews)

  const selectedVariant =
    product.variants.find((v) => v.id === selectedVariantId) || product.variants[0]

  const handleAddToCart = () => {
    addToCart(product, selectedVariantId, quantity)
    setAddedSuccess(true)
    setTimeout(() => setAddedSuccess(false), 2500)
  }

  const handleBuyNow = () => {
    addToCart(product, selectedVariantId, quantity)
    openCart()
  }

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!reviewerName || !reviewTitle || !reviewComment) return

    // Persist to Netlify Database via server function
    try {
      await submitCustomerReview({
        data: {
          productId: product.id,
          authorName: reviewerName,
          rating: reviewRating,
          title: reviewTitle,
          content: reviewComment,
        },
      })
    } catch (err) {
      console.warn('Review database save error:', err)
    }

    const newRev = {
      id: Date.now(),
      author: reviewerName,
      rating: reviewRating,
      title: reviewTitle,
      date: 'Just now',
      verified: true,
      comment: reviewComment,
      helpfulCount: 1,
    }

    setLocalReviews([newRev, ...localReviews])
    setReviewSubmitted(true)
    setTimeout(() => {
      setReviewSubmitted(false)
      setReviewModalOpen(false)
      setReviewerName('')
      setReviewTitle('')
      setReviewComment('')
    }, 2000)
  }

  const discountAmount = product.originalPrice ? product.originalPrice - product.price : 0
  const discountPercent = product.originalPrice
    ? Math.round((discountAmount / product.originalPrice) * 100)
    : 0

  return (
    <div className="min-h-screen bg-[#0A0B10] text-slate-100 font-sans selection:bg-[#B02A6A] selection:text-white">
      <Navbar onOpenQuiz={() => setQuizOpen(true)} />
      <CartDrawer />
      <VibeQuizModal isOpen={quizOpen} onClose={() => setQuizOpen(false)} />

      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Link to="/" className="hover:text-amber-200 transition-colors flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Collections
          </Link>
          <span>/</span>
          <span>{product.category}</span>
          <span>/</span>
          <span className="text-slate-200 font-medium truncate max-w-[200px] sm:max-w-none">
            {product.name}
          </span>
        </div>
      </div>

      {/* Main Product Stage: Gallery + Configurator */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Multi-View Gallery */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Primary Main View */}
            <div className="relative aspect-square sm:aspect-[4/3] rounded-3xl overflow-hidden bg-[#101119] border border-[#232535] shadow-2xl group">
              <img
                src={getOptimizedImageUrl(product.images[selectedImageIndex] || product.images[0], 1000)}
                alt={product.name}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />

              {/* Ambient Vignette Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none" />

              {/* Top Badge */}
              <div className="absolute top-4 left-4">
                {product.badge && (
                  <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-[#141520]/90 backdrop-blur-md text-amber-200 border border-amber-300/30 shadow-lg">
                    {product.badge}
                  </span>
                )}
              </div>

              {/* Discreet shipping seal overlay */}
              <div className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[11px] text-slate-200">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>100% Plain Box Blind Shipping</span>
              </div>
            </div>

            {/* Thumbnail Row */}
            {product.images.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-[#12131C] border transition-all flex-shrink-0 ${
                      selectedImageIndex === idx
                        ? 'border-amber-400 ring-2 ring-amber-400/40 scale-95'
                        : 'border-[#262838] opacity-70 hover:opacity-100 hover:border-slate-500'
                    }`}
                  >
                    <img
                      src={getOptimizedImageUrl(img, 200)}
                      alt={`${product.name} thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Quick Highlights Grid under gallery on desktop */}
            <div className="hidden sm:grid grid-cols-3 gap-4 pt-4">
              <div className="p-4 rounded-2xl bg-[#12141F] border border-[#222536] flex items-center gap-3">
                <Volume2 className="w-5 h-5 text-rose-400 flex-shrink-0" />
                <div className="text-xs">
                  <span className="text-slate-400 block text-[10px] uppercase tracking-wider">Acoustics</span>
                  <span className="font-semibold text-white">{product.noiseLevel}</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#12141F] border border-[#222536] flex items-center gap-3">
                <Droplets className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <div className="text-xs">
                  <span className="text-slate-400 block text-[10px] uppercase tracking-wider">Immersion</span>
                  <span className="font-semibold text-white">{product.waterproof}</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#12141F] border border-[#222536] flex items-center gap-3">
                <BatteryCharging className="w-5 h-5 text-amber-400 flex-shrink-0" />
                <div className="text-xs">
                  <span className="text-slate-400 block text-[10px] uppercase tracking-wider">Endurance</span>
                  <span className="font-semibold text-white">{product.batteryLife.split('(')[0]}</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Product Purchasing & Configuration */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Category, Rating & Title */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="uppercase tracking-widest text-[#D4A373] font-semibold">
                  {product.category}
                </span>
                
                {/* Rating & Review Counter Anchor */}
                <button
                  onClick={() => setActiveTab('reviews')}
                  className="flex items-center gap-1.5 text-amber-400 hover:text-amber-300 transition-colors"
                >
                  <Star className="w-4 h-4 fill-current" />
                  <span className="font-mono font-bold text-slate-100">{product.rating}</span>
                  <span className="text-slate-400 text-xs">({product.reviewsCount} reviews)</span>
                </button>
              </div>

              <h1 className="text-3xl sm:text-4xl font-serif font-black text-white leading-tight">
                {product.name}
              </h1>

              <p className="text-sm text-slate-300 leading-relaxed font-light">
                {product.tagline}
              </p>
            </div>

            {/* Price & Installments */}
            <div className="p-4 rounded-2xl bg-[#12141F] border border-[#242738] space-y-2">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-serif font-black text-white">
                  ${product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-base line-through text-slate-500 font-sans">
                    ${product.originalPrice}
                  </span>
                )}
                {discountPercent > 0 && (
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase bg-rose-600/90 text-white">
                    Save ${discountAmount} ({discountPercent}%)
                  </span>
                )}
              </div>

              <div className="text-xs text-slate-400 flex items-center gap-1.5 pt-1 border-t border-[#1F2232]">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>
                  Or 4 interest-free payments of <strong>${(product.price / 4).toFixed(2)}</strong> with 0% APR.
                </span>
              </div>
            </div>

            {/* Color Variant Selector */}
            {product.variants.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-300 font-medium">
                    Shade: <strong className="text-white">{selectedVariant?.name}</strong>
                  </span>
                  <span
                    className={`font-semibold ${
                      selectedVariant?.inStock ? 'text-emerald-400' : 'text-rose-400'
                    }`}
                  >
                    {selectedVariant?.inStock ? 'In Stock — Ships Today' : 'Pre-Order Only'}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  {product.variants.map((v) => (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => setSelectedVariantId(v.id)}
                      className={`group relative p-1 rounded-full border transition-all ${
                        selectedVariantId === v.id
                          ? 'border-amber-300 ring-2 ring-amber-300/40 scale-110'
                          : 'border-white/20 hover:border-white/50 opacity-80 hover:opacity-100'
                      }`}
                      title={v.name}
                    >
                      <div
                        className="w-7 h-7 rounded-full shadow-inner border border-black/40"
                        style={{ backgroundColor: v.hex }}
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Stepper & Add to Bag */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-4">
                
                {/* Stepper */}
                <div className="flex items-center rounded-2xl bg-[#161824] border border-[#2C2F42] p-1 text-slate-200">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2.5 rounded-xl hover:bg-[#25283A] text-slate-400 hover:text-white transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-10 text-center font-mono font-semibold text-sm">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2.5 rounded-xl hover:bg-[#25283A] text-slate-400 hover:text-white transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Primary Add to Bag Button */}
                <button
                  onClick={handleAddToCart}
                  disabled={!selectedVariant?.inStock}
                  className={`flex-1 py-4 px-6 rounded-2xl font-semibold text-xs tracking-widest uppercase flex items-center justify-center gap-2 shadow-xl transition-all duration-300 ${
                    addedSuccess
                      ? 'bg-emerald-600 text-white'
                      : 'bg-gradient-to-r from-[#B02A6A] via-[#E24A84] to-[#C88A58] hover:opacity-95 text-white shadow-rose-950/40 active:scale-[0.99]'
                  }`}
                >
                  {addedSuccess ? (
                    <>
                      <Check className="w-4 h-4" /> Added to Bag
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" /> Add to Intimate Bag • ${(product.price * quantity).toLocaleString()}
                    </>
                  )}
                </button>
              </div>

              {/* Instant Discreet Checkout CTA */}
              <button
                onClick={handleBuyNow}
                className="w-full py-3.5 px-6 rounded-2xl bg-[#171926] hover:bg-[#202334] border border-[#2D3044] text-slate-200 text-xs font-semibold tracking-wider uppercase flex items-center justify-center gap-2 transition-colors"
              >
                <Lock className="w-3.5 h-3.5 text-amber-300" />
                Quick Discreet Checkout
              </button>
            </div>

            {/* Privacy & Guarantees Callout Card */}
            <div className="p-4 rounded-2xl bg-[#11131C] border border-[#212435] space-y-2.5 text-xs text-slate-300">
              <div className="flex items-center gap-2 text-emerald-400 font-medium">
                <ShieldCheck className="w-4 h-4 flex-shrink-0" />
                <span>100% Blind Box Shipping — Unmarked Card Statement</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Truck className="w-4 h-4 text-amber-300 flex-shrink-0" />
                <span>Discreet 2-3 Day Priority Delivery with Tracking</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <RotateCcw className="w-4 h-4 text-purple-300 flex-shrink-0" />
                <span>2-Year Full Replacement Manufacturer Guarantee</span>
              </div>
            </div>

          </div>
        </div>

        {/* Tabbed In-Depth Information: Details, Specs, Care, Reviews */}
        <div className="mt-20 pt-12 border-t border-[#1E202D] space-y-8">
          
          {/* Tab Navigation */}
          <div className="flex items-center gap-2 sm:gap-4 border-b border-[#212435] pb-4 overflow-x-auto">
            {[
              { id: 'details', label: 'Sensory Profile' },
              { id: 'specs', label: 'Engineering Specifications' },
              { id: 'care', label: 'Care & Hygiene' },
              { id: 'reviews', label: `Patron Reviews (${localReviews.length})` },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold tracking-wide whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'bg-[#222538] text-amber-200 border border-amber-300/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab 1: Details */}
          {activeTab === 'details' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 animate-fade-in">
              <div className="space-y-4">
                <h3 className="text-xl font-serif font-bold text-white">Anatomy &amp; Sensation</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                  {product.description}
                </p>
                <div className="pt-2 space-y-2">
                  <h4 className="text-xs uppercase tracking-wider text-amber-200 font-semibold">Key Highlights</h4>
                  <ul className="space-y-2 text-xs text-slate-300">
                    {product.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-[#12141F] border border-[#222536] space-y-4">
                <h4 className="text-sm font-serif font-bold text-white">The Pleasure Philosophy</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  We reject the standard mass-market approach of overpowering motor vibration. Velvet &amp; Pulse creations are calibrated to harmonic resonance frequencies that trigger involuntary orgasmic reflexes without nerve numbing or desensitization.
                </p>
                <div className="p-4 rounded-2xl bg-[#1A1C29] border border-[#2D3044] space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Tactile Feel:</span>
                    <span className="text-white font-medium">{product.material}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Intensity Range:</span>
                    <span className="text-white font-medium">{product.intensityLevel}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Audible Footprint:</span>
                    <span className="text-emerald-400 font-mono font-medium">{product.noiseLevel}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Specifications Table */}
          {activeTab === 'specs' && (
            <div className="max-w-3xl animate-fade-in space-y-4">
              <h3 className="text-xl font-serif font-bold text-white">Engineering Dimensions &amp; Tolerances</h3>
              <div className="rounded-2xl border border-[#242738] overflow-hidden bg-[#12141F]">
                <table className="w-full text-left text-xs">
                  <tbody>
                    {Object.entries(product.specifications).map(([key, val], idx) => (
                      <tr
                        key={key}
                        className={`border-b border-[#1E202E] last:border-none ${
                          idx % 2 === 0 ? 'bg-[#151724]' : 'bg-[#12141F]'
                        }`}
                      >
                        <td className="py-3.5 px-5 font-semibold text-slate-300 w-1/3">{key}</td>
                        <td className="py-3.5 px-5 text-slate-200 font-mono">{val}</td>
                      </tr>
                    ))}
                    <tr className="bg-[#151724] border-t border-[#25283B]">
                      <td className="py-3.5 px-5 font-semibold text-slate-300">Biocompatibility</td>
                      <td className="py-3.5 px-5 text-emerald-400">100% Medical-Grade Liquid Silicone, Latex &amp; Phthalate Free</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Tab 3: Care & Hygiene */}
          {activeTab === 'care' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
              <div className="p-6 rounded-2xl bg-[#12141F] border border-[#242738] space-y-2">
                <h4 className="text-sm font-serif font-bold text-white">1. Washing &amp; Sanitization</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Wash with warm water and antibacterial toy cleanser or gentle unscented soap. Rinse thoroughly and pat dry with a lint-free cloth. Do not use petroleum-based detergents or alcohol.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#12141F] border border-[#242738] space-y-2">
                <h4 className="text-sm font-serif font-bold text-white">2. Lubricant Harmony</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Only use premium water-based lubricants (such as our Silk Elixir Intimate Serum). Never use silicone-based lubricants on silicone surfaces, as they will degrade the velvet texture.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#12141F] border border-[#242738] space-y-2">
                <h4 className="text-sm font-serif font-bold text-white">3. Velvet Pouch Storage</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Always store in the provided anti-dust satin pouch away from direct sunlight or extreme heat. Engage travel lock mode before placing inside luggage.
                </p>
              </div>
            </div>
          )}

          {/* Tab 4: Reviews & Review Submission */}
          {activeTab === 'reviews' && (
            <div className="space-y-8 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-[#12141F] border border-[#252838]">
                <div className="flex items-center gap-4">
                  <div className="text-4xl font-serif font-black text-amber-200">
                    {product.rating}
                  </div>
                  <div>
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <span className="text-xs text-slate-400">
                      Based on {localReviews.length} verified patron evaluations
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setReviewModalOpen(true)}
                  className="px-5 py-2.5 rounded-full bg-[#202232] hover:bg-[#2C2F44] border border-[#373A52] text-xs font-semibold text-slate-200 transition-colors flex items-center gap-1.5 self-start sm:self-center"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-amber-300" />
                  Submit Your Evaluation
                </button>
              </div>

              {/* Reviews List */}
              <div className="space-y-4">
                {localReviews.map((rev) => (
                  <div
                    key={rev.id}
                    className="p-6 rounded-2xl bg-[#141520] border border-[#232535] space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-white">{rev.author}</span>
                        {rev.verified && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium flex items-center gap-1">
                            <Check className="w-3 h-3" /> Verified Patron
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-slate-500">{rev.date}</span>
                    </div>

                    <div className="flex text-amber-400">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>

                    <h5 className="text-sm font-semibold text-slate-100">{rev.title}</h5>
                    <p className="text-xs text-slate-300 leading-relaxed font-light">
                      {rev.comment}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Related Curations */}
        {related.length > 0 && (
          <div className="mt-24 pt-12 border-t border-[#1E202D] space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#D4A373] font-semibold">
                  Complementary Sensations
                </span>
                <h3 className="text-2xl font-serif font-black text-white">
                  Patrons Also Desired
                </h3>
              </div>
              <Link to="/" className="text-xs text-slate-400 hover:text-amber-200 transition-colors">
                View All Creations &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Review Submission Modal */}
      {reviewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setReviewModalOpen(false)}
          />
          <div className="relative w-full max-w-md bg-[#131520] border border-[#2B2E42] rounded-3xl p-6 sm:p-8 z-10 shadow-2xl space-y-4">
            <h3 className="text-xl font-serif font-bold text-white">Share Your Intimate Experience</h3>
            <p className="text-xs text-slate-400">
              Your feedback is treated with absolute discretion. Only your initial and city are displayed.
            </p>

            {reviewSubmitted ? (
              <div className="p-6 rounded-2xl bg-emerald-950/40 border border-emerald-800 text-center space-y-2">
                <Check className="w-8 h-8 text-emerald-400 mx-auto" />
                <h4 className="text-sm font-semibold text-white">Thank You for Your Evaluation</h4>
                <p className="text-xs text-emerald-300">Your review has been preserved in our database.</p>
              </div>
            ) : (
              <form onSubmit={handleReviewSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-xs text-slate-300 mb-1">Your Name or Alias</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Julianne S."
                    value={reviewerName}
                    onChange={(e) => setReviewerName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#1A1C2A] border border-[#2E3146] text-xs text-white focus:outline-none focus:border-amber-300"
                  />
                </div>

                <div>
                  <label className="block text-xs text-slate-300 mb-1">Rating</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setReviewRating(star)}
                        className={`p-1.5 rounded-lg border ${
                          reviewRating >= star
                            ? 'text-amber-400 border-amber-400/40 bg-amber-400/10'
                            : 'text-slate-500 border-slate-700'
                        }`}
                      >
                        <Star className="w-5 h-5 fill-current" />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-slate-300 mb-1">Review Headline</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Transcendent whisper-quiet sensation"
                    value={reviewTitle}
                    onChange={(e) => setReviewTitle(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#1A1C2A] border border-[#2E3146] text-xs text-white focus:outline-none focus:border-amber-300"
                  />
                </div>

                <div>
                  <label className="block text-xs text-slate-300 mb-1">Your Honest Thoughts</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe ergonomics, motor sound level, sensations, and texture..."
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#1A1C2A] border border-[#2E3146] text-xs text-white focus:outline-none focus:border-amber-300"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setReviewModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#9B2C68] to-[#C88A58] text-white text-xs font-semibold"
                  >
                    Post Evaluation
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}
