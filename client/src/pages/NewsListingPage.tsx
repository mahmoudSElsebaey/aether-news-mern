import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { HiOutlineSearch } from "react-icons/hi";
import { useArticles } from "@/hooks/useArticles";
import { useCategories } from "@/hooks/useCategories";
import { useLocale } from "@/hooks/useLocale";
import { ArticleCard } from "@/components/article/ArticleCard";
import { Button } from "@/components/ui/Button";
import { Seo } from "@/components/seo/Seo";
import { LocaleLink } from "@/components/routing/LocaleLink";
import { PageLoader, ErrorState } from "@/components/ui/Spinner";
import { cn } from "@/utils/cn";

type SortKey = "latest" | "popular" | "trending";

export function NewsListingPage() {
  const locale = useLocale();
  const { t } = useTranslation(["common", "articles", "navigation"]);
  const [searchParams, setSearchParams] = useSearchParams();
  const { categories } = useCategories();

  const q = searchParams.get("q") || "";
  const categoryFilter = searchParams.get("category") || "";
  const sort = (searchParams.get("sort") as SortKey) || "latest";
  const page = Math.max(1, Number(searchParams.get("page") || 1));
  const [searchInput, setSearchInput] = useState(q);

  const { articles, meta, loading, error, reload } = useArticles({
    language: locale,
    status: "published",
    category: categoryFilter || undefined,
    search: q || undefined,
    sort,
    page,
    limit: 9,
  });

  const updateParams = (updates: Record<string, string>) => {
    const next = new URLSearchParams(searchParams);
    Object.entries(updates).forEach(([k, v]) => {
      if (!v || (k === "page" && v === "1") || (k === "sort" && v === "latest")) {
        next.delete(k);
      } else {
        next.set(k, v);
      }
    });
    setSearchParams(next);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateParams({ q: searchInput, page: "1" });
  };

  const pageTitle = q
    ? locale === "ar"
      ? `نتائج البحث: ${q}`
      : `Search: ${q}`
    : t("navigation:news");

  return (
    <div className="container-aether py-10 pb-16">
      <Seo title={pageTitle} path="/news" />

      <header className="mb-8">
        <h1 className="text-3xl font-bold text-primary">{pageTitle}</h1>
        <p className="mt-1 text-muted text-sm">
          {meta?.total ?? articles.length}{" "}
          {locale === "ar" ? "نتيجة" : "results"}
        </p>
      </header>

      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <form onSubmit={handleSearch} className="flex gap-2 flex-1 max-w-md">
          <div className="relative flex-1">
            <HiOutlineSearch className="absolute start-3 top-1/2 -translate-y-1/2 size-4 text-muted" />
            <input
              type="search"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder={t("common:searchPlaceholder")}
              className="w-full h-10 rounded-md border border-border bg-card ps-9 pe-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>
          <Button type="submit" variant="primary" size="md">
            {t("common:search")}
          </Button>
        </form>

        <div className="flex flex-wrap gap-2 items-center">
          <select
            value={categoryFilter}
            onChange={(e) => updateParams({ category: e.target.value, page: "1" })}
            className="h-10 rounded-md border border-border bg-card px-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
          >
            <option value="">{t("common:all")}</option>
            {categories.map((c) => (
              <option key={c.id} value={c.slug}>
                {c.translations[locale].name}
              </option>
            ))}
          </select>

          <div className="flex rounded-md border border-border overflow-hidden">
            {(["latest", "popular", "trending"] as SortKey[]).map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => updateParams({ sort: key, page: "1" })}
                className={cn(
                  "px-3 h-10 text-sm font-medium transition-colors",
                  sort === key
                    ? "bg-primary text-white"
                    : "bg-card text-muted hover:text-primary hover:bg-surface"
                )}
              >
                {t(`articles:sort.${key}`)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {loading ? (
        <PageLoader />
      ) : error ? (
        <ErrorState message={error} onRetry={reload} />
      ) : articles.length === 0 ? (
        <div className="py-20 text-center">
          <p className="text-lg text-muted">{t("common:noResults")}</p>
          <LocaleLink to="/news" className="mt-4 inline-block text-accent hover:underline">
            {t("common:seeAll")}
          </LocaleLink>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      )}

      {meta && meta.totalPages > 1 && (
        <nav className="mt-12 flex items-center justify-center gap-2" aria-label="Pagination">
          <Button
            variant="outline"
            size="sm"
            disabled={page <= 1}
            onClick={() => updateParams({ page: String(page - 1) })}
          >
            {t("common:previous")}
          </Button>
          <span className="px-3 text-sm text-muted">
            {page} / {meta.totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            disabled={page >= meta.totalPages}
            onClick={() => updateParams({ page: String(page + 1) })}
          >
            {t("common:next")}
          </Button>
        </nav>
      )}
    </div>
  );
}
