import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import * as authApi from "@/services/auth.api";
import { setStoredToken } from "@/services/api";
import type { ApiUser } from "@/types/api";

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
  loading: boolean;
  login: (email: string, password: string) => Promise<AuthUser>;
  register: (payload: {
    name: string;
    email: string;
    password: string;
    preferredLanguage?: string;
  }) => Promise<AuthUser>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function toAuthUser(u: ApiUser): AuthUser {
  return {
    id: String(u.id),
    name: u.name,
    email: u.email,
    role: u.role,
    avatar: u.avatar,
    preferredLanguage: u.preferredLanguage,
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const me = await authApi.meRequest();
      setUser(toAuthUser(me));
    } catch {
      setUser(null);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const me = await authApi.meRequest();
        if (!cancelled) setUser(toAuthUser(me));
      } catch {
        if (!cancelled) setUser(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const result = await authApi.loginRequest(email, password);
    if (result.token) setStoredToken(result.token);
    const authUser = toAuthUser(result.user);
    setUser(authUser);
    return authUser;
  }, []);

  const register = useCallback(
    async (payload: {
      name: string;
      email: string;
      password: string;
      preferredLanguage?: string;
    }) => {
      const result = await authApi.registerRequest(payload);
      if (result.token) setStoredToken(result.token);
      const authUser = toAuthUser(result.user);
      setUser(authUser);
      return authUser;
    },
    []
  );

  const logout = useCallback(async () => {
    try {
      await authApi.logoutRequest();
    } catch {
      // ignore
    }
    setStoredToken(null);
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: !!user,
      isStaff: user?.role === "admin" || user?.role === "editor",
      loading,
      login,
      register,
      logout,
      refresh,
    }),
    [user, loading, login, register, logout, refresh]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
