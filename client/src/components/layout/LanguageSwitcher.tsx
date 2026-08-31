import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { cn } from "@/utils/cn";
import { switchLocalePath, isLocale, localizedPath } from "@/utils/locale";
import { getArticleBySlug } from "@/data/articles";
import type { Locale } from "@/types/article";

const languages: { code: Locale; label: string; short: string }[] = [
  { code: "ar", label: "العربية", short: "ع" },
  { code: "en", label: "English", short: "EN" },
];

interface LanguageSwitcherProps {
  className?: string;
  compact?: boolean;
}

function resolveNextPath(pathname: string, from: Locale, to: Locale): string {
  // If on an article page, map to the other language slug
  const parts = pathname.split("/").filter(Boolean);
  // expected: [lang, "article", slug]
  if (parts.length >= 3 && parts[1] === "article") {
    const currentSlug = parts.slice(2).join("/");
    const article =
      getArticleBySlug(currentSlug, from) || getArticleBySlug(currentSlug, to);
    if (article) {
      const nextSlug = article.translations[to].slug;
      return localizedPath(`/article/${nextSlug}`, to);
    }
  }
  return switchLocalePath(pathname, to);
}

export function LanguageSwitcher({ className, compact = false }: LanguageSwitcherProps) {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const current: Locale = isLocale(i18n.language)
    ? i18n.language
    : i18n.language?.startsWith("ar")
      ? "ar"
      : "en";

  const switchTo = (code: Locale) => {
    if (code === current) return;
    i18n.changeLanguage(code);
    const nextPath = resolveNextPath(location.pathname, current, code);
    navigate(`${nextPath}${location.search}`, { replace: true });
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-md border border-border bg-card p-0.5",
        className
      )}
      role="group"
      aria-label="Language"
    >
      {languages.map((lang) => {
        const isActive = current === lang.code;
        return (
          <button
            key={lang.code}
            type="button"
            onClick={() => switchTo(lang.code)}
            className={cn(
              "relative rounded-sm px-2.5 py-1.5 text-sm font-medium transition-colors",
              isActive
                ? "bg-primary text-white shadow-sm"
                : "text-muted hover:text-primary hover:bg-surface"
            )}
            aria-pressed={isActive}
            aria-label={lang.label}
          >
            {compact ? lang.short : lang.label}
          </button>
        );
      })}
    </div>
  );
}
