import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useArticles } from "@/hooks/useArticles";
import { useLocale } from "@/hooks/useLocale";
import { getLocalizedArticle } from "@/utils/article";
import { PageLoader, ErrorState } from "@/components/ui/Spinner";

export function AnalyticsPage() {
  const { t } = useTranslation("dashboard");
  const locale = useLocale();
  const { articles, loading, error, reload } = useArticles({
    status: "all",
    limit: 50,
    sort: "popular",
  });

  const stats = useMemo(() => {
    const totalViews = articles.reduce((s, a) => s + a.views, 0);
    const published = articles.filter((a) => a.status === "published");
    const drafts = articles.filter((a) => a.status === "draft");
    const featured = articles.filter((a) => a.isFeatured);
    const byCat = new Map<string, number>();
    for (const a of articles) {
      const name = a.category.translations[locale]?.name || a.category.slug;
      byCat.set(name, (byCat.get(name) || 0) + a.views);
    }
    const catBars = [...byCat.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6);
    const maxCat = Math.max(...catBars.map((c) => c[1]), 1);
    const top = [...articles].sort((a, b) => b.views - a.views).slice(0, 6);
    return { totalViews, published, drafts, featured, catBars, maxCat, top };
  }, [articles, locale]);

  if (loading) return <PageLoader />;
  if (error) return <ErrorState message={error} onRetry={reload} />;

  return (
    <div className="space-y-8">
      <div className="relative overflow-hidden rounded-2xl bg-primary text-white p-6 md:p-8">
        <div className="absolute -end-10 -top-10 size-40 rounded-full bg-accent/30 blur-2xl" />
        <div className="absolute bottom-0 start-1/3 size-32 rounded-full bg-secondary/40 blur-2xl" />
        <div className="relative">
          <p className="text-xs uppercase tracking-[0.2em] text-white/50">Delta Analytics</p>
          <h1 className="mt-1 text-2xl md:text-3xl font-bold">{t("analytics")}</h1>
          <p className="mt-2 text-sm text-white/60 max-w-lg">{t("analyticsHint")}</p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { label: t("stats.views"), value: stats.totalViews.toLocaleString(locale === "ar" ? "ar-EG" : "en"), tone: "from-accent/20 to-accent/5" },
          { label: t("stats.articles"), value: articles.length, tone: "from-secondary/20 to-secondary/5" },
          { label: t("stats.published"), value: stats.published.length, tone: "from-success/20 to-success/5" },
          { label: t("stats.drafts"), value: stats.drafts.length, tone: "from-warning/20 to-warning/5" },
        ].map((card) => (
          <div
            key={card.label}
            className={`rounded-2xl border border-border bg-gradient-to-br ${card.tone} p-5`}
          >
            <p className="text-sm text-muted">{card.label}</p>
            <p className="mt-2 text-3xl font-bold text-primary tabular-nums">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="font-semibold text-primary mb-5">Views by category</h2>
          <div className="space-y-4">
            {stats.catBars.length === 0 && (
              <p className="text-sm text-muted">{t("noArticles")}</p>
            )}
            {stats.catBars.map(([name, views]) => (
              <div key={name}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="font-medium text-primary">{name}</span>
                  <span className="text-muted tabular-nums">{views.toLocaleString()}</span>
                </div>
                <div className="h-2 rounded-full bg-surface overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-accent to-primary transition-all"
                    style={{ width: `${(views / stats.maxCat) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="font-semibold text-primary mb-5">Top performing stories</h2>
          <ol className="space-y-3">
            {stats.top.map((a, i) => (
              <li
                key={a.id}
                className="flex items-center gap-3 rounded-xl border border-border/60 bg-surface/50 px-3 py-2.5"
              >
                <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary text-xs font-bold text-white">
                  {i + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-primary truncate">
                    {getLocalizedArticle(a, locale).title}
                  </p>
                  <p className="text-xs text-muted">{a.category.translations[locale].name}</p>
                </div>
                <span className="text-sm font-semibold text-accent tabular-nums">
                  {a.views.toLocaleString()}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-dashed border-border p-5 text-center">
          <p className="text-3xl font-bold text-primary">{stats.featured.length}</p>
          <p className="text-sm text-muted mt-1">{t("featured")}</p>
        </div>
        <div className="rounded-2xl border border-dashed border-border p-5 text-center">
          <p className="text-3xl font-bold text-primary">
            {articles.filter((a) => a.isTrending).length}
          </p>
          <p className="text-sm text-muted mt-1">{t("trending")}</p>
        </div>
        <div className="rounded-2xl border border-dashed border-border p-5 text-center">
          <p className="text-3xl font-bold text-primary">
            {articles.filter((a) => a.isBreaking).length}
          </p>
          <p className="text-sm text-muted mt-1">{t("breaking")}</p>
        </div>
      </div>
    </div>
  );
}
