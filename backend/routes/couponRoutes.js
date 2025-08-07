const express = require("express");
const router = express.Router();
const {
  createCoupon,
  //   getAllCoupons,
  //   getCouponByCode,
  //   updateCoupon,
  //   deleteCoupon,
  validateCoupon,
} = require("../controllers/couponControllers");

const { protect } = require("../middlewares/authMiddleware");

// Only admin can create, update, delete coupons
router.post("/", createCoupon);
// router.get("/", protect, adminOnly, getAllCoupons);
router.get("/validate", validateCoupon);
// router.get("/:code", protect, getCouponByCode);
// router.delete("/:id", protect, adminOnly, deleteCoupon);

module.exports = router;
