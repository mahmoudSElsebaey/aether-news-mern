import { api, type ApiSuccess } from "./api";
import type { AuthUser, UserRole } from "@/context/AuthContext";

interface AuthPayload {
  user: {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    avatar?: string;
    preferredLanguage?: "en" | "ar";
  };
  token: string;
}

function toAuthUser(u: AuthPayload["user"]): AuthUser {
  return {
    id: u.id,
    name: u.name,
    email: u.email,
    role: u.role,
    avatar: u.avatar,
    preferredLanguage: u.preferredLanguage,
  };
}

export async function apiLogin(email: string, password: string) {
  const { data } = await api.post<ApiSuccess<AuthPayload>>("/auth/login", {
    email,
    password,
  });
  return {
    user: toAuthUser(data.data.user),
    token: data.data.token,
  };
}

export async function apiRegister(payload: {
  name: string;
  email: string;
  password: string;
  preferredLanguage?: "en" | "ar";
}) {
  const { data } = await api.post<ApiSuccess<AuthPayload>>("/auth/register", payload);
  return {
    user: toAuthUser(data.data.user),
    token: data.data.token,
  };
}

export async function apiLogout() {
  await api.post("/auth/logout");
}

export async function apiMe(): Promise<AuthUser> {
  const { data } = await api.get<ApiSuccess<AuthPayload["user"]>>("/auth/me");
  return toAuthUser(data.data);
}
