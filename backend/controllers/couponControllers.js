const Coupon = require("../models/couponModel");
const asyncHandler = require("express-async-handler");

// @desc Create new coupon
// @route POST /api/coupons
// @access Admin only
const createCoupon = asyncHandler(async (req, res) => {
  const {
    code,
    discountType,
    discountValue,
    minCartAmount,
    usageLimit,
    startDate,
    endDate,
  } = req.body;

  // Prevent duplicates
  const existing = await Coupon.findOne({ code: code.toUpperCase() });
  if (existing) {
    return res.status(400).json({ message: "Coupon code already exists." });
  }

  const newCoupon = await Coupon.create({
    code: code.toUpperCase(),
    discountType,
    discountValue,
    minCartAmount,
    usageLimit,
    startDate,
    endDate,
  });

  res.status(201).json(newCoupon);
});

// @desc Get all coupons
// @route GET /api/coupons
// @access Admin only
exports.getAllCoupons = asyncHandler(async (req, res) => {
  try {
    const coupons = await Coupon.find().sort({ createdAt: -1 });
    res.status(200).json(coupons);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch coupons.", error: err.message });
  }
});

// @desc Validate & apply coupon
// @route POST /api/coupons/validate
// @access Public
const validateCoupon = asyncHandler(async (req, res) => {
  try {
    const { code, cartTotal } = req.body;

    const coupon = await Coupon.findOne({
      code: code.toUpperCase(),
      isActive: true,
    });
    if (!coupon) {
      return res.status(400).json({ message: "Invalid or inactive coupon." });
    }

    const now = new Date();
    if (now < coupon.startDate || now > coupon.endDate) {
      return res
        .status(400)
        .json({ message: "Coupon is not valid right now." });
    }

    if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) {
      return res.status(400).json({ message: "Coupon usage limit reached." });
    }

    if (cartTotal < coupon.minCartAmount) {
      return res.status(400).json({
        message: `Cart must be at least $${coupon.minCartAmount} to use this coupon.`,
      });
    }

    let discountAmount = 0;
    if (coupon.discountType === "percentage") {
      discountAmount = (cartTotal * coupon.discountValue) / 100;
    } else {
      discountAmount = coupon.discountValue;
    }

    const newTotal = Math.max(0, cartTotal - discountAmount);

    res.status(200).json({
      valid: true,
      discountAmount,
      newTotal,
      message: "Coupon applied successfully.",
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to validate coupon.", error: err.message });
  }
});

// @desc Delete coupon
// @route DELETE /api/coupons/:id
// @access Admin only
exports.deleteCoupon = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    await Coupon.findByIdAndDelete(id);
    res.status(200).json({ message: "Coupon deleted." });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to delete coupon.", error: err.message });
  }
});

module.exports = {
  createCoupon,
  validateCoupon,
};
