import mongoose from "mongoose";


export const connectDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI);//connecting with db
        console.log('Connected to MongoDB');
    }
    catch (err) {
        console.error(err.message);
        process.exit(1); // 1 means failure 0 means success
        }
}