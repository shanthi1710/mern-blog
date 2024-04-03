import express from "express";
import connectDB from "./db/index.js"
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js"
const app = express();
app.use(express.json());
app.use(cookieParser());

dotenv.config();


const port = process.env.PORT || 8000;

connectDB()
.then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    })
})
.catch((err) => {
    console.log("MONGODB connection failed",err);
});


app.use("/api/users",userRouter);
app.use("/api/auth",authRouter);