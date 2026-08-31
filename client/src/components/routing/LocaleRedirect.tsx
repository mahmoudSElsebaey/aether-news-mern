import { Navigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { DEFAULT_LOCALE, isLocale, localizedPath, stripLocaleFromPath } from "@/utils/locale";

/** Redirect bare paths like /sports → /en/sports (or detected locale) */
export function LocaleRedirect() {
  const location = useLocation();
  const { i18n } = useTranslation();

  const stored = typeof localStorage !== "undefined" ? localStorage.getItem("aether_lang") : null;
  const detected = isLocale(stored)
    ? stored
    : i18n.language?.startsWith("ar")
      ? "ar"
      : DEFAULT_LOCALE;

  const path = stripLocaleFromPath(location.pathname);
  const search = location.search || "";

  return <Navigate to={`${localizedPath(path, detected)}${search}`} replace />;
}
