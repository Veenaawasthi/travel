// src/i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./Locales/en.json"; // Adjust the path if needed
import jp from "./Locales/jp.json"; // Adjust the path if needed

i18n
  .use(initReactI18next) 
  .init({
    resources: {
      en: {
        translation: en,
      },
      jp: {
        translation: jp,
      },
    },
    lng: "en", // 
    fallbackLng: "en", 
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
