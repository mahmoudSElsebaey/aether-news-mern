import { useTranslation } from "react-i18next";
import { LocaleLink } from "@/components/routing/LocaleLink";
import { cn } from "@/utils/cn";

interface LogoProps {
  className?: string;
  showWordmark?: boolean;
  size?: "sm" | "md" | "lg";
}

const sizeMap = {
  sm: { icon: 28, text: "text-lg" },
  md: { icon: 36, text: "text-xl" },
  lg: { icon: 44, text: "text-2xl" },
};

/** Delta mark: geometric D + signal dot */
export function Logo({ className, showWordmark = true, size = "md" }: LogoProps) {
  const { t, i18n } = useTranslation("common");
  const { icon, text } = sizeMap[size];
  const isAr = i18n.language?.startsWith("ar");

  return (
    <LocaleLink
      to="/"
      className={cn("inline-flex items-center gap-2.5 group", className)}
      aria-label={t("brand")}
    >
      <svg
        width={icon}
        height={icon}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform group-hover:scale-105"
        aria-hidden
      >
        <rect width="40" height="40" rx="8" fill="#0B1220" />
        <path
          d="M11 10h12c5.5 0 10 4 10 10s-4.5 10-10 10H11V10zm4 3.5v13h8c3.6 0 6.5-2.7 6.5-6.5S26.6 13.5 23 13.5H15z"
          fill="#E11D48"
        />
        <circle cx="32" cy="10" r="3" fill="#E11D48" />
      </svg>

      {showWordmark && (
        <span className={cn("font-bold tracking-tight text-primary", text, isAr && "font-arabic")}>
          {t("brand")}
        </span>
      )}
    </LocaleLink>
  );
}
