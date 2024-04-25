import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
 
import User from "../models/user.model.js";

const generateAccessAndRefereshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    //user.isAdmin = true;
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

 // Store the original isAdmin value
     

    // Save the user without validation
    await user.save({ validateBeforeSave: false });

    // Restore the original isAdmin value

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating refresh and access token"
    );
  }
};


export const signup = asyncHandler(async (req, res, next) => {
  const { username, email, password } = req.body;

  if ([email, username, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
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

export const signin = asyncHandler(async (req, res, next) => {
  const { email, username, password } = req.body;

  if (!username && !email) {
    throw new ApiError(400, "username or email is required");
  }

  try {
    const validUser = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (!validUser) {
      throw new ApiError(404, "User not found");
    }

    const isPasswordValid = await validUser.isPasswordCorrect(password);

    if (!isPasswordValid) {
      throw new ApiError(401, "Invalid credentials");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(
      validUser._id
    );

    const loggedInUser = await User.findById(validUser._id).select(
      "-password -refreshToken -__v"
    );
    const options = {
      httpOnly: true,
      secure: true,
    };
    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(loggedInUser);
  } catch (error) {
    next(error);
  }
});

export const google = asyncHandler(async (req, res, next) => {
  const { email, name, googlePhotoUrl } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const { accessToken, refreshToken } =
        await generateAccessAndRefereshTokens(user._id);
      const loggedInUser = await User.findById(user._id).select(
        "-password -refreshToken -__v"
      );
      const options = {
        httpOnly: true,
        secure: true,
      };
      return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(loggedInUser);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const newUser = new User({
        username:
          name.toLowerCase().split(" ").join("") +
          Math.random().toString(9).slice(-4),
        email,
        password: generatedPassword,
        profilePicture: googlePhotoUrl,
      });

      await newUser.save();
      const { accessToken, refreshToken } =
        await generateAccessAndRefereshTokens(newUser._id);
      const loggedInUser = await User.findById(user._id).select(
        "-password -refreshToken -__v"
      );
      const options = {
        httpOnly: true,
        secure: true,
      };
      return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(loggedInUser);
    }
  } catch (error) {
    next(error);
  }
});
