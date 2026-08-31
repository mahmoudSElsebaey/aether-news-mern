import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/Button";
import { Link } from "react-router-dom";

export function SettingsPage() {
  const { t } = useTranslation(["dashboard", "common"]);
  const { user, logout } = useAuth();

  return (
    <div className="space-y-8 max-w-3xl">
      <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-6 md:p-8">
        <div className="absolute end-0 top-0 size-32 rounded-full bg-accent/10 blur-2xl" />
        <div className="relative flex flex-col sm:flex-row sm:items-center gap-5">
          <div className="flex size-16 items-center justify-center rounded-2xl bg-primary text-2xl font-bold text-white">
            {(user?.name || "D").charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl font-bold text-primary">{t("dashboard:settings")}</h1>
            <p className="text-muted text-sm mt-0.5 truncate">{user?.email}</p>
          </div>
          <span className="inline-flex self-start rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-accent">
            {user?.role}
          </span>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <section className="rounded-2xl border border-border bg-card p-5 space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted">Profile</h2>
          <dl className="space-y-3 text-sm">
            <div className="flex justify-between gap-3 border-b border-border/70 pb-2">
              <dt className="text-muted">Name</dt>
              <dd className="font-medium text-primary text-end">{user?.name}</dd>
            </div>
            <div className="flex justify-between gap-3 border-b border-border/70 pb-2">
              <dt className="text-muted">Email</dt>
              <dd className="font-medium text-primary text-end break-all">{user?.email}</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-muted">Role</dt>
              <dd className="font-medium text-primary capitalize">{user?.role}</dd>
            </div>
          </dl>
        </section>

        <section className="rounded-2xl border border-border bg-card p-5 space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted">
            {t("common:language")}
          </h2>
          <p className="text-sm text-muted">Dashboard interface language (RTL / LTR).</p>
          <LanguageSwitcher />
        </section>

        <section className="rounded-2xl border border-border bg-card p-5 space-y-3 sm:col-span-2">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted">Workspace</h2>
          <div className="grid gap-3 sm:grid-cols-3">
            <Link
              to="/admin/articles/new"
              className="rounded-xl border border-border bg-surface p-4 hover:border-accent/40 transition-colors"
            >
              <p className="font-semibold text-primary text-sm">{t("dashboard:newArticle")}</p>
              <p className="text-xs text-muted mt-1">EN + AR editor</p>
            </Link>
            <Link
              to="/admin/categories"
              className="rounded-xl border border-border bg-surface p-4 hover:border-accent/40 transition-colors"
            >
              <p className="font-semibold text-primary text-sm">{t("dashboard:categories")}</p>
              <p className="text-xs text-muted mt-1">Bilingual sections</p>
            </Link>
            <Link
              to="/admin/analytics"
              className="rounded-xl border border-border bg-surface p-4 hover:border-accent/40 transition-colors"
            >
              <p className="font-semibold text-primary text-sm">{t("dashboard:analytics")}</p>
              <p className="text-xs text-muted mt-1">Views & ranking</p>
            </Link>
          </div>
        </section>

        <section className="rounded-2xl border border-border bg-card p-5 sm:col-span-2">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted mb-3">Session</h2>
          <Button variant="outline" onClick={() => logout()}>
            {t("dashboard:logout")}
          </Button>
        </section>
      </div>
    </div>
  );
}
