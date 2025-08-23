const express = require("express");
const router = express.Router();
const {
  createCoupon,
  validateCoupon,
} = require("../controllers/couponControllers");

const { protect, isAdmin } = require("../middlewares/authMiddleware");

// Only admin can create, update, delete coupons
router.post("/", protect, isAdmin, createCoupon);
router.post("/validate", validateCoupon);

module.exports = router;
