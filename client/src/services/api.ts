import axios from "axios";

/**
 * Production: set VITE_API_URL in Vercel → Environment Variables, then Redeploy.
 * Example: https://delta-news-server.vercel.app/api
 */
function resolveBaseUrl() {
  const fromEnv = import.meta.env.VITE_API_URL as string | undefined;
  if (fromEnv && fromEnv.trim()) {
    return fromEnv.replace(/\/$/, "");
  }
  // Dev fallback only
  return "http://localhost:5000/api";
}

const baseURL = resolveBaseUrl();
const TOKEN_KEY = "delta_token";

export function getStoredToken(): string | null {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

export function setStoredToken(token: string | null) {
  try {
    if (token) localStorage.setItem(TOKEN_KEY, token);
    else localStorage.removeItem(TOKEN_KEY);
  } catch {
    // ignore
  }
}

export const api = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = getStoredToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  if (typeof FormData !== "undefined" && config.data instanceof FormData) {
    if (config.headers) {
      delete config.headers["Content-Type"];
    }
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.response?.data?.errors?.[0]?.message ||
      error.message ||
      "Request failed";
    return Promise.reject(new Error(message));
  }
);

// Helpful in production debugging (visible in browser console once)
if (import.meta.env.PROD) {
  console.info("[Delta News] API baseURL =", baseURL);
}
