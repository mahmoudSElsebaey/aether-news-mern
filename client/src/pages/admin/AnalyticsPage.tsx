import { useTranslation } from "react-i18next";
import { articles } from "@/data/articles";
import { useLocale } from "@/hooks/useLocale";
import { getLocalizedArticle } from "@/utils/article";

export function AnalyticsPage() {
  const { t } = useTranslation("dashboard");
  const locale = useLocale();
  const top = [...articles].sort((a, b) => b.views - a.views).slice(0, 5);
  const totalViews = articles.reduce((s, a) => s + a.views, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-primary">{t("analytics")}</h1>
        <p className="text-sm text-muted mt-1">{t("analyticsHint")}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-border bg-card p-5">
          <p className="text-sm text-muted">{t("stats.views")}</p>
          <p className="text-3xl font-bold text-primary mt-1">
            {totalViews.toLocaleString(locale === "ar" ? "ar-EG" : "en")}
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-5">
          <p className="text-sm text-muted">{t("stats.articles")}</p>
          <p className="text-3xl font-bold text-primary mt-1">{articles.length}</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-5">
          <p className="text-sm text-muted">{t("stats.published")}</p>
          <p className="text-3xl font-bold text-primary mt-1">
            {articles.filter((a) => a.status === "published").length}
          </p>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-5">
        <h2 className="font-semibold text-primary mb-4">Top articles by views</h2>
        <ol className="space-y-3">
          {top.map((a, i) => (
            <li key={a.id} className="flex items-center justify-between gap-3">
              <span className="text-sm text-primary">
                <span className="text-muted me-2">{i + 1}.</span>
                {getLocalizedArticle(a, locale).title}
              </span>
              <span className="text-sm font-medium text-muted tabular-nums">
                {a.views.toLocaleString()}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
