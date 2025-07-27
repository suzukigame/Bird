import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'ja', // デフォルト言語
    debug: true, // 開発中はtrueにするとデバッグ情報が出力されます
    interpolation: {
      escapeValue: false, // ReactはXSS対策を内蔵しているため不要
    },
    backend: {
      loadPath: '/Bird/locales/{{lng}}/{{ns}}.json', // GitHub Pagesのサブディレクトリに対応
    },
    react: {
      useSuspense: false, // 必要に応じてtrueに設定
    },
  });

export default i18n;
