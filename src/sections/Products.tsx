import { useState } from 'react'
import { Eye, ExternalLink } from 'lucide-react'

const SQUARE_STORE = 'https://shop.burnt-designs.com'

type MainCategory = 'All' | 'Natural Edge' | 'Modern Edge' | 'Decorative Edge' | 'Epoxy'
type SubCategory = string

const mainCategories: MainCategory[] = ['All', 'Natural Edge', 'Modern Edge', 'Decorative Edge', 'Epoxy']
const subCategories: Record<string, SubCategory[]> = {
  'All': ['All'],
  'Natural Edge': ['All', 'Dining Tables', 'Coffee Tables', 'End Tables'],
  'Modern Edge': ['All', 'Dining Tables', 'Coffee Tables', 'End Tables'],
  'Decorative Edge': ['All', 'Dining Tables', 'Coffee Tables', 'End Tables'],
  'Epoxy': ['All', 'Dining Tables', 'Coffee Tables', 'End Tables'],
}

const miscSubCategories: SubCategory[] = ['Wall Art', 'Coasters', 'Cutting Boards', 'Welcome Signs']

interface Product {
  id: number
  name: string
  mainCategory: MainCategory
  subCategory: SubCategory
  description: string
  price: string
  image: string
  featured: boolean
  storeUrl: string
}

const products: Product[] = [
  {
    id: 1, name: 'Cattle Drive Dining Table', mainCategory: 'Natural Edge', subCategory: 'Dining Tables',
    description: 'Massive live-edge dining table with hand-burned cattle drive scene and blue epoxy river. Seats 8-10.',
    price: '$2,800+', image: '/images/product-cattle-river-table.jpg', featured: true,
    storeUrl: `${SQUARE_STORE}/product/cattle-drive-dining`,
  },
  {
    id: 2, name: 'Cattle Drive Dining Table (Alternate)', mainCategory: 'Natural Edge', subCategory: 'Dining Tables',
    description: 'Full cattle drive panorama burned into natural edge walnut with detailed cowboy silhouettes.',
    price: '$2,600+', image: '/images/product-cattle-drive-dining.jpg', featured: true,
    storeUrl: `${SQUARE_STORE}/product/cattle-drive-alternate`,
  },
  {
    id: 3, name: 'Cattle Roundup Dining Table', mainCategory: 'Decorative Edge', subCategory: 'Dining Tables',
    description: 'Overhead view of hand-burned cattle roundup scene on natural edge slab.',
    price: '$2,400+', image: '/images/product-cattle-roundup-table.jpg', featured: false,
    storeUrl: `${SQUARE_STORE}/product/cattle-roundup`,
  },
  {
    id: 4, name: 'Cowboy Numbers Coffee Table', mainCategory: 'Natural Edge', subCategory: 'Coffee Tables',
    description: 'Live-edge coffee table with hand-burned cowboy silhouettes and custom rodeo numbers.',
    price: '$850+', image: '/images/product-cowboy-numbers-table.jpg', featured: true,
    storeUrl: `${SQUARE_STORE}/product/cowboy-numbers`,
  },
  {
    id: 5, name: 'Bull Rider Coffee Table', mainCategory: 'Epoxy', subCategory: 'Coffee Tables',
    description: 'PBR-inspired coffee table with hand-burned bull rider scene and sponsor logos.',
    price: '$950+', image: '/images/product-bull-rider-table.jpg', featured: true,
    storeUrl: `${SQUARE_STORE}/product/bull-rider`,
  },
  {
    id: 6, name: '"Dibs On The Cowboy" Table', mainCategory: 'Modern Edge', subCategory: 'Coffee Tables',
    description: 'Fun cowboy silhouette table with custom text overlay. Great conversation piece.',
    price: '$750+', image: '/images/product-cowboy-dibs-table.jpg', featured: false,
    storeUrl: `${SQUARE_STORE}/product/dibs-cowboy`,
  },
  {
    id: 7, name: 'Eagle End Table', mainCategory: 'Natural Edge', subCategory: 'End Tables',
    description: 'Round natural edge end table with detailed hand-burned eagle head portrait.',
    price: '$425+', image: '/images/product-eagle-table.jpg', featured: false,
    storeUrl: `${SQUARE_STORE}/product/eagle-end-table`,
  },
  {
    id: 8, name: 'Mushroom Scene End Table', mainCategory: 'Decorative Edge', subCategory: 'End Tables',
    description: 'Woodland end table with hand-burned mushroom forest and wildflower scene.',
    price: '$425+', image: '/images/product-mushroom-table.jpg', featured: false,
    storeUrl: `${SQUARE_STORE}/product/mushroom-table`,
  },
  {
    id: 9, name: 'The JAKS Custom Sign', mainCategory: 'Natural Edge', subCategory: 'Welcome Signs',
    description: 'Custom family name sign with ornate lettering, established date on live-edge cedar.',
    price: '$185+', image: '/images/product-jaks-sign.jpg', featured: true,
    storeUrl: `${SQUARE_STORE}/product/jaks-sign`,
  },
  {
    id: 10, name: 'Sunflower Cutting Board', mainCategory: 'Decorative Edge', subCategory: 'Cutting Boards',
    description: 'Bamboo cutting board with hand-burned sunflower bouquet detail.',
    price: '$85', image: '/images/product-sunflower-board.jpg', featured: false,
    storeUrl: `${SQUARE_STORE}/product/sunflower-board`,
  },
  {
    id: 11, name: 'Sunflower Keepsake Box', mainCategory: 'Decorative Edge', subCategory: 'Wall Art',
    description: 'Wooden keepsake box with hand-burned sunflower design and brass hardware.',
    price: '$125', image: '/images/product-sunflower-box.jpg', featured: false,
    storeUrl: `${SQUARE_STORE}/product/sunflower-box`,
  },
  {
    id: 12, name: 'Burnt Designs Logo Burn', mainCategory: 'Modern Edge', subCategory: 'Wall Art',
    description: 'Ornate filigree-style lettering burned into walnut with decorative scrollwork.',
    price: 'Custom', image: '/images/product-logo-burn.jpg', featured: false,
    storeUrl: `${SQUARE_STORE}/product/logo-burn`,
  },
]

export default function Products() {
  const [mainFilter, setMainFilter] = useState<MainCategory>('All')
  const [subFilter, setSubFilter] = useState<string>('All')
  const [lightbox, setLightbox] = useState<string | null>(null)

  const availableSubs = mainFilter === 'All'
    ? ['All', ...miscSubCategories]
    : [...(subCategories[mainFilter] || []), ...miscSubCategories]

  const filtered = products.filter(p => {
    if (mainFilter !== 'All' && p.mainCategory !== mainFilter) return false
    if (subFilter !== 'All' && p.subCategory !== subFilter) return false
    return true
  })

  return (
    <>
      <section id="tables" className="max-w-[1200px] mx-auto px-5 lg:px-8 py-20">
        <div className="mb-10">
          <p className="eyebrow mb-3">Browse our collection</p>
          <h2>Natural edge pieces built around your story.</h2>
        </div>

        {/* Main Category Filters */}
        <div className="flex gap-2.5 mb-4 flex-wrap">
          {mainCategories.map(f => (
            <button
              key={f}
              onClick={() => { setMainFilter(f); setSubFilter('All') }}
              className={`category-pill ${mainFilter === f ? 'category-pill--active' : 'category-pill--inactive'}`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Sub Category Filters */}
        <div className="flex gap-2 mb-8 flex-wrap">
          {availableSubs.map(f => (
            <button
              key={f}
              onClick={() => setSubFilter(f)}
              className="font-inter font-medium text-[11px] tracking-wide px-4 py-2 rounded-full transition-all duration-300"
              style={{
                background: subFilter === f ? 'rgba(240,179,91,0.2)' : 'transparent',
                color: subFilter === f ? '#5c3214' : '#7b6752',
                border: subFilter === f ? '1px solid rgba(240,179,91,0.4)' : '1px solid transparent',
              }}
            >
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
                <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: 'rgba(30,19,9,0.5)' }}>
                  <button onClick={() => setLightbox(product.image)} className="flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm" style={{ background: 'rgba(255,255,255,0.9)', color: '#1e1309' }}>
                    <Eye size={14} /> View
                  </button>
                  <a
                    href={product.storeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm no-underline"
                    style={{ background: 'linear-gradient(135deg, #3a1f0d, #8b4c1c)', color: '#fff7ea' }}
                    onClick={e => e.stopPropagation()}
                  >
                    <ExternalLink size={14} /> Buy
                  </a>
                </div>
                {product.featured && (
                  <span className="absolute top-3 left-3 font-inter font-bold text-[10px] tracking-wider uppercase px-3 py-1 rounded-full" style={{ background: '#f0b35b', color: '#1e1309' }}>
                    Featured
                  </span>
                )}
                <span className="absolute top-3 right-3 font-inter font-bold text-[9px] tracking-wider uppercase px-2.5 py-1 rounded-full" style={{ background: 'rgba(30,19,9,0.7)', color: '#fff0d4' }}>
                  {product.mainCategory}
                </span>
              </div>
              <div className="p-5">
                <span className="font-inter font-bold text-[10px] tracking-wider uppercase mb-1 block" style={{ color: '#7b6752' }}>{product.subCategory}</span>
                <h3 className="font-inter font-bold text-base mb-1.5" style={{ color: '#1e1309', margin: '0 0 6px' }}>{product.name}</h3>
                <p className="text-sm mb-3" style={{ color: '#7b6752', lineHeight: 1.5 }}>{product.description}</p>
                <div className="flex items-center justify-between">
                  <span className="price-tag">{product.price}</span>
                  <a
                    href={product.storeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-inter font-bold text-xs flex items-center gap-1 transition-colors hover:text-[#8b4c1c]"
                    style={{ color: '#7b6752' }}
                  >
                    Shop <ExternalLink size={12} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All on Square */}
        <div className="text-center mt-10">
          <a
            href={SQUARE_STORE}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            <ExternalLink size={16} /> View Full Inventory on Square Store
          </a>
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
