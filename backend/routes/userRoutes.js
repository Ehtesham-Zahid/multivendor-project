const express = require("express");
const router = express.Router();

const {
  registerUser,
  verifyToken,
  loginUser,
  me,
  updateMe,
  changePassword,
} = require("../controllers/userControllers.js");

const upload = require("../middlewares/uploadMiddleware.js");
const { protect } = require("../middlewares/authMiddleware.js");

router.post("/register", upload.single("image"), registerUser);
router.post("/login", loginUser);
router.get("/verify-token/:token", verifyToken);
router.get("/me", protect, me);
router.patch("/update-me", upload.single("image"), protect, updateMe);
router.patch("/change-password", protect, changePassword);

module.exports = router;
