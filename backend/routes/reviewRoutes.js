const express = require("express");
const {
  createReview,
  updateReview,
  deleteReview,
} = require("../controllers/reviewControllers");
const { protect } = require("../middlewares/authMiddleware");
const router = express.router();

router.post("/", protect, createReview);
router.patch("/:reviewId", protect, updateReview);
router.delete("/:reviewId", protect, deleteReview);
// router.get("/:id", getProductById);
// router.patch("/:id", updateProduct);
// router.delete("/:id", deleteProduct);

module.exports = router;
