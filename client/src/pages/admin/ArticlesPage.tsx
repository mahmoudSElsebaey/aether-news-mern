import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { HiOutlinePlus, HiOutlinePencil, HiOutlineTrash } from "react-icons/hi";
import { articles as seedArticles } from "@/data/articles";
import type { Article } from "@/types/article";
import { useLocale } from "@/hooks/useLocale";
import { getLocalizedArticle, formatDate } from "@/utils/article";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/utils/cn";

/** Local editable store for admin demo (resets on refresh) */
let adminArticles: Article[] = [...seedArticles];

export function getAdminArticles() {
  return adminArticles;
}

export function setAdminArticles(next: Article[]) {
  adminArticles = next;
}

export function ArticlesPage() {
  const { t } = useTranslation("dashboard");
  const locale = useLocale();
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [list, setList] = useState<Article[]>(() => [...adminArticles]);

  const filtered = useMemo(() => {
    return list.filter((a) => {
      const loc = getLocalizedArticle(a, locale);
      const matchesQuery =
        !query ||
        loc.title.toLowerCase().includes(query.toLowerCase()) ||
        a.tags.some((tag) => tag.includes(query.toLowerCase()));
      const matchesStatus = statusFilter === "all" || a.status === statusFilter;
      return matchesQuery && matchesStatus;
    });
  }, [list, query, statusFilter, locale]);

  const handleDelete = (id: string) => {
    if (!window.confirm(t("confirmDelete"))) return;
    const next = list.filter((a) => a.id !== id);
    setList(next);
    setAdminArticles(next);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-primary">{t("articles")}</h1>
          <p className="text-sm text-muted mt-1">{t("articleList")}</p>
        </div>
        <Link to="/admin/articles/new">
          <Button variant="accent">
            <HiOutlinePlus className="size-4" />
            {t("newArticle")}
          </Button>
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t("searchArticles")}
          className="h-10 flex-1 max-w-sm rounded-md border border-border bg-card px-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="h-10 rounded-md border border-border bg-card px-3 text-sm"
        >
          <option value="all">All statuses</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
          <option value="scheduled">Scheduled</option>
        </select>
      </div>

      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-start">
            <thead className="bg-surface border-b border-border">
              <tr>
                <th className="px-4 py-3 font-semibold text-muted text-start">{t("titleField")}</th>
                <th className="px-4 py-3 font-semibold text-muted text-start hidden md:table-cell">
                  {t("category")}
                </th>
                <th className="px-4 py-3 font-semibold text-muted text-start">{t("status")}</th>
                <th className="px-4 py-3 font-semibold text-muted text-start hidden lg:table-cell">
                  Flags
                </th>
                <th className="px-4 py-3 font-semibold text-muted text-end">{t("actions")}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-12 text-center text-muted">
                    {t("noArticles")}
                  </td>
                </tr>
              ) : (
                filtered.map((article) => {
                  const loc = getLocalizedArticle(article, locale);
                  return (
                    <tr key={article.id} className="hover:bg-surface/50">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3 min-w-0">
                          <img
                            src={article.coverImage}
                            alt=""
                            className="size-10 rounded object-cover shrink-0 hidden sm:block"
                          />
                          <div className="min-w-0">
                            <p className="font-medium text-primary truncate max-w-xs">{loc.title}</p>
                            <p className="text-xs text-muted">
                              {formatDate(article.publishedAt, locale)} · {article.views} views
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell text-muted">
                        {article.category.translations[locale].name}
                      </td>
                      <td className="px-4 py-3">
                        <Badge
                          variant={article.status === "published" ? "default" : "muted"}
                          className={cn(
                            article.status === "draft" && "bg-warning/15 text-warning"
                          )}
                        >
                          {article.status}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 hidden lg:table-cell">
                        <div className="flex gap-1 flex-wrap">
                          {article.isFeatured && <Badge variant="featured">{t("featured")}</Badge>}
                          {article.isTrending && <Badge variant="trending">{t("trending")}</Badge>}
                          {article.isBreaking && <Badge variant="breaking">{t("breaking")}</Badge>}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-1">
                          <Link
                            to={`/admin/articles/${article.id}/edit`}
                            className="p-2 rounded-md text-muted hover:text-primary hover:bg-surface"
                            aria-label={t("editArticle")}
                          >
                            <HiOutlinePencil className="size-4" />
                          </Link>
                          <button
                            type="button"
                            onClick={() => handleDelete(article.id)}
                            className="p-2 rounded-md text-muted hover:text-error hover:bg-error/10"
                            aria-label={t("deleteArticle")}
                          >
                            <HiOutlineTrash className="size-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
