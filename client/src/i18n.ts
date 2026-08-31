import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import enCommon from "./locales/en/common.json";
import enNavigation from "./locales/en/navigation.json";
import enHome from "./locales/en/home.json";
import enArticles from "./locales/en/articles.json";
import enDashboard from "./locales/en/dashboard.json";

import arCommon from "./locales/ar/common.json";
import arNavigation from "./locales/ar/navigation.json";
import arHome from "./locales/ar/home.json";
import arArticles from "./locales/ar/articles.json";
import arDashboard from "./locales/ar/dashboard.json";

const resources = {
  en: {
    common: enCommon,
    navigation: enNavigation,
    home: enHome,
    articles: enArticles,
    dashboard: enDashboard,
  },
  ar: {
    common: arCommon,
    navigation: arNavigation,
    home: arHome,
    articles: arArticles,
    dashboard: arDashboard,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    defaultNS: "common",
    ns: ["common", "navigation", "home", "articles", "dashboard"],
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
      lookupLocalStorage: "delta_lang",
    },
  });

const applyDocumentDirection = (lng: string) => {
  const isRtl = lng === "ar" || lng.startsWith("ar");
  document.documentElement.dir = isRtl ? "rtl" : "ltr";
  document.documentElement.lang = isRtl ? "ar" : "en";
};

applyDocumentDirection(i18n.language || "en");
i18n.on("languageChanged", applyDocumentDirection);

export default i18n;
