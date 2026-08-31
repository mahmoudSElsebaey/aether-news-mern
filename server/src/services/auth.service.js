import { User } from "../models/User.js";
import { ApiError } from "../utils/ApiError.js";
import { signToken } from "../utils/jwt.js";

export async function registerUser(payload) {
  const exists = await User.findOne({ email: payload.email.toLowerCase() });
  if (exists) throw new ApiError(409, "Email already registered");

  // First account in an empty database becomes admin (easy local setup)
  const userCount = await User.countDocuments();
  const role = userCount === 0 ? "admin" : "user";

  const user = await User.create({
    name: payload.name,
    email: payload.email,
    password: payload.password,
    preferredLanguage: payload.preferredLanguage || "en",
    role,
  });

  const token = signToken({ id: user._id, role: user.role });
  return { user: user.toSafeJSON(), token };
}

export async function loginUser({ email, password }) {
  const user = await User.findOne({ email: email.toLowerCase() }).select("+password");
  if (!user || !(await user.comparePassword(password))) {
    throw new ApiError(401, "Invalid email or password");
  }
  if (!user.isActive) throw new ApiError(403, "Account is disabled");

  const token = signToken({ id: user._id, role: user.role });
  return { user: user.toSafeJSON(), token };
}

export async function getMe(userId) {
  const user = await User.findById(userId);
  if (!user) throw new ApiError(404, "User not found");
  return user.toSafeJSON();
}
