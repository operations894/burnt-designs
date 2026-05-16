import { useState, useEffect, useCallback } from 'react'
import { ShoppingCart, Menu, X, ChevronDown } from 'lucide-react'

const SQUARE_STORE = 'https://shop.burnt-designs.com'

interface NavChild {
  label: string
  href?: string
  children?: NavChild[]
}

interface NavItem {
  label: string
  id?: string
  href?: string
  children?: NavChild[]
}

const navLinks: NavItem[] = [
  {
    label: 'Shop',
    children: [
      {
        label: 'Natural Edge',
        children: [
          { label: 'Dining Tables', href: `${SQUARE_STORE}/category/natural-edge-dining` },
          { label: 'Coffee Tables', href: `${SQUARE_STORE}/category/natural-edge-coffee` },
          { label: 'End Tables', href: `${SQUARE_STORE}/category/natural-edge-end` },
        ],
      },
      {
        label: 'Modern Edge',
        children: [
          { label: 'Dining Tables', href: `${SQUARE_STORE}/category/modern-edge-dining` },
          { label: 'Coffee Tables', href: `${SQUARE_STORE}/category/modern-edge-coffee` },
          { label: 'End Tables', href: `${SQUARE_STORE}/category/modern-edge-end` },
        ],
      },
      {
        label: 'Decorative Edge',
        children: [
          { label: 'Dining Tables', href: `${SQUARE_STORE}/category/decorative-edge-dining` },
          { label: 'Coffee Tables', href: `${SQUARE_STORE}/category/decorative-edge-coffee` },
          { label: 'End Tables', href: `${SQUARE_STORE}/category/decorative-edge-end` },
        ],
      },
      {
        label: 'Epoxy',
        href: `${SQUARE_STORE}/category/epoxy`,
      },
      {
        label: 'Misc',
        children: [
          { label: 'Wall Art', href: `${SQUARE_STORE}/category/wall-art` },
          { label: 'Coasters', href: `${SQUARE_STORE}/category/coasters` },
          { label: 'Cutting Boards', href: `${SQUARE_STORE}/category/cutting-boards` },
          { label: 'Welcome & Entry Signs', href: `${SQUARE_STORE}/category/signs` },
        ],
      },
    ],
  },
  { label: 'Gallery', id: 'tables' },
  { label: 'Previewer', id: 'previewer' },
  { label: 'Custom Order', id: 'order' },
  { label: 'Contact', id: 'footer' },
]

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [shopOpen, setShopOpen] = useState(false)
  const [mobileShopOpen, setMobileShopOpen] = useState(false)
  const [mobileSubOpen, setMobileSubOpen] = useState<string | null>(null)

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
          backdropFilter: 'blur(18px)',
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
            {navLinks.map((link) => {
              if (link.children) {
                return (
                  <div
                    key={link.label}
                    className="relative"
                    onMouseEnter={() => setShopOpen(true)}
                    onMouseLeave={() => setShopOpen(false)}
                  >
                    <button
                      className="font-inter font-bold text-[13px] tracking-[0.02em] transition-colors duration-300 hover:text-[#f0b35b] flex items-center gap-1"
                      style={{ color: '#fff0d4' }}
                    >
                      {link.label} <ChevronDown size={12} />
                    </button>

                    {shopOpen && (
                      <div
                        className="absolute top-full left-0 mt-2 rounded-2xl overflow-hidden"
                        style={{
                          background: 'rgba(39,23,10,0.96)',
                          backdropFilter: 'blur(20px)',
                          border: '1px solid rgba(240,179,91,0.2)',
                          boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
                          minWidth: 520,
                          padding: '20px',
                        }}
                      >
                        <div className="grid grid-cols-3 gap-4">
                          {link.children.map((cat: NavChild) => (
                            <div key={cat.label}>
                              {cat.href ? (
                                <a
                                  href={cat.href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="font-inter font-black text-xs tracking-wider uppercase mb-2 block transition-colors hover:text-[#f0b35b]"
                                  style={{ color: '#f0b35b' }}
                                >
                                  {cat.label}
                                </a>
                              ) : (
                                <p className="font-inter font-black text-xs tracking-wider uppercase mb-2" style={{ color: '#f0b35b' }}>
                                  {cat.label}
                                </p>
                              )}
                              {cat.children && (
                                <ul className="space-y-1.5">
                                  {cat.children.map((sub: NavChild) => (
                                    <li key={sub.label}>
                                      <a
                                        href={sub.href || '#'}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[13px] font-medium transition-colors hover:text-[#f0b35b] block py-0.5"
                                        style={{ color: 'rgba(255,240,212,0.7)' }}
                                      >
                                        {sub.label}
                                      </a>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </div>
                          ))}
                        </div>
                        <div className="mt-4 pt-3" style={{ borderTop: '1px solid rgba(240,179,91,0.15)' }}>
                          <a
                            href={SQUARE_STORE}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-inter font-bold text-xs tracking-wide transition-colors hover:text-white flex items-center gap-2"
                            style={{ color: 'rgba(255,240,212,0.5)' }}
                          >
                            View All Products on Square Store →
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                )
              }

              return (
                <button
                  key={link.id}
                  onClick={() => link.id && scrollTo(link.id)}
                  className="font-inter font-bold text-[13px] tracking-[0.02em] transition-colors duration-300 hover:text-[#f0b35b]"
                  style={{ color: '#fff0d4', textDecoration: 'none' }}
                >
                  {link.label}
                </button>
              )
            })}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={SQUARE_STORE}
              target="_blank"
              rel="noopener noreferrer"
              className="relative p-2"
              aria-label="Cart"
            >
              <ShoppingCart size={18} style={{ color: '#fff0d4' }} />
            </a>
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

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-[99] flex flex-col items-center pt-24 pb-8 overflow-y-auto"
          style={{ background: 'rgba(47,28,13,0.97)', backdropFilter: 'blur(20px)' }}
        >
          {navLinks.map((link) => {
            if (link.children) {
              return (
                <div key={link.label} className="w-full max-w-sm px-6 mb-4">
                  <button
                    onClick={() => setMobileShopOpen(!mobileShopOpen)}
                    className="font-inter font-bold text-xl flex items-center gap-2 justify-center w-full py-2"
                    style={{ color: '#fff0d4' }}
                  >
                    {link.label} <ChevronDown size={16} className={`transition-transform ${mobileShopOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {mobileShopOpen && (
                    <div className="mt-2 space-y-3">
                      {link.children.map((cat: NavChild) => (
                        <div key={cat.label}>
                          {cat.href ? (
                            <a
                              href={cat.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-inter font-bold text-xs tracking-wider uppercase block text-center py-1"
                              style={{ color: '#f0b35b' }}
                              onClick={() => setMobileOpen(false)}
                            >
                              {cat.label}
                            </a>
                          ) : (
                            <button
                              onClick={() => setMobileSubOpen(mobileSubOpen === cat.label ? null : cat.label)}
                              className="font-inter font-bold text-xs tracking-wider uppercase w-full text-center py-1 flex items-center justify-center gap-1"
                              style={{ color: '#f0b35b' }}
                            >
                              {cat.label} {cat.children && <ChevronDown size={10} className={`transition-transform ${mobileSubOpen === cat.label ? 'rotate-180' : ''}`} />}
                            </button>
                          )}
                          {cat.children && mobileSubOpen === cat.label && (
                            <ul className="space-y-1 mt-1">
                              {cat.children.map((sub: NavChild) => (
                                <li key={sub.label} className="text-center">
                                  <a
                                    href={sub.href || '#'}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm font-medium py-1 block"
                                    style={{ color: 'rgba(255,240,212,0.7)' }}
                                    onClick={() => setMobileOpen(false)}
                                  >
                                    {sub.label}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )
            }

            return (
              <button
                key={link.id}
                onClick={() => { if (link.id) scrollTo(link.id); setMobileOpen(false) }}
                className="font-inter font-bold text-xl py-2"
                style={{ color: '#fff0d4' }}
              >
                {link.label}
              </button>
            )
          })}
        </div>
      )}
    </>
  )
}
