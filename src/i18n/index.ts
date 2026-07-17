import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import en from './locales/en.json'
import th from './locales/th.json'

export const resources = {
  en: { translation: en },
  th: { translation: th },
} as const

const applyHtmlLang = () => {
  document.documentElement.lang = i18n.resolvedLanguage ?? 'en'
}

i18n.on('languageChanged', applyHtmlLang)

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    supportedLngs: ['en', 'th'],
    load: 'languageOnly',
    returnEmptyString: false,
    interpolation: {
      // React already escapes rendered strings.
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  })
  .then(applyHtmlLang)

export default i18n
