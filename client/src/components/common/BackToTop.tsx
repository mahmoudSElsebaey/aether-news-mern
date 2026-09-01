import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { HiOutlineChevronUp } from "react-icons/hi";
import { cn } from "@/utils/cn";

export function BackToTop() {
  const { i18n } = useTranslation();
  const isRtl = i18n.language?.startsWith("ar");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 420);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label={isRtl ? "العودة للأعلى" : "Back to top"}
      className={cn(
        "fixed bottom-6 z-50 flex size-11 items-center justify-center rounded-full",
        "bg-primary text-white shadow-elevated",
        "ring-2 ring-accent/40 hover:ring-accent hover:bg-primary-hover",
        "transition-all duration-300",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
        isRtl ? "start-6" : "end-6",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      )}
    >
      <HiOutlineChevronUp className="size-6" />
    </button>
  );
}
