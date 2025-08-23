const express = require("express");
const router = express.Router();
const {
  createCoupon,
  validateCoupon,
  getAllCouponCodesAdmin,
  deleteCoupon,
} = require("../controllers/couponControllers");

const { protect, isAdmin } = require("../middlewares/authMiddleware");

// Only admin can create, update, delete coupons
router.post("/", protect, isAdmin, createCoupon);
router.post("/validate", validateCoupon);
router.get("/admin", protect, isAdmin, getAllCouponCodesAdmin);
router.delete("/:id", protect, isAdmin, deleteCoupon);

module.exports = router;
