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
  if (isAuthenticated && isStaff) return <Navigate to="/admin" replace />;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const user = await register({ name: name.trim(), email: email.trim(), password });
      navigate(user.role === "admin" || user.role === "editor" ? "/admin" : "/en", {
        replace: true,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-surface">
      <div className="relative hidden lg:flex flex-col justify-end overflow-hidden bg-primary p-10 text-white">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 end-0 size-72 rounded-full bg-accent/40 blur-3xl" />
          <div className="absolute bottom-0 start-1/4 size-64 rounded-full bg-secondary blur-3xl" />
        </div>
        <div className="relative z-10 max-w-md">
          <p className="text-xs uppercase tracking-[0.2em] text-accent font-semibold">Delta News</p>
          <h1 className="mt-3 text-3xl font-bold leading-snug">
            Create your editorial identity in two languages.
          </h1>
          <p className="mt-3 text-sm text-white/65 leading-relaxed">
            First account on an empty database becomes admin automatically.
          </p>
        </div>
      </div>

      <div className="relative flex flex-col justify-center px-6 py-12 sm:px-12">
        <div className="absolute top-4 end-4">
          <LanguageSwitcher />
        </div>
        <div className="mx-auto w-full max-w-md">
          <div className="mb-8">
            <Logo />
          </div>
          <h2 className="text-2xl font-bold text-primary">{t("navigation:register")}</h2>
          <p className="mt-1 text-sm text-muted">Join the newsroom</p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium">Name</label>
              <input
                required
                minLength={2}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full h-12 rounded-xl border border-border bg-card px-4 text-sm shadow-soft focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-12 rounded-xl border border-border bg-card px-4 text-sm shadow-soft focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium">Password</label>
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-12 rounded-xl border border-border bg-card px-4 text-sm shadow-soft focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
            {error && (
              <p className="text-sm text-error bg-error/10 rounded-xl px-3 py-2">{error}</p>
            )}
            <Button type="submit" variant="accent" size="lg" fullWidth isLoading={loading}>
              {t("navigation:register")}
            </Button>
          </form>

          <p className="mt-8 text-center text-sm text-muted">
            Already have an account?{" "}
            <Link to="/admin/login" className="text-accent font-medium hover:underline">
              {t("navigation:login")}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
