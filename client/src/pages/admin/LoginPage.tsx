import { useState } from "react";
import { Link, useNavigate, useLocation, Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { useAuth } from "@/context/AuthContext";
import { PageLoader } from "@/components/ui/Spinner";

const DEMO = [
  { role: "Admin", email: "admin@delta.news", password: "Admin123!" },
  { role: "Editor", email: "editor@delta.news", password: "Editor123!" },
];

export function LoginPage() {
  const { t } = useTranslation(["navigation", "common"]);
  const { login, isAuthenticated, isStaff, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || "/admin";

  const [email, setEmail] = useState("admin@delta.news");
  const [password, setPassword] = useState("Admin123!");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (authLoading) return <PageLoader />;
  if (isAuthenticated && isStaff) return <Navigate to="/admin" replace />;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const user = await login(email.trim(), password);
      if (user.role === "admin" || user.role === "editor") {
        navigate(from.startsWith("/admin") ? from : "/admin", { replace: true });
      } else {
        navigate("/en", { replace: true });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const fillDemo = (acc: (typeof DEMO)[0]) => {
    setEmail(acc.email);
    setPassword(acc.password);
    setError("");
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-surface">
      {/* Creative panel */}
      <div className="relative hidden lg:flex flex-col justify-between overflow-hidden bg-primary p-10 text-white">
        <div className="absolute inset-0 opacity-40">
          <div className="absolute -top-24 -start-24 size-80 rounded-full bg-accent blur-3xl" />
          <div className="absolute bottom-0 end-0 size-96 rounded-full bg-secondary blur-3xl" />
          <div
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />
        </div>
        <div className="relative z-10">
          <Logo className="[&_span]:text-white [&_rect]:fill-white/10 [&_path]:fill-accent [&_circle]:fill-accent" />
          <h1 className="mt-12 text-4xl font-bold leading-tight tracking-tight max-w-md">
            News that moves at the speed of the region.
          </h1>
          <p className="mt-4 text-white/70 max-w-sm text-sm leading-relaxed">
            Delta News — multilingual editorial workspace for sports, tech, and business.
          </p>
        </div>
        <div className="relative z-10 space-y-3">
          <p className="text-xs uppercase tracking-widest text-white/40">Test accounts</p>
          {DEMO.map((acc) => (
            <button
              key={acc.email}
              type="button"
              onClick={() => fillDemo(acc)}
              className="w-full text-start rounded-xl border border-white/10 bg-white/5 px-4 py-3 hover:bg-white/10 transition-colors"
            >
              <span className="text-xs font-semibold text-accent">{acc.role}</span>
              <p className="font-mono text-sm mt-0.5">{acc.email}</p>
              <p className="font-mono text-xs text-white/50">{acc.password}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Form */}
      <div className="flex flex-col justify-center px-6 py-12 sm:px-12">
        <div className="absolute top-4 end-4 lg:top-8 lg:end-8">
          <LanguageSwitcher />
        </div>

        <div className="mx-auto w-full max-w-md">
          <div className="lg:hidden mb-8">
            <Logo />
          </div>
          <h2 className="text-2xl font-bold text-primary">{t("navigation:login")}</h2>
          <p className="mt-1 text-sm text-muted">Access the Delta editorial dashboard</p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-primary">Email</label>
              <input
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-12 rounded-xl border border-border bg-card px-4 text-sm shadow-soft focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-primary">Password</label>
              <input
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-12 rounded-xl border border-border bg-card px-4 text-sm shadow-soft focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>

            {error && (
              <p className="text-sm text-error bg-error/10 rounded-xl px-3 py-2">{error}</p>
            )}

            <Button type="submit" variant="accent" size="lg" fullWidth isLoading={loading}>
              {t("navigation:login")}
            </Button>
          </form>

          {/* Mobile demo accounts only */}
          <div className="mt-6 lg:hidden space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted">Test accounts</p>
            {DEMO.map((acc) => (
              <button
                key={acc.email}
                type="button"
                onClick={() => fillDemo(acc)}
                className="w-full text-start rounded-xl border border-border bg-card px-3 py-2.5 text-sm hover:border-accent/40"
              >
                <span className="font-medium text-accent">{acc.role}</span>
                <span className="ms-2 font-mono text-xs text-muted">{acc.email}</span>
              </button>
            ))}
          </div>

          <p className="mt-8 text-center text-sm text-muted">
            No account?{" "}
            <Link to="/admin/register" className="text-accent font-medium hover:underline">
              {t("navigation:register")}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
