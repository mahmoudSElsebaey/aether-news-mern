import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import type { Article } from "@/types/article";
import { useLocale } from "@/hooks/useLocale";
import { getLocalizedArticle, getArticlePath } from "@/utils/article";
import { Badge } from "@/components/ui/Badge";

interface BreakingTickerProps {
  articles: Article[];
}

export function BreakingTicker({ articles }: BreakingTickerProps) {
  const locale = useLocale();
  const { t } = useTranslation("common");

  if (!articles.length) return null;

  // Duplicate for seamless loop
  const items = [...articles, ...articles];

  return (
    <div className="relative flex items-center gap-3 overflow-hidden rounded-md border border-border bg-card">
      <div className="shrink-0 ps-3 py-2.5">
        <Badge variant="breaking">{t("breaking")}</Badge>
      </div>

      <div className="relative flex-1 overflow-hidden py-2.5">
        <div className="ticker-track flex gap-8 whitespace-nowrap">
          {items.map((article, i) => {
            const localized = getLocalizedArticle(article, locale);
            return (
              <Link
                key={`${article.id}-${i}`}
                to={getArticlePath(article, locale)}
                className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-accent transition-colors"
              >
                <span className="size-1.5 rounded-full bg-accent shrink-0" />
                {localized.title}
              </Link>
            );
          })}
        </div>
      </div>

      <style>{`
        .ticker-track {
          animation: ticker-scroll 35s linear infinite;
        }
        .ticker-track:hover {
          animation-play-state: paused;
        }
        @keyframes ticker-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        html[dir="rtl"] .ticker-track {
          animation-name: ticker-scroll-rtl;
        }
        @keyframes ticker-scroll-rtl {
          0% { transform: translateX(0); }
          100% { transform: translateX(50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .ticker-track {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
