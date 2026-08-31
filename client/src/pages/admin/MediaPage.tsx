import { useTranslation } from "react-i18next";

export function MediaPage() {
  const { t } = useTranslation("dashboard");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-primary">{t("media")}</h1>
        <p className="text-sm text-muted mt-1">{t("mediaHint")}</p>
      </div>
      <div className="rounded-xl border border-dashed border-border bg-card p-16 text-center">
        <p className="text-muted">{t("comingSoon")}</p>
        <p className="text-sm text-muted mt-2">Cloudinary upload · image library · CDN</p>
      </div>
    </div>
  );
}
