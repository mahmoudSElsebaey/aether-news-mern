import { api } from "./api";
import type { ApiResponse, ApiUser } from "@/types/api";

export async function loginRequest(email: string, password: string) {
  const { data } = await api.post<ApiResponse<{ user: ApiUser; token: string }>>(
    "/auth/login",
    { email, password }
  );
  return data.data;
}

export async function registerRequest(payload: {
  name: string;
  email: string;
  password: string;
  preferredLanguage?: string;
}) {
  const { data } = await api.post<ApiResponse<{ user: ApiUser; token: string }>>(
    "/auth/register",
    payload
  );
  return data.data;
}

export async function logoutRequest() {
  await api.post("/auth/logout");
}

export async function meRequest() {
  const { data } = await api.get<ApiResponse<ApiUser>>("/auth/me");
  return data.data;
}
