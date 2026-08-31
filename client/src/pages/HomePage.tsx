import { useTranslation } from "react-i18next";
import { Badge } from "@/components/ui/Badge";

/** Temporary homepage shell for Phase 1 — full editorial layout in Phase 2 */
export function HomePage() {
  const { t } = useTranslation(["home", "common"]);

  return (
    <div className="container-aether py-10">
      {/* Breaking ticker placeholder */}
      <div className="mb-8 flex items-center gap-3 overflow-hidden rounded-md border border-border bg-card px-4 py-2.5">
        <Badge variant="breaking">{t("home:breaking")}</Badge>
        <p className="text-sm text-muted truncate">
          Phase 1 complete — Brand & Design System foundation is ready.
        </p>
      </div>

      {/* Hero placeholder */}
      <section className="mb-12 grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-primary">
            <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 bg-gradient-to-t from-black/80 via-black/30 to-transparent">
              <Badge variant="featured" className="mb-3 w-fit">
                {t("home:hero.badge")}
              </Badge>
              <h1 className="text-2xl md:text-4xl font-bold text-white leading-tight max-w-2xl">
                Welcome to Aether News
              </h1>
              <p className="mt-2 text-white/80 text-sm md:text-base max-w-xl">
                A modern multilingual news platform. Full homepage arrives in Phase 2.
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 flex flex-col gap-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex gap-3 rounded-lg border border-border bg-card p-3"
            >
              <div className="size-20 shrink-0 rounded-md bg-slate-200" />
              <div className="flex flex-col justify-center gap-1.5 min-w-0">
                <Badge variant="muted" className="w-fit">
                  {t("home:trending")}
                </Badge>
                <p className="text-sm font-semibold text-primary line-clamp-2">
                  Sample story placeholder #{i}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sections preview */}
      <section className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {["sports", "football", "technology", "business"].map((cat) => (
          <div key={cat} className="rounded-lg border border-border bg-card p-5">
            <h2 className="text-lg font-bold text-primary mb-2">
              {t(`home:${cat}`)}
            </h2>
            <p className="text-sm text-muted">
              Category section will be fully designed in Phase 2.
            </p>
          </div>
        ))}
      </section>
    </div>
  );
}
