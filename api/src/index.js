import express from "express";
import connectDB from "./db/index.js"
import dotenv from "dotenv";
import cookieParser from "cookie-parser";


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

