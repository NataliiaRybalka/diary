import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translationsInEn from "../locales/en/translation.json";
import translationsInRu from "../locales/ru/translation.json";
import translationsInUa from "../locales/ua/translation.json";

const resources = {
    en: {
        translation: translationsInEn,
    },
    ru: {
        translation: translationsInRu,
    },
    ua: {
        translation: translationsInUa,
    },
};

i18n.use(initReactI18next).init({
    resources,
    lng: "en",
    debug: true,
    fallbackLng: "ua",
    interpolation: {
        escapeValue: false,
    },
    ns: "translation",
    defaultNS: "translation",
});

export default i18n;
