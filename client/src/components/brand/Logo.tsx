import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
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

/** Aether News wordmark + mark */
export function Logo({ className, showWordmark = true, size = "md" }: LogoProps) {
  const { t, i18n } = useTranslation("common");
  const { icon, text } = sizeMap[size];
  const isAr = i18n.language === "ar";

  return (
    <Link
      to="/"
      className={cn("inline-flex items-center gap-2.5 group", className)}
      aria-label={t("brand")}
    >
      {/* Mark */}
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
          d="M12 28V12h4.2l5.4 10.8L27 12H31v16h-3.6V18.4L22.2 28h-2.4L14.4 18.4V28H12z"
          fill="#E11D48"
        />
        <circle cx="32" cy="10" r="3" fill="#E11D48" />
      </svg>

      {showWordmark && (
        <span
          className={cn(
            "font-bold tracking-tight text-primary",
            text,
            isAr && "font-arabic"
          )}
        >
          {t("brand")}
        </span>
      )}
    </Link>
  );
}
