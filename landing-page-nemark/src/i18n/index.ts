import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en-US.json";
import vi from "./locales/vi-VN.json";

// Initialize i18n without automatic browser language detection so
// server-rendered output is stable. The app will detect the browser
// language client-side after hydration and call `i18n.changeLanguage`.
i18n.use(initReactI18next).init({
  fallbackLng: "en",
  debug: false,
  interpolation: {
    escapeValue: false,
  },
  resources: {
    en: { translation: en },
    vi: { translation: vi },
  },
});

export default i18n;
