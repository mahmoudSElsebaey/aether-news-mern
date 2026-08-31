import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getCategoryBySlug } from "@/data/categories";
import { getArticlesByCategory } from "@/data/articles";
import { useLocale } from "@/hooks/useLocale";
import { ArticleCard } from "@/components/article/ArticleCard";
import { SectionTitle } from "@/components/common/SectionTitle";
import { Seo } from "@/components/seo/Seo";
import { LocaleLink } from "@/components/routing/LocaleLink";

export function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const locale = useLocale();
  const { t } = useTranslation("common");

  const category = getCategoryBySlug(slug || "");
  const articles = getArticlesByCategory(slug || "");

  if (!category) {
    return (
      <div className="container-aether py-20 text-center">
        <Seo title={t("noResults")} path="/" noIndex />
        <h1 className="text-2xl font-bold">{t("noResults")}</h1>
        <LocaleLink to="/" className="mt-4 inline-block text-accent hover:underline">
          {t("back")}
        </LocaleLink>
      </div>
    );
  }

  const name = category.translations[locale].name;
  const description = category.translations[locale].description;
  const [featured, ...rest] = articles;

  return (
    <div className="container-aether py-10 pb-16">
      <Seo
        title={name}
        description={description || `${name} — Aether News`}
        path={`/${category.slug}`}
      />

      <header className="mb-10 border-b border-border pb-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-2">
          {locale === "ar" ? "قسم" : "Category"}
        </p>
        <h1 className="text-3xl md:text-4xl font-bold text-primary">{name}</h1>
        {description && <p className="mt-2 text-muted max-w-2xl">{description}</p>}
        <p className="mt-3 text-sm text-muted">
          {articles.length}{" "}
          {locale === "ar" ? "مقال" : articles.length === 1 ? "article" : "articles"}
        </p>
      </header>

      {articles.length === 0 ? (
        <p className="text-muted">{t("noResults")}</p>
      ) : (
        <>
          {featured && (
            <div className="mb-10">
              <ArticleCard article={featured} variant="featured" priority />
            </div>
          )}
          {rest.length > 0 && (
            <>
              <SectionTitle title={t("latest")} />
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {rest.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
