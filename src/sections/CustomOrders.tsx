import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function CustomOrders() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      const elements = sectionRef.current!.querySelectorAll('.animate-in')
      gsap.fromTo(
        elements,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="custom-orders"
      style={{
        backgroundColor: '#FFFDF9',
        padding: '16vh 8vw',
      }}
    >
      <div className="max-w-[800px] mx-auto text-center">
        <h2
          className="animate-in font-heading font-light"
          style={{
            fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
            color: '#2C1810',
            letterSpacing: '-0.02em',
            lineHeight: 1.15,
          }}
        >
          Have something in mind?
        </h2>
        <p
          className="animate-in font-body mx-auto mt-6"
          style={{
            fontSize: 18,
            color: '#8B6F5E',
            lineHeight: 1.7,
            maxWidth: 580,
          }}
        >
          We love custom commissions. Whether it's a family name burned into a live-edge
          table, a company logo stamped into leather goods, or a one-of-a-kind wall piece —
          tell us what you're dreaming up.
        </p>
        <button
          className="animate-in font-heading font-medium text-xs tracking-[0.1em] uppercase mt-10 transition-all duration-300"
          style={{
            backgroundColor: 'transparent',
            color: '#2C1810',
            padding: '16px 48px',
            border: '1px solid #2C1810',
            borderRadius: 2,
          }}
          onMouseEnter={(e) => {
            const btn = e.currentTarget
            btn.style.backgroundColor = '#2C1810'
            btn.style.color = '#FFFDF9'
          }}
          onMouseLeave={(e) => {
            const btn = e.currentTarget
            btn.style.backgroundColor = 'transparent'
            btn.style.color = '#2C1810'
          }}
        >
          Start a Custom Order
        </button>
        <p
          className="animate-in font-heading font-normal mt-4"
          style={{
            fontSize: 12,
            color: '#8B6F5E',
          }}
        >
          Typical turnaround: 2–4 weeks
        </p>
      </div>
    </section>
  )
}