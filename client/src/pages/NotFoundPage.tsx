import { useTranslation } from "react-i18next";
import { LocaleLink } from "@/components/routing/LocaleLink";
import { Seo } from "@/components/seo/Seo";
import { Button } from "@/components/ui/Button";

export function NotFoundPage() {
  const { t, i18n } = useTranslation("common");
  const isAr = i18n.language?.startsWith("ar");

  return (
    <div className="container-aether py-24 text-center">
      <Seo title="404" path="/" noIndex />
      <p className="text-6xl font-bold text-accent">404</p>
      <h1 className="mt-4 text-2xl font-bold text-primary">
        {isAr ? "الصفحة غير موجودة" : "Page not found"}
      </h1>
      <p className="mt-2 text-muted">{t("noResults")}</p>
      <div className="mt-8 flex justify-center gap-3">
        <LocaleLink to="/">
          <Button variant="accent">{isAr ? "الرئيسية" : "Home"}</Button>
        </LocaleLink>
        <LocaleLink to="/news">
          <Button variant="outline">{isAr ? "الأخبار" : "News"}</Button>
        </LocaleLink>
      </div>
    </div>
  );
}
