import mongoose from "mongoose";
import {DB_NAME} from "../constants.js";

const connectDB = async () =>{
    try {
        const connectionInstance =await mongoose.connect(`${process.env.MONGO_URL}`);
        console.log(`\n MongoDB connected !! DB HOST:${connectionInstance.connection.host}`);
    } catch (error) {
        console.error("MONGODB Connection Failed",error);
        process.exit(1);
    }
}

export default connectDB;