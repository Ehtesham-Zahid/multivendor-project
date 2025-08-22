const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const protect = asyncHandler(async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (error) {
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
  if (req.user.role !== "vendor") {
    res.status(401);
    throw new Error("Not authorized, vendor only");
  }
  next();
});

module.exports = {
  protect,
  optionalAuth,
  isAdmin,
  isVendor,
};
