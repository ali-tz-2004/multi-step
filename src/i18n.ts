import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en.json";
import fa from "./locales/fa.json";
import store from "storejs";
import { IdTitleType } from "./types/IdTitleType";
import { Language_EN } from "./constants/Languages";

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
  lng: (store.get("language") as IdTitleType)?.title ?? Language_EN,
  fallbackLng: Language_EN,
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
