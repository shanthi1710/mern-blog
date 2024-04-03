import express from "express";
import {test,register} from "../controllers/user.controller.js";
const router = express.Router();

router.get("/test",test);
router.post("/register",register);
export default router;