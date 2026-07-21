const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ================= REGISTER USER =================
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // Create new user
    // Password will be hashed automatically by User model pre-save middleware
    const user = await User.create({
      name,
      email,
      password,
    });

    res.status(201).json({
      success: true,
      message: "User Registered Successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ================= LOGIN USER =================
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user using email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Compare entered password with hashed password
    const isPasswordMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Generate JWT token after successful login
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    // Send user details and token
    res.status(200).json({
      success: true,
      message: "Login Successful",
      token: token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// Get Logged-in User Profile
const getProfile = async (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};

module.exports = {
  registerUser,
  loginUser,
  getProfile,
};