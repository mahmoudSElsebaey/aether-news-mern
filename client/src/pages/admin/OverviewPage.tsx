import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  HiOutlineNewspaper,
  HiOutlineEye,
  HiOutlineDocumentText,
  HiOutlineCollection,
} from "react-icons/hi";
import { useArticles } from "@/hooks/useArticles";
import { useCategories } from "@/hooks/useCategories";
import { useAuth } from "@/context/AuthContext";
import { useLocale } from "@/hooks/useLocale";
import { getLocalizedArticle, formatRelativeTime } from "@/utils/article";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { PageLoader, ErrorState } from "@/components/ui/Spinner";

export function OverviewPage() {
  const { t } = useTranslation("dashboard");
  const { user } = useAuth();
  const locale = useLocale();

  const { articles, loading, error, reload } = useArticles({
    status: "all",
    limit: 50,
    sort: "latest",
  });
  const { categories } = useCategories(true);

  if (loading) return <PageLoader />;
  if (error) return <ErrorState message={error} onRetry={reload} />;

  const published = articles.filter((a) => a.status === "published");
  const drafts = articles.filter((a) => a.status === "draft");
  const totalViews = articles.reduce((sum, a) => sum + a.views, 0);
  const recent = articles.slice(0, 5);

  const stats = [
    { label: t("stats.articles"), value: articles.length, icon: HiOutlineNewspaper, color: "text-accent" },
    { label: t("stats.published"), value: published.length, icon: HiOutlineDocumentText, color: "text-success" },
    {
      label: t("stats.views"),
      value: totalViews.toLocaleString(locale === "ar" ? "ar-EG" : "en"),
      icon: HiOutlineEye,
      color: "text-secondary",
    },
    { label: t("stats.categories"), value: categories.length, icon: HiOutlineCollection, color: "text-warning" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-primary">
          {t("welcome")}{user ? `, ${user.name.split(" ")[0]}` : ""}
        </h1>
        <p className="text-muted text-sm mt-1">
          {t("overview")} · {drafts.length} {t("stats.drafts")}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl border border-border bg-card p-5 flex items-start gap-4">
            <div className={`rounded-lg bg-surface p-3 ${s.color}`}>
              <s.icon className="size-6" />
            </div>
            <div>
              <p className="text-sm text-muted">{s.label}</p>
              <p className="text-2xl font-bold text-primary mt-0.5">{s.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-xl border border-border bg-card">
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <h2 className="font-semibold text-primary">{t("recentArticles")}</h2>
            <Link to="/admin/articles" className="text-sm text-accent hover:underline">
              {t("articleList")}
            </Link>
          </div>
          <ul className="divide-y divide-border">
            {recent.map((article) => {
              const loc = getLocalizedArticle(article, locale);
              return (
                <li key={article.id} className="px-5 py-3.5 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-primary truncate">{loc.title}</p>
                    <p className="text-xs text-muted mt-0.5">
                      {formatRelativeTime(article.publishedAt, locale)} ·{" "}
                      {article.category.translations[locale].name}
                    </p>
                  </div>
                  <Badge variant={article.status === "published" ? "default" : "muted"}>
                    {article.status}
                  </Badge>
                </li>
              );
            })}
            {recent.length === 0 && (
              <li className="px-5 py-8 text-center text-muted text-sm">{t("noArticles")}</li>
            )}
          </ul>
        </div>

        <div className="rounded-xl border border-border bg-card p-5">
          <h2 className="font-semibold text-primary mb-4">{t("quickActions")}</h2>
          <div className="flex flex-col gap-2">
            <Link to="/admin/articles/new">
              <Button variant="accent" fullWidth>
                {t("newArticle")}
              </Button>
            </Link>
            <Link to="/admin/categories">
              <Button variant="outline" fullWidth>
                {t("manageCategories")}
              </Button>
            </Link>
            <Link to="/admin/articles">
              <Button variant="ghost" fullWidth>
                {t("articleList")}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
