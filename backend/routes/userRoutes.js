const express = require("express");
const router = express.Router();

const {
  registerUser,
  verifyToken,
} = require("../controllers/userControllers.js");
const upload = require("../middlewares/uploadMiddleware.js");

router.post("/", upload.single("image"), registerUser);
router.get("/verify-token/:token", verifyToken);

module.exports = router;
