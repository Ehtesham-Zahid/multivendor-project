const express = require("express");
const router = express.Router();

const {
  createShop,
  getCurrentUserShop,
  deleteShop,
  updateCurrentUserShop,
} = require("../controllers/shopControllers.js");

const upload = require("../middlewares/uploadMiddleware.js");
const { protect } = require("../middlewares/authMiddleware.js");

router.post("/create-shop", protect, upload.single("image"), createShop);
router.get("/getCurrentUserShop", protect, getCurrentUserShop);
router.patch(
  "/updateCurrentUserShop",
  protect,
  upload.single("image"),
  updateCurrentUserShop
);
router.delete("/:shopId", protect, deleteShop);

module.exports = router;
