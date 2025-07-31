const express = require("express");
const router = express.Router();

const {
  registerUser,
  verifyToken,
  loginUser,
  me,
} = require("../controllers/userControllers.js");

const upload = require("../middlewares/uploadMiddleware.js");
const { protect } = require("../middlewares/authMiddleware.js");

router.post("/register", upload.single("image"), registerUser);
router.post("/login", loginUser);
router.get("/verify-token/:token", verifyToken);
router.get("/me", protect, me);

module.exports = router;
