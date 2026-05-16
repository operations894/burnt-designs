import { useState, useMemo } from 'react'
import { Send, Phone, Mail, MapPin, Clock, DollarSign, Sparkles, ExternalLink } from 'lucide-react'

const SQUARE_STORE = 'https://shop.burnt-designs.com'

const itemTypes = ['Dining Table', 'Coffee Table', 'End Table', 'Cutting Board Coated', 'Sign', 'Art / Wall Piece'] as const
type ItemType = typeof itemTypes[number]

const epoxyLocations = ['No Epoxy', 'River (Center Fill)', 'Edge Pour', 'Full Coat', 'Inlay Channels', 'Knot / Void Fill'] as const
type EpoxyLocation = typeof epoxyLocations[number]

const woodTypes = ['Walnut', 'Oak', 'Cedar', 'Maple', 'Pine', 'Cherry'] as const
const finishes = ['Natural Oil', 'High Gloss Epoxy', 'Outdoor Spar Urethane', 'Matte Poly'] as const
const epoxyColors = ['Blue River', 'Teal River', 'Black Smoke', 'Amber', 'Deep Red', 'Emerald', 'Clear / No Color'] as const
const timelines = ['No rush', '2-4 weeks', '4-6 weeks', '6-8 weeks', 'Rush needed'] as const

const woodGradients: Record<string, string> = {
  Walnut: 'linear-gradient(90deg, #5d3216, #a1622e 23%, #744018 45%, #c18446 66%, #633415)',
  Cedar: 'linear-gradient(90deg, #7f3f1d, #c77232, #633015)',
  Oak: 'linear-gradient(90deg, #835b2b, #d1a15f, #735020)',
  Maple: 'linear-gradient(90deg, #b98542, #f2c377, #9e6732)',
  Pine: 'linear-gradient(90deg, #a67232, #e1b55f, #8f5d24)',
  Cherry: 'linear-gradient(90deg, #6b2d1a, #9e4e2f, #5a2010)',
}

const epoxyColorValues: Record<string, string> = {
  'Blue River': '#1d8bd1',
  'Teal River': '#0f766e',
  'Black Smoke': '#111827',
  'Amber': '#d97706',
  'Deep Red': '#7f1d1d',
  'Emerald': '#064e3b',
  'Clear / No Color': 'transparent',
}

interface FormState {
  name: string
  email: string
  phone: string
  itemType: ItemType
  wood: string
  finish: string
  epoxyColor: string
  epoxyLocation: EpoxyLocation
  size: string
  timeline: string
  customText: string
  details: string
}

// AI Pricing logic — frontend estimation algorithm
function calculatePrice(form: FormState): { estimate: number; breakdown: { label: string; amount: number }[] } {
  const breakdown: { label: string; amount: number }[] = []

  // Base prices by item type
  const basePrices: Record<ItemType, number> = {
    'Dining Table': 1800,
    'Coffee Table': 650,
    'End Table': 325,
    'Cutting Board Coated': 75,
    'Sign': 125,
    'Art / Wall Piece': 200,
  }
  const base = basePrices[form.itemType] || 500
  breakdown.push({ label: `Base (${form.itemType})`, amount: base })

  // Wood premium
  const woodPremiums: Record<string, number> = {
    Walnut: 200, Cherry: 150, Oak: 100, Cedar: 50, Maple: 80, Pine: 0,
  }
  const woodExtra = woodPremiums[form.wood] || 0
  if (woodExtra > 0) breakdown.push({ label: `${form.wood} wood premium`, amount: woodExtra })

  // Epoxy location pricing
  const epoxyPrices: Record<EpoxyLocation, number> = {
    'No Epoxy': 0,
    'River (Center Fill)': 350,
    'Edge Pour': 200,
    'Full Coat': 450,
    'Inlay Channels': 275,
    'Knot / Void Fill': 100,
  }
  const epoxyExtra = epoxyPrices[form.epoxyLocation] || 0
  if (epoxyExtra > 0) breakdown.push({ label: `Epoxy: ${form.epoxyLocation}`, amount: epoxyExtra })

  // Finish premium
  const finishPrices: Record<string, number> = {
    'Natural Oil': 0,
    'High Gloss Epoxy': 150,
    'Outdoor Spar Urethane': 75,
    'Matte Poly': 50,
  }
  const finishExtra = finishPrices[form.finish] || 0
  if (finishExtra > 0) breakdown.push({ label: `${form.finish} finish`, amount: finishExtra })

  // Size factor (parse width if given)
  if (form.size) {
    const match = form.size.match(/(\d+)/)
    if (match) {
      const dim = parseInt(match[1], 10)
      if (dim > 60) {
        const sizeExtra = Math.round((dim - 60) * 8)
        breakdown.push({ label: `Oversized (${dim}"+)`, amount: sizeExtra })
      }
    }
  }

  // Rush fee
  if (form.timeline === 'Rush needed') {
    const rush = Math.round(base * 0.25)
    breakdown.push({ label: 'Rush fee (25%)', amount: rush })
  }

  // Custom text / burn work
  if (form.customText.trim()) {
    const textExtra = 50 + Math.min(form.customText.length, 30) * 2
    breakdown.push({ label: 'Custom text burn', amount: textExtra })
  }

  const estimate = breakdown.reduce((sum, b) => sum + b.amount, 0)
  return { estimate, breakdown }
}

// Shape configs for the dynamic preview
function getItemShape(itemType: ItemType): { borderRadius: string; aspectRatio: string; maxWidth: string } {
  switch (itemType) {
    case 'Dining Table':
      return { borderRadius: '43% 57% 50% 50% / 12% 16% 84% 88%', aspectRatio: '16/7', maxWidth: '100%' }
    case 'Coffee Table':
      return { borderRadius: '45% 55% 48% 52% / 15% 20% 80% 85%', aspectRatio: '3/2', maxWidth: '90%' }
    case 'End Table':
      return { borderRadius: '50%', aspectRatio: '1/1', maxWidth: '65%' }
    case 'Cutting Board Coated':
      return { borderRadius: '12px', aspectRatio: '3/4', maxWidth: '50%' }
    case 'Sign':
      return { borderRadius: '38% 62% 40% 60% / 18% 18% 82% 82%', aspectRatio: '5/2', maxWidth: '90%' }
    case 'Art / Wall Piece':
      return { borderRadius: '4px', aspectRatio: '4/5', maxWidth: '55%' }
    default:
      return { borderRadius: '20px', aspectRatio: '4/3', maxWidth: '80%' }
  }
}

export default function OrderForm() {
  const [submitted, setSubmitted] = useState(false)
  const [showPricing, setShowPricing] = useState(false)
  const [form, setForm] = useState<FormState>({
    name: '', email: '', phone: '',
    itemType: 'Dining Table',
    wood: 'Walnut', finish: 'Natural Oil',
    epoxyColor: 'Blue River',
    epoxyLocation: 'River (Center Fill)',
    size: '', timeline: 'No rush',
    customText: '',
    details: '',
  })

  const handleChange = (field: keyof FormState, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  const pricing = useMemo(() => calculatePrice(form), [form])
  const shape = useMemo(() => getItemShape(form.itemType), [form.itemType])
  const woodBg = woodGradients[form.wood] || woodGradients.Walnut
  const epoxyVal = epoxyColorValues[form.epoxyColor] || 'transparent'
  const hasEpoxy = form.epoxyLocation !== 'No Epoxy' && epoxyVal !== 'transparent'

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const body = encodeURIComponent(
      `NEW CUSTOM ORDER REQUEST - Burnt Designs\n\n` +
      `Name: ${form.name}\n` +
      `Email: ${form.email}\n` +
      `Phone: ${form.phone}\n\n` +
      `Item Type: ${form.itemType}\n` +
      `Wood: ${form.wood}\n` +
      `Finish: ${form.finish}\n` +
      `Epoxy Color: ${form.epoxyColor}\n` +
      `Epoxy Location: ${form.epoxyLocation}\n` +
      `Size: ${form.size || 'Not specified'}\n` +
      `Timeline: ${form.timeline}\n` +
      `Custom Text: ${form.customText || 'None'}\n\n` +
      `AI Estimated Price: $${pricing.estimate.toLocaleString()}+\n` +
      `Breakdown:\n${pricing.breakdown.map(b => `  - ${b.label}: $${b.amount}`).join('\n')}\n\n` +
      `Custom Details:\n${form.details}\n\n` +
      `--- Sent from burntdesigns.com ---`
    )
    window.location.href = `mailto:operations@burntdesigns.com?subject=Custom Order from ${form.name} - ${form.itemType}&body=${body}`
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 5000)
  }

  const handleCheckoutOnSquare = () => {
    window.open(`${SQUARE_STORE}/custom-order`, '_blank')
  }

  // Render epoxy visual based on location
  const renderEpoxyOverlay = () => {
    if (!hasEpoxy) return null
    const baseStyle = { position: 'absolute' as const, zIndex: 1, pointerEvents: 'none' as const }

    switch (form.epoxyLocation) {
      case 'River (Center Fill)':
        return (
          <div style={{
            ...baseStyle,
            top: 0, bottom: 0, left: '42%', right: '42%',
            background: `linear-gradient(180deg, rgba(255,255,255,0.6), ${epoxyVal}, rgba(4,36,61,0.7))`,
            transform: 'skewX(-8deg)',
            filter: `drop-shadow(0 0 14px ${epoxyVal}80)`,
            opacity: 0.85,
          }} />
        )
      case 'Edge Pour':
        return (
          <>
            <div style={{
              ...baseStyle,
              top: 0, bottom: 0, left: 0, width: '12%',
              background: `linear-gradient(90deg, ${epoxyVal}, transparent)`,
              opacity: 0.7,
            }} />
            <div style={{
              ...baseStyle,
              top: 0, bottom: 0, right: 0, width: '12%',
              background: `linear-gradient(-90deg, ${epoxyVal}, transparent)`,
              opacity: 0.7,
            }} />
          </>
        )
      case 'Full Coat':
        return (
          <div style={{
            ...baseStyle,
            inset: 0,
            background: epoxyVal,
            opacity: 0.35,
            borderRadius: 'inherit',
          }} />
        )
      case 'Inlay Channels':
        return (
          <>
            {[25, 50, 75].map(pos => (
              <div key={pos} style={{
                ...baseStyle,
                top: 0, bottom: 0, left: `${pos - 1}%`, width: '2%',
                background: epoxyVal,
                opacity: 0.65,
                transform: `skewX(${pos === 50 ? 0 : pos < 50 ? -4 : 4}deg)`,
              }} />
            ))}
          </>
        )
      case 'Knot / Void Fill':
        return (
          <>
            {[
              { top: '20%', left: '30%', w: 28, h: 24 },
              { top: '55%', left: '65%', w: 20, h: 20 },
              { top: '70%', left: '25%', w: 16, h: 14 },
            ].map((spot, i) => (
              <div key={i} style={{
                ...baseStyle,
                top: spot.top, left: spot.left,
                width: spot.w, height: spot.h,
                background: epoxyVal,
                borderRadius: '50%',
                opacity: 0.75,
                filter: `drop-shadow(0 0 6px ${epoxyVal}80)`,
              }} />
            ))}
          </>
        )
      default:
        return null
    }
  }

  return (
    <section id="order" className="max-w-[1200px] mx-auto px-5 lg:px-8 py-20">
      <div className="mb-10">
        <p className="eyebrow mb-3">Custom order builder</p>
        <h2>Design your piece. See it come to life.</h2>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_400px] gap-8">
        {/* Left: Form + Preview */}
        <div className="space-y-6">
          {/* Dynamic Visual Preview */}
          <div className="glass-panel p-6">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles size={16} style={{ color: '#f0b35b' }} />
              <h3 className="font-inter font-black text-base" style={{ color: '#1e1309', margin: 0 }}>Live Preview</h3>
            </div>
            <div className="flex items-center justify-center" style={{ minHeight: 280, background: 'rgba(30,19,9,0.04)', borderRadius: 20, padding: 24 }}>
              <div
                className="preview-canvas"
                style={{
                  width: '100%',
                  maxWidth: shape.maxWidth,
                  aspectRatio: shape.aspectRatio,
                  borderRadius: shape.borderRadius,
                  background: woodBg,
                  boxShadow: 'inset 0 0 0 999px rgba(255,255,255,0.03), 0 16px 50px rgba(31,18,8,0.3)',
                  display: 'grid',
                  placeItems: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.5s ease',
                }}
              >
                {renderEpoxyOverlay()}
                {form.customText && (
                  <div style={{
                    fontFamily: "'Rye', serif",
                    fontSize: 'clamp(0.9rem, 3vw, 2rem)',
                    color: 'rgba(24,10,4,0.8)',
                    textAlign: 'center',
                    padding: '12px 20px',
                    textShadow: '0 1px 0 rgba(255,216,150,0.3)',
                    zIndex: 3,
                    position: 'relative',
                    lineHeight: 1.2,
                    wordBreak: 'break-word',
                  }}>
                    {form.customText}
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3 mt-3">
              <span className="text-[11px] font-bold px-3 py-1 rounded-full" style={{ background: 'rgba(240,179,91,0.12)', color: '#5c3214' }}>{form.itemType}</span>
              <span className="text-[11px] font-bold px-3 py-1 rounded-full" style={{ background: 'rgba(240,179,91,0.12)', color: '#5c3214' }}>{form.wood}</span>
              {hasEpoxy && (
                <span className="text-[11px] font-bold px-3 py-1 rounded-full flex items-center gap-1.5" style={{ background: 'rgba(240,179,91,0.12)', color: '#5c3214' }}>
                  <span style={{ width: 10, height: 10, borderRadius: '50%', background: epoxyVal, border: '1px solid rgba(0,0,0,0.1)', display: 'inline-block' }} />
                  {form.epoxyColor} — {form.epoxyLocation}
                </span>
              )}
              <span className="text-[11px] font-bold px-3 py-1 rounded-full" style={{ background: 'rgba(240,179,91,0.12)', color: '#5c3214' }}>{form.finish}</span>
            </div>
          </div>

          {/* Form Fields */}
          <form onSubmit={handleSubmit} className="glass-panel p-6 lg:p-8">
            <h3 className="font-inter font-black text-base mb-5" style={{ color: '#1e1309', margin: '0 0 20px' }}>Your Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-6">
              <div>
                <label className="form-label">Name *</label>
                <input required type="text" className="form-input" value={form.name} onChange={e => handleChange('name', e.target.value)} placeholder="Your name" />
              </div>
              <div>
                <label className="form-label">Email *</label>
                <input required type="email" className="form-input" value={form.email} onChange={e => handleChange('email', e.target.value)} placeholder="you@email.com" />
              </div>
              <div>
                <label className="form-label">Phone</label>
                <input type="tel" className="form-input" value={form.phone} onChange={e => handleChange('phone', e.target.value)} placeholder="(816) 680-2467" />
              </div>
            </div>

            <h3 className="font-inter font-black text-base mb-5" style={{ color: '#1e1309', margin: '0 0 20px' }}>Build Selections</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-6">
              <div>
                <label className="form-label">Item Type *</label>
                <select className="form-input" value={form.itemType} onChange={e => handleChange('itemType', e.target.value)}>
                  {itemTypes.map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="form-label">Wood Type</label>
                <select className="form-input" value={form.wood} onChange={e => handleChange('wood', e.target.value)}>
                  {woodTypes.map(w => <option key={w}>{w}</option>)}
                </select>
              </div>
              <div>
                <label className="form-label">Finish</label>
                <select className="form-input" value={form.finish} onChange={e => handleChange('finish', e.target.value)}>
                  {finishes.map(f => <option key={f}>{f}</option>)}
                </select>
              </div>
              <div>
                <label className="form-label">Epoxy Location</label>
                <select className="form-input" value={form.epoxyLocation} onChange={e => handleChange('epoxyLocation', e.target.value)}>
                  {epoxyLocations.map(l => <option key={l}>{l}</option>)}
                </select>
              </div>
              <div>
                <label className="form-label">Epoxy Color</label>
                <select
                  className="form-input"
                  value={form.epoxyColor}
                  onChange={e => handleChange('epoxyColor', e.target.value)}
                  disabled={form.epoxyLocation === 'No Epoxy'}
                  style={{ opacity: form.epoxyLocation === 'No Epoxy' ? 0.5 : 1 }}
                >
                  {epoxyColors.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="form-label">Size (approx.)</label>
                <input type="text" className="form-input" value={form.size} onChange={e => handleChange('size', e.target.value)} placeholder={'e.g. 48" x 30"'} />
              </div>
              <div>
                <label className="form-label">Timeline</label>
                <select className="form-input" value={form.timeline} onChange={e => handleChange('timeline', e.target.value)}>
                  {timelines.map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="form-label">Custom Text / Burn Design</label>
                <input type="text" className="form-input" value={form.customText} onChange={e => handleChange('customText', e.target.value)} placeholder="Text to burn onto the piece (name, phrase, etc.)" maxLength={50} />
              </div>
            </div>

            <div className="mb-6">
              <label className="form-label">Additional Details</label>
              <textarea rows={4} className="form-input resize-none"
                value={form.details}
                onChange={e => handleChange('details', e.target.value)}
                placeholder="Additional details: photo ideas, special requests, dimensions, table legs, sign post, budget range..." />
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <button type="submit" className="btn-primary">
                <Send size={16} /> Submit Custom Order
              </button>
              <button type="button" onClick={handleCheckoutOnSquare} className="btn-ghost">
                <ExternalLink size={16} /> Checkout on Square
              </button>
            </div>

            {submitted && (
              <div className="mt-4 p-4 rounded-2xl font-bold text-sm" style={{ background: 'rgba(6,78,59,0.1)', color: '#064e3b' }}>
                Your email client should open. Send the email to complete your order request!
              </div>
            )}
          </form>
        </div>

        {/* Right Sidebar: AI Pricing + Contact */}
        <div className="space-y-4">
          {/* AI Pricing Card */}
          <div className="glass-panel p-6 overflow-hidden" style={{ border: '2px solid rgba(240,179,91,0.3)' }}>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #f0b35b, #d97706)' }}>
                <Sparkles size={16} style={{ color: '#1e1309' }} />
              </div>
              <div>
                <h3 className="font-inter font-black text-base" style={{ color: '#1e1309', margin: 0 }}>AI Price Estimate</h3>
                <p className="text-[11px] font-medium" style={{ color: '#7b6752' }}>Dynamic pricing based on selections</p>
              </div>
            </div>

            <div className="text-center py-4 mb-4 rounded-2xl" style={{ background: 'linear-gradient(135deg, rgba(30,19,9,0.04), rgba(240,179,91,0.08))' }}>
              <p className="font-inter font-black text-3xl" style={{ color: '#1e1309' }}>
                ${pricing.estimate.toLocaleString()}
                <span className="text-base font-bold" style={{ color: '#7b6752' }}>+</span>
              </p>
              <p className="text-xs font-medium mt-1" style={{ color: '#7b6752' }}>Estimated starting price</p>
            </div>

            <button
              onClick={() => setShowPricing(!showPricing)}
              className="w-full flex items-center justify-center gap-2 text-xs font-bold py-2 rounded-xl transition-colors"
              style={{ color: '#5c3214', background: 'rgba(240,179,91,0.1)' }}
            >
              <DollarSign size={12} /> {showPricing ? 'Hide' : 'View'} Breakdown
            </button>

            {showPricing && (
              <div className="mt-3 space-y-2">
                {pricing.breakdown.map((item, i) => (
                  <div key={i} className="flex items-center justify-between text-sm">
                    <span className="font-medium" style={{ color: '#7b6752' }}>{item.label}</span>
                    <span className="font-bold" style={{ color: '#1e1309' }}>${item.amount}</span>
                  </div>
                ))}
                <div className="pt-2 mt-2 flex items-center justify-between text-sm font-black" style={{ borderTop: '1px solid rgba(58,31,13,0.12)', color: '#1e1309' }}>
                  <span>Estimated Total</span>
                  <span>${pricing.estimate.toLocaleString()}+</span>
                </div>
              </div>
            )}

            <div className="mt-4">
              <a
                href={`${SQUARE_STORE}/custom-order`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full text-center"
                style={{ display: 'flex' }}
              >
                <ExternalLink size={14} /> Proceed to Checkout
              </a>
            </div>

            <p className="text-[10px] mt-3 text-center font-medium" style={{ color: '#7b6752' }}>
              * Final pricing confirmed after consultation. Estimate may vary based on complexity.
            </p>
          </div>

          {/* How It Works */}
          <div className="glass-panel p-6">
            <h3 className="font-inter font-black text-base mb-4" style={{ color: '#1e1309', margin: '0 0 16px' }}>How It Works</h3>
            <ol className="space-y-3 text-sm" style={{ color: '#7b6752' }}>
              <li className="flex gap-3"><span className="font-black" style={{ color: '#f0b35b' }}>1.</span> Choose your item type and build options</li>
              <li className="flex gap-3"><span className="font-black" style={{ color: '#f0b35b' }}>2.</span> Preview your piece with live visuals</li>
              <li className="flex gap-3"><span className="font-black" style={{ color: '#f0b35b' }}>3.</span> Review AI price estimate</li>
              <li className="flex gap-3"><span className="font-black" style={{ color: '#f0b35b' }}>4.</span> Submit or checkout on Square store</li>
              <li className="flex gap-3"><span className="font-black" style={{ color: '#f0b35b' }}>5.</span> We finalize details and begin your build!</li>
            </ol>
          </div>

          {/* Contact Card */}
          <div className="glass-panel p-6">
            <h3 className="font-inter font-black text-base mb-4" style={{ color: '#1e1309', margin: '0 0 16px' }}>Contact Us</h3>
            <div className="space-y-4">
              <a href="tel:8166802467" className="flex items-center gap-3 text-sm font-medium transition-colors hover:text-[#8b4c1c]" style={{ color: '#7b6752' }}>
                <Phone size={16} style={{ color: '#f0b35b' }} /> (816) 680-2467
              </a>
              <a href="mailto:operations@burntdesigns.com" className="flex items-center gap-3 text-sm font-medium transition-colors hover:text-[#8b4c1c]" style={{ color: '#7b6752' }}>
                <Mail size={16} style={{ color: '#f0b35b' }} /> operations@burntdesigns.com
              </a>
              <div className="flex items-start gap-3 text-sm font-medium" style={{ color: '#7b6752' }}>
                <MapPin size={16} className="mt-0.5 flex-shrink-0" style={{ color: '#f0b35b' }} />
                <span>32801 East 307th<br />Garden City, MO</span>
              </div>
              <div className="flex items-center gap-3 text-sm font-medium" style={{ color: '#7b6752' }}>
                <Clock size={16} style={{ color: '#f0b35b' }} /> Mon-Sat: 8am - 6pm
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
