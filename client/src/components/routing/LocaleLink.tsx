import { Link, type LinkProps } from "react-router-dom";
import { useLocale } from "@/hooks/useLocale";
import { localizedPath } from "@/utils/locale";

/** Link that automatically prefixes the current locale */
export function LocaleLink({ to, ...rest }: LinkProps) {
  const locale = useLocale();
  const path = typeof to === "string" ? localizedPath(to, locale) : to;
  return <Link to={path} {...rest} />;
}
