import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { galleryItems } from '../data/gallery.ts'
import type { GalleryItem } from '../data/types.ts'
import { Reveal } from './ui/Reveal.tsx'
import { SectionHeading } from './ui/SectionHeading.tsx'

function GalleryFigure({ item }: { item: GalleryItem }) {
  const { t } = useTranslation()
  const [imageFailed, setImageFailed] = useState(false)
  const caption = t(`gallery.items.${item.id}.caption`)

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
          width={900}
          height={675}
          loading="lazy"
          onError={() => setImageFailed(true)}
          className="aspect-[4/3] w-full object-cover transition-transform duration-500 motion-safe:group-hover:scale-105"
        />
      )}
      {/* Caption: always visible on touch-first small screens, hover-revealed on md+. */}
      <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/40 to-transparent p-4 pt-10 text-sm font-medium text-zinc-100 opacity-100 transition-opacity duration-300 motion-reduce:transition-none md:opacity-0 md:group-hover:opacity-100">
        {caption}
      </figcaption>
    </figure>
  )
}

export function Gallery() {
  const { t } = useTranslation()

  return (
    <section
      id="gallery"
      aria-labelledby="gallery-title"
      className="scroll-mt-24"
    >
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <Reveal>
          <SectionHeading
            headingId="gallery-title"
            eyebrow={t('gallery.eyebrow')}
            title={t('gallery.heading')}
          />
        </Reveal>
        <div className="grid grid-cols-2 gap-4 md:gap-5 lg:grid-cols-3">
          {galleryItems.map((item, index) => (
            <Reveal key={item.id} delay={index * 0.06}>
              <GalleryFigure item={item} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
