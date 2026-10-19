import { useState, useMemo, useEffect } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { getCatalogProducts, seedDatabaseIfEmpty } from '@/lib/db-service'
import { Product, CATEGORIES } from '@/data/products'
import { ProductCard } from '@/components/ProductCard'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { CartDrawer } from '@/components/CartDrawer'
import { VibeQuizModal } from '@/components/VibeQuizModal'
import { getOptimizedImageUrl } from '@/lib/image'
import {
  Search,
  X,
  Sparkles,
  ShieldCheck,
  Volume2,
  Heart,
  Award,
  ArrowRight,
  Flame,
  Check,
} from 'lucide-react'

export const Route = createFileRoute('/')({
  component: ProductsIndex,
  loader: async () => {
    // Initiate seed check in background if DB is ready
    seedDatabaseIfEmpty().catch(() => {})
    const catalog = await getCatalogProducts()
    return { catalog }
  },
})

function ProductsIndex() {
  const { catalog } = Route.useLoaderData()
  const [productsList, setProductsList] = useState<Product[]>(catalog)

  // Filters state
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('All Collections')
  const [priceRange, setPriceRange] = useState<string>('all')
  const [featureFilter, setFeatureFilter] = useState<string>('all')
  const [sortBy, setSortBy] = useState<string>('featured')
  const [quizOpen, setQuizOpen] = useState(false)

  // Sync if catalog changes
  useEffect(() => {
    if (catalog && catalog.length > 0) {
      setProductsList(catalog)
    }
  }, [catalog])

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return productsList
      .filter((product) => {
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim()
          const matchName = product.name.toLowerCase().includes(q)
          const matchDesc = product.description.toLowerCase().includes(q)
          const matchTagline = product.tagline.toLowerCase().includes(q)
          const matchCategory = product.category.toLowerCase().includes(q)
          const matchFeatures = product.features.some((f) => f.toLowerCase().includes(q))
          if (!matchName && !matchDesc && !matchTagline && !matchCategory && !matchFeatures) {
            return false
          }
        }

        // Category filter
        if (selectedCategory !== 'All Collections' && product.category !== selectedCategory) {
          return false
        }

        // Price range
        if (priceRange === 'under-100' && product.price >= 100) return false
        if (priceRange === '100-150' && (product.price < 100 || product.price > 150)) return false
        if (priceRange === 'over-150' && product.price <= 150) return false

        // Feature filter
        if (featureFilter === 'sonic' && !product.category.includes('Sonic')) return false
        if (featureFilter === 'wand' && !product.category.includes('Wand')) return false
        if (featureFilter === 'couples' && !product.category.includes('Couple')) return false
        if (featureFilter === 'waterproof' && !product.waterproof.includes('IPX8')) return false

        return true
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price
        if (sortBy === 'price-high') return b.price - a.price
        if (sortBy === 'rating') return parseFloat(b.rating) - parseFloat(a.rating)
        if (sortBy === 'reviews') return b.reviewsCount - a.reviewsCount
        return a.id - b.id // Default featured
      })
  }, [productsList, searchQuery, selectedCategory, priceRange, featureFilter, sortBy])

  const activeFilterCount =
    (selectedCategory !== 'All Collections' ? 1 : 0) +
    (priceRange !== 'all' ? 1 : 0) +
    (featureFilter !== 'all' ? 1 : 0) +
    (searchQuery.trim() ? 1 : 0)

  const resetAllFilters = () => {
    setSearchQuery('')
    setSelectedCategory('All Collections')
    setPriceRange('all')
    setFeatureFilter('all')
    setSortBy('featured')
  }

  return (
    <div className="min-h-screen bg-[#0A0B10] text-slate-100 font-sans selection:bg-[#B02A6A] selection:text-white">
      {/* Navigation */}
      <Navbar onOpenQuiz={() => setQuizOpen(true)} />

      {/* Cart Drawer & Quiz Modal */}
      <CartDrawer />
      <VibeQuizModal isOpen={quizOpen} onClose={() => setQuizOpen(false)} />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-32 border-b border-[#1E202D]">
        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-[#9B2C68]/20 via-[#E24A84]/15 to-transparent rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-10 right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Headline Copy */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1A1C29] border border-[#303348] text-amber-200 text-xs font-semibold tracking-wider uppercase shadow-inner">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>The Art of Sensual Wellness • 2026 Collection</span>
              </div>

              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-black tracking-tight text-white leading-[1.08]">
                Whisper Quiet. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF5E97] via-[#E29A72] to-[#F3D5B5]">
                  Profoundly Ecstatic.
                </span>
              </h1>

              <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed font-light">
                Sculpted from hypoallergenic liquid silicone and powered by sound-dampened acoustic resonance. Experience deep clitoral air aeration and dual stimulation without intrusive motor drone.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <a
                  href="#catalog"
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-[#B02A6A] via-[#E24A84] to-[#C88A58] text-white text-xs font-semibold tracking-widest uppercase hover:opacity-95 transition-all shadow-xl shadow-rose-950/50 flex items-center justify-center gap-2"
                >
                  Explore Creations <ArrowRight className="w-4 h-4" />
                </a>

                <button
                  onClick={() => setQuizOpen(true)}
                  className="w-full sm:w-auto px-7 py-4 rounded-full bg-[#181A27] hover:bg-[#222538] border border-[#31354D] text-slate-200 text-xs font-semibold tracking-widest uppercase transition-all flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  Sensory Match Quiz
                </button>
              </div>

              {/* Trust Badges */}
              <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left border-t border-[#1F2232] text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <Volume2 className="w-4 h-4 text-rose-400 flex-shrink-0" />
                  <span>&lt; 34dB Whisper Silent</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>100% Blind Box Shipping</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-amber-300 flex-shrink-0" />
                  <span>Body-Safe Pure Silicone</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-purple-400 flex-shrink-0" />
                  <span>2-Year Full Warranty</span>
                </div>
              </div>
            </div>

            {/* Right Hero Visual Banner */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none rounded-3xl overflow-hidden bg-gradient-to-tr from-[#1B1226] via-[#10121C] to-[#251528] p-2 border border-[#38304B] shadow-2xl shadow-rose-950/40 group">
                <div className="aspect-[4/5] rounded-2xl overflow-hidden relative">
                  <img
                    src={getOptimizedImageUrl('/img/hero-banner.png', 900)}
                    alt="Velvet and Pulse Sensory Collection"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                  />
                  
                  {/* Floating Pill Overlay */}
                  <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl bg-black/60 backdrop-blur-md border border-white/10 text-white flex items-center justify-between">
                    <div>
                      <span className="text-[10px] tracking-wider uppercase text-amber-300 font-semibold block">
                        Featured Debut
                      </span>
                      <span className="text-sm font-serif font-bold">Velvet Pulse Arc™</span>
                    </div>
                    <span className="text-sm font-mono font-bold text-amber-200">$169</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Main Catalog Section: Filterable, Searchable Grid */}
      <section id="catalog" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
        
        {/* Catalog Header & Search */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#202232]">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-widest text-[#D4A373] font-semibold flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5" /> Curated Intimacy Catalog
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-black text-white">
              Explore Our Creations
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-md">
              Filter by sensation, whisper rating, or play style. Each piece is tested for flawless ergonomic bliss.
            </p>
          </div>

          {/* Search Box */}
          <div className="w-full md:w-80 relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by vibe, wand, sonic, glass..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-9 py-3 bg-[#131520] border border-[#2A2D40] rounded-2xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-300 transition-colors shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="space-y-4">
          
          {/* Category Pills Slider */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {CATEGORIES.map((cat) => {
              const count =
                cat === 'All Collections'
                  ? productsList.length
                  : productsList.filter((p) => p.category === cat).length
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2.5 rounded-full text-xs font-semibold tracking-wider whitespace-nowrap transition-all flex items-center gap-2 ${
                    selectedCategory === cat
                      ? 'bg-gradient-to-r from-[#9B2C68] to-[#C88A58] text-white shadow-lg shadow-rose-950/40'
                      : 'bg-[#141622] hover:bg-[#1E2132] text-slate-300 border border-[#272A3C]'
                  }`}
                >
                  <span>{cat}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                      selectedCategory === cat ? 'bg-white/20 text-white' : 'bg-[#222538] text-slate-400'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              )
            })}
          </div>

          {/* Secondary Filters & Sort Controls */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-[#12141E] border border-[#222535]">
            <div className="flex flex-wrap items-center gap-3">
              
              {/* Price Filter */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">Price:</span>
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="bg-[#1A1C29] border border-[#2E3146] text-xs text-slate-200 rounded-xl px-3 py-1.5 focus:outline-none focus:border-amber-300"
                >
                  <option value="all">All Prices</option>
                  <option value="under-100">Under $100</option>
                  <option value="100-150">$100 – $150</option>
                  <option value="over-150">Over $150</option>
                </select>
              </div>

              {/* Special Features Filter */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">Feature:</span>
                <select
                  value={featureFilter}
                  onChange={(e) => setFeatureFilter(e.target.value)}
                  className="bg-[#1A1C29] border border-[#2E3146] text-xs text-slate-200 rounded-xl px-3 py-1.5 focus:outline-none focus:border-amber-300"
                >
                  <option value="all">All Features</option>
                  <option value="sonic">Sonic &amp; Aeropulse</option>
                  <option value="wand">Wand &amp; Deep Rumble</option>
                  <option value="couples">Couples &amp; Wearables</option>
                  <option value="waterproof">IPX8 Submersible</option>
                </select>
              </div>

              {/* Active Filter Reset */}
              {activeFilterCount > 0 && (
                <button
                  onClick={resetAllFilters}
                  className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1 px-2.5 py-1 rounded-lg bg-rose-950/30 border border-rose-900/40"
                >
                  <X className="w-3.5 h-3.5" /> Clear Filters ({activeFilterCount})
                </button>
              )}
            </div>

            {/* Sort Options */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Sort By:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-[#1A1C29] border border-[#2E3146] text-xs text-slate-200 rounded-xl px-3 py-1.5 focus:outline-none focus:border-amber-300"
              >
                <option value="featured">Featured Curations</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="reviews">Most Reviewed</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span>
            Showing <strong className="text-white font-mono">{filteredProducts.length}</strong> creations
          </span>
          {searchQuery && (
            <span>
              Matching query <em className="text-amber-200 not-italic">"{searchQuery}"</em>
            </span>
          )}
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center rounded-3xl bg-[#12141F] border border-[#252838] p-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#1F2232] flex items-center justify-center mx-auto text-slate-400">
              <Search className="w-8 h-8 opacity-40" />
            </div>
            <h3 className="text-xl font-serif font-bold text-white">No creations matched your criteria</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              We couldn't find items matching your active combination of filters. Try widening your price range or clearing your search.
            </p>
            <button
              onClick={resetAllFilters}
              className="mt-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#9B2C68] to-[#C88A58] text-white text-xs font-semibold tracking-wider uppercase"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

      </section>

      {/* Technology & Whisper-Quiet Section */}
      <section id="technology" className="py-20 bg-[#0E0F16] border-y border-[#1E202D] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1C1E2B] border border-[#2F3246] text-xs font-medium text-amber-200">
                <Volume2 className="w-3.5 h-3.5 text-rose-400" />
                <span>The Whisper Standard (&lt;34 dB)</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-serif font-black text-white leading-tight">
                Designed for Absolute Discretion.
              </h2>

              <p className="text-sm text-slate-300 leading-relaxed font-light">
                Nothing ruins intimate immersion faster than a loud, buzzing electric motor. Every Velvet &amp; Pulse device is housed inside an acoustically insulated chamber that dampens airborne noise to less than 34 decibels—softer than a quiet library whisper.
              </p>

              <div className="space-y-3 pt-2">
                {[
                  { title: 'Harmonic Low Frequency Motors', desc: 'Vibrations resonate deep into muscle tissue rather than wasting energy buzzing the surface.' },
                  { title: 'Submersible IPX8 Waterproofing', desc: 'Hermetically sealed charging ports ensure complete peace of mind in relaxing hot water.' },
                  { title: 'Medical-Grade Soft Touch', desc: 'Zero phthalates, latex, or harsh chemicals. Smooth, non-porous and warm to the touch.' },
                ].map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#151722] border border-[#242738]">
                    <div className="p-1 rounded-full bg-emerald-500/10 text-emerald-400 mt-0.5">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-white">{feat.title}</h4>
                      <p className="text-xs text-slate-400 mt-0.5">{feat.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Blind Box Preview */}
            <div className="lg:col-span-6">
              <div className="p-8 rounded-3xl bg-[#141520] border border-[#282B3E] shadow-2xl space-y-6">
                <div className="flex items-center justify-between border-b border-[#232535] pb-4">
                  <span className="text-xs uppercase tracking-widest text-amber-200 font-semibold flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" /> Blind Box Security Guarantee
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">100% UNBRANDED</span>
                </div>

                <div className="p-6 rounded-2xl bg-[#1E202F] border border-[#303348] space-y-4">
                  <div className="text-xs text-slate-300">
                    <strong className="text-white block mb-1">Exterior Shipping Label:</strong>
                    <div className="font-mono text-[11px] bg-[#12131C] p-3 rounded-lg text-slate-300 border border-[#242636] space-y-1">
                      <div>SHIP TO: Valued Patron (Private Address)</div>
                      <div>RETURN: Fulfillment Center Suite 400</div>
                      <div>NO LOGOS • NO PRODUCT MENTION • TAMPER SEALED</div>
                    </div>
                  </div>

                  <div className="text-xs text-slate-300">
                    <strong className="text-white block mb-1">Bank Statement Descriptor:</strong>
                    <div className="font-mono text-[11px] bg-[#12131C] p-3 rounded-lg text-amber-200 border border-[#242636]">
                      "VP STUDIO SERVICES LLC"
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed">
                  Whether delivered to your home, office, or apartment lobby, no one can tell what is inside. Your privacy is guaranteed from click to doorstep.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
