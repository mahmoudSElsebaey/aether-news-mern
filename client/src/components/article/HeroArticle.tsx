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

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-xl bg-primary"
    >
      <div className="grid lg:grid-cols-2 min-h-[380px] md:min-h-[440px]">
        <Link to={path} className="relative order-1 lg:order-2 min-h-[220px] lg:min-h-full">
          <img
            src={article.coverImage}
            alt=""
            className="absolute inset-0 size-full object-cover"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent lg:bg-gradient-to-l lg:from-transparent lg:via-transparent lg:to-primary/40" />
        </Link>

        <div className="relative order-2 lg:order-1 flex flex-col justify-end p-6 md:p-8 lg:p-10 text-white">
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
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight max-w-xl hover:opacity-90 transition-opacity">
              {localized.title}
            </h1>
          </Link>

          <p className="mt-3 text-white/75 text-sm md:text-base max-w-lg line-clamp-2">
            {localized.excerpt}
          </p>

          <div className="mt-5 flex items-center gap-3 text-sm text-white/60">
            {article.author.avatar && (
              <img
                src={article.author.avatar}
                alt=""
                className="size-8 rounded-full object-cover ring-2 ring-white/20"
              />
            )}
            <span className="font-medium text-white/80">{article.author.name}</span>
            <span>·</span>
            <time dateTime={article.publishedAt}>{formatDate(article.publishedAt, locale)}</time>
            <span>·</span>
            <span>
              {article.readingTime} {locale === "ar" ? "دقائق قراءة" : "min read"}
            </span>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
