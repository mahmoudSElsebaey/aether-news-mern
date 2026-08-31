import { useMemo, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { HiOutlineSearch } from "react-icons/hi";
import { articles as allArticles } from "@/data/articles";
import { categories } from "@/data/categories";
import { useLocale } from "@/hooks/useLocale";
import { getLocalizedArticle } from "@/utils/article";
import { ArticleCard } from "@/components/article/ArticleCard";
import { Button } from "@/components/ui/Button";
import { cn } from "@/utils/cn";

type SortKey = "latest" | "popular" | "trending";

const PAGE_SIZE = 9;

export function NewsListingPage() {
  const locale = useLocale();
  const { t } = useTranslation(["common", "articles", "navigation"]);
  const [searchParams, setSearchParams] = useSearchParams();

  const q = searchParams.get("q") || "";
  const categoryFilter = searchParams.get("category") || "all";
  const sort = (searchParams.get("sort") as SortKey) || "latest";
  const page = Math.max(1, Number(searchParams.get("page") || 1));

  const [searchInput, setSearchInput] = useState(q);

  const filtered = useMemo(() => {
    let list = allArticles.filter((a) => a.status === "published");

    if (categoryFilter !== "all") {
      list = list.filter((a) => a.category.slug === categoryFilter);
    }

    if (q.trim()) {
      const query = q.toLowerCase();
      list = list.filter((a) => {
        const loc = getLocalizedArticle(a, locale);
        return (
          loc.title.toLowerCase().includes(query) ||
          loc.excerpt.toLowerCase().includes(query) ||
          a.tags.some((tag) => tag.toLowerCase().includes(query))
        );
      });
    }

    if (sort === "popular") {
      list = [...list].sort((a, b) => b.views - a.views);
    } else if (sort === "trending") {
      list = [...list].filter((a) => a.isTrending).sort((a, b) => b.views - a.views);
    } else {
      list = [...list].sort(
        (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      );
    }

    return list;
  }, [q, categoryFilter, sort, locale]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageItems = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const updateParams = (updates: Record<string, string>) => {
    const next = new URLSearchParams(searchParams);
    Object.entries(updates).forEach(([k, v]) => {
      if (!v || v === "all" || (k === "page" && v === "1") || (k === "sort" && v === "latest")) {
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

  return (
    <div className="container-aether py-10 pb-16">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-primary">
          {q ? (locale === "ar" ? `نتائج البحث: ${q}` : `Search: ${q}`) : t("navigation:news")}
        </h1>
        <p className="mt-1 text-muted text-sm">
          {filtered.length}{" "}
          {locale === "ar" ? "نتيجة" : filtered.length === 1 ? "result" : "results"}
        </p>
      </header>

      {/* Filters */}
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
            <option value="all">{t("common:all")}</option>
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

      {/* Results */}
      {pageItems.length === 0 ? (
        <div className="py-20 text-center">
          <p className="text-lg text-muted">{t("common:noResults")}</p>
          <Link to="/news" className="mt-4 inline-block text-accent hover:underline">
            {t("common:seeAll")}
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {pageItems.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <nav className="mt-12 flex items-center justify-center gap-2" aria-label="Pagination">
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage <= 1}
            onClick={() => updateParams({ page: String(currentPage - 1) })}
          >
            {t("common:previous")}
          </Button>
          <span className="px-3 text-sm text-muted">
            {currentPage} / {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage >= totalPages}
            onClick={() => updateParams({ page: String(currentPage + 1) })}
          >
            {t("common:next")}
          </Button>
        </nav>
      )}
    </div>
  );
}
