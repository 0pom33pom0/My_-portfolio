import { useTranslation } from 'react-i18next'

const LANGUAGES = [
  { code: 'en', labelKey: 'language.en', a11yKey: 'a11y.switchToEnglish' },
  { code: 'th', labelKey: 'language.th', a11yKey: 'a11y.switchToThai' },
] as const

export function LanguageSwitcher() {
  const { t, i18n } = useTranslation()
  const active = i18n.resolvedLanguage === 'th' ? 'th' : 'en'

  return (
    <div
      role="group"
      aria-label={t('a11y.languageSwitcher')}
      className="flex items-center rounded-full bg-white/[0.04] p-1 ring-1 ring-white/10"
    >
      {LANGUAGES.map(({ code, labelKey, a11yKey }) => (
        <button
          key={code}
          type="button"
          aria-pressed={active === code}
          aria-label={t(a11yKey)}
          onClick={() => void i18n.changeLanguage(code)}
          className={`min-h-11 rounded-full px-3.5 text-sm transition-colors ${
            active === code
              ? 'bg-gradient-to-r from-teal-400/20 to-sky-400/20 font-semibold text-teal-200 ring-1 ring-teal-300/30'
              : 'text-zinc-400 hover:text-zinc-100'
          }`}
        >
          {t(labelKey)}
        </button>
      ))}
    </div>
  )
}
