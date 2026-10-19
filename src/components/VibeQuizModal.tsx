import { useState } from 'react'
import { Product, products } from '@/data/products'
import { useCart } from '@/context/CartContext'
import { getOptimizedImageUrl } from '@/lib/image'
import { X, Sparkles, ArrowRight, RotateCcw, ShoppingBag } from 'lucide-react'
import { Link } from '@tanstack/react-router'

export function VibeQuizModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { addToCart } = useCart()
  const [step, setStep] = useState(1)
  const [answers, setAnswers] = useState<{ experience?: string; sensation?: string; priority?: string }>({})

  if (!isOpen) return null

  const handleSelect = (key: 'experience' | 'sensation' | 'priority', value: string) => {
    const updated = { ...answers, [key]: value }
    setAnswers(updated)
    setStep(step + 1)
  }

  const resetQuiz = () => {
    setStep(1)
    setAnswers({})
  }

  // Calculate recommended product based on answers
  const getRecommendation = (): Product => {
    if (answers.experience === 'couples') {
      return products.find((p) => p.slug === 'solstice-couples-bond') || products[3]
    }
    if (answers.experience === 'air-pulse' || answers.sensation === 'touchless') {
      return products.find((p) => p.slug === 'kipis-air-wave') || products[4]
    }
    if (answers.experience === 'wand' || answers.sensation === 'deep-rumble') {
      return products.find((p) => p.slug === 'aura-luxe-wand') || products[1]
    }
    if (answers.sensation === 'warming') {
      return products.find((p) => p.slug === 'nirvana-s-curve') || products[2]
    }
    if (answers.sensation === 'sensory') {
      return products.find((p) => p.slug === 'elysium-glass-wand') || products[5]
    }
    // Default top pick: Velvet Pulse Arc
    return products[0]
  }

  const recommendation = getRecommendation()

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-lg bg-[#11121A] border border-[#2B2A3D] rounded-3xl shadow-2xl p-6 sm:p-8 text-slate-100 z-10 overflow-hidden">
        {/* Glow decoration */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-rose-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white hover:bg-[#1C1E2B] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {step <= 3 ? (
          <div>
            <div className="flex items-center gap-2 text-rose-300 text-xs font-semibold tracking-wider uppercase mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Sensory Match Quiz • Step {step} of 3</span>
            </div>

            {/* Step 1 */}
            {step === 1 && (
              <div className="space-y-4">
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-white leading-snug">
                  What intimate journey are you seeking?
                </h3>
                <p className="text-xs text-slate-400">
                  Select your primary intention so we can calibrate your frequency match.
                </p>

                <div className="space-y-2.5 pt-2">
                  {[
                    { id: 'dual', label: 'Simultaneous Dual Stimulation', desc: 'Clitoral aerowaves + deep G-spot resonance' },
                    { id: 'wand', label: 'Full-Body Euphoria & Magic Wand Power', desc: 'Acoustic-dampened low frequency rumble' },
                    { id: 'couples', label: 'Enhanced Partner Synergy', desc: 'Flexible wearable designed for intercourse' },
                    { id: 'air-pulse', label: 'Touchless Air-Pulse Ecstasy', desc: 'Contactless aerodynamic flutter' },
                  ].map((option) => (
                    <button
                      key={option.id}
                      onClick={() => handleSelect('experience', option.id)}
                      className="w-full text-left p-4 rounded-2xl bg-[#171926] hover:bg-[#202334] border border-[#282B3E] hover:border-amber-400/50 transition-all group"
                    >
                      <div className="text-sm font-semibold text-slate-100 group-hover:text-amber-200">
                        {option.label}
                      </div>
                      <div className="text-xs text-slate-400 mt-0.5">{option.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2 */}
            {step === 2 && (
              <div className="space-y-4">
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-white leading-snug">
                  Which tactile sensation resonates with you?
                </h3>
                <p className="text-xs text-slate-400">
                  Choose the physiological stimulus that brings you greatest pleasure.
                </p>

                <div className="space-y-2.5 pt-2">
                  {[
                    { id: 'deep-rumble', label: 'Deep, Resonant Bass Rumbles', desc: 'Low Hz harmonic vibrations that avoid surface buzz' },
                    { id: 'warming', label: 'Therapeutic Thermal Warming (102°F)', desc: 'Organic body heat warmth for seamless comfort' },
                    { id: 'touchless', label: 'Contactless Aerodynamic Pulses', desc: 'Hypersensitive stimulation with zero friction' },
                    { id: 'sensory', label: 'Artisanal Temperature Play', desc: 'Borosilicate crystal glass in warm bath or chilled' },
                  ].map((option) => (
                    <button
                      key={option.id}
                      onClick={() => handleSelect('sensation', option.id)}
                      className="w-full text-left p-4 rounded-2xl bg-[#171926] hover:bg-[#202334] border border-[#282B3E] hover:border-amber-400/50 transition-all group"
                    >
                      <div className="text-sm font-semibold text-slate-100 group-hover:text-amber-200">
                        {option.label}
                      </div>
                      <div className="text-xs text-slate-400 mt-0.5">{option.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3 */}
            {step === 3 && (
              <div className="space-y-4">
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-white leading-snug">
                  What feature is most non-negotiable?
                </h3>
                <p className="text-xs text-slate-400">
                  Refining the engineering details to finalize your profile.
                </p>

                <div className="space-y-2.5 pt-2">
                  {[
                    { id: 'silent', label: 'Absolute Whisper Discretion (<35 dB)', desc: 'Complete privacy in shared households or thin walls' },
                    { id: 'waterproof', label: '100% Submersible Waterproofing', desc: 'Seamless luxury in the warm bath or shower' },
                    { id: 'ergonomic', label: 'Anatomical Wave Ergonomics', desc: 'Effortless targeted reach without hand strain' },
                    { id: 'multi-speed', label: 'Broad Intensity Spectrum', desc: 'From barely-there caress to intense climax peak' },
                  ].map((option) => (
                    <button
                      key={option.id}
                      onClick={() => handleSelect('priority', option.id)}
                      className="w-full text-left p-4 rounded-2xl bg-[#171926] hover:bg-[#202334] border border-[#282B3E] hover:border-amber-400/50 transition-all group"
                    >
                      <div className="text-sm font-semibold text-slate-100 group-hover:text-amber-200">
                        {option.label}
                      </div>
                      <div className="text-xs text-slate-400 mt-0.5">{option.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Recommendation Result */
          <div className="space-y-5 animate-fade-in text-center sm:text-left">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-200 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" /> 99.4% Pleasure Match
              </span>
              <button
                onClick={resetQuiz}
                className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" /> Retake
              </button>
            </div>

            <div className="flex flex-col sm:flex-row gap-5 items-center bg-[#171822] p-4 rounded-2xl border border-[#272938]">
              <div className="w-32 h-32 rounded-xl overflow-hidden bg-black flex-shrink-0 border border-[#303348]">
                <img
                  src={getOptimizedImageUrl(recommendation.images[0], 300)}
                  alt={recommendation.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 space-y-1.5 text-left">
                <span className="text-[11px] uppercase tracking-wider text-amber-200/90 font-medium">
                  {recommendation.category}
                </span>
                <h4 className="text-lg font-serif font-bold text-white">
                  {recommendation.name}
                </h4>
                <p className="text-xs text-slate-300 line-clamp-2">
                  {recommendation.tagline}
                </p>
                <div className="text-base font-serif font-bold text-amber-300 pt-1">
                  ${recommendation.price}{' '}
                  {recommendation.originalPrice && (
                    <span className="text-xs line-through text-slate-500 font-sans ml-1">
                      ${recommendation.originalPrice}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed text-left">
              Based on your desire for {answers.experience || 'transcendent'} intimacy and {answers.sensation || 'low Hz'} sensations, this creation offers optimal resonance, silky ergonomics, and whisper silence.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={() => {
                  addToCart(recommendation)
                  onClose()
                }}
                className="flex-1 py-3 px-5 rounded-2xl bg-gradient-to-r from-[#B02A6A] via-[#E24A84] to-[#C88A58] text-white text-xs font-semibold tracking-wider uppercase flex items-center justify-center gap-2 hover:opacity-95 shadow-lg shadow-rose-950/40"
              >
                <ShoppingBag className="w-4 h-4" /> Add Match to Bag
              </button>
              <Link
                to="/products/$productId"
                params={{ productId: recommendation.id.toString() }}
                onClick={onClose}
                className="py-3 px-5 rounded-2xl bg-[#232535] hover:bg-[#2E3146] text-slate-200 text-xs font-semibold tracking-wider uppercase text-center flex items-center justify-center gap-1.5"
              >
                Inspect Details <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
