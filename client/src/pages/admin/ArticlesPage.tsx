import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { HiOutlinePlus, HiOutlinePencil, HiOutlineTrash } from "react-icons/hi";
import { useArticles } from "@/hooks/useArticles";
import * as articlesApi from "@/services/articles.api";
import { useLocale } from "@/hooks/useLocale";
import { getLocalizedArticle, formatDate } from "@/utils/article";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ConfirmModal } from "@/components/ui/ConfirmModal";
import { PageLoader, ErrorState } from "@/components/ui/Spinner";
import { cn } from "@/utils/cn";

export function ArticlesPage() {
  const { t } = useTranslation("dashboard");
  const locale = useLocale();
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [actionError, setActionError] = useState("");

  const { articles, loading, error, reload } = useArticles({
    status: statusFilter === "all" ? "all" : statusFilter,
    search: query || undefined,
    limit: 50,
    sort: "latest",
  });

  const filtered = useMemo(() => articles, [articles]);

  const confirmDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    setActionError("");
    try {
      await articlesApi.deleteArticle(deleteId);
      setDeleteId(null);
      reload();
    } catch (err) {
      setActionError(err instanceof Error ? err.message : "Delete failed");
      setDeleteId(null);
    } finally {
      setDeleting(false);
    }
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

      {actionError && (
        <p className="text-sm text-error bg-error/10 rounded-xl px-3 py-2">{actionError}</p>
      )}

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

      {loading ? (
        <PageLoader />
      ) : error ? (
        <ErrorState message={error} onRetry={reload} />
      ) : (
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
                            {article.coverImage && (
                              <img
                                src={article.coverImage}
                                alt=""
                                className="size-10 rounded object-cover shrink-0 hidden sm:block"
                              />
                            )}
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
                            className={cn(article.status === "draft" && "bg-warning/15 text-warning")}
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
                            >
                              <HiOutlinePencil className="size-4" />
                            </Link>
                            <button
                              type="button"
                              onClick={() => setDeleteId(article.id)}
                              className="p-2 rounded-md text-muted hover:text-error hover:bg-error/10"
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
      )}

      <ConfirmModal
        open={!!deleteId}
        title={t("deleteArticle")}
        message={t("confirmDelete")}
        confirmLabel={t("deleteArticle")}
        cancelLabel="Cancel"
        loading={deleting}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
