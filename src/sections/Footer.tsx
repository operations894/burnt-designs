import { Instagram, Phone, Mail, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer id="footer" style={{ background: '#1a0f06', color: '#fff6e8' }}>
      <div className="max-w-[1200px] mx-auto px-5 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="brand-mark">GW</div>
              <span className="font-inter font-black text-sm tracking-wide">Burnt Designs</span>
            </div>
            <p className="text-sm leading-relaxed mb-6" style={{ color: 'rgba(255,246,232,0.5)' }}>
              Custom natural edge slabs, epoxy rivers, and hand-burned wood art from Garden City, Missouri.
            </p>
            <div className="space-y-3">
              <a href="tel:8166802467" className="flex items-center gap-2.5 text-sm transition-colors hover:text-[#f0b35b]" style={{ color: 'rgba(255,246,232,0.6)' }}>
                <Phone size={14} /> (816) 680-2467
              </a>
              <a href="mailto:operations@burntdesigns.com" className="flex items-center gap-2.5 text-sm transition-colors hover:text-[#f0b35b]" style={{ color: 'rgba(255,246,232,0.6)' }}>
                <Mail size={14} /> operations@burntdesigns.com
              </a>
              <div className="flex items-start gap-2.5 text-sm" style={{ color: 'rgba(255,246,232,0.6)' }}>
                <MapPin size={14} className="mt-0.5 flex-shrink-0" />
                <span>32801 East 307th<br />Garden City, MO</span>
              </div>
            </div>
          </div>

          {/* Shop */}
          <div>
            <p className="font-inter font-bold text-xs tracking-wider uppercase mb-5" style={{ color: 'rgba(255,246,232,0.35)' }}>Shop</p>
            <ul className="space-y-3">
              {['Dining Tables', 'Coffee Tables', 'End Tables', 'Driveway Signs', 'Wall Art'].map(l => (
                <li key={l}>
                  <button onClick={() => document.getElementById('tables')?.scrollIntoView({ behavior: 'smooth' })}
                    className="text-sm transition-colors hover:text-[#f0b35b]" style={{ color: 'rgba(255,246,232,0.55)' }}>{l}</button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <p className="font-inter font-bold text-xs tracking-wider uppercase mb-5" style={{ color: 'rgba(255,246,232,0.35)' }}>Services</p>
            <ul className="space-y-3">
              {['Custom Design', 'Photo Transfers', 'Epoxy Rivers', 'Font Preview', 'Build a Preview'].map(l => (
                <li key={l}>
                  <button onClick={() => document.getElementById('previewer')?.scrollIntoView({ behavior: 'smooth' })}
                    className="text-sm transition-colors hover:text-[#f0b35b]" style={{ color: 'rgba(255,246,232,0.55)' }}>{l}</button>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <p className="font-inter font-bold text-xs tracking-wider uppercase mb-5" style={{ color: 'rgba(255,246,232,0.35)' }}>Connect</p>
            <p className="text-sm mb-4" style={{ color: 'rgba(255,246,232,0.55)' }}>Follow the smoke</p>
            <div className="flex items-center gap-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                className="w-10 h-10 rounded-full flex items-center justify-center transition-colors hover:bg-white/10"
                style={{ background: 'rgba(255,255,255,0.05)' }}>
                <Instagram size={18} />
              </a>
              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer"
                className="text-sm font-bold transition-colors hover:text-[#f0b35b]" style={{ color: 'rgba(255,246,232,0.6)' }}>
                TikTok
              </a>
              <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer"
                className="text-sm font-bold transition-colors hover:text-[#f0b35b]" style={{ color: 'rgba(255,246,232,0.6)' }}>
                Pinterest
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4" style={{ borderTop: '1px solid rgba(255,246,232,0.08)' }}>
          <p className="text-xs" style={{ color: 'rgba(255,246,232,0.35)' }}>
            &copy; {new Date().getFullYear()} GW Burnt Designs. Custom slabs, signs, smoke, and shine.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xs cursor-pointer hover:opacity-70 transition-opacity" style={{ color: 'rgba(255,246,232,0.3)' }}>Privacy</span>
            <span className="text-xs cursor-pointer hover:opacity-70 transition-opacity" style={{ color: 'rgba(255,246,232,0.3)' }}>Terms</span>
          </div>
        </div>
      </div>
    </footer>
  )
}