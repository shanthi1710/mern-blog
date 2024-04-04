import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import User from "../models/user.model.js";

export const signup = asyncHandler(async (req, res, next) => {
    const { username, email, password } = req.body;
  
     if (
        [email, username, password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }
  
    const newUser = new User({
      username,
      email,
      password,
    });
    try {
      await newUser.save();
      return res
        .status(201)
        .json(new ApiResponse(201, newUser, "User registered Successfully"));
    } catch (error) {
      next(error);
    }
  });
  