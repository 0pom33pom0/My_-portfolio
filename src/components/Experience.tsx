import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Reveal } from './ui/Reveal.tsx'
import { SectionHeading } from './ui/SectionHeading.tsx'

// Entry ids only (not display text); every string lives in the locale files
// under experience.items.<id>.* — newest first.
const EXPERIENCE_IDS = ['bms', 'phuwiang', 'winnertutor'] as const

// Duty bullets render for every existing duties.d1..d6 key.
const DUTY_KEYS = ['d1', 'd2', 'd3', 'd4', 'd5', 'd6'] as const

// Workplace photos slot in as the owner supplies them: drop the file at
// public/images/experience/<id>.jpg, add it here, and add an
// experience.items.<id>.imageAlt key to BOTH locale files.
const EXPERIENCE_IMAGES: Partial<
  Record<(typeof EXPERIENCE_IDS)[number], string>
> = {}

function ExperiencePhoto({ src, alt }: { src: string; alt: string }) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className="aspect-[4/3] w-full rounded-2xl bg-zinc-900 ring-1 ring-white/10"
      />
    )
  }
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      className="aspect-[4/3] w-full rounded-2xl object-cover ring-1 ring-white/10"
    />
  )
}

export function Experience() {
  const { t, i18n } = useTranslation()

  return (
    <section
      id="experience"
      aria-labelledby="experience-title"
      className="scroll-mt-24"
    >
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <Reveal>
          <SectionHeading
            headingId="experience-title"
            eyebrow={t('experience.eyebrow')}
            title={t('experience.heading')}
          />
        </Reveal>
        <div className="space-y-6">
          {EXPERIENCE_IDS.map((id, index) => {
            const image = EXPERIENCE_IMAGES[id]
            return (
              <Reveal key={id} delay={index * 0.1}>
                <article className="max-w-3xl rounded-2xl bg-white/[0.03] p-6 ring-1 ring-white/10 md:flex md:items-start md:gap-8 md:p-8">
                  <div className="flex-1">
                    <p className="font-mono text-sm text-teal-300">
                      {t(`experience.items.${id}.period`)}
                    </p>
                    <h3 className="font-heading mt-2 text-xl font-medium text-zinc-100">
                      {t(`experience.items.${id}.role`)}
                    </h3>
                    <p className="mt-1 text-zinc-300">
                      {t(`experience.items.${id}.company`)}
                    </p>
                    <ul className="mt-4 space-y-2 text-zinc-400">
                      {DUTY_KEYS.filter((key) =>
                        i18n.exists(`experience.items.${id}.duties.${key}`),
                      ).map((key) => (
                        <li key={key} className="flex gap-3">
                          <span
                            aria-hidden="true"
                            className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-teal-300 to-sky-400"
                          />
                          {t(`experience.items.${id}.duties.${key}`)}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {image && (
                    <div className="mt-6 shrink-0 md:mt-0 md:w-56">
                      <ExperiencePhoto
                        src={image}
                        alt={t(`experience.items.${id}.imageAlt`)}
                      />
                    </div>
                  )}
                </article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
