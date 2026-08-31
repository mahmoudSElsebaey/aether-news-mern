import { useTranslation } from "react-i18next";
import { cn } from "@/utils/cn";

const languages = [
  { code: "ar", label: "العربية", short: "ع" },
  { code: "en", label: "English", short: "EN" },
] as const;

interface LanguageSwitcherProps {
  className?: string;
  compact?: boolean;
}

export function LanguageSwitcher({ className, compact = false }: LanguageSwitcherProps) {
  const { i18n } = useTranslation();
  const current = i18n.language?.startsWith("ar") ? "ar" : "en";

  const switchTo = (code: string) => {
    if (code === current) return;
    i18n.changeLanguage(code);
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-md border border-border bg-card p-0.5",
        className
      )}
      role="group"
      aria-label="Language"
    >
      {languages.map((lang) => {
        const isActive = current === lang.code;
        return (
          <button
            key={lang.code}
            type="button"
            onClick={() => switchTo(lang.code)}
            className={cn(
              "relative rounded-sm px-2.5 py-1.5 text-sm font-medium transition-colors",
              isActive
                ? "bg-primary text-white shadow-sm"
                : "text-muted hover:text-primary hover:bg-surface"
            )}
            aria-pressed={isActive}
            aria-label={lang.label}
          >
            {compact ? lang.short : lang.label}
          </button>
        );
      })}
    </div>
  );
}
