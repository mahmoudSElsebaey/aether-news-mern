import { Bookmark } from "../models/Bookmark.js";
import { Article } from "../models/Article.js";
import { ApiError } from "../utils/ApiError.js";

export async function listBookmarks(userId) {
  return Bookmark.find({ user: userId })
    .populate({
      path: "article",
      populate: [
        { path: "category", select: "slug translations" },
        { path: "author", select: "name avatar" },
      ],
    })
    .sort({ createdAt: -1 })
    .lean();
}

export async function addBookmark(userId, articleId) {
  const article = await Article.findById(articleId);
  if (!article) throw new ApiError(404, "Article not found");

  try {
    const bookmark = await Bookmark.create({ user: userId, article: articleId });
    return bookmark;
  } catch (err) {
    if (err.code === 11000) throw new ApiError(409, "Already bookmarked");
    throw err;
  }
}

export async function removeBookmark(userId, articleId) {
  const result = await Bookmark.findOneAndDelete({ user: userId, article: articleId });
  if (!result) throw new ApiError(404, "Bookmark not found");
  return true;
}
