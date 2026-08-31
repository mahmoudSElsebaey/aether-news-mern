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

export function HomePage() {
  const { t } = useTranslation("home");
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
            <SectionTitle title={t("latest")} href="/news" />
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
        <CategorySection title={t("football")} categorySlug="football" articles={football} />
        <CategorySection title={t("technology")} categorySlug="technology" articles={technology} />
        <CategorySection
          title={t("sports")}
          categorySlug="sports"
          articles={sports.length ? sports : football}
        />
        <CategorySection title={t("business")} categorySlug="business" articles={business} />
      </div>

      <div className="mt-16">
        <NewsletterCTA />
      </div>
    </div>
  );
}
