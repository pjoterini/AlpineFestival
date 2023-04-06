import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { translationsPL } from "./pl";

i18n.use(initReactI18next).init({
  resources: {
    pl: {
      translation: translationsPL,
    },
  },
  lng: "pl",
  fallbackLng: "pl",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
