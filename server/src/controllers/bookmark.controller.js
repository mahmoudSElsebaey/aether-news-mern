import * as bookmarkService from "../services/bookmark.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { success, created } from "../utils/response.js";

export const list = asyncHandler(async (req, res) => {
  const items = await bookmarkService.listBookmarks(req.user._id);
  return success(res, items);
});

export const add = asyncHandler(async (req, res) => {
  const bookmark = await bookmarkService.addBookmark(req.user._id, req.body.articleId);
  return created(res, bookmark);
});

export const remove = asyncHandler(async (req, res) => {
  await bookmarkService.removeBookmark(req.user._id, req.params.articleId);
  return success(res, { message: "Bookmark removed" });
});
