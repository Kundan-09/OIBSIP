const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Protect private routes
const protect = async (req, res, next) => {
  try {
    // Get Authorization header
    const authHeader = req.headers.authorization;

    // Check for Bearer token
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Not authorized. Token required.",
      });
    }

    // Extract token: "Bearer TOKEN" -> "TOKEN"
    const token = authHeader.split(" ")[1];

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find logged-in user and attach to request
    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "User not found.",
      });
    }

    next();

  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token.",
    });
  }
};

// Allow only specific roles
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "Access denied. Admin only.",
      });
    }

    next();
  };
};

module.exports = {
  protect,
  authorize,
};

