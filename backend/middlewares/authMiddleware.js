const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const protect = asyncHandler(async (req, res, next) => {
  // Try to get token from cookies first, then from Authorization header
  let token = req.cookies.token;

  if (!token && req.headers.authorization) {
    // Fallback: Check Authorization header (Bearer token)
    const authHeader = req.headers.authorization;
    if (authHeader.startsWith("Bearer ")) {
      token = authHeader.substring(7); // Remove 'Bearer ' prefix
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id).select("-password");
    if (!req.user) {
      res.status(401);
      throw new Error("User not found");
    }

    next();
  } catch (error) {
    res.status(401);
    throw new Error("Not authorized, token failed");
  }
});

const optionalAuth = asyncHandler(async (req, res, next) => {
  let token = req.cookies.token;

  if (!token && req.headers.authorization) {
    // Fallback: Check Authorization header (Bearer token)
    const authHeader = req.headers.authorization;
    if (authHeader.startsWith("Bearer ")) {
      token = authHeader.substring(7); // Remove 'Bearer ' prefix
    }
  }

  if (!token) return next(); // No token? Guest user, continue

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
  } catch (error) {
    req.user = null;
  }
  next();
});

const isAdmin = asyncHandler(async (req, res, next) => {
  if (req.user.role !== "admin") {
    res.status(401);
    throw new Error("Not authorized, admin only");
  }
  next();
});

const isVendor = asyncHandler(async (req, res, next) => {
  if (req.user.role !== "vendor" && req.user.role !== "admin") {
    res.status(401);
    throw new Error("Not authorized, vendor or admin only");
  }
  next();
});

module.exports = {
  protect,
  optionalAuth,
  isAdmin,
  isVendor,
};
