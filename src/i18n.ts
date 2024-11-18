import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en.json";
import fa from "./locales/fa.json";

const isRTL = (lang: string) => {
  return ["fa", "ar"].includes(lang);
};

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: en,
    },
    fa: {
      translation: fa,
    },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
  detection: {
    order: ["localStorage", "navigator"],
    caches: ["localStorage"],
  },
});

i18n.on("languageChanged", (lang) => {
  document.documentElement.dir = isRTL(lang) ? "rtl" : "ltr";
});

export default i18n;
