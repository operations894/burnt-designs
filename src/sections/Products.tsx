import { useState } from 'react'
import { Eye } from 'lucide-react'

const categories = ['All', 'Tables', 'Entry Signs', 'Art Pieces']

const products = [
  {
    id: 1, name: 'Cattle Drive Dining Table', category: 'Tables',
    description: 'Massive live-edge dining table with hand-burned cattle drive scene and blue epoxy river. Seats 8-10.',
    price: '$2,800+', image: '/images/product-cattle-river-table.jpg', featured: true,
  },
  {
    id: 2, name: 'Cattle Drive Dining Table (Alternate)', category: 'Tables',
    description: 'Full cattle drive panorama burned into natural edge walnut with detailed cowboy silhouettes.',
    price: '$2,600+', image: '/images/product-cattle-drive-dining.jpg', featured: true,
  },
  {
    id: 3, name: 'Cattle Roundup Dining Table', category: 'Tables',
    description: 'Overhead view of hand-burned cattle roundup scene on natural edge slab.',
    price: '$2,400+', image: '/images/product-cattle-roundup-table.jpg', featured: false,
  },
  {
    id: 4, name: 'Cowboy Numbers Coffee Table', category: 'Tables',
    description: 'Live-edge coffee table with hand-burned cowboy silhouettes and custom rodeo numbers.',
    price: '$850+', image: '/images/product-cowboy-numbers-table.jpg', featured: true,
  },
  {
    id: 5, name: 'Bull Rider Coffee Table', category: 'Tables',
    description: 'PBR-inspired coffee table with hand-burned bull rider scene and sponsor logos.',
    price: '$950+', image: '/images/product-bull-rider-table.jpg', featured: true,
  },
  {
    id: 6, name: '"Dibs On The Cowboy" Table', category: 'Tables',
    description: 'Fun cowboy silhouette table with custom text overlay. Great conversation piece.',
    price: '$750+', image: '/images/product-cowboy-dibs-table.jpg', featured: false,
  },
  {
    id: 7, name: 'Eagle End Table', category: 'Tables',
    description: 'Round natural edge end table with detailed hand-burned eagle head portrait.',
    price: '$425+', image: '/images/product-eagle-table.jpg', featured: false,
  },
  {
    id: 8, name: 'Mushroom Scene End Table', category: 'Tables',
    description: 'Woodland end table with hand-burned mushroom forest and wildflower scene.',
    price: '$425+', image: '/images/product-mushroom-table.jpg', featured: false,
  },
  {
    id: 9, name: 'The JAKS Custom Sign', category: 'Entry Signs',
    description: 'Custom family name sign with ornate lettering, established date on live-edge cedar.',
    price: '$185+', image: '/images/product-jaks-sign.jpg', featured: true,
  },
  {
    id: 10, name: 'Sunflower Cutting Board', category: 'Art Pieces',
    description: 'Bamboo cutting board with hand-burned sunflower bouquet detail.',
    price: '$85', image: '/images/product-sunflower-board.jpg', featured: false,
  },
  {
    id: 11, name: 'Sunflower Keepsake Box', category: 'Art Pieces',
    description: 'Wooden keepsake box with hand-burned sunflower design and brass hardware.',
    price: '$125', image: '/images/product-sunflower-box.jpg', featured: false,
  },
  {
    id: 12, name: 'Burnt Designs Logo Burn', category: 'Art Pieces',
    description: 'Ornate filigree-style lettering burned into walnut with decorative scrollwork.',
    price: 'Custom', image: '/images/product-logo-burn.jpg', featured: false,
  },
]

export default function Products() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [lightbox, setLightbox] = useState<string | null>(null)

  const filtered = activeFilter === 'All' ? products : products.filter(p => p.category === activeFilter)

  return (
    <>
      <section id="tables" className="max-w-[1200px] mx-auto px-5 lg:px-8 py-20">
        <div className="mb-10">
          <p className="eyebrow mb-3">Shop custom tables</p>
          <h2>Natural edge pieces built around your story.</h2>
        </div>

        {/* Filters */}
        <div className="flex gap-3 mb-8 flex-wrap">
          {categories.map(f => (
            <button key={f} onClick={() => setActiveFilter(f)}
              className="font-inter font-bold text-xs tracking-wide px-5 py-2.5 rounded-full transition-all duration-300"
              style={{
                background: activeFilter === f ? 'linear-gradient(135deg,#3a1f0d,#8b4c1c)' : 'rgba(255,255,255,0.5)',
                color: activeFilter === f ? '#fff7ea' : '#1e1309',
                border: activeFilter === f ? 'none' : '1px solid rgba(58,31,13,0.15)',
              }}>
              {f}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(product => (
            <div key={product.id} className="glass-panel overflow-hidden group cursor-pointer transition-transform duration-300 hover:-translate-y-1">
              <div className="relative overflow-hidden" style={{ aspectRatio: '4/3' }}>
                <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: 'rgba(30,19,9,0.5)' }}>
                  <button onClick={() => setLightbox(product.image)} className="flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm" style={{ background: 'rgba(255,255,255,0.9)', color: '#1e1309' }}>
                    <Eye size={16} /> Quick View
                  </button>
                </div>
                {product.featured && (
                  <span className="absolute top-3 left-3 font-inter font-bold text-[10px] tracking-wider uppercase px-3 py-1 rounded-full" style={{ background: '#f0b35b', color: '#1e1309' }}>
                    Featured
                  </span>
                )}
              </div>
              <div className="p-5">
                <span className="font-inter font-bold text-[10px] tracking-wider uppercase mb-1 block" style={{ color: '#7b6752' }}>{product.category}</span>
                <h3 className="font-inter font-bold text-base mb-1.5" style={{ color: '#1e1309', margin: '0 0 6px' }}>{product.name}</h3>
                <p className="text-sm mb-3" style={{ color: '#7b6752', lineHeight: 1.5 }}>{product.description}</p>
                <p className="font-inter font-black text-sm" style={{ color: '#5c3214' }}>{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4" style={{ background: 'rgba(14,8,4,0.92)' }} onClick={() => setLightbox(null)}>
          <img src={lightbox} alt="Product" className="max-w-full max-h-[90vh] rounded-2xl object-contain" />
          <button className="absolute top-4 right-4 text-white/60 hover:text-white text-3xl font-light" onClick={() => setLightbox(null)}>&times;</button>
        </div>
      )}
    </>
  )
}