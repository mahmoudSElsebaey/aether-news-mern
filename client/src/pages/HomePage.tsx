import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useArticles } from "@/hooks/useArticles";
import { useLocale } from "@/hooks/useLocale";
import { BreakingTicker } from "@/components/article/BreakingTicker";
import { HeroArticle } from "@/components/article/HeroArticle";
import { ArticleCard } from "@/components/article/ArticleCard";
import { CategorySection } from "@/components/home/CategorySection";
import { TrendingSidebar } from "@/components/home/TrendingSidebar";
import { NewsletterCTA } from "@/components/home/NewsletterCTA";
import { SectionTitle } from "@/components/common/SectionTitle";
import { Seo } from "@/components/seo/Seo";
import { PageLoader, ErrorState } from "@/components/ui/Spinner";
import { LocaleLink } from "@/components/routing/LocaleLink";
import { Button } from "@/components/ui/Button";

export function HomePage() {
  const { t } = useTranslation(["home", "common"]);
  const locale = useLocale();

  const { articles, loading, error, reload } = useArticles({
    language: locale,
    status: "published",
    limit: 40,
    sort: "latest",
  });

  const { featured, trending, breaking, latest, byCategory } = useMemo(() => {
    const featured = articles.filter((a) => a.isFeatured);
    const trending = articles.filter((a) => a.isTrending).sort((a, b) => b.views - a.views);
    const breaking = articles.filter((a) => a.isBreaking);
    const latest = [...articles].sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
    const byCategory = (slug: string) => articles.filter((a) => a.category.slug === slug);
    return { featured, trending, breaking, latest, byCategory };
  }, [articles]);

  if (loading) return <PageLoader />;
  if (error) return <ErrorState message={error} onRetry={reload} />;

  if (articles.length === 0) {
    return (
      <div className="container-aether py-20 text-center">
        <Seo path="/" />
        <h1 className="text-2xl font-bold text-primary">Aether News</h1>
        <p className="mt-2 text-muted">{t("common:noResults")}</p>
        <p className="mt-1 text-sm text-muted">
          {locale === "ar"
            ? "شغّل الخادم ونفّذ npm run seed لإضافة محتوى تجريبي."
            : "Start the API and run npm run seed to load sample content."}
        </p>
        <div className="mt-6">
          <LocaleLink to="/news">
            <Button variant="outline">{t("common:seeAll")}</Button>
          </LocaleLink>
        </div>
      </div>
    );
  }

  const hero = featured[0] ?? latest[0];
  const sideFeatured = featured.slice(1, 4);
  const football = byCategory("football");
  const technology = byCategory("technology");
  const sports = byCategory("sports");
  const business = byCategory("business");

  return (
    <div className="pb-16">
      <Seo
        description="Independent journalism for a connected world. Sports, technology, business — in Arabic and English."
        path="/"
      />

      <div className="container-aether pt-6">
        <BreakingTicker articles={breaking.length ? breaking : latest.slice(0, 3)} />
      </div>

      <div className="container-aether mt-6">
        <div className="grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-8">{hero && <HeroArticle article={hero} />}</div>
          <div className="lg:col-span-4 flex flex-col gap-4">
            {(sideFeatured.length ? sideFeatured : latest.slice(1, 4)).map((article) => (
              <ArticleCard key={article.id} article={article} variant="horizontal" priority />
            ))}
          </div>
        </div>
      </div>

      <div className="container-aether mt-14">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <SectionTitle title={t("home:latest")} href="/news" />
            <div className="grid gap-6 sm:grid-cols-2">
              {latest.slice(0, 6).map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </div>
          <div className="lg:col-span-4">
            <TrendingSidebar articles={trending} />
          </div>
        </div>
      </div>

      <div className="container-aether mt-14 space-y-14">
        <CategorySection title={t("home:football")} categorySlug="football" articles={football} />
        <CategorySection
          title={t("home:technology")}
          categorySlug="technology"
          articles={technology}
        />
        <CategorySection
          title={t("home:sports")}
          categorySlug="sports"
          articles={sports.length ? sports : football}
        />
        <CategorySection title={t("home:business")} categorySlug="business" articles={business} />
      </div>

      <div className="mt-16">
        <NewsletterCTA />
      </div>
    </div>
  );
}
