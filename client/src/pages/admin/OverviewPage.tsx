import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  HiOutlineNewspaper,
  HiOutlineEye,
  HiOutlineDocumentText,
  HiOutlineCollection,
} from "react-icons/hi";
import { articles } from "@/data/articles";
import { categories } from "@/data/categories";
import { useAuth } from "@/context/AuthContext";
import { useLocale } from "@/hooks/useLocale";
import { getLocalizedArticle, formatRelativeTime } from "@/utils/article";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export function OverviewPage() {
  const { t } = useTranslation("dashboard");
  const { user } = useAuth();
  const locale = useLocale();

  const published = articles.filter((a) => a.status === "published");
  const totalViews = articles.reduce((sum, a) => sum + a.views, 0);
  const recent = [...articles]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, 5);

  const stats = [
    {
      label: t("stats.articles"),
      value: articles.length,
      icon: HiOutlineNewspaper,
      color: "text-accent",
    },
    {
      label: t("stats.published"),
      value: published.length,
      icon: HiOutlineDocumentText,
      color: "text-success",
    },
    {
      label: t("stats.views"),
      value: totalViews.toLocaleString(locale === "ar" ? "ar-EG" : "en"),
      icon: HiOutlineEye,
      color: "text-secondary",
    },
    {
      label: t("stats.categories"),
      value: categories.length,
      icon: HiOutlineCollection,
      color: "text-warning",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-primary">
          {t("welcome")}{user ? `, ${user.name.split(" ")[0]}` : ""}
        </h1>
        <p className="text-muted text-sm mt-1">{t("overview")}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-xl border border-border bg-card p-5 flex items-start gap-4"
          >
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
                  <div className="flex items-center gap-1.5 shrink-0">
                    {article.isFeatured && <Badge variant="featured">{t("featured")}</Badge>}
                    <Badge variant={article.status === "published" ? "default" : "muted"}>
                      {article.status}
                    </Badge>
                  </div>
                </li>
              );
            })}
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
