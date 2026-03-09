import User from "../Model/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

/* ================= REGISTER USER ================= */

export const registerUser = async (req, res) => {
  try {
    const { name, email, password} = req.body;

    // check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create new user
    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    res.status(201).json({
      message: "User registered successfully",
      user,
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


/* ================= LOGIN USER ================= */

export const loginUser = async (req, res) => {
  try {

    const { email, password } = req.body;

    // check user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // generate token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.SECRET_KEY,
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000 // 1 day
    }).json({
      message: "Login successful",
      token,
      user,
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};





/* ================= Log out ================= */

export const logoutUser = (req, res) => {
  try {
    // res.clearCookie("token")
    res.status(200).json({
      message: "User logged out successfully"
    });
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};