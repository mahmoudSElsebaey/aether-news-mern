import { useTranslation } from "react-i18next";
import {
  getFeaturedArticles,
  getTrendingArticles,
  getBreakingArticles,
  getLatestArticles,
  getArticlesByCategory,
} from "@/data/articles";
import { BreakingTicker } from "@/components/article/BreakingTicker";
import { HeroArticle } from "@/components/article/HeroArticle";
import { ArticleCard } from "@/components/article/ArticleCard";
import { CategorySection } from "@/components/home/CategorySection";
import { TrendingSidebar } from "@/components/home/TrendingSidebar";
import { NewsletterCTA } from "@/components/home/NewsletterCTA";
import { SectionTitle } from "@/components/common/SectionTitle";
import { Seo } from "@/components/seo/Seo";

export function HomePage() {
  const { t } = useTranslation("home");

  const featured = getFeaturedArticles();
  const trending = getTrendingArticles();
  const breaking = getBreakingArticles();
  const latest = getLatestArticles(8);
  const sports = getArticlesByCategory("sports");
  const football = getArticlesByCategory("football");
  const technology = getArticlesByCategory("technology");
  const business = getArticlesByCategory("business");

  const hero = featured[0] ?? latest[0];
  const sideFeatured = featured.slice(1, 4);

  return (
    <div className="pb-16">
      <Seo
        title={undefined}
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
            {sideFeatured.map((article) => (
              <ArticleCard key={article.id} article={article} variant="horizontal" priority />
            ))}
            {sideFeatured.length === 0 &&
              latest.slice(1, 4).map((article) => (
                <ArticleCard key={article.id} article={article} variant="horizontal" />
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
