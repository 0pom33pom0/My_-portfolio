import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { site } from '../config/site.ts'
import { Reveal } from './ui/Reveal.tsx'

export function Hero() {
  const { t, i18n } = useTranslation()
  // Thai visitors download the Thai resume; everyone else the English one.
  const resumeHref =
    i18n.resolvedLanguage === 'th' ? site.resumeUrl : site.resumeUrlEn
  const [imageFailed, setImageFailed] = useState(false)

  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden"
    >
      {/* Bilingual identity echo — always renders the opposite script. */}
      <span
        aria-hidden="true"
        className="font-heading pointer-events-none absolute -top-6 right-0 -z-10 text-[22vw] leading-none font-bold whitespace-nowrap text-white/[0.03] select-none md:text-[11rem]"
      >
        {t('hero.nameEcho')}
      </span>

      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-20 sm:px-6 md:grid-cols-[1.1fr_0.9fr] md:py-28">
        <Reveal>
          <h1
            id="hero-title"
            className="text-4xl leading-tight font-bold tracking-tight md:text-5xl"
          >
            <span className="block">{t('hero.greeting')}</span>{' '}
            {t('hero.name')}
          </h1>
          <p className="font-heading mt-4 bg-gradient-to-r from-teal-300 to-sky-400 bg-clip-text text-xl font-medium text-transparent md:text-2xl">
            {t('hero.role')}
          </p>
          <p className="mt-5 max-w-xl text-lg text-zinc-400">
            {t('hero.subtitle')}
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href={resumeHref}
              download
              className="inline-flex min-h-12 items-center gap-2 rounded-full bg-gradient-to-r from-teal-400 to-sky-500 px-6 font-semibold text-zinc-950 shadow-lg shadow-teal-500/20 transition hover:brightness-110"
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
                <path d="M12 3v12m0 0l-4.5-4.5M12 15l4.5-4.5M4 21h16" />
              </svg>
              {t('hero.downloadResume')}
            </a>
            <a
              href="#projects"
              className="inline-flex min-h-12 items-center rounded-full px-6 font-medium text-zinc-100 ring-1 ring-white/15 transition hover:bg-white/5"
            >
              {t('hero.viewProjects')}
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.15} className="relative">
          <div
            aria-hidden="true"
            className="absolute inset-x-8 top-8 -bottom-8 -z-10 rounded-full bg-gradient-to-br from-teal-400/20 to-sky-500/10 blur-3xl"
          />
          {imageFailed ? (
            <div
              role="img"
              aria-label={t('hero.imageAlt')}
              className="mx-auto aspect-[4/5] w-full max-w-sm rounded-3xl bg-zinc-900 ring-1 ring-white/10"
            />
          ) : (
            <img
              src="/images/profile/profile.jpg"
              alt={t('hero.imageAlt')}
              width={640}
              height={960}
              onError={() => setImageFailed(true)}
              className="mx-auto w-full max-w-sm rounded-3xl shadow-2xl ring-1 ring-white/10"
            />
          )}
        </Reveal>
      </div>
    </section>
  )
}
