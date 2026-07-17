import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { LanguageSwitcher } from './LanguageSwitcher.tsx'

const SECTION_IDS = [
  'about',
  'skills',
  'projects',
  'certificates',
  'gallery',
  'contact',
] as const

export function Navbar() {
  const { t } = useTranslation()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header
      id="top"
      className="sticky top-0 z-50 border-b border-white/5 bg-zinc-950/70 backdrop-blur-md"
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
        <a
          href="#top"
          className="font-heading inline-flex min-h-11 items-center text-lg font-semibold tracking-tight text-zinc-100"
        >
          {t('nav.brand')}
          <span aria-hidden="true" className="text-teal-300">
            .
          </span>
        </a>

        <nav aria-label={t('a11y.primaryNav')} className="hidden md:block">
          <ul className="flex items-center gap-1">
            {SECTION_IDS.map((id) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className="inline-flex min-h-11 items-center rounded-md px-3 text-sm text-zinc-300 transition-colors hover:bg-white/5 hover:text-zinc-100"
                >
                  {t(`nav.${id}`)}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <button
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? t('a11y.closeMenu') : t('a11y.openMenu')}
            onClick={() => setMenuOpen((open) => !open)}
            className="grid h-11 w-11 place-items-center rounded-md text-zinc-200 transition-colors hover:bg-white/5 md:hidden"
          >
            <svg
              aria-hidden="true"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              {menuOpen ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            className="overflow-hidden border-t border-white/5 md:hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <ul className="space-y-1 px-4 py-3">
              {SECTION_IDS.map((id) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    onClick={() => setMenuOpen(false)}
                    className="flex min-h-11 items-center rounded-md px-3 text-zinc-200 transition-colors hover:bg-white/5"
                  >
                    {t(`nav.${id}`)}
                  </a>
                </li>
              ))}
              <li className="pt-1">
                <LanguageSwitcher />
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
