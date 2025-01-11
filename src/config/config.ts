import dotenv from "dotenv"
import mongoose from "mongoose"

dotenv.config();

const connectToMongo = async ()=>{
    try{
        const url = process.env.MONGODB_URL as string;
        if (!url) {
            throw new Error("MONGO_DB_URI is not defined in environment variables.");
        }

        await mongoose.connect(url);
        console.log("Connected to MongoDB");
    }
    catch(e: any){
        console.log("Error while connecting to MongoDB", e.message)
    }
}

export default connectToMongo;