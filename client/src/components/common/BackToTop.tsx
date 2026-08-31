import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
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

  const scrollUp = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      onClick={scrollUp}
      aria-label={isRtl ? "العودة للأعلى" : "Back to top"}
      className={cn(
        "fixed bottom-6 z-50 flex size-12 items-center justify-center rounded-xl",
        "bg-primary text-white shadow-elevated border border-white/10",
        "transition-all duration-300 hover:scale-105 hover:bg-primary-hover",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
        isRtl ? "start-6" : "end-6",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      )}
    >
      {/* Mini Delta mark */}
      <svg width="22" height="22" viewBox="0 0 40 40" fill="none" aria-hidden>
        <path
          d="M11 10h12c5.5 0 10 4 10 10s-4.5 10-10 10H11V10zm4 3.5v13h8c3.6 0 6.5-2.7 6.5-6.5S26.6 13.5 23 13.5H15z"
          fill="#E11D48"
        />
        <path d="M20 8l4 5h-8l4-5z" fill="#fff" opacity="0.95" />
      </svg>
    </button>
  );
}
