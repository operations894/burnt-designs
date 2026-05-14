import { useState, useRef, useCallback } from 'react'
import { Upload, X, RotateCcw } from 'lucide-react'

const woodTypes: Record<string, string> = {
  Walnut: 'linear-gradient(90deg,#5d3216,#a1622e 23%,#744018 45%,#c18446 66%,#633415)',
  Cedar: 'linear-gradient(90deg,#7f3f1d,#c77232,#633015)',
  Oak: 'linear-gradient(90deg,#835b2b,#d1a15f,#735020)',
  Maple: 'linear-gradient(90deg,#b98542,#f2c377,#9e6732)',
  Pine: 'linear-gradient(90deg,#a67232,#e1b55f,#8f5d24)',
  Cherry: 'linear-gradient(90deg,#6b2d1a,#9e4e2f,#5a2010)',
}

const epoxyColors = [
  { name: 'Blue River', value: '#1d8bd1' },
  { name: 'Teal River', value: '#0f766e' },
  { name: 'Black Smoke', value: '#111827' },
  { name: 'Amber', value: '#7c2d12' },
  { name: 'Deep Red', value: '#7f1d1d' },
  { name: 'Emerald', value: '#064e3b' },
  { name: 'Clear', value: 'transparent' },
]

const fontOptions = [
  { name: 'Western', family: "'Rye', serif" },
  { name: 'Classic', family: "'Cinzel', serif" },
  { name: 'Stencil', family: "'Stardos Stencil', cursive" },
  { name: 'Modern', family: "'Inter', sans-serif" },
]

export default function Configurator() {
  const [productType, setProductType] = useState('Coffee Table')
  const [wood, setWood] = useState('Walnut')
  const [epoxy, setEpoxy] = useState(epoxyColors[0])
  const [text, setText] = useState('BURNT DESIGNS')
  const [font, setFont] = useState(fontOptions[0])
  const [photo, setPhoto] = useState<string | null>(null)
  const [photoSize, setPhotoSize] = useState(48)
  const [showRiver, setShowRiver] = useState(true)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handlePhotoUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => setPhoto(ev.target?.result as string)
    reader.readAsDataURL(file)
  }, [])

  const clearPhoto = () => {
    setPhoto(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const isSign = productType.includes('Sign')
  const previewBg = woodTypes[wood] || woodTypes.Walnut

  return (
    <section id="previewer" className="max-w-[1200px] mx-auto px-5 lg:px-8 py-20">
      <div className="mb-10">
        <p className="eyebrow mb-3">Customer picture previewer</p>
        <h2>Design your piece before the first ember lands.</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-6">
        {/* Controls Panel */}
        <div className="glass-panel p-6 space-y-5">
          {/* Product Type */}
          <div>
            <label className="form-label">Product Type</label>
            <select className="form-input" value={productType} onChange={e => setProductType(e.target.value)}>
              <option>Dining Table</option>
              <option>Coffee Table</option>
              <option>End Table</option>
              <option>Driveway Entry Sign</option>
            </select>
          </div>

          {/* Wood Type */}
          <div>
            <label className="form-label">Wood Type</label>
            <div className="grid grid-cols-3 gap-2">
              {Object.keys(woodTypes).map(w => (
                <button key={w} onClick={() => setWood(w)}
                  className="relative h-12 rounded-xl overflow-hidden border-2 transition-all"
                  style={{
                    background: woodTypes[w],
                    borderColor: wood === w ? '#f0b35b' : 'transparent',
                    boxShadow: wood === w ? '0 0 0 2px #f0b35b' : 'none',
                  }}>
                  <span className="relative z-10 font-inter font-bold text-[10px] text-white drop-shadow-md">{w}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Epoxy Color */}
          <div>
            <label className="form-label">Epoxy / Accent Color</label>
            <div className="flex flex-wrap gap-2">
              {epoxyColors.map(c => (
                <button key={c.name} onClick={() => setEpoxy(c)} title={c.name}
                  className="w-10 h-10 rounded-full border-2 transition-all"
                  style={{
                    background: c.value === 'transparent' ? 'linear-gradient(45deg,#ddd,#fff)' : c.value,
                    borderColor: epoxy.name === c.name ? '#f0b35b' : 'rgba(58,31,13,0.2)',
                    boxShadow: epoxy.name === c.name ? '0 0 0 2px #f0b35b' : 'none',
                  }}>
                  {c.value === 'transparent' && <span className="text-[8px] font-bold" style={{ color: '#999' }}>CLR</span>}
                </button>
              ))}
            </div>
            <p className="text-xs mt-1 font-inter font-medium" style={{ color: '#7b6752' }}>{epoxy.name}</p>
          </div>

          {/* Custom Text */}
          <div>
            <label className="form-label">Custom Text</label>
            <input type="text" className="form-input" value={text} onChange={e => setText(e.target.value)} maxLength={40} placeholder="BURNT DESIGNS" />
          </div>

          {/* Font Style */}
          <div>
            <label className="form-label">Font Style</label>
            <div className="grid grid-cols-2 gap-2">
              {fontOptions.map(f => (
                <button key={f.name} onClick={() => setFont(f)}
                  className="py-3 px-3 rounded-xl text-center transition-all border-2"
                  style={{
                    fontFamily: f.family,
                    fontSize: f.name === 'Stencil' ? '13px' : '14px',
                    borderColor: font.name === f.name ? '#9a5b23' : 'rgba(58,31,13,0.12)',
                    background: font.name === f.name ? 'rgba(154,91,35,0.1)' : 'rgba(255,255,255,0.5)',
                    color: '#1e1309',
                  }}>
                  {f.name}
                </button>
              ))}
            </div>
          </div>

          {/* Photo Upload */}
          <div>
            <label className="form-label">Upload Customer Picture</label>
            <div className="relative">
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" id="photo-upload" />
              <label htmlFor="photo-upload" className="form-input flex items-center gap-2 cursor-pointer hover:bg-white/80">
                <Upload size={16} /> {photo ? 'Change Picture' : 'Choose File'}
              </label>
            </div>
            {photo && (
              <div className="flex items-center gap-2 mt-2">
                <button onClick={clearPhoto} className="flex items-center gap-1 text-xs font-bold" style={{ color: '#7b6752' }}>
                  <X size={12} /> Clear Picture
                </button>
              </div>
            )}
          </div>

          {/* Photo Size */}
          {photo && (
            <div>
              <label className="form-label">Picture Size: {photoSize}%</label>
              <input type="range" min={20} max={90} value={photoSize} onChange={e => setPhotoSize(Number(e.target.value))}
                className="w-full accent-amber-700" />
            </div>
          )}

          {/* Show River Toggle */}
          <div className="flex items-center gap-3">
            <input type="checkbox" id="show-river" checked={showRiver} onChange={e => setShowRiver(e.target.checked)}
              className="w-5 h-5 rounded accent-amber-700" />
            <label htmlFor="show-river" className="font-inter font-bold text-sm" style={{ color: '#1e1309' }}>Show Epoxy River</label>
          </div>

          {/* Reset */}
          <button onClick={() => { setWood('Walnut'); setEpoxy(epoxyColors[0]); setText('BURNT DESIGNS'); setFont(fontOptions[0]); setPhoto(null); setPhotoSize(48); setShowRiver(true) }}
            className="flex items-center gap-2 text-sm font-bold transition-colors hover:opacity-70" style={{ color: '#7b6752' }}>
            <RotateCcw size={14} /> Reset All
          </button>
        </div>

        {/* Live Preview */}
        <div className="glass-panel p-6">
          <div className="relative mx-auto" style={{
            minHeight: isSign ? 320 : 430,
            maxWidth: isSign ? 500 : '100%',
            borderRadius: isSign ? '38% 62% 40% 60% / 18% 18% 82% 82%' : '43% 57% 50% 50% / 16% 22% 78% 84%',
            background: previewBg,
            boxShadow: 'inset 0 0 0 999px rgba(255,255,255,0.03), 0 24px 80px rgba(31,18,8,0.22)',
            display: 'grid',
            placeItems: 'center',
            overflow: 'hidden',
          }}>
            {/* Epoxy River */}
            {showRiver && epoxy.value !== 'transparent' && (
              <div style={{
                position: 'absolute',
                top: 0, bottom: 0, left: '44%', right: '44%',
                background: `linear-gradient(180deg, rgba(255,255,255,0.72), ${epoxy.value}, rgba(4,36,61,0.85))`,
                transform: 'skewX(-10deg)',
                filter: 'drop-shadow(0 0 16px rgba(29,139,209,0.8))',
                opacity: 0.85,
                zIndex: 1,
              }} />
            )}

            {/* Uploaded Photo */}
            {photo && (
              <img src={photo} alt="Customer preview" style={{
                position: 'absolute',
                maxWidth: `${photoSize}%`,
                maxHeight: `${photoSize * 0.8}%`,
                objectFit: 'contain',
                opacity: 0.65,
                mixBlendMode: 'multiply',
                filter: 'sepia(0.8) contrast(1.08) saturate(0.6)',
                zIndex: 2,
                borderRadius: 8,
              }} />
            )}

            {/* Custom Text */}
            <div style={{
              fontFamily: font.family,
              fontSize: 'clamp(1.5rem, 5vw, 3.5rem)',
              color: 'rgba(24,10,4,0.84)',
              textAlign: 'center',
              padding: '20px 40px',
              textShadow: '0 1px 0 rgba(255,216,150,0.35)',
              zIndex: 3,
              position: 'relative',
              lineHeight: 1.15,
              wordBreak: 'break-word',
            }}>
              {text || 'BURNT DESIGNS'}
            </div>
          </div>

          <p className="text-center mt-5 text-sm" style={{ color: '#7b6752' }}>
            Preview is for layout only. Final design, burn depth, epoxy flow, and slab shape vary by wood.
          </p>

          {/* Wood swatch label */}
          <div className="flex items-center justify-center gap-3 mt-4">
            <span className="font-inter font-bold text-xs" style={{ color: '#7b6752' }}>
              {productType} &bull; {wood} &bull; {epoxy.name} &bull; {font.name}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}