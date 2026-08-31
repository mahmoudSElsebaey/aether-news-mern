import { useState } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { useAuth } from "@/context/AuthContext";
import { PageLoader } from "@/components/ui/Spinner";

export function RegisterPage() {
  const { t } = useTranslation(["navigation", "common"]);
  const { register, isAuthenticated, isStaff, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
      const user = await register({
        name: name.trim(),
        email: email.trim(),
        password,
      });
      if (user.role === "admin" || user.role === "editor") {
        navigate("/admin", { replace: true });
      } else {
        navigate("/en", { replace: true });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
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
          <p className="text-sm text-muted">{t("navigation:register")}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-primary">Name</label>
            <input
              type="text"
              required
              minLength={2}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-11 rounded-md border border-border bg-surface px-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-primary">Email</label>
            <input
              type="email"
              required
              autoComplete="email"
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
              minLength={6}
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-11 rounded-md border border-border bg-surface px-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <p className="mt-1 text-xs text-muted">Min 6 characters</p>
          </div>

          {error && (
            <p className="text-sm text-error bg-error/10 rounded-md px-3 py-2">{error}</p>
          )}

          <Button type="submit" variant="accent" size="lg" fullWidth isLoading={loading}>
            {t("navigation:register")}
          </Button>
        </form>

        <p className="mt-4 text-center text-sm text-muted">
          Already have an account?{" "}
          <Link to="/admin/login" className="text-accent font-medium hover:underline">
            {t("navigation:login")}
          </Link>
        </p>

        <p className="mt-4 text-xs text-muted text-center leading-relaxed">
          If the database has <strong>no users</strong>, your account becomes{" "}
          <strong>admin</strong> and you can open the dashboard.
        </p>
      </div>
    </div>
  );
}
