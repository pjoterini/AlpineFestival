import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { translationsENG } from "./eng";
import { translationsPL } from "./pl";

i18n.use(initReactI18next).init({
  // debug: true,
  lng: "pl",
  resources: {
    pl: {
      translation: translationsPL,
    },
    en: {
      translation: translationsENG,
    },
  },
  fallbackLng: "pl",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
