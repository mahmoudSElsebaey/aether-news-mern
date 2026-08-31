import { useTranslation } from "react-i18next";
import { Logo } from "@/components/brand/Logo";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { LocaleLink } from "@/components/routing/LocaleLink";

const footerLinks = {
  categories: [
    { key: "sports", path: "/sports" },
    { key: "football", path: "/football" },
    { key: "technology", path: "/technology" },
    { key: "business", path: "/business" },
  ],
} as const;

export function Footer() {
  const { t } = useTranslation(["navigation", "common"]);
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border bg-primary text-white">
      <div className="container-aether py-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Logo className="[&_span]:text-white [&_rect]:fill-white [&_path]:fill-accent [&_circle]:fill-accent" />
            <p className="mt-4 max-w-sm text-sm text-white/70 leading-relaxed">
              Independent journalism for a connected world. Sports, technology,
              business and the stories that matter — in Arabic and English.
            </p>
            <div className="mt-6">
              <LanguageSwitcher className="border-white/20 bg-white/5 [&>button]:text-white/80 [&>button[aria-pressed=true]]:bg-white/15 [&>button[aria-pressed=true]]:text-white" />
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/50 mb-4">
              {t("navigation:categories")}
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.categories.map((item) => (
                <li key={item.key}>
                  <LocaleLink
                    to={item.path}
                    className="text-sm text-white/80 hover:text-white transition-colors"
                  >
                    {t(`navigation:${item.key}`)}
                  </LocaleLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/50 mb-4">
              {t("common:newsletterTitle")}
            </h3>
            <p className="text-sm text-white/70 mb-4">{t("common:newsletterSubtitle")}</p>
            <form className="flex flex-col gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder={t("common:newsletterPlaceholder")}
                className="h-10 rounded-md border border-white/20 bg-white/10 px-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <button
                type="submit"
                className="h-10 rounded-md bg-accent px-4 text-sm font-medium text-white hover:bg-accent-hover transition-colors"
              >
                {t("common:newsletterCta")}
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/50">
          <p>© {year} Delta News. All rights reserved.</p>
          <p>Built for independent media · MERN</p>
        </div>
      </div>
    </footer>
  );
}
