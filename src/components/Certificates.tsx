import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { certificates } from '../data/certificates.ts'
import { CertificateCard } from './CertificateCard.tsx'
import { Reveal } from './ui/Reveal.tsx'
import { SectionHeading } from './ui/SectionHeading.tsx'

const FALLBACK_SCROLL_STEP = 320
const DRIFT_PX_PER_FRAME = 0.6
const INTERACTION_SUSPEND_MS = 4000

const SLIDE_CLASS = 'w-[80vw] max-w-sm shrink-0 snap-start sm:w-[360px]'

export function Certificates() {
  const { t } = useTranslation()
  const scrollerRef = useRef<HTMLDivElement>(null)
  const suspendUntilRef = useRef(0)
  const prefersReducedMotion = useReducedMotion()

  const suspendDrift = () => {
    suspendUntilRef.current = performance.now() + INTERACTION_SUSPEND_MS
  }

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

  // Slow continuous drift through the (cloned) list; wraps seamlessly and
  // yields to the visitor: pauses on hover/focus/touch and after arrows.
  useEffect(() => {
    const scroller = scrollerRef.current
    if (!scroller || prefersReducedMotion) return

    let frame = 0
    let wrapAt = 0
    let pointerInside = false
    let focusInside = false

    const measure = () => {
      const firstClone = scroller.querySelector<HTMLElement>('[data-clone]')
      wrapAt = firstClone ? firstClone.offsetLeft : 0
    }

    const isPaused = () =>
      pointerInside ||
      focusInside ||
      performance.now() < suspendUntilRef.current ||
      document.visibilityState === 'hidden'

    const tick = () => {
      if (wrapAt > 0 && !isPaused()) {
        // Mandatory snap would yank each tiny programmatic step back to the
        // nearest snap point; disable it while drifting, restore on pause so
        // manual swiping keeps its snap feel.
        if (scroller.style.scrollSnapType !== 'none') {
          scroller.style.scrollSnapType = 'none'
        }
        scroller.scrollLeft += DRIFT_PX_PER_FRAME
        if (scroller.scrollLeft >= wrapAt) {
          scroller.scrollLeft -= wrapAt
        }
      } else if (scroller.style.scrollSnapType) {
        scroller.style.scrollSnapType = ''
      }
      frame = requestAnimationFrame(tick)
    }

    const onPointerEnter = () => {
      pointerInside = true
    }
    const onPointerLeave = () => {
      pointerInside = false
    }
    const onFocusIn = () => {
      focusInside = true
    }
    const onFocusOut = () => {
      focusInside = false
    }
    const onManualScrollIntent = () => suspendDrift()

    measure()
    scroller.addEventListener('pointerenter', onPointerEnter)
    scroller.addEventListener('pointerleave', onPointerLeave)
    scroller.addEventListener('focusin', onFocusIn)
    scroller.addEventListener('focusout', onFocusOut)
    scroller.addEventListener('touchstart', onManualScrollIntent, {
      passive: true,
    })
    scroller.addEventListener('wheel', onManualScrollIntent, { passive: true })
    window.addEventListener('resize', measure)
    frame = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(frame)
      scroller.style.scrollSnapType = ''
      scroller.removeEventListener('pointerenter', onPointerEnter)
      scroller.removeEventListener('pointerleave', onPointerLeave)
      scroller.removeEventListener('focusin', onFocusIn)
      scroller.removeEventListener('focusout', onFocusOut)
      scroller.removeEventListener('touchstart', onManualScrollIntent)
      scroller.removeEventListener('wheel', onManualScrollIntent)
      window.removeEventListener('resize', measure)
    }
  }, [prefersReducedMotion])

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
