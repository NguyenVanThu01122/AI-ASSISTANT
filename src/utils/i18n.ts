// i18n.js

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enJson from "../../public/locales/en.json";
import viJson from "../../public/locales/vi.json";

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      en: {
        translation: enJson,
      },
      vi: {
        translation: viJson,
      },
    },
    lng: "en",
    keySeparator: ".",
  });

export default i18n;
