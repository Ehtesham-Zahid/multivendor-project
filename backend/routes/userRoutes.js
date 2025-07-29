const express = require("express");
const router = express.Router();

const { registerUser } = require("../controllers/userControllers.js");
const upload = require("../middlewares/uploadMiddleware.js");

router.post("/", upload.single("image"), registerUser);

module.exports = router;
