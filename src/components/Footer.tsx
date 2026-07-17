import { useTranslation } from 'react-i18next'
import { socialLinks } from '../config/site.ts'

export function Footer() {
  const { t } = useTranslation()
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-white/5">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-8 sm:flex-row sm:px-6">
        <p className="text-sm text-zinc-500">{t('footer.copyright', { year })}</p>
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-0">
          {socialLinks.map((social) => (
            <a
              key={social.id}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center text-sm text-zinc-400 transition hover:text-teal-300"
            >
              {social.label}
            </a>
          ))}
          <a
            href="#top"
            className="inline-flex min-h-11 items-center gap-1.5 text-sm text-zinc-400 transition hover:text-teal-300"
          >
            {t('footer.backToTop')}
            <svg
              aria-hidden="true"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 19V5m-6 6 6-6 6 6" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  )
}
