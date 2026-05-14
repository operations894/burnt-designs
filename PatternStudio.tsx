import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function MaterialsProcess() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const leftColRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      // Left column text stagger
      if (leftColRef.current) {
        const textBlocks = leftColRef.current.querySelectorAll('.text-block')
        gsap.fromTo(
          textBlocks,
          { x: -40, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
          }
        )
      }

      // Right image fade + scale
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { scale: 1.05, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 1,
            delay: 0.3,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="materials"
      style={{
        backgroundColor: '#F5EDE3',
        padding: '12vh 8vw',
      }}
    >
      <div
        className="max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-[55%_45%] items-center"
        style={{ gap: '4rem' }}
      >
        {/* Left column - text */}
        <div ref={leftColRef} className="order-2 lg:order-1">
          <p className="text-block label-section mb-4">OUR PROCESS</p>
          <h2
            className="text-block font-heading font-light mb-8"
            style={{
              fontSize: 'clamp(1.8rem, 3vw, 2.6rem)',
              color: '#2C1810',
              letterSpacing: '-0.02em',
              lineHeight: 1.15,
            }}
          >
            From raw timber to finished piece
          </h2>
          <p
            className="text-block font-body"
            style={{
              fontSize: 16,
              color: '#8B6F5E',
              lineHeight: 1.7,
            }}
          >
            Every piece starts with sustainably sourced Missouri hardwood — walnut, maple,
            cherry, and white oak. We select slabs with natural character: live edges, burl
            patterns, and unique grain that tells a story.
          </p>
          <p
            className="text-block font-body mt-4"
            style={{
              fontSize: 16,
              color: '#8B6F5E',
              lineHeight: 1.7,
            }}
          >
            Using a combination of traditional wood-burning tools and custom-built branding
            irons, each design is transferred by hand. No lasers, no shortcuts. The variation
            in burn depth and tone is what gives our work its soul.
          </p>
          <div className="text-block mt-8">
            <span className="crossfade-link font-heading font-medium text-xs tracking-[0.1em] uppercase" style={{ color: '#C85A17' }}>
              <span className="crossfade-text">See How It's Made &rarr;</span>
              <span className="crossfade-clone">See How It's Made &rarr;</span>
            </span>
          </div>
        </div>

        {/* Right column - image */}
        <div className="order-1 lg:order-2 overflow-hidden" style={{ borderRadius: 2 }}>
          <img
            ref={imageRef}
            src="/images/img_wood_workshop.jpg"
            alt="Artisan wood workshop with tools and timber"
            className="w-full object-cover"
            style={{ aspectRatio: '4/5' }}
            loading="lazy"
          />
        </div>
      </div>
    </section>
  )
}