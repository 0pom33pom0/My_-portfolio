import { useRef } from 'react'
import { useReducedMotion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { certificates } from '../data/certificates.ts'
import { CertificateCard } from './CertificateCard.tsx'
import { Reveal } from './ui/Reveal.tsx'
import { SectionHeading } from './ui/SectionHeading.tsx'

const FALLBACK_SCROLL_STEP = 320

export function Certificates() {
  const { t } = useTranslation()
  const scrollerRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  const scrollByCard = (direction: 1 | -1) => {
    const scroller = scrollerRef.current
    if (!scroller) return
    const slide = scroller.querySelector('li')
    const step =
      slide && slide.clientWidth > 0 ? slide.clientWidth : FALLBACK_SCROLL_STEP
    scroller.scrollBy({
      left: step * direction,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    })
  }

  const arrowButtonClass =
    'grid h-11 w-11 place-items-center rounded-full text-zinc-200 ring-1 ring-white/15 transition hover:bg-white/5 hover:ring-teal-300/40'

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
            <div className="mb-10 flex gap-2 md:mb-14">
              <button
                type="button"
                aria-label={t('a11y.prevCertificate')}
                onClick={() => scrollByCard(-1)}
                className={arrowButtonClass}
              >
                <svg
                  aria-hidden="true"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M15 6l-6 6 6 6" />
                </svg>
              </button>
              <button
                type="button"
                aria-label={t('a11y.nextCertificate')}
                onClick={() => scrollByCard(1)}
                className={arrowButtonClass}
              >
                <svg
                  aria-hidden="true"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 6l6 6-6 6" />
                </svg>
              </button>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div
            ref={scrollerRef}
            role="region"
            aria-label={t('a11y.certificatesCarousel')}
            tabIndex={0}
            className="-mx-4 snap-x snap-mandatory scroll-px-4 overflow-x-auto overscroll-x-contain px-4 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            <ul className="flex w-max gap-5">
              {certificates.map((certificate) => (
                <li
                  key={certificate.id}
                  className="w-[80vw] max-w-sm shrink-0 snap-start sm:w-[360px]"
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
