const express = require("express");
const router = express.Router();

const {
  createShop,
  getShop,
  deleteShop,
  updateShop,
} = require("../controllers/shopControllers.js");

const upload = require("../middlewares/uploadMiddleware.js");
const { protect } = require("../middlewares/authMiddleware.js");

router.post("/create-shop", protect, upload.single("image"), createShop);
router.get("/:shopId", protect, getShop);
router.patch("/:shopId", protect, updateShop);
router.delete("/:shopId", protect, deleteShop);

module.exports = router;
