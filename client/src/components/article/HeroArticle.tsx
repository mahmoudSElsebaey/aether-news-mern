import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import type { Article } from "@/types/article";
import { useLocale } from "@/hooks/useLocale";
import {
  getLocalizedArticle,
  getArticlePath,
  getCategoryPath,
  formatDate,
} from "@/utils/article";
import { resolveMediaUrl } from "@/services/upload.api";
import { Badge } from "@/components/ui/Badge";

interface HeroArticleProps {
  article: Article;
}

export function HeroArticle({ article }: HeroArticleProps) {
  const locale = useLocale();
  const { t } = useTranslation(["common", "home"]);
  const localized = getLocalizedArticle(article, locale);
  const path = getArticlePath(article, locale);
  const catPath = getCategoryPath(article.category.slug, locale);
  const catName = article.category.translations[locale].name;
  const cover = resolveMediaUrl(article.coverImage);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-xl bg-primary min-h-[320px] md:min-h-[420px] lg:min-h-[480px]"
    >
      {/* Full-bleed cover */}
      <Link to={path} className="absolute inset-0 block" aria-hidden tabIndex={-1}>
        {cover ? (
          <img
            src={cover}
            alt=""
            className="absolute inset-0 size-full object-cover object-center"
            fetchPriority="high"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
        ) : null}
        {/* Gradient for readable text on both LTR/RTL */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/70 to-primary/20" />
        <div className="absolute inset-0 bg-gradient-to-e from-primary/80 via-primary/30 to-transparent" />
      </Link>

      <div className="relative z-10 flex h-full min-h-[320px] md:min-h-[420px] lg:min-h-[480px] flex-col justify-end p-6 md:p-8 lg:p-10 text-white">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            {article.isBreaking && <Badge variant="breaking">{t("common:breaking")}</Badge>}
            <Badge variant="featured">{t("home:hero.badge")}</Badge>
            <Link
              to={catPath}
              className="text-xs font-semibold uppercase tracking-wider text-white/70 hover:text-white"
            >
              {catName}
            </Link>
          </div>

          <Link to={path}>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] font-bold leading-tight hover:opacity-90 transition-opacity">
              {localized.title}
            </h1>
          </Link>

          <p className="mt-3 text-white/80 text-sm md:text-base max-w-xl line-clamp-2">
            {localized.excerpt}
          </p>

          <div className="mt-5 flex items-center gap-3 text-sm text-white/65 flex-wrap">
            {article.author.avatar && (
              <img
                src={article.author.avatar}
                alt=""
                className="size-8 rounded-full object-cover ring-2 ring-white/20"
              />
            )}
            <span className="font-medium text-white/85">{article.author.name}</span>
            <span aria-hidden>·</span>
            <time dateTime={article.publishedAt}>{formatDate(article.publishedAt, locale)}</time>
            <span aria-hidden>·</span>
            <span>
              {article.readingTime} {locale === "ar" ? "دقائق قراءة" : "min read"}
            </span>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
