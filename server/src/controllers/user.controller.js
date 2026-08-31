import { User } from "../models/User.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { success } from "../utils/response.js";

export const listUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password").sort({ createdAt: -1 }).lean();
  return success(
    res,
    users.map((u) => ({
      id: u._id,
      name: u.name,
      email: u.email,
      role: u.role,
      avatar: u.avatar,
      preferredLanguage: u.preferredLanguage,
      isActive: u.isActive,
      createdAt: u.createdAt,
    }))
  );
});

export const updateRole = asyncHandler(async (req, res) => {
  const { role } = req.body;
  if (!["user", "editor", "admin"].includes(role)) {
    throw new ApiError(400, "Invalid role");
  }
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { role },
    { new: true }
  );
  if (!user) throw new ApiError(404, "User not found");
  return success(res, user.toSafeJSON());
});
