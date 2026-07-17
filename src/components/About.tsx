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
      </div>
    </section>
  )
}
