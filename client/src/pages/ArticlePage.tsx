import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { HiOutlineShare, HiOutlineBookmark } from "react-icons/hi2";
import {
  getArticleBySlug,
  getTrendingArticles,
  getArticlesByCategory,
  articles as allArticles,
} from "@/data/articles";
import { useLocale } from "@/hooks/useLocale";
import {
  getLocalizedArticle,
  getArticlePath,
  getCategoryPath,
  formatDate,
} from "@/utils/article";
import { Badge } from "@/components/ui/Badge";
import { ArticleCard } from "@/components/article/ArticleCard";
import { SectionTitle } from "@/components/common/SectionTitle";
import { Button } from "@/components/ui/Button";

export function ArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const locale = useLocale();
  const { t } = useTranslation(["common", "articles"]);

  // Try current locale first, then the other
  const article =
    getArticleBySlug(slug || "", locale) ||
    getArticleBySlug(slug || "", locale === "ar" ? "en" : "ar");

  if (!article) {
    return (
      <div className="container-aether py-20 text-center">
        <h1 className="text-2xl font-bold text-primary">{t("common:noResults")}</h1>
        <Link to="/" className="mt-4 inline-block text-accent hover:underline">
          {t("common:back")}
        </Link>
      </div>
    );
  }

  const localized = getLocalizedArticle(article, locale);
  // Prefer translation in current locale; fall back content still usable
  const contentLocale = article.translations[locale].content
    ? locale
    : locale === "ar"
      ? "en"
      : "ar";
  const content = article.translations[contentLocale].content;
  const catName = article.category.translations[locale].name;

  const related = getArticlesByCategory(article.category.slug)
    .filter((a) => a.id !== article.id)
    .slice(0, 3);
  const trending = getTrendingArticles()
    .filter((a) => a.id !== article.id)
    .slice(0, 5);

  const currentIndex = allArticles.findIndex((a) => a.id === article.id);
  const prevArticle = currentIndex > 0 ? allArticles[currentIndex - 1] : null;
  const nextArticle =
    currentIndex < allArticles.length - 1 ? allArticles[currentIndex + 1] : null;

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: localized.title, url });
      } catch {
        /* user cancelled */
      }
    } else {
      await navigator.clipboard.writeText(url);
    }
  };

  return (
    <article className="pb-16">
      {/* Hero image */}
      <div className="relative aspect-[21/9] max-h-[420px] w-full overflow-hidden bg-primary">
        <img
          src={article.coverImage}
          alt=""
          className="size-full object-cover"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      </div>

      <div className="container-aether">
        <div className="grid gap-10 lg:grid-cols-12 -mt-16 relative z-10">
          {/* Main column */}
          <div className="lg:col-span-8">
            <div className="rounded-xl border border-border bg-card p-6 md:p-10 shadow-soft">
              {/* Meta */}
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <Link to={getCategoryPath(article.category.slug)}>
                  <Badge variant="accent">{catName}</Badge>
                </Link>
                {article.isBreaking && <Badge variant="breaking">{t("common:breaking")}</Badge>}
                {article.isTrending && <Badge variant="trending">{t("common:trending")}</Badge>}
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary leading-tight">
                {localized.title}
              </h1>

              <p className="mt-4 text-lg text-muted leading-relaxed">{localized.excerpt}</p>

              {/* Author row */}
              <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-y border-border py-4">
                <div className="flex items-center gap-3">
                  {article.author.avatar && (
                    <img
                      src={article.author.avatar}
                      alt=""
                      className="size-11 rounded-full object-cover"
                    />
                  )}
                  <div>
                    <p className="font-semibold text-primary text-sm">{article.author.name}</p>
                    <p className="text-xs text-muted">
                      {formatDate(article.publishedAt, locale)} · {" "}
                      {article.readingTime}{" "}
                      {locale === "ar" ? "دقائق قراءة" : "min read"} · {" "}
                      {article.views.toLocaleString(locale === "ar" ? "ar-EG" : "en")}{" "}
                      {locale === "ar" ? "مشاهدة" : "views"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={handleShare} type="button">
                    <HiOutlineShare className="size-4" />
                    {t("common:share")}
                  </Button>
                  <Button variant="ghost" size="sm" type="button">
                    <HiOutlineBookmark className="size-4" />
                    {t("common:bookmark")}
                  </Button>
                </div>
              </div>

              {/* Body */}
              <div
                className="article-body mt-8 prose prose-slate max-w-none
                  prose-headings:text-primary prose-p:text-primary/90 prose-p:leading-relaxed
                  prose-a:text-accent prose-strong:text-primary
                  [&>p]:mb-5 [&>p]:text-[1.05rem] md:[&>p]:text-[1.1rem]"
                dangerouslySetInnerHTML={{ __html: content }}
              />

              {/* Tags */}
              {article.tags.length > 0 && (
                <div className="mt-10 flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-border px-3 py-1 text-xs text-muted"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Prev / Next */}
              <div className="mt-10 grid gap-4 sm:grid-cols-2 border-t border-border pt-8">
                {prevArticle ? (
                  <Link
                    to={getArticlePath(prevArticle, locale)}
                    className="group rounded-lg border border-border p-4 hover:border-accent/40 transition-colors"
                  >
                    <p className="text-xs text-muted mb-1">{t("articles:prevArticle")}</p>
                    <p className="text-sm font-semibold text-primary group-hover:text-accent line-clamp-2">
                      {getLocalizedArticle(prevArticle, locale).title}
                    </p>
                  </Link>
                ) : (
                  <div />
                )}
                {nextArticle && (
                  <Link
                    to={getArticlePath(nextArticle, locale)}
                    className="group rounded-lg border border-border p-4 hover:border-accent/40 transition-colors text-end"
                  >
                    <p className="text-xs text-muted mb-1">{t("articles:nextArticle")}</p>
                    <p className="text-sm font-semibold text-primary group-hover:text-accent line-clamp-2">
                      {getLocalizedArticle(nextArticle, locale).title}
                    </p>
                  </Link>
                )}
              </div>
            </div>

            {/* Related */}
            {related.length > 0 && (
              <div className="mt-12">
                <SectionTitle title={t("articles:relatedTitle")} />
                <div className="grid gap-6 sm:grid-cols-3">
                  {related.map((a) => (
                    <ArticleCard key={a.id} article={a} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4">
            <div className="sticky top-24 space-y-6">
              <div className="rounded-xl border border-border bg-card p-5">
                <SectionTitle title={t("articles:trendingTitle")} className="mb-4" />
                <div className="flex flex-col gap-4">
                  {trending.map((a) => (
                    <ArticleCard key={a.id} article={a} variant="horizontal" />
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
}
