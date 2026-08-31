import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import type { Locale } from "@/types/article";
import { DEFAULT_LOCALE, isLocale } from "@/utils/locale";

/** Prefer URL locale, fall back to i18n language */
export function useLocale(): Locale {
  const { lang } = useParams();
  const { i18n } = useTranslation();

  if (isLocale(lang)) return lang;

  const fromI18n = i18n.language?.startsWith("ar") ? "ar" : "en";
  return isLocale(fromI18n) ? fromI18n : DEFAULT_LOCALE;
}
