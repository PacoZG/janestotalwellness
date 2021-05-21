import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import translationEN from './utils/translations/english.json'
import translationFI from './utils/translations/finnish.json'
import translationES from './utils/translations/spanish.json'

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    fallbackLng: 'EN',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      EN: {
        translation: translationEN,
      },
      FI: {
        translation: translationFI,
      },
      ES: {
        translation: translationES,
      },
    },
  })

export default i18n
