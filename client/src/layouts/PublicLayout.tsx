import { Outlet } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/common/ScrollToTop";
import { SkipLink } from "@/components/common/SkipLink";
import { BackToTop } from "@/components/common/BackToTop";

export function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <SkipLink />
      <ScrollToTop />
      <Navbar />
      <main id="main-content" className="flex-1" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
