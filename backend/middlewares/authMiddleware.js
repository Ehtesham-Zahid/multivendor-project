const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const protect = asyncHandler(async (req, res, next) => {
  console.log("=== PROTECT MIDDLEWARE CALLED ===");
  console.log("Request URL:", req.url);
  console.log("Request method:", req.method);
  console.log("User-Agent:", req.headers["user-agent"]);
  console.log("Origin:", req.headers.origin);
  console.log("Referer:", req.headers.referer);
  console.log("All cookies:", req.cookies);
  console.log("Cookie header:", req.headers.cookie);
  console.log("Authorization header:", req.headers.authorization);

  // Try to get token from cookies first, then from Authorization header
  let token = req.cookies.token;

  if (!token && req.headers.authorization) {
    // Fallback: Check Authorization header (Bearer token)
    const authHeader = req.headers.authorization;
    if (authHeader.startsWith("Bearer ")) {
      token = authHeader.substring(7); // Remove 'Bearer ' prefix
      console.log("Using Authorization header token");
    }
  }

  console.log("Extracted token:", token ? "EXISTS" : "MISSING");

  if (!token) {
    console.error("❌ NO TOKEN FOUND - Authentication failed");
    res.status(401);
    throw new Error("Not authorized, no token");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("✅ Token verified successfully for user:", decoded.id);

    req.user = await User.findById(decoded.id).select("-password");
    if (!req.user) {
      console.error("❌ User not found in database");
      res.status(401);
      throw new Error("User not found");
    }

    console.log("✅ User authenticated successfully:", req.user._id);
    next();
  } catch (error) {
    console.error("❌ Token verification failed:", error.message);
    res.status(401);
    throw new Error("Not authorized, token failed");
  }
});

const optionalAuth = asyncHandler(async (req, res, next) => {
  const token = req.cookies.token;

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
