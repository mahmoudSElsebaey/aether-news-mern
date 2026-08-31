import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  HiOutlineHome,
  HiOutlineNewspaper,
  HiOutlineTag,
  HiOutlineUsers,
  HiOutlinePhotograph,
  HiOutlineChartBar,
  HiOutlineCog,
  HiOutlineLogout,
  HiOutlineExternalLink,
} from "react-icons/hi";
import { Logo } from "@/components/brand/Logo";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { useAuth } from "@/context/AuthContext";
import { useLocale } from "@/hooks/useLocale";
import { localizedPath } from "@/utils/locale";
import { cn } from "@/utils/cn";

const links = [
  { key: "overview", path: "/admin", icon: HiOutlineHome, end: true },
  { key: "articles", path: "/admin/articles", icon: HiOutlineNewspaper },
  { key: "categories", path: "/admin/categories", icon: HiOutlineTag },
  { key: "users", path: "/admin/users", icon: HiOutlineUsers, adminOnly: true },
  { key: "media", path: "/admin/media", icon: HiOutlinePhotograph },
  { key: "analytics", path: "/admin/analytics", icon: HiOutlineChartBar },
  { key: "settings", path: "/admin/settings", icon: HiOutlineCog },
] as const;

interface AdminSidebarProps {
  onNavigate?: () => void;
}

export function AdminSidebar({ onNavigate }: AdminSidebarProps) {
  const { t } = useTranslation("dashboard");
  const { user, logout, isStaff } = useAuth();
  const locale = useLocale();

  return (
    <aside className="flex h-full flex-col bg-primary text-white">
      <div className="border-b border-white/10 px-5 py-5">
        <Logo
          size="sm"
          className="[&_span]:text-white [&_rect]:fill-white [&_path]:fill-accent [&_circle]:fill-accent"
        />
        <p className="mt-2 text-xs text-white/50">{t("title")}</p>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {links.map((link) => {
          if ("adminOnly" in link && link.adminOnly && user?.role !== "admin") return null;
          const Icon = link.icon;
          return (
            <NavLink
              key={link.key}
              to={link.path}
              end={"end" in link ? link.end : false}
              onClick={onNavigate}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-white/15 text-white"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                )
              }
            >
              <Icon className="size-5 shrink-0 opacity-80" />
              {t(link.key)}
            </NavLink>
          );
        })}
      </nav>

      <div className="border-t border-white/10 p-4 space-y-3">
        <LanguageSwitcher
          compact
          className="border-white/20 bg-white/5 [&>button]:text-white/80 [&>button[aria-pressed=true]]:bg-white/15 [&>button[aria-pressed=true]]:text-white w-full justify-center"
        />
        <a
          href={localizedPath("/", locale)}
          className="flex items-center gap-2 text-sm text-white/70 hover:text-white"
        >
          <HiOutlineExternalLink className="size-4" />
          {t("backToSite")}
        </a>
        {isStaff && (
          <button
            type="button"
            onClick={logout}
            className="flex w-full items-center gap-2 text-sm text-white/70 hover:text-white"
          >
            <HiOutlineLogout className="size-4" />
            {t("logout")}
          </button>
        )}
        {user && (
          <div className="pt-2 border-t border-white/10">
            <p className="text-sm font-medium truncate">{user.name}</p>
            <p className="text-xs text-white/50 truncate">{user.role}</p>
          </div>
        )}
      </div>
    </aside>
  );
}
