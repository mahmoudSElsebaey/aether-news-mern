import type { Article, Locale } from "@/types/article";
import { localizedPath } from "@/utils/locale";

export function getLocalizedArticle(article: Article, locale: Locale) {
  return article.translations[locale];
}

export function getArticlePath(article: Article, locale: Locale) {
  const slug = article.translations[locale].slug;
  return localizedPath(`/article/${slug}`, locale);
}

export function getCategoryPath(slug: string, locale?: Locale) {
  // locale optional for callers that only need relative segment;
  // when locale provided, return full localized path
  if (locale) return localizedPath(`/${slug}`, locale);
  return `/${slug}`;
}

export function formatDate(iso: string, locale: Locale) {
  const date = new Date(iso);
  return new Intl.DateTimeFormat(locale === "ar" ? "ar-EG" : "en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

export function formatRelativeTime(iso: string, locale: Locale) {
  const date = new Date(iso);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffHours / 24);

  if (diffHours < 1) {
    return locale === "ar" ? "منذ لحظات" : "Just now";
  }
  if (diffHours < 24) {
    return locale === "ar" ? `منذ ${diffHours} ساعة` : `${diffHours}h ago`;
  }
  if (diffDays < 7) {
    return locale === "ar" ? `منذ ${diffDays} يوم` : `${diffDays}d ago`;
  }
  return formatDate(iso, locale);
}
