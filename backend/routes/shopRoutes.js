const express = require("express");
const router = express.Router();

const {
  createShop,
  getCurrentUserShop,
  updateCurrentUserShop,
  getShopById,
  getAllShopsAdmin,
  updateShopStatus,
  getCurrentUserShopStats,
} = require("../controllers/shopControllers.js");

const upload = require("../middlewares/uploadMiddleware.js");
const { protect, isAdmin } = require("../middlewares/authMiddleware.js");

router.post("/create-shop", protect, upload.single("image"), createShop);
router.get("/getCurrentUserShop", protect, getCurrentUserShop);
router.get("/getCurrentUserShopStats", protect, getCurrentUserShopStats);
router.patch(
  "/updateCurrentUserShop",
  protect,
  upload.single("image"),
  updateCurrentUserShop
);
router.get("/:shopId", getShopById);
router.patch("/update-shop-status/:shopId", protect, updateShopStatus);

// Admin Routes
router.get("/admin/all-shops", protect, isAdmin, getAllShopsAdmin);

module.exports = router;
