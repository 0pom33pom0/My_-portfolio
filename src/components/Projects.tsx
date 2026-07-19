import { useRef } from 'react'
import { useReducedMotion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { projects } from '../data/projects.ts'
import { useMarqueeDrift } from '../lib/useMarqueeDrift.ts'
import { ProjectCard } from './ProjectCard.tsx'
import { CarouselArrows } from './ui/CarouselArrows.tsx'
import { Reveal } from './ui/Reveal.tsx'
import { SectionHeading } from './ui/SectionHeading.tsx'

const FALLBACK_SCROLL_STEP = 400

const SLIDE_CLASS = 'w-[85vw] max-w-md shrink-0 snap-start sm:w-[420px]'

export function Projects() {
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
      id="projects"
      aria-labelledby="projects-title"
      className="scroll-mt-24"
    >
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <Reveal>
          <div className="flex items-end justify-between gap-4">
            <SectionHeading
              headingId="projects-title"
              eyebrow={t('projects.eyebrow')}
              title={t('projects.heading')}
            />
            <CarouselArrows
              prevLabel={t('a11y.prevProject')}
              nextLabel={t('a11y.nextProject')}
              onPrev={() => scrollByCard(-1)}
              onNext={() => scrollByCard(1)}
            />
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div
            ref={scrollerRef}
            role="region"
            aria-label={t('a11y.projectsCarousel')}
            tabIndex={0}
            className="-mx-4 snap-x snap-mandatory scroll-px-4 overflow-x-auto overscroll-x-contain px-4 pb-4 [mask-image:linear-gradient(to_right,transparent,black_2.5rem,black_calc(100%-2.5rem),transparent)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            <ul className="flex w-max items-stretch gap-5">
              {projects.map((project) => (
                <li key={project.id} className={SLIDE_CLASS}>
                  <ProjectCard project={project} />
                </li>
              ))}
              {/* Clone set for a seamless marquee wrap; hidden from AT. */}
              {!prefersReducedMotion &&
                projects.map((project) => (
                  <li
                    key={`clone-${project.id}`}
                    data-clone="true"
                    aria-hidden="true"
                    className={SLIDE_CLASS}
                  >
                    <ProjectCard project={project} />
                  </li>
                ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
