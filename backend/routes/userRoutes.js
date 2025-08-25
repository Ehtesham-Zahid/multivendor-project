const express = require("express");
const router = express.Router();

const {
  registerUser,
  verifyToken,
  loginUser,
  me,
  updateMe,
  changePassword,
  logout,
  getAdminStats,
  getAllUsers,
  forgotPassword,
  resetPassword,
} = require("../controllers/userControllers.js");

const upload = require("../middlewares/uploadMiddleware.js");
const { protect, isAdmin } = require("../middlewares/authMiddleware.js");

router.post("/register", upload.single("image"), registerUser);
router.post("/login", loginUser);
router.get("/verify-token/:token", verifyToken);
router.get("/me", protect, me);
router.patch("/update-me", upload.single("image"), protect, updateMe);
router.patch("/change-password", protect, changePassword);
router.post("/logout", protect, logout);

router.post("/forgot-password", forgotPassword);
router.patch("/reset-password", resetPassword);

router.get("/admin/admin-stats", protect, isAdmin, getAdminStats);
router.get("/admin/all-users", protect, isAdmin, getAllUsers);

module.exports = router;
