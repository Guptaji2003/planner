import mongoose from "mongoose";


const connectDB = async () => {
    console.log(process.env.DATABASE_URL);
    
  try {
    const db = await mongoose.connect(process.env.DATABASE_URL);

    console.log(`MongoDB Connected: ${db.connection.host}`);
  } catch (error) {
    console.error("Database connection failed:", error.message);
   
  }
};

export default connectDB;