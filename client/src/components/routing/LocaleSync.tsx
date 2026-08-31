import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { isLocale, getDir } from "@/utils/locale";

/** Keep i18n + <html> in sync with :lang URL param */
export function LocaleSync() {
  const { lang } = useParams();
  const { i18n } = useTranslation();

  useEffect(() => {
    if (!isLocale(lang)) return;
    if (i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
    document.documentElement.lang = lang;
    document.documentElement.dir = getDir(lang);
  }, [lang, i18n]);

  return null;
}
