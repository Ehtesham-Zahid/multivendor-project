const express = require("express");
const router = express.Router();
const {
  createReview,
  updateReview,
  deleteReview,
  getShopReviews,
  getProductReviews,
} = require("../controllers/reviewControllers");
const { protect } = require("../middlewares/authMiddleware");

router.post("/", protect, createReview);
router.patch("/:reviewId", protect, updateReview);
router.delete("/:reviewId", protect, deleteReview);
router.get("/shop/:shopId", protect, getShopReviews);
router.get("/product/:productId", protect, getProductReviews);

module.exports = router;
