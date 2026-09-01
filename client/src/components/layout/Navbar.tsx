import { useMemo, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { HiOutlineMenuAlt3, HiOutlineX, HiOutlineSearch } from "react-icons/hi";
import { Logo } from "@/components/brand/Logo";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { LocaleLink } from "@/components/routing/LocaleLink";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";
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
  const { isAuthenticated, isStaff, user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const todayLabel = useMemo(() => {
    try {
      return new Intl.DateTimeFormat(locale === "ar" ? "ar-EG" : "en-GB", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(new Date());
    } catch {
      return new Date().toDateString();
    }
  }, [locale]);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="bg-primary text-white">
        <div className="container-aether flex h-9 items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3 min-w-0">
            <time className="hidden sm:inline text-white/70 whitespace-nowrap">{todayLabel}</time>
            <span className="hidden sm:inline text-white/30" aria-hidden>
              |
            </span>
            <span className="font-medium tracking-wide text-white/90 truncate">
              {t("tagline")}
            </span>
          </div>
          <div className="hidden sm:block shrink-0">
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
                    "relative px-3 py-2 text-sm font-medium rounded-md transition-colors duration-300",
                    isActive ? "text-accent" : "text-primary/80 hover:text-primary"
                  )
                }
                end={item.path === "/"}
              >
                {({ isActive }) => (
                  <>
                    <span>{t(item.key)}</span>
                    <span
                      className={cn(
                        "pointer-events-none absolute inset-x-3 -bottom-0.5 h-[2px] rounded-full bg-accent origin-center transition-transform duration-300 ease-out",
                        isActive ? "scale-x-100" : "scale-x-0"
                      )}
                    />
                  </>
                )}
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
              {isStaff && (
                <Link to="/admin">
                  <Button variant="outline" size="sm">
                    {t("admin")}
                  </Button>
                </Link>
              )}
              {isAuthenticated ? (
                <>
                  <span className="text-sm text-muted max-w-[120px] truncate">{user?.name}</span>
                  <Button variant="ghost" size="sm" type="button" onClick={() => logout()}>
                    {t("logout")}
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/admin/login">
                    <Button variant="ghost" size="sm">
                      {t("login")}
                    </Button>
                  </Link>
                  <Link to="/admin/register">
                    <Button variant="accent" size="sm">
                      {t("register")}
                    </Button>
                  </Link>
                </>
              )}
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
          <p className="px-3 pb-2 text-xs text-muted sm:hidden">{todayLabel}</p>
          {navItems.map((item) => (
            <NavLink
              key={item.key}
              to={localizedPath(item.path, locale)}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                cn(
                  "relative px-3 py-2.5 text-base font-medium rounded-md transition-colors",
                  isActive ? "text-accent" : "text-primary hover:bg-surface"
                )
              }
              end={item.path === "/"}
            >
              {({ isActive }) => (
                <>
                  {t(item.key)}
                  {isActive && (
                    <span className="absolute start-0 top-1/2 -translate-y-1/2 h-5 w-0.5 rounded-full bg-accent" />
                  )}
                </>
              )}
            </NavLink>
          ))}

          <div className="mt-3 pt-3 border-t border-border flex flex-col gap-2">
            <LanguageSwitcher />
            {isStaff && (
              <Link to="/admin" onClick={() => setMobileOpen(false)}>
                <Button variant="outline" size="md" fullWidth>
                  {t("admin")}
                </Button>
              </Link>
            )}
            {isAuthenticated ? (
              <Button
                variant="ghost"
                size="md"
                fullWidth
                type="button"
                onClick={() => {
                  logout();
                  setMobileOpen(false);
                }}
              >
                {t("logout")}
              </Button>
            ) : (
              <div className="flex gap-2">
                <Link to="/admin/login" className="flex-1" onClick={() => setMobileOpen(false)}>
                  <Button variant="outline" size="md" fullWidth>
                    {t("login")}
                  </Button>
                </Link>
                <Link to="/admin/register" className="flex-1" onClick={() => setMobileOpen(false)}>
                  <Button variant="accent" size="md" fullWidth>
                    {t("register")}
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
