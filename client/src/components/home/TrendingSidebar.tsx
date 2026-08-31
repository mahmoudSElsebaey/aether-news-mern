import { useTranslation } from "react-i18next";
import type { Article } from "@/types/article";
import { ArticleCard } from "@/components/article/ArticleCard";
import { SectionTitle } from "@/components/common/SectionTitle";

interface TrendingSidebarProps {
  articles: Article[];
}

export function TrendingSidebar({ articles }: TrendingSidebarProps) {
  const { t } = useTranslation("home");

  if (!articles.length) return null;

  return (
    <aside className="rounded-xl border border-border bg-card p-5">
      <SectionTitle title={t("trending")} className="mb-4" />
      <ol className="flex flex-col gap-4">
        {articles.slice(0, 6).map((article, index) => (
          <li key={article.id} className="flex gap-3">
            <span className="text-2xl font-bold text-accent/40 leading-none w-7 shrink-0 tabular-nums">
              {String(index + 1).padStart(2, "0")}
            </span>
            <ArticleCard article={article} variant="compact" className="flex-1" />
          </li>
        ))}
      </ol>
    </aside>
  );
}
