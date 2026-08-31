import * as authService from "../services/auth.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { success, created } from "../utils/response.js";
import { setAuthCookie, clearAuthCookie } from "../utils/jwt.js";

export const register = asyncHandler(async (req, res) => {
  const result = await authService.registerUser(req.body);
  setAuthCookie(res, result.token);
  return created(res, result);
});

export const login = asyncHandler(async (req, res) => {
  const result = await authService.loginUser(req.body);
  setAuthCookie(res, result.token);
  return success(res, result);
});

export const logout = asyncHandler(async (req, res) => {
  clearAuthCookie(res);
  return success(res, { message: "Logged out" });
});

export const me = asyncHandler(async (req, res) => {
  const user = await authService.getMe(req.user._id);
  return success(res, user);
});
