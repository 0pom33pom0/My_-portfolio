import { useRef } from 'react'
import { useReducedMotion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { certificates } from '../data/certificates.ts'
import { useMarqueeDrift } from '../lib/useMarqueeDrift.ts'
import { CertificateCard } from './CertificateCard.tsx'
import { CarouselArrows } from './ui/CarouselArrows.tsx'
import { Reveal } from './ui/Reveal.tsx'
import { SectionHeading } from './ui/SectionHeading.tsx'

const FALLBACK_SCROLL_STEP = 320

const SLIDE_CLASS = 'w-[80vw] max-w-sm shrink-0 snap-start sm:w-[360px]'

export function Certificates() {
  const { t } = useTranslation()
  const scrollerRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const { suspendDrift } = useMarqueeDrift(scrollerRef, {
    enabled: !prefersReducedMotion,
  })

  const scrollByCard = (direction: 1 | -1) => {
    const scroller = scrollerRef.current
    if (!scroller) return
    suspendDrift()
    const slide = scroller.querySelector('li')
    const step =
      slide && slide.clientWidth > 0 ? slide.clientWidth : FALLBACK_SCROLL_STEP
    scroller.scrollBy({
      left: step * direction,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    })
  }

  return (
    <section
      id="certificates"
      aria-labelledby="certificates-title"
      className="scroll-mt-24"
    >
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <Reveal>
          <div className="flex items-end justify-between gap-4">
            <SectionHeading
              headingId="certificates-title"
              eyebrow={t('certificates.eyebrow')}
              title={t('certificates.heading')}
            />
            <CarouselArrows
              prevLabel={t('a11y.prevCertificate')}
              nextLabel={t('a11y.nextCertificate')}
              onPrev={() => scrollByCard(-1)}
              onNext={() => scrollByCard(1)}
            />
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div
            ref={scrollerRef}
            role="region"
            aria-label={t('a11y.certificatesCarousel')}
            tabIndex={0}
            className="-mx-4 snap-x snap-mandatory scroll-px-4 overflow-x-auto overscroll-x-contain px-4 pb-4 [mask-image:linear-gradient(to_right,transparent,black_2.5rem,black_calc(100%-2.5rem),transparent)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            <ul className="flex w-max gap-5">
              {certificates.map((certificate) => (
                <li key={certificate.image} className={SLIDE_CLASS}>
                  <CertificateCard certificate={certificate} />
                </li>
              ))}
              {/* Clone set for a seamless marquee wrap; hidden from AT. */}
              {!prefersReducedMotion &&
                certificates.map((certificate) => (
                  <li
                    key={`clone-${certificate.image}`}
                    data-clone="true"
                    aria-hidden="true"
                    className={SLIDE_CLASS}
                  >
                    <CertificateCard certificate={certificate} />
                  </li>
                ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
