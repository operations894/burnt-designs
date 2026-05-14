import { useState, useEffect, useCallback } from 'react'
import { ShoppingCart, Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'Tables', id: 'tables' },
  { label: 'Entry Signs', id: 'signs' },
  { label: 'Previewer', id: 'previewer' },
  { label: 'Order', id: 'order' },
  { label: 'Contact', id: 'footer' },
]

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id)
    if (el) { el.scrollIntoView({ behavior: 'smooth' }); setMobileOpen(false) }
  }, [])

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-[100] transition-all duration-500"
        style={{
          backdropFilter: scrolled ? 'blur(18px)' : 'blur(18px)',
          background: scrolled ? 'rgba(39,23,10,0.92)' : 'rgba(39,23,10,0.82)',
          borderBottom: '1px solid rgba(255,255,255,0.12)',
        }}
      >
        <div className="flex items-center justify-between h-[68px] px-5 lg:px-8 max-w-[1200px] mx-auto">
          <button onClick={() => scrollTo('hero')} className="flex items-center gap-2.5 no-underline">
            <div className="brand-mark">GW</div>
            <span className="font-inter font-black text-[15px] tracking-[0.04em]" style={{ color: '#fff6e8' }}>
              Burnt Designs
            </span>
          </button>

          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="font-inter font-bold text-[13px] tracking-[0.02em] transition-colors duration-300 hover:text-[#f0b35b]"
                style={{ color: '#fff0d4', textDecoration: 'none' }}
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button className="relative p-2" aria-label="Cart">
              <ShoppingCart size={18} style={{ color: '#fff0d4' }} />
            </button>
            <button
              className="lg:hidden p-2 rounded-xl transition-colors"
              style={{ background: 'rgba(255,255,255,0.08)' }}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
            >
              {mobileOpen ? <X size={20} style={{ color: '#fff0d4' }} /> : <Menu size={20} style={{ color: '#fff0d4' }} />}
            </button>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <div
          className="fixed inset-0 z-[99] flex flex-col items-center justify-center gap-8"
          style={{ background: 'rgba(47,28,13,0.97)', backdropFilter: 'blur(20px)' }}
        >
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className="font-inter font-bold text-2xl"
              style={{ color: '#fff0d4' }}
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </>
  )
}