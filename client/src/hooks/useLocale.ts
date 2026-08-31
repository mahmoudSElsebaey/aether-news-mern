import { useTranslation } from "react-i18next";
import type { Locale } from "@/types/article";

export function useLocale(): Locale {
  const { i18n } = useTranslation();
  return i18n.language?.startsWith("ar") ? "ar" : "en";
}
