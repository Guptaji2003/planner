import express from "express";
import dotenv from "dotenv";
import userRoutes from "./Routes/userRoute.js";
import connectDB from "./DataBase/db.js";
dotenv.config();

const app = express();

// middleware to read JSON
app.use(express.json());

const PORT = process.env.PORT || 5000;


// connect routes
app.use("/api/users", userRoutes);



// server function
app.listen(PORT, () => {
  console.log("Server is running on port 5000");
  connectDB();
});
