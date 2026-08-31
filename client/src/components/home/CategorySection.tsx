import type { Article } from "@/types/article";
import { ArticleCard } from "@/components/article/ArticleCard";
import { SectionTitle } from "@/components/common/SectionTitle";

interface CategorySectionProps {
  title: string;
  categorySlug: string;
  articles: Article[];
}

export function CategorySection({ title, categorySlug, articles }: CategorySectionProps) {
  if (!articles.length) return null;

  const [main, ...rest] = articles;

  return (
    <section>
      <SectionTitle title={title} href={`/${categorySlug}`} />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <ArticleCard article={main} variant="featured" />
        </div>
        <div className="lg:col-span-7 flex flex-col gap-4">
          {rest.slice(0, 4).map((article) => (
            <ArticleCard key={article.id} article={article} variant="horizontal" />
          ))}
        </div>
      </div>
    </section>
  );
}
