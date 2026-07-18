import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Reveal } from './ui/Reveal.tsx'
import { SectionHeading } from './ui/SectionHeading.tsx'

// Entry ids only (not display text); every string lives in the locale files
// under education.items.<id>.* — add an id here plus keys in BOTH locales
// to list another qualification.
const EDUCATION_IDS = ['kku', 'kamphaeng'] as const

const EDUCATION_IMAGES: Record<(typeof EDUCATION_IDS)[number], string> = {
  kku: '/images/education/graduation.jpg',
  kamphaeng: '/images/education/kamphaeng.jpg',
}

function EducationPhoto({ id }: { id: (typeof EDUCATION_IDS)[number] }) {
  const { t } = useTranslation()
  const [imageFailed, setImageFailed] = useState(false)
  const alt = t(`education.items.${id}.imageAlt`)

  if (imageFailed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className="aspect-[2/3] w-40 shrink-0 rounded-2xl bg-zinc-900 ring-1 ring-white/10 md:w-44"
      />
    )
  }

  return (
    <img
      src={EDUCATION_IMAGES[id]}
      alt={alt}
      width={900}
      height={1350}
      loading="lazy"
      onError={() => setImageFailed(true)}
      className="aspect-[2/3] w-40 shrink-0 rounded-2xl object-cover ring-1 ring-white/10 md:w-44"
    />
  )
}

export function Education() {
  const { t, i18n } = useTranslation()

  return (
    <section
      id="education"
      aria-labelledby="education-title"
      className="scroll-mt-24"
    >
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <Reveal>
          <SectionHeading
            headingId="education-title"
            eyebrow={t('education.eyebrow')}
            title={t('education.heading')}
          />
        </Reveal>
        <div className="space-y-6">
          {EDUCATION_IDS.map((id, index) => (
            <Reveal key={id} delay={index * 0.1}>
              <article className="flex max-w-3xl flex-col gap-8 rounded-2xl bg-white/[0.03] p-6 ring-1 ring-white/10 sm:flex-row sm:items-center md:p-8">
                <div className="flex-1">
                  <p className="font-mono text-sm text-teal-300">
                    {t(`education.items.${id}.period`)}
                  </p>
                  <h3 className="font-heading mt-2 text-xl font-medium text-zinc-100">
                    {t(`education.items.${id}.degree`)}
                  </h3>
                  <p className="mt-1 text-zinc-300">
                    {t(`education.items.${id}.school`)}
                  </p>
                  {i18n.exists(`education.items.${id}.field`) && (
                    <p className="text-zinc-400">
                      {t(`education.items.${id}.field`)}
                    </p>
                  )}
                  <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-teal-400/15 to-sky-400/15 px-3.5 py-1.5 text-sm font-semibold text-teal-200 ring-1 ring-teal-300/30">
                    <svg
                      aria-hidden="true"
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 2 1.6 7.6 12 13.2l8.4-4.52v6.52h2V7.6L12 2Zm-6.4 9.93v4.47c0 1.1.72 2.06 1.9 2.74C8.68 19.83 10.26 20.2 12 20.2s3.32-.37 4.5-1.06c1.18-.68 1.9-1.64 1.9-2.74v-4.47l-6.4 3.44-6.4-3.44Z" />
                    </svg>
                    {t(`education.items.${id}.honor`)}
                  </p>
                </div>
                <EducationPhoto id={id} />
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
