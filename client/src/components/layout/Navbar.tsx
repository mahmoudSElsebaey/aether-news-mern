import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { HiOutlineMenuAlt3, HiOutlineX, HiOutlineSearch } from "react-icons/hi";
import { Logo } from "@/components/brand/Logo";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { LocaleLink } from "@/components/routing/LocaleLink";
import { Button } from "@/components/ui/Button";
import { useLocale } from "@/hooks/useLocale";
import { localizedPath } from "@/utils/locale";
import { cn } from "@/utils/cn";

const navItems = [
  { key: "home", path: "/" },
  { key: "news", path: "/news" },
  { key: "sports", path: "/sports" },
  { key: "football", path: "/football" },
  { key: "technology", path: "/technology" },
  { key: "business", path: "/business" },
] as const;

export function Navbar() {
  const { t } = useTranslation("navigation");
  const locale = useLocale();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="bg-primary text-white">
        <div className="container-aether flex h-8 items-center justify-between text-xs">
          <span className="font-medium tracking-wide opacity-90">
            Aether News · Independent Journalism
          </span>
          <div className="hidden sm:block">
            <LanguageSwitcher
              compact
              className="border-white/20 bg-transparent [&>button]:text-white/80 [&>button[aria-pressed=true]]:bg-white/15 [&>button[aria-pressed=true]]:text-white"
            />
          </div>
        </div>
      </div>

      <div className="container-aether">
        <div className="flex h-16 items-center justify-between gap-4">
          <Logo size="md" />

          <nav className="hidden lg:flex items-center gap-1" aria-label="Main">
            {navItems.map((item) => (
              <NavLink
                key={item.key}
                to={localizedPath(item.path, locale)}
                className={({ isActive }) =>
                  cn(
                    "px-3 py-2 text-sm font-medium rounded-md transition-colors",
                    isActive
                      ? "text-accent"
                      : "text-primary/80 hover:text-primary hover:bg-surface"
                  )
                }
                end={item.path === "/"}
              >
                {t(item.key)}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <LocaleLink
              to="/search"
              className="p-2 rounded-md text-muted hover:text-primary hover:bg-surface transition-colors"
              aria-label={t("search")}
            >
              <HiOutlineSearch className="size-5" />
            </LocaleLink>

            <div className="hidden sm:block lg:hidden">
              <LanguageSwitcher compact />
            </div>

            <div className="hidden md:flex items-center gap-2">
              <Button variant="ghost" size="sm">
                {t("login")}
              </Button>
              <Button variant="accent" size="sm">
                {t("register")}
              </Button>
            </div>

            <button
              type="button"
              className="lg:hidden p-2 rounded-md text-primary hover:bg-surface"
              onClick={() => setMobileOpen((v) => !v)}
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? t("closeMenu") : t("menu")}
            >
              {mobileOpen ? <HiOutlineX className="size-6" /> : <HiOutlineMenuAlt3 className="size-6" />}
            </button>
          </div>
        </div>
      </div>

      <div
        className={cn(
          "lg:hidden border-t border-border bg-card overflow-hidden transition-all duration-300",
          mobileOpen ? "max-h-[480px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <nav className="container-aether py-4 flex flex-col gap-1" aria-label="Mobile">
          {navItems.map((item) => (
            <NavLink
              key={item.key}
              to={localizedPath(item.path, locale)}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                cn(
                  "px-3 py-2.5 text-base font-medium rounded-md",
                  isActive ? "bg-accent/10 text-accent" : "text-primary hover:bg-surface"
                )
              }
              end={item.path === "/"}
            >
              {t(item.key)}
            </NavLink>
          ))}

          <LocaleLink
            to="/search"
            onClick={() => setMobileOpen(false)}
            className="px-3 py-2.5 text-base font-medium rounded-md text-primary hover:bg-surface flex items-center gap-2"
          >
            <HiOutlineSearch className="size-5" />
            {t("search")}
          </LocaleLink>

          <div className="mt-3 pt-3 border-t border-border flex flex-col gap-2">
            <LanguageSwitcher />
            <div className="flex gap-2">
              <Button variant="outline" size="md" fullWidth>
                {t("login")}
              </Button>
              <Button variant="accent" size="md" fullWidth>
                {t("register")}
              </Button>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
