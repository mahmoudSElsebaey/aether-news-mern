import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/** Scroll window to top on pathname change */
export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" in window ? "instant" : "auto" });
  }, [pathname]);

  return null;
}
