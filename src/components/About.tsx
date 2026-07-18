import { useTranslation } from 'react-i18next'
import { Reveal } from './ui/Reveal.tsx'
import { SectionHeading } from './ui/SectionHeading.tsx'

export function About() {
  const { t } = useTranslation()

  return (
    <section id="about" aria-labelledby="about-title" className="scroll-mt-24">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <Reveal>
          <SectionHeading
            headingId="about-title"
            eyebrow={t('about.eyebrow')}
            title={t('about.heading')}
          />
        </Reveal>
        <Reveal delay={0.1}>
          <div className="max-w-3xl space-y-5 text-lg text-zinc-400">
            <p>{t('about.bio1')}</p>
            <p>{t('about.bio2')}</p>
          </div>
        </Reveal>
        <Reveal delay={0.2}>
          <blockquote className="mt-10 max-w-3xl border-l-2 border-teal-300/60 pl-6 md:mt-12">
            <p className="font-heading bg-gradient-to-r from-teal-200 to-sky-300 bg-clip-text text-2xl leading-snug font-semibold text-transparent md:text-3xl">
              “{t('about.quote')}”
            </p>
          </blockquote>
        </Reveal>
      </div>
    </section>
  )
}
