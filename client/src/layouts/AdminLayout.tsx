import { useState } from "react";
import { Outlet } from "react-router-dom";
import { HiOutlineMenuAlt3, HiOutlineX } from "react-icons/hi";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { cn } from "@/utils/cn";

export function AdminLayout() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-surface flex">
      {/* Desktop sidebar */}
      <div className="hidden lg:block w-64 shrink-0 fixed inset-y-0 start-0 z-30">
        <AdminSidebar />
      </div>

      {/* Mobile drawer */}
      <div
        className={cn(
          "fixed inset-0 z-40 lg:hidden transition-opacity",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />
        <div
          className={cn(
            "absolute inset-y-0 start-0 w-64 transition-transform duration-300",
            open ? "translate-x-0" : "-translate-x-full rtl:translate-x-full"
          )}
        >
          <AdminSidebar onNavigate={() => setOpen(false)} />
        </div>
      </div>

      <div className="flex-1 lg:ps-64 min-w-0">
        <header className="sticky top-0 z-20 flex h-14 items-center gap-3 border-b border-border bg-card/95 px-4 backdrop-blur lg:px-8">
          <button
            type="button"
            className="lg:hidden p-2 rounded-md hover:bg-surface"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            {open ? <HiOutlineX className="size-5" /> : <HiOutlineMenuAlt3 className="size-5" />}
          </button>
          <span className="text-sm font-medium text-muted lg:hidden">Aether Admin</span>
        </header>

        <main className="p-4 md:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
