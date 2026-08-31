import { useState } from "react";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { useAuth } from "@/context/AuthContext";
import { PageLoader } from "@/components/ui/Spinner";

export function LoginPage() {
  const { t } = useTranslation(["navigation", "common"]);
  const { login, isAuthenticated, isStaff, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || "/admin";

  const [email, setEmail] = useState("admin@aether.news");
  const [password, setPassword] = useState("Admin123!");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (authLoading) return <PageLoader />;

  if (isAuthenticated && isStaff) {
    return <Navigate to="/admin" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-surface px-4">
      <div className="absolute top-4 end-4">
        <LanguageSwitcher />
      </div>

      <div className="w-full max-w-md rounded-xl border border-border bg-card p-8 shadow-soft">
        <div className="mb-8 flex flex-col items-center gap-3">
          <Logo />
          <p className="text-sm text-muted">{t("navigation:admin")} login</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-primary">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-11 rounded-md border border-border bg-surface px-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-primary">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-11 rounded-md border border-border bg-surface px-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>

          {error && (
            <p className="text-sm text-error bg-error/10 rounded-md px-3 py-2">{error}</p>
          )}

          <Button type="submit" variant="accent" size="lg" fullWidth isLoading={loading}>
            {t("navigation:login")}
          </Button>
        </form>

        <p className="mt-6 text-xs text-muted text-center leading-relaxed">
          Seed accounts (after npm run seed):
          <br />
          admin@aether.news / Admin123!
          <br />
          editor@aether.news / Editor123!
        </p>
      </div>
    </div>
  );
}
