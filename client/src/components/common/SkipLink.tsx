import { useTranslation } from "react-i18next";

export function SkipLink() {
  const { i18n } = useTranslation();
  const label = i18n.language?.startsWith("ar") ? "تخطي إلى المحتوى" : "Skip to content";

  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:start-2 focus:z-[100] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
    >
      {label}
    </a>
  );
}
