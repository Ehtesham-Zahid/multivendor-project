const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const uploadAvatar = require("../utils/cloudinary");
const POST = require("../utils/email");
const ShopOrder = require("../models/shopOrderModel");
const Product = require("../models/productModel");
const Event = require("../models/eventModel");
const Shop = require("../models/shopModel");
const sendMail = require("../utils/email");

const generateToken = (id, expire) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: expire });
};

const registerUser = asyncHandler(async (req, res) => {
  console.log("🚀 [REGISTER] Starting user registration process");
  console.log("📝 [REGISTER] Request body:", {
    fullname: req.body.fullname,
    email: req.body.email,
    hasPassword: !!req.body.password,
  });

  const { fullname, email, password } = req.body;

  if (!fullname?.trim() || !email?.trim() || !password?.trim()) {
    console.log("❌ [REGISTER] Validation failed - missing required fields");
    res.status(400);
    throw new Error("Fullname, email, and password are required");
  }

  console.log("✅ [REGISTER] Basic validation passed");

  //   Check if user exists
  console.log(
    "🔍 [REGISTER] Checking if user already exists with email:",
    email
  );
  const userExists = await User.findOne({ email });

  if (userExists) {
    console.log("❌ [REGISTER] User already exists with email:", email);
    res.status(400);
    throw new Error("User already Exist");
  }

  console.log("✅ [REGISTER] User doesn't exist, proceeding with creation");

  console.log("🔐 [REGISTER] Generating salt and hashing password");
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  console.log("✅ [REGISTER] Password hashed successfully");

  // Create User
  console.log("👤 [REGISTER] Creating user in database");
  const user = await User.create({ fullname, email, password: hashedPassword });
  console.log("✅ [REGISTER] User created successfully with ID:", user._id);

  if (req.file) {
    console.log("📁 [REGISTER] File upload detected, processing avatar");
    try {
      const b64 = Buffer.from(req.file.buffer).toString("base64");
      const dataURI = `data:${req.file.mimetype};base64,${b64}`;
      console.log("☁️ [REGISTER] Uploading to Cloudinary...");
      const { original } = await uploadAvatar(dataURI, user._id, "user_logos");
      user.imageUrl = original;
      console.log("✅ [REGISTER] Avatar uploaded successfully:", original);
    } catch (uploadError) {
      console.log("⚠️ [REGISTER] Avatar upload failed:", uploadError.message);
      // Continue without avatar
    }
  } else {
    console.log("ℹ️ [REGISTER] No file upload detected");
  }

  console.log("🎫 [REGISTER] Generating verification token");
  const verifiedToken = generateToken(user._id, "1h");
  user.verifiedToken = verifiedToken;
  user.verifiedTokenExpires = Date.now() + 60 * 60 * 1000; // 1 hour from now
  console.log("✅ [REGISTER] Verification token generated");

  console.log("💾 [REGISTER] Saving user with verification token");
  await user.save();
  console.log("✅ [REGISTER] User saved with verification token");

  const tokenLink = `${process.env.FRONTEND_URL}/auth/verify-email/${verifiedToken}`;
  console.log("🔗 [REGISTER] Verification link generated:", tokenLink);

  const emailDetails = {
    to: user.email,
    subject: "Account Actiavtion",
    html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; line-height: 1.6;">
            <h2 style="color: #2E3A8C;">Verify Your Email Address</h2>
            <p>Thank you for signing up! Please verify your email address by clicking the button below:</p>
            <a href="${tokenLink}" style="display: inline-block; background-color: #2E3A8C; color: #ffffff; padding: 10px 20px; border-radius: 5px; text-decoration: none; font-weight: bold;">
                Verify Now
            </a>
            <p style="margin-top: 20px; color: #555555;">⚠️ This verification link will expire in <strong>1 hour</strong>. If it expires, you’ll need to request a new one.</p>
        </div>
        `,
  };

  console.log("📧 [REGISTER] Sending verification email to:", user.email);
  try {
    await sendMail(emailDetails.to, emailDetails.subject, emailDetails.html);
    console.log("✅ [REGISTER] Verification email sent successfully");
  } catch (emailError) {
    console.log("⚠️ [REGISTER] Email sending failed:", emailError.message);
    // Continue even if email fails
  }

  console.log(
    "🎉 [REGISTER] Registration completed successfully for user:",
    user._id
  );
  res.status(201).json({
    message: "Account created. Please verify your email address to continue.",
  });
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password, rememberMe } = req.body;

  if (!email?.trim() || !password?.trim()) {
    res.status(400);
    throw new Error("Plase provide Email and Password");
  }

  const user = await User.findOne({ email });

  if (
    user &&
    user.isVerified === true &&
    (await bcrypt.compare(password, user.password))
  ) {
    const token = generateToken(user._id, "30d");

    if (rememberMe) {
      res.cookie("token", token, {
        httpOnly: true,
        secure: true, // set this only if using HTTPS
        sameSite: "None", // Required for cross-origin
        maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days in ms
      });
    } else {
      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "None", // Required for cross-origin
        // No maxAge → session cookie → deleted when browser closes
      });
    }

    res.json({
      fullname: user.fullname,
      email: user.email,
      imageUrl: user.imageUrl,
      role: user.role,
      _id: user._id,
      shopId: user.shopId,
      token,
    });
  } else {
    res.status(400);
    throw new Error("Invalid Credentials");
  }
});

const verifyToken = asyncHandler(async (req, res) => {
  const { token } = req.params;
  const user = await User.findOne({ verifiedToken: token });
  if (!user) {
    res.status(400);
    throw new Error("Invalid Token");
  }
  if (user.verifiedTokenExpires < Date.now()) {
    res.status(400);
    throw new Error("Token has expired.");
  }

  user.isVerified = true;
  user.verifiedToken = "";
  user.verifiedTokenExpires = null;
  await user.save();

  res.status(201).json({
    message: "Token Verified Successfully",
  });
});

const me = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

const updateMe = asyncHandler(async (req, res) => {
  const user = req.user;

  // Only allow specific fields to be updated
  const { fullname } = req.body;

  if (fullname) user.fullname = fullname;

  if (req.file) {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const dataURI = `data:${req.file.mimetype};base64,${b64}`;
    const { original } = await uploadAvatar(dataURI, user._id, "user_logos");
    user.imageUrl = original;
  }

  await user.save();

  res.status(200).json(user);
});

const changePassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    res.status(400);
    throw new Error("Please provide both old and new passwords");
  }

  const user = await User.findById(req.user._id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  const isMatch = await bcrypt.compare(oldPassword, user.password);
  if (!isMatch) {
    res.status(400);
    throw new Error("Invalid old password");
  }

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(newPassword, salt);

  await user.save();

  res.status(200).json({
    message: "Password changed successfully",
  });
});

const logout = asyncHandler(async (req, res) => {
  // Clear cookie with EXACT same options as login
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "None", // Match login exactly
    // No path needed - match login
  });

  res.status(200).json({ message: "Logged out" });
});

const getAdminStats = asyncHandler(async (req, res) => {
  const user = req.user;
  if (user.role !== "admin") {
    res.status(401);
    throw new Error("Unauthorized");
  }
  const totalOrders = await ShopOrder.countDocuments();
  const totalProducts = await Product.countDocuments();
  const totalVendors = await User.countDocuments({ role: "vendor" });
  const totalRefunds = await ShopOrder.countDocuments({
    refundStatus: "refunded",
  });

  res.json({
    totalRevenue: user.totalRevenue,
    totalShops: totalVendors,
    totalOrders,
    totalRefunds,
    totalProducts,
  });
});

const getAllUsers = asyncHandler(async (req, res) => {
  const { role } = req.query;

  const filter = {};

  if (role && role !== "undefined") {
    filter.role = role;
  }

  const users = await User.find(filter)
    .populate("shopId")
    .select("-password -verifiedToken -verifiedTokenExpires -stripeAccountId ");
  const totalUsers = await User.countDocuments(filter);
  const totalUsersPages = Math.ceil(totalUsers / 10);
  res.status(200).json({ users, totalUsers, totalUsersPages });
});

const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }

  const token = generateToken(user._id, "1h");
  user.resetPasswordToken = token;
  user.resetPasswordTokenExpires = Date.now() + 60 * 60 * 1000; // 1 hour from now
  await user.save();

  const tokenLink = `${process.env.FRONTEND_URL}/auth/reset-password/${token}`;

  const emailDetails = {
    to: user.email,
    subject: "Reset Password",
    html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; line-height: 1.6;">
            <h2 style="color: #2E3A8C;">Reset Your Password</h2>
            <p>Click the button below to reset your password:</p>
            <a href="${tokenLink}" style="display: inline-block; background-color: #2E3A8C; color: #ffffff; padding: 10px 20px; border-radius: 5px; text-decoration: none; font-weight: bold;">
                Reset Password
            </a>
            <p style="margin-top: 20px; color: #555555;">⚠️ This reset link will expire in <strong>1 hour</strong>. If it expires, you’ll need to request a new one.</p>
        </div>
        `,
  };

  await sendMail(emailDetails.to, emailDetails.subject, emailDetails.html);

  res.status(200).json({
    message: "Reset password link sent to your email",
  });
});

const resetPassword = asyncHandler(async (req, res) => {
  const { token, newPassword } = req.body;
  const user = await User.findOne({ resetPasswordToken: token });
  if (!user) {
    res.status(400);
    throw new Error("Invalid token");
  }
  if (user.resetPasswordTokenExpires < Date.now()) {
    res.status(400);
    throw new Error("Token has expired");
  }

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(newPassword, salt);
  user.resetPasswordToken = null;
  user.resetPasswordTokenExpires = null;
  await user.save();

  res.status(200).json({
    message: "Password reset successfully",
  });
});

module.exports = {
  registerUser,
  loginUser,
  verifyToken,
  me,
  updateMe,
  changePassword,
  logout,
  getAdminStats,
  getAllUsers,
  forgotPassword,
  resetPassword,
};
