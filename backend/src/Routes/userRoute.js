import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  
} from "../Controllers/userController.js ";
import { authMiddleware } from "../Authentication/auth.js";


const router = express.Router();

// Register User
router.post("/register", registerUser);

// Login User
router.post("/login", loginUser);

// Logout User
router.post("/logout",authMiddleware, logoutUser);


export default router;