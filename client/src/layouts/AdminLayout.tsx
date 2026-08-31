import { useState } from "react";
import { Outlet } from "react-router-dom";
import { HiOutlineMenuAlt3, HiOutlineX } from "react-icons/hi";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { ScrollToTop } from "@/components/common/ScrollToTop";
import { SkipLink } from "@/components/common/SkipLink";
import { cn } from "@/utils/cn";

export function AdminLayout() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-surface flex">
      <SkipLink />
      <ScrollToTop />

      <div className="hidden lg:block w-64 shrink-0 fixed inset-y-0 start-0 z-30">
        <AdminSidebar />
      </div>

      <div
        className={cn(
          "fixed inset-0 z-40 lg:hidden transition-opacity",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} aria-hidden />
        <div
          className={cn(
            "absolute inset-y-0 start-0 w-64 transition-transform duration-300",
            open ? "translate-x-0" : "-translate-x-full rtl:translate-x-full"
          )}
          role="dialog"
          aria-modal="true"
          aria-label="Admin menu"
        >
          <AdminSidebar onNavigate={() => setOpen(false)} />
        </div>
      </div>

      <div className="flex-1 lg:ps-64 min-w-0">
        <header className="sticky top-0 z-20 flex h-14 items-center gap-3 border-b border-border bg-card/95 px-4 backdrop-blur lg:px-8">
          <button
            type="button"
            className="lg:hidden p-2 rounded-md hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
          >
            {open ? <HiOutlineX className="size-5" /> : <HiOutlineMenuAlt3 className="size-5" />}
          </button>
          <span className="text-sm font-medium text-muted lg:hidden">Delta Admin</span>
        </header>

        <main id="main-content" className="p-4 md:p-6 lg:p-8" tabIndex={-1}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
