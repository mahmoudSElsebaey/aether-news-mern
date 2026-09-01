import { v2 as cloudinary } from "cloudinary";
import { env, hasCloudinary } from "./env.js";

if (hasCloudinary) {
  cloudinary.config({
    cloud_name: env.cloudinary.cloudName,
    api_key: env.cloudinary.apiKey,
    api_secret: env.cloudinary.apiSecret,
    secure: true,
  });
}

export { cloudinary, hasCloudinary };
