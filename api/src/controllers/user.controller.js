import {ApiError} from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import {asyncHandler} from "../utils/asyncHandler.js";

export const test = (req,res)=>{
    res.send("Hello Word!!!");
}

export const register = asyncHandler(async(req,res)=>{
    const {username,email,password} = req.body

    if([username,email,password].some((field)=>field?.trim() === "")){
        throw new ApiError(400,"All fields are required")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered Successfully")
    )
})