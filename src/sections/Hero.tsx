import { useEffect, useRef } from 'react'

export default function Hero() {
  const rafRef = useRef<number>(0)
  const mouseRef = useRef({ x: -1000, y: -1000, sx: -1000, sy: -1000 })
  const timeRef = useRef(0)

  useEffect(() => {
    const svg = document.getElementById('hero-svg') as unknown as SVGSVGElement
    if (!svg) return
    const t1 = svg.querySelector('#turbulenceNoise') as SVGFETurbulenceElement
    const t2 = svg.querySelector('#turbulenceNoise2') as SVGFETurbulenceElement
    if (!t1 || !t2) return

    const cx = window.innerWidth / 2
    const cy = window.innerHeight / 2
    const maxD = 350

    const loop = () => {
      rafRef.current = requestAnimationFrame(loop)
      timeRef.current += 0.005
      const t = timeRef.current
      let bf1 = 0.003 + Math.sin(t) * 0.001
      const bf2 = 0.15 + Math.cos(t * 0.7) * 0.02

      const m = mouseRef.current
      m.sx += (m.x - m.sx) * 0.05
      m.sy += (m.y - m.sy) * 0.05
      const dx = m.sx - cx
      const dy = m.sy - cy
      const dist = Math.sqrt(dx * dx + dy * dy)
      const intensity = Math.max(0, 1 - dist / maxD)
      bf1 += intensity * 0.003

      t1.setAttribute('baseFrequency', `${bf1}`)
      t2.setAttribute('baseFrequency', `${bf2}`)
    }

    rafRef.current = requestAnimationFrame(loop)
    const onMove = (e: MouseEvent) => { mouseRef.current.x = e.clientX; mouseRef.current.y = e.clientY }
    window.addEventListener('mousemove', onMove)
    return () => { cancelAnimationFrame(rafRef.current); window.removeEventListener('mousemove', onMove) }
  }, [])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="hero" className="relative w-full overflow-hidden" style={{ minHeight: '100vh' }}>
      {/* SVG Turbulence Background */}
      <svg id="hero-svg" viewBox="0 0 1000 1000" width="100%" height="100%" preserveAspectRatio="none"
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}>
        <defs>
          <filter id="turb" x="0" y="0" width="100%" height="100%">
            <feTurbulence id="turbulenceNoise" type="fractalNoise" baseFrequency="0.003" numOctaves="1" seed="1" result="noise" />
            <feTurbulence id="turbulenceNoise2" type="fractalNoise" baseFrequency="0.15" numOctaves="2" seed="2" result="noise2" />
            <feFlood floodColor="#1a0a00" result="color" />
            <feComposite operator="in" in="color" in2="noise" result="composite" />
            <feComposite operator="in" in="composite" in2="SourceGraphic" result="composite2" />
            <feColorMatrix type="matrix" in="composite2" result="cm" values="0 0 0 0 0.95 0 0 0 0 0.90 0 0 0 0 0.88 0 0 0 1 0" />
            <feFlood floodColor="#FFFDF9" result="bg" />
            <feMerge><feMergeNode in="bg" /><feMergeNode in="cm" /></feMerge>
          </filter>
        </defs>
        <rect x="0" y="0" width="100%" height="100%" filter="url(#turb)" opacity="0.25" />
      </svg>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{ height: '50%', background: 'linear-gradient(to top, rgba(255,247,234,0.8) 0%, transparent 60%)', zIndex: 1 }} />

      {/* Content */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-5 lg:px-8 pt-32 pb-20" style={{ minHeight: '100vh' }}>
        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-12 items-center" style={{ minHeight: '75vh' }}>
          {/* Left: Copy */}
          <div>
            <p className="eyebrow mb-4">Custom natural edge slabs &bull; epoxy rivers &bull; wood-burned art</p>
            <h1 className="mb-6" style={{ lineHeight: 0.92 }}>
              Tables and signs with<br />a little smoke, shine,<br />and soul.
            </h1>
            <p className="text-xl max-w-[620px] mb-8" style={{ color: '#4b2e18', lineHeight: 1.6 }}>
              Upload your photo, choose your slab, preview your layout, and request a custom build from GW Burnt Designs.
            </p>
            <div className="flex flex-wrap gap-4">
              <button onClick={() => scrollTo('previewer')} className="btn-primary">Build a Preview</button>
              <button onClick={() => scrollTo('order')} className="btn-ghost">Start an Order</button>
            </div>
          </div>

          {/* Right: Slab Preview */}
          <div className="relative hidden lg:block">
            <div className="wood-slab-preview" style={{ height: 460, borderRadius: '42% 58% 48% 52% / 18% 22% 78% 82%', transform: 'rotate(-2deg)' }}>
              <div className="epoxy-river" />
              <div className="absolute inset-0 flex items-end justify-center pb-[15%] px-[12%]">
                <span className="burn-text text-center" style={{ fontSize: 'clamp(1.8rem, 4vw, 3.5rem)' }}>CUSTOM BURN</span>
              </div>
            </div>
            <div className="glass-panel absolute -right-2 bottom-6 max-w-[260px] p-5 font-extrabold text-sm" style={{ color: '#4b2e18' }}>
              Made for dining rooms, coffee tables, end tables, ranch gates, and bold front drives.
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}