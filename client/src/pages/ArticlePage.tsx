import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { HiOutlineShare, HiOutlineBookmark } from "react-icons/hi2";
import { useState } from "react";
import { useArticle, useArticles } from "@/hooks/useArticles";
import { useAuth } from "@/context/AuthContext";
import { useLocale } from "@/hooks/useLocale";
import {
  getLocalizedArticle,
  getCategoryPath,
  formatDate,
} from "@/utils/article";
import { resolveMediaUrl } from "@/services/upload.api";
import * as bookmarksApi from "@/services/bookmarks.api";
import { Badge } from "@/components/ui/Badge";
import { ArticleCard } from "@/components/article/ArticleCard";
import { SectionTitle } from "@/components/common/SectionTitle";
import { Button } from "@/components/ui/Button";
import { Seo } from "@/components/seo/Seo";
import { LocaleLink } from "@/components/routing/LocaleLink";
import { PageLoader, ErrorState } from "@/components/ui/Spinner";

export function ArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const locale = useLocale();
  const { t } = useTranslation(["common", "articles"]);
  const { isAuthenticated } = useAuth();
  const { article, loading, error, reload } = useArticle(slug);
  const { articles: relatedPool } = useArticles(
    { language: locale, status: "published", limit: 20, sort: "latest" },
    !!article
  );
  const [bookmarkMsg, setBookmarkMsg] = useState("");

  if (loading) return <PageLoader />;
  if (error || !article) {
    return (
      <div className="container-aether py-20 text-center">
        <Seo title={t("common:noResults")} path="/" noIndex />
        <ErrorState message={error || t("common:noResults")} onRetry={reload} />
        <LocaleLink to="/" className="mt-4 inline-block text-accent hover:underline">
          {t("common:back")}
        </LocaleLink>
      </div>
    );
  }

  const localized = getLocalizedArticle(article, locale);
  const content =
    article.translations[locale].content ||
    article.translations[locale === "ar" ? "en" : "ar"].content;
  const catName = article.category.translations[locale].name;
  const catPath = getCategoryPath(article.category.slug, locale);
  const cover = resolveMediaUrl(article.coverImage);

  const related = relatedPool
    .filter((a) => a.category.slug === article.category.slug && a.id !== article.id)
    .slice(0, 3);
  const trending = relatedPool
    .filter((a) => a.isTrending && a.id !== article.id)
    .slice(0, 5);

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: localized.title, url });
      } catch {
        /* cancelled */
      }
    } else {
      await navigator.clipboard.writeText(url);
    }
  };

  const handleBookmark = async () => {
    if (!isAuthenticated) {
      setBookmarkMsg(locale === "ar" ? "يجب تسجيل الدخول أولاً" : "Please log in first");
      return;
    }
    try {
      await bookmarksApi.addBookmark(article.id);
      setBookmarkMsg(t("common:bookmarked"));
    } catch (err) {
      setBookmarkMsg(err instanceof Error ? err.message : "Error");
    }
  };

  return (
    <article className="pb-16">
      <Seo
        title={localized.seoTitle || localized.title}
        description={localized.seoDescription || localized.excerpt}
        image={cover}
        path={`/article/${localized.slug}`}
        type="article"
        publishedAt={article.publishedAt}
        authorName={article.author.name}
      />

      <div className="relative aspect-[21/9] max-h-[420px] w-full overflow-hidden bg-primary">
        {cover ? (
          <img
            src={cover}
            alt=""
            className="absolute inset-0 block h-full w-full object-cover object-center"
            fetchPriority="high"
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      </div>

      <div className="container-aether">
        <div className="grid gap-10 lg:grid-cols-12 -mt-16 relative z-10">
          <div className="lg:col-span-8">
            <div className="rounded-xl border border-border bg-card p-6 md:p-10 shadow-soft">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <Link to={catPath}>
                  <Badge variant="accent">{catName}</Badge>
                </Link>
                {article.isBreaking && <Badge variant="breaking">{t("common:breaking")}</Badge>}
                {article.isTrending && <Badge variant="trending">{t("common:trending")}</Badge>}
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary leading-tight">
                {localized.title}
              </h1>
              <p className="mt-4 text-lg text-muted leading-relaxed">{localized.excerpt}</p>

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
                      {formatDate(article.publishedAt, locale)} · {article.readingTime}{" "}
                      {locale === "ar" ? "دقائق قراءة" : "min read"} ·{" "}
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
                  <Button variant="ghost" size="sm" type="button" onClick={handleBookmark}>
                    <HiOutlineBookmark className="size-4" />
                    {t("common:bookmark")}
                  </Button>
                </div>
              </div>
              {bookmarkMsg && <p className="mt-2 text-sm text-accent">{bookmarkMsg}</p>}

              <div
                className="article-body mt-8 prose prose-slate max-w-none
                  prose-headings:text-primary prose-p:text-primary/90
                  [&>p]:mb-5 [&>p]:text-[1.05rem] md:[&>p]:text-[1.1rem]"
                dangerouslySetInnerHTML={{ __html: content }}
              />

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
            </div>

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

          <aside className="lg:col-span-4">
            <div className="sticky top-24 space-y-6">
              <div className="rounded-xl border border-border bg-card p-5">
                <SectionTitle title={t("articles:trendingTitle")} className="mb-4" />
                <div className="flex flex-col gap-5">
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
