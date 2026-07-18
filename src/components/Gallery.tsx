import { useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { galleryItems } from '../data/gallery.ts'
import type { GalleryItem } from '../data/types.ts'
import { useMarqueeDrift } from '../lib/useMarqueeDrift.ts'
import { CarouselArrows } from './ui/CarouselArrows.tsx'
import { Reveal } from './ui/Reveal.tsx'
import { SectionHeading } from './ui/SectionHeading.tsx'

const FALLBACK_SCROLL_STEP = 320

const SLIDE_CLASS = 'w-[80vw] max-w-sm shrink-0 snap-start sm:w-[360px]'

function GalleryFigure({ item, number }: { item: GalleryItem; number: number }) {
  const { t, i18n } = useTranslation()
  const [imageFailed, setImageFailed] = useState(false)

  const captionKey = `gallery.items.${item.id}.caption`
  const hasCaption = i18n.exists(captionKey)
  const caption = hasCaption
    ? t(captionKey)
    : t('gallery.defaultCaption', { number })

  return (
    <figure className="group relative overflow-hidden rounded-2xl ring-1 ring-white/10">
      {imageFailed ? (
        <div
          role="img"
          aria-label={caption}
          className="aspect-[4/3] w-full bg-zinc-900"
        />
      ) : (
        <img
          src={item.image}
          alt={caption}
          loading="lazy"
          onError={() => setImageFailed(true)}
          className="aspect-[4/3] w-full object-cover transition-transform duration-500 motion-safe:group-hover:scale-105"
        />
      )}
      {/* Overlay only when the photo has a real caption; always visible on
          touch-first small screens, hover-revealed on md+. */}
      {hasCaption && (
        <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/40 to-transparent p-4 pt-10 text-sm font-medium text-zinc-100 opacity-100 transition-opacity duration-300 motion-reduce:transition-none md:opacity-0 md:group-hover:opacity-100">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

export function Gallery() {
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
      id="gallery"
      aria-labelledby="gallery-title"
      className="scroll-mt-24"
    >
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <Reveal>
          <div className="flex items-end justify-between gap-4">
            <SectionHeading
              headingId="gallery-title"
              eyebrow={t('gallery.eyebrow')}
              title={t('gallery.heading')}
            />
            <CarouselArrows
              prevLabel={t('a11y.prevPhoto')}
              nextLabel={t('a11y.nextPhoto')}
              onPrev={() => scrollByCard(-1)}
              onNext={() => scrollByCard(1)}
            />
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div
            ref={scrollerRef}
            role="region"
            aria-label={t('a11y.galleryCarousel')}
            tabIndex={0}
            className="-mx-4 snap-x snap-mandatory scroll-px-4 overflow-x-auto overscroll-x-contain px-4 pb-4 [mask-image:linear-gradient(to_right,transparent,black_2.5rem,black_calc(100%-2.5rem),transparent)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            <ul className="flex w-max gap-5">
              {galleryItems.map((item, index) => (
                <li key={item.image} className={SLIDE_CLASS}>
                  <GalleryFigure item={item} number={index + 1} />
                </li>
              ))}
              {/* Clone set for a seamless marquee wrap; hidden from AT. */}
              {!prefersReducedMotion &&
                galleryItems.map((item, index) => (
                  <li
                    key={`clone-${item.image}`}
                    data-clone="true"
                    aria-hidden="true"
                    className={SLIDE_CLASS}
                  >
                    <GalleryFigure item={item} number={index + 1} />
                  </li>
                ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
