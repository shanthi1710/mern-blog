import Post from "../models/post.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const create = asyncHandler(async (req, res, next) => {
   
  if (!req.user.isAdmin) {
    throw new ApiError(401, "You are not authorized to create a post");
  }
  if (!req.body.title || !req.body.content) {
    throw new ApiError(400, "Title and Content are required");
  }
  const slug = req.body.title
    .split(" ")
    .join("-")
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, "");

    const newPost = new Post({
        ...req.body,
        slug,
        userId: req.user._id,
    }); 
    try {
        const savedPost = await newPost.save();
        return res.status(201).json(savedPost);
    } catch (error) {
        next(error);
    }
});
