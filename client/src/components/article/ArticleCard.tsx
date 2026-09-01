import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import type { Article } from "@/types/article";
import { useLocale } from "@/hooks/useLocale";
import {
  getLocalizedArticle,
  getArticlePath,
  getCategoryPath,
  formatRelativeTime,
} from "@/utils/article";
import { resolveMediaUrl } from "@/services/upload.api";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/utils/cn";

interface ArticleCardProps {
  article: Article;
  variant?: "default" | "horizontal" | "compact" | "featured";
  className?: string;
  priority?: boolean;
}

function CoverImage({
  src,
  priority,
}: {
  src: string;
  priority?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  const url = resolveMediaUrl(src);

  if (!url || failed) {
    return (
      <div
        className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary to-primary-hover text-white/35"
        aria-hidden
      >
        <svg width="28" height="28" viewBox="0 0 40 40" fill="none">
          <path
            d="M11 10h12c5.5 0 10 4 10 10s-4.5 10-10 10H11V10zm4 3.5v13h8c3.6 0 6.5-2.7 6.5-6.5S26.6 13.5 23 13.5H15z"
            fill="currentColor"
          />
        </svg>
      </div>
    );
  }

  return (
    <img
      src={url}
      alt=""
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      className="media-cover transition-transform duration-500 group-hover:scale-105"
      onError={() => setFailed(true)}
    />
  );
}

export function ArticleCard({
  article,
  variant = "default",
  className,
  priority = false,
}: ArticleCardProps) {
  const locale = useLocale();
  const { t } = useTranslation("common");
  const localized = getLocalizedArticle(article, locale);
  const path = getArticlePath(article, locale);
  const catPath = getCategoryPath(article.category.slug, locale);
  const catName = article.category.translations[locale].name;

  if (variant === "horizontal") {
    return (
      <motion.article
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.35 }}
        className={cn("group flex gap-3 sm:gap-4", className)}
      >
        <Link
          to={path}
          className="media-frame h-[4.5rem] w-[4.5rem] sm:h-24 sm:w-24 rounded-lg bg-slate-200 ring-1 ring-black/5"
        >
          <CoverImage src={article.coverImage} priority={priority} />
        </Link>
        <div className="flex min-w-0 flex-1 flex-col justify-center gap-1">
          <div className="flex items-center gap-2 flex-wrap">
            <Link
              to={catPath}
              className="text-xs font-semibold uppercase tracking-wide text-accent hover:underline"
            >
              {catName}
            </Link>
            {article.isBreaking && <Badge variant="breaking">{t("breaking")}</Badge>}
          </div>
          <Link to={path}>
            <h3 className="text-sm sm:text-[0.95rem] font-semibold text-primary leading-snug line-clamp-2 group-hover:text-accent transition-colors">
              {localized.title}
            </h3>
          </Link>
          <p className="text-xs text-muted">
            {formatRelativeTime(article.publishedAt, locale)} · {article.readingTime}{" "}
            {locale === "ar" ? "د" : "min"}
          </p>
        </div>
      </motion.article>
    );
  }

  if (variant === "compact") {
    return (
      <motion.article
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className={cn("group", className)}
      >
        <Link to={path} className="flex gap-3 items-start">
          <span className="mt-1 size-1.5 shrink-0 rounded-full bg-accent" />
          <div className="min-w-0">
            <h3 className="text-sm font-medium text-primary leading-snug line-clamp-2 group-hover:text-accent transition-colors">
              {localized.title}
            </h3>
            <p className="mt-1 text-xs text-muted">
              {formatRelativeTime(article.publishedAt, locale)}
            </p>
          </div>
        </Link>
      </motion.article>
    );
  }

  const isFeatured = variant === "featured";

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.4 }}
      className={cn("group flex flex-col", className)}
    >
      <Link
        to={path}
        className="media-frame aspect-[16/10] w-full rounded-lg bg-slate-200 ring-1 ring-black/5"
      >
        <CoverImage src={article.coverImage} priority={priority} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent pointer-events-none" />
        {(article.isBreaking || article.isFeatured) && (
          <div className="absolute top-3 start-3 z-10 flex gap-1.5">
            {article.isBreaking && <Badge variant="breaking">{t("breaking")}</Badge>}
            {article.isFeatured && !article.isBreaking && (
              <Badge variant="featured">{t("featured")}</Badge>
            )}
          </div>
        )}
      </Link>

      <div className="mt-3 flex flex-col gap-1.5">
        <div className="flex items-center gap-2">
          <Link
            to={catPath}
            className="text-xs font-semibold uppercase tracking-wide text-accent hover:underline"
          >
            {catName}
          </Link>
          <span className="text-xs text-muted">·</span>
          <span className="text-xs text-muted">
            {formatRelativeTime(article.publishedAt, locale)}
          </span>
        </div>

        <Link to={path}>
          <h3
            className={cn(
              "font-bold text-primary leading-snug group-hover:text-accent transition-colors",
              isFeatured ? "text-xl md:text-2xl line-clamp-3" : "text-base line-clamp-2"
            )}
          >
            {localized.title}
          </h3>
        </Link>

        {isFeatured && (
          <p className="text-sm text-muted line-clamp-2 mt-1">{localized.excerpt}</p>
        )}

        <p className="text-xs text-muted mt-1">
          {article.author.name} · {article.readingTime}{" "}
          {locale === "ar" ? "دقائق" : "min read"}
        </p>
      </div>
    </motion.article>
  );
}
