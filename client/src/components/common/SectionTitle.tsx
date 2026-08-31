import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { cn } from "@/utils/cn";

interface SectionTitleProps {
  title: string;
  href?: string;
  className?: string;
}

export function SectionTitle({ title, href, className }: SectionTitleProps) {
  const { t } = useTranslation("common");

  return (
    <div className={cn("flex items-end justify-between gap-4 mb-5", className)}>
      <h2 className="text-xl md:text-2xl font-bold text-primary tracking-tight relative">
        <span className="relative z-10">{title}</span>
        <span className="absolute -bottom-1 start-0 h-1 w-10 rounded-full bg-accent" />
      </h2>
      {href && (
        <Link
          to={href}
          className="text-sm font-medium text-accent hover:underline shrink-0"
        >
          {t("seeAll")}
        </Link>
      )}
    </div>
  );
}
