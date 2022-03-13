import mongoose from "mongoose";
import "dotenv/config";

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB);
    console.log("Connected to Mongo DB");
  } catch (error) {
    console.log(error);
  }
}
connectDB();
// console.log(process.env.MONGODB);
