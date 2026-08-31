import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type UserRole = "user" | "editor" | "admin";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  preferredLanguage?: "en" | "ar";
}

interface AuthContextValue {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isStaff: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const STORAGE_KEY = "aether_auth_user";

/** Demo users until Phase 6 API integration */
const DEMO_USERS: Record<string, AuthUser & { password: string }> = {
  "admin@aether.news": {
    id: "u-admin",
    name: "Admin User",
    email: "admin@aether.news",
    role: "admin",
    password: "Admin123!",
    preferredLanguage: "en",
  },
  "editor@aether.news": {
    id: "u-editor",
    name: "Sara Al-Hassan",
    email: "editor@aether.news",
    role: "editor",
    password: "Editor123!",
    preferredLanguage: "ar",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
  },
};

function loadUser(): AuthUser | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as AuthUser;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => loadUser());

  const login = useCallback(async (email: string, password: string) => {
    await new Promise((r) => setTimeout(r, 400));
    const found = DEMO_USERS[email.toLowerCase()];
    if (!found || found.password !== password) {
      throw new Error("Invalid email or password");
    }
    const { password: _, ...safe } = found;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(safe));
    setUser(safe);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: !!user,
      isStaff: user?.role === "admin" || user?.role === "editor",
      login,
      logout,
    }),
    [user, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
