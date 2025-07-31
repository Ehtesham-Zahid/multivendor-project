const express = require("express");
const router = express.Router();

const { createShop, getShop } = require("../controllers/shopControllers.js");

const upload = require("../middlewares/uploadMiddleware.js");
const { protect } = require("../middlewares/authMiddleware.js");

router.post("/create-shop", protect, upload.single("image"), createShop);
router.get("/", protect, getShop);

module.exports = router;
