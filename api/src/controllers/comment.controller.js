import Comment from '../models/comment.model.js';
import { ApiError } from "../utils/ApiError.js";
export const createComment = async (req, res, next) => {
  try {
    const { content, postId, userId } = req.body;
    console.log(req.user._id)
    if (userId !== req.user._id) {
        throw new ApiError(403, 'You are not allowed to create this comment')
    }

    const newComment = new Comment({
      content,
      postId,
      userId,
    });
    await newComment.save();

    res.status(200).json(newComment);
  } catch (error) {
    next(error);
  }
};