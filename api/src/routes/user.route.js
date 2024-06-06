import express from "express";
import {deleteUser, signOut,test,updateUser,getUsers,getUser} from "../controllers/user.controller.js";
import {verifyToken} from "../middlewares/auth.middleware.js";
const router = express.Router();

router.get("/test",test);
router.put("/update/:userId",verifyToken,updateUser);
router.delete("/delete/:userId",verifyToken,deleteUser);
router.post('/signout',verifyToken,signOut);
router.get('/getusers', verifyToken, getUsers);
router.get('/:userId', getUser);
 
export default router;
