import { useState } from 'react'
import { Send, Phone, Mail, MapPin, Clock } from 'lucide-react'

export default function OrderForm() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    name: '', email: '', phone: '', product: 'Dining Table',
    wood: 'Walnut', finish: 'Natural Oil', details: '',
    epoxy: 'Blue River', size: '', timeline: '',
  })

  const handleChange = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Create email body
    const body = encodeURIComponent(
      `NEW ORDER REQUEST - Burnt Designs\n\n` +
      `Name: ${form.name}\n` +
      `Email: ${form.email}\n` +
      `Phone: ${form.phone}\n\n` +
      `Product: ${form.product}\n` +
      `Wood: ${form.wood}\n` +
      `Finish: ${form.finish}\n` +
      `Epoxy: ${form.epoxy}\n` +
      `Size: ${form.size || 'Not specified'}\n` +
      `Timeline: ${form.timeline || 'Not specified'}\n\n` +
      `Custom Details:\n${form.details}\n\n` +
      `--- Sent from burntdesigns.com ---`
    )
    window.location.href = `mailto:operations@burntdesigns.com?subject=Custom Order from ${form.name}&body=${body}`
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 5000)
  }

  return (
    <section id="order" className="max-w-[1200px] mx-auto px-5 lg:px-8 py-20">
      <div className="mb-10">
        <p className="eyebrow mb-3">Checkout-style custom order</p>
        <h2>Send your build request.</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">
        {/* Form */}
        <form onSubmit={handleSubmit} className="glass-panel p-6 lg:p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-5">
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
            <div>
              <label className="form-label">Product</label>
              <select className="form-input" value={form.product} onChange={e => handleChange('product', e.target.value)}>
                <option>Dining Table</option>
                <option>Coffee Table</option>
                <option>End Table</option>
                <option>Driveway Entry Sign</option>
                <option>Wall Art / Plaque</option>
              </select>
            </div>
            <div>
              <label className="form-label">Wood Type</label>
              <select className="form-input" value={form.wood} onChange={e => handleChange('wood', e.target.value)}>
                <option>Walnut</option>
                <option>Oak</option>
                <option>Cedar</option>
                <option>Maple</option>
                <option>Pine</option>
                <option>Cherry</option>
              </select>
            </div>
            <div>
              <label className="form-label">Finish</label>
              <select className="form-input" value={form.finish} onChange={e => handleChange('finish', e.target.value)}>
                <option>Natural Oil</option>
                <option>High Gloss Epoxy</option>
                <option>Outdoor Spar Urethane</option>
                <option>Matte Poly</option>
              </select>
            </div>
            <div>
              <label className="form-label">Epoxy Color</label>
              <select className="form-input" value={form.epoxy} onChange={e => handleChange('epoxy', e.target.value)}>
                <option>Blue River</option>
                <option>Teal River</option>
                <option>Black Smoke</option>
                <option>Amber</option>
                <option>Deep Red</option>
                <option>Clear / No Color</option>
              </select>
            </div>
            <div>
              <label className="form-label">Size (approx.)</label>
              <input type="text" className="form-input" value={form.size} onChange={e => handleChange('size', e.target.value)} placeholder={'e.g. 48" x 30"'} />
            </div>
            <div>
              <label className="form-label">Timeline</label>
              <select className="form-input" value={form.timeline} onChange={e => handleChange('timeline', e.target.value)}>
                <option>No rush</option>
                <option>2-4 weeks</option>
                <option>4-6 weeks</option>
                <option>6-8 weeks</option>
                <option>Rush needed</option>
              </select>
            </div>
          </div>

          <div className="mb-6">
            <label className="form-label">Custom Details</label>
            <textarea rows={5} className="form-input resize-none"
              value={form.details}
              onChange={e => handleChange('details', e.target.value)}
              placeholder="Tell us about size, text, photo ideas, epoxy color, table legs, sign post needs, timeline, and budget..." />
          </div>

          <button type="submit" className="btn-primary w-full sm:w-auto">
            <Send size={16} /> Submit Custom Order
          </button>

          {submitted && (
            <div className="mt-4 p-4 rounded-2xl font-bold text-sm" style={{ background: 'rgba(6,78,59,0.1)', color: '#064e3b' }}>
              Your email client should open. Send the email to complete your order request!
            </div>
          )}
        </form>

        {/* Contact Card */}
        <div className="space-y-4">
          <div className="glass-panel p-6">
            <h3 className="font-inter font-black text-base mb-4" style={{ color: '#1e1309' }}>How It Works</h3>
            <ol className="space-y-3 text-sm" style={{ color: '#7b6752' }}>
              <li className="flex gap-3"><span className="font-black" style={{ color: '#f0b35b' }}>1.</span> Fill out the order form with your details</li>
              <li className="flex gap-3"><span className="font-black" style={{ color: '#f0b35b' }}>2.</span> We'll review and reply within 24-48 hours</li>
              <li className="flex gap-3"><span className="font-black" style={{ color: '#f0b35b' }}>3.</span> We finalize design, wood, and pricing</li>
              <li className="flex gap-3"><span className="font-black" style={{ color: '#f0b35b' }}>4.</span> 50% deposit to start your build</li>
              <li className="flex gap-3"><span className="font-black" style={{ color: '#f0b35b' }}>5.</span> Delivery or pickup when complete!</li>
            </ol>
          </div>

          <div className="glass-panel p-6">
            <h3 className="font-inter font-black text-base mb-4" style={{ color: '#1e1309' }}>Contact Us</h3>
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