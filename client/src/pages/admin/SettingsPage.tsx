import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { useAuth } from "@/context/AuthContext";

export function SettingsPage() {
  const { t } = useTranslation(["dashboard", "common"]);
  const { user } = useAuth();

  return (
    <div className="space-y-6 max-w-xl">
      <div>
        <h1 className="text-2xl font-bold text-primary">{t("dashboard:settings")}</h1>
      </div>

      <div className="rounded-xl border border-border bg-card p-5 space-y-4">
        <div>
          <p className="text-sm text-muted">Account</p>
          <p className="font-medium text-primary">{user?.name}</p>
          <p className="text-sm text-muted">{user?.email}</p>
          <p className="text-sm text-muted capitalize">{user?.role}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-primary mb-2">{t("common:language")}</p>
          <LanguageSwitcher />
        </div>
      </div>
    </div>
  );
}
