const asyncHandler = require("express-async-handler");
const Coupon = require("../models/couponModel");

// @desc    Create a new coupon (admin only)
const createCoupon = asyncHandler(async (req, res) => {
  const { code, discountType, discountAmount, minAmount, expiresAt } = req.body;

  if (!code || !discountType || !discountAmount) {
    res.status(400);
    throw new Error("Code, discount type, and amount are required");
  }

  const existing = await Coupon.findOne({ code: code.toUpperCase() });
  if (existing) {
    res.status(400);
    throw new Error("Coupon code already exists");
  }

  const coupon = await Coupon.create({
    code: code.toUpperCase(),
    discountType,
    discountAmount,
    minAmount,
    expiresAt,
  });

  res.status(201).json(coupon);
});

// @desc    Get all coupons (admin only)
const getAllCoupons = asyncHandler(async (req, res) => {
  const coupons = await Coupon.find().sort({ createdAt: -1 });
  res.status(200).json(coupons);
});

// @desc    Validate coupon for current cart total
const validateCoupon = asyncHandler(async (req, res) => {
  const { code, cartTotal } = req.body;

  const coupon = await Coupon.findOne({ code: code.toUpperCase() });
  if (!coupon) {
    res.status(404);
    throw new Error("Coupon not found");
  }

  if (coupon.expiresAt && new Date(coupon.expiresAt) < new Date()) {
    res.status(400);
    throw new Error("Coupon has expired");
  }

  if (coupon.minAmount && cartTotal < coupon.minAmount) {
    res.status(400);
    throw new Error(
      `Minimum cart amount for this coupon is ${coupon.minAmount}`
    );
  }

  res.status(200).json({
    message: "Coupon is valid",
    discountType: coupon.discountType,
    discountAmount: coupon.discountAmount,
  });
});

// @desc    Delete coupon by ID (admin only)
const deleteCoupon = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const coupon = await Coupon.findById(id);
  if (!coupon) {
    res.status(404);
    throw new Error("Coupon not found");
  }

  await coupon.deleteOne();
  res.status(200).json({ message: "Coupon deleted" });
});

module.exports = {
  createCoupon,
  getAllCoupons,
  validateCoupon,
  deleteCoupon,
};
