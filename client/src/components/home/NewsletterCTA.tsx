import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/Button";

export function NewsletterCTA() {
  const { t } = useTranslation("common");
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setDone(true);
  };

  return (
    <section className="rounded-xl bg-primary text-white overflow-hidden">
      <div className="container-aether py-12 md:py-16">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold">{t("newsletterTitle")}</h2>
          <p className="mt-2 text-white/70">{t("newsletterSubtitle")}</p>

          {done ? (
            <p className="mt-6 text-accent font-medium">{t("newsletterSuccess")}</p>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="mt-6 flex flex-col sm:flex-row gap-2 max-w-md mx-auto"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("newsletterPlaceholder")}
                className="flex-1 h-11 rounded-md border border-white/20 bg-white/10 px-4 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <Button type="submit" variant="accent" size="md" className="h-11">
                {t("newsletterCta")}
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
