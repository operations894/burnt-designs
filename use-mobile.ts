import { useState } from 'react'

const fonts = [
  { name: 'Western', family: "'Rye', serif" },
  { name: 'Classic', family: "'Cinzel', serif" },
  { name: 'Stencil', family: "'Stardos Stencil', cursive" },
  { name: 'Modern', family: "'Inter', sans-serif" },
]

const features = [
  'Custom font generator',
  'Burned lettering preview',
  'Live edge slab options',
  'Outdoor finish selection',
]

export default function Signs() {
  const [signText, setSignText] = useState('GRAHAM RANCH')
  const [signFont, setSignFont] = useState(fonts[0])

  return (
    <section id="signs" className="py-20">
      <div className="max-w-[1140px] mx-auto px-5 lg:px-8">
        <div className="dark-panel rounded-[30px] p-8 lg:p-12">
          <div className="mb-8">
            <p className="eyebrow mb-3">Driveway entry signs</p>
            <h2 style={{ color: '#fff6e8' }}>Custom signs with instant font preview.</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left: Info */}
            <div>
              <p className="text-base mb-6" style={{ color: 'rgba(255,246,232,0.85)', lineHeight: 1.7 }}>
                Choose a sign phrase, font style, wood type, and finish. Great for ranch entrances,
                family names, farm lanes, cabins, and shop signs.
              </p>
              <ul className="space-y-3 mb-8">
                {features.map(f => (
                  <li key={f} className="flex items-center gap-3 text-sm font-medium" style={{ color: 'rgba(255,246,232,0.8)' }}>
                    <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-black" style={{ background: '#f0b35b', color: '#1e1309' }}>✓</span>
                    {f}
                  </li>
                ))}
              </ul>

              {/* Font selector */}
              <label className="form-label" style={{ color: '#f0b35b' }}>Preview Font</label>
              <div className="grid grid-cols-2 gap-2">
                {fonts.map(f => (
                  <button key={f.name} onClick={() => setSignFont(f)}
                    className="py-3 px-3 rounded-xl text-center transition-all border-2 font-bold text-sm"
                    style={{
                      fontFamily: f.family,
                      borderColor: signFont.name === f.name ? '#f0b35b' : 'rgba(255,246,232,0.15)',
                      background: signFont.name === f.name ? 'rgba(240,179,91,0.15)' : 'rgba(255,255,255,0.05)',
                      color: '#fff6e8',
                    }}>
                    {f.name}
                  </button>
                ))}
              </div>

              {/* Text input */}
              <div className="mt-4">
                <input type="text" value={signText} onChange={e => setSignText(e.target.value)}
                  className="w-full rounded-2xl px-4 py-3 text-sm font-bold transition-all outline-none"
                  style={{
                    background: 'rgba(255,255,255,0.1)',
                    border: '1px solid rgba(255,246,232,0.2)',
                    color: '#fff6e8',
                  }}
                  maxLength={30}
                  placeholder="Enter sign text..."
                />
              </div>
            </div>

            {/* Right: Sign Preview */}
            <div className="flex items-center justify-center">
              <div style={{
                minHeight: 260,
                width: '100%',
                maxWidth: 480,
                display: 'grid',
                placeItems: 'center',
                textAlign: 'center',
                fontFamily: signFont.family,
                fontSize: 'clamp(1.8rem, 5vw, 3.2rem)',
                color: 'rgba(22,11,5,0.85)',
                background: 'linear-gradient(90deg, #825020, #d89a4d, #7c461b)',
                borderRadius: '38% 62% 42% 58% / 18% 22% 78% 82%',
                padding: '40px 50px',
                textShadow: '0 1px 0 rgba(255,221,160,0.38)',
                boxShadow: '0 24px 80px rgba(0,0,0,0.3)',
                lineHeight: 1.15,
                wordBreak: 'break-word',
              }}>
                {signText || 'YOUR SIGN TEXT'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}