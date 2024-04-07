import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import I18NextHttpBackend from 'i18next-http-backend';

export const defaultNS = 'translation';

i18n
  .use(I18NextHttpBackend)
  .use(LanguageDetector)
  .init({
    load: 'currentOnly',
    fallbackLng: 'en',
    defaultNS,
    fallbackNS: 'translation',
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
