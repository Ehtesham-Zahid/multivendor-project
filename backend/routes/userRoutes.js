const express = require("express");
const router = express.Router();

const {
  registerUser,
  verifyToken,
  loginUser,
} = require("../controllers/userControllers.js");
const upload = require("../middlewares/uploadMiddleware.js");

router.post("/register", upload.single("image"), registerUser);
router.post("/login", loginUser);
router.get("/verify-token/:token", verifyToken);

module.exports = router;
