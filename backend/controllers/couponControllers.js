const Coupon = require("../models/couponModel");
const asyncHandler = require("express-async-handler");

// @desc Create new coupon
// @route POST /api/coupons
// @access Admin only
const createCoupon = asyncHandler(async (req, res) => {
  console.log(req.body);
  const {
    code,
    discountPercentage,
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

  if (discountPercentage < 0 || discountPercentage > 100) {
    return res.status(400).json({ message: "Invalid discount percentage." });
  }

  if (minCartAmount < 0) {
    return res.status(400).json({ message: "Invalid minimum cart amount." });
  }

  if (usageLimit < 0) {
    return res.status(400).json({ message: "Invalid usage limit." });
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Get start date at start of day
  const start = new Date(startDate);
  start.setHours(0, 0, 0, 0);

  // Get end date at end of day (23:59:59) to allow same-day events
  const end = new Date(endDate);
  end.setHours(23, 59, 59, 999);

  // Date-only comparison: start date cannot be before today
  if (start < today) {
    res.status(400);
    throw new Error("Start date cannot be in the past");
  }

  // End date cannot be before start date
  if (end < start) {
    res.status(400);
    throw new Error("End date cannot be before start date");
  }

  // Check if coupon is active (current date is between start and end, inclusive)
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);
  const isActive = start <= currentDate && end >= currentDate;

  const newCoupon = await Coupon.create({
    code: code.toUpperCase(),
    discountPercentage,
    minCartAmount,
    usageLimit,
    startDate,
    endDate,
    isActive,
  });

  res.status(201).json(newCoupon);
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
    if (
      coupon.startDate &&
      coupon.endDate &&
      (now < coupon.startDate || now > coupon.endDate)
    ) {
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
    discountAmount = (cartTotal * coupon.discountPercentage) / 100;

    const newTotal = Math.max(0, cartTotal - discountAmount);

    res.status(200).json({
      valid: true,
      discountAmount,
      discountPercentage: coupon.discountPercentage,
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
const deleteCoupon = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCoupon = await Coupon.findByIdAndDelete(id);
    res.status(200).json(deletedCoupon);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to delete coupon.", error: err.message });
  }
});

// @desc Get all coupon codes for admin
// @route GET /api/coupons/admin
// @access Admin only
const getAllCouponCodesAdmin = asyncHandler(async (req, res) => {
  const { page, limit, status } = req.query;

  const pageNumber = parseInt(page) || 1;
  const limitNumber = parseInt(limit) || 10;
  const skip = (pageNumber - 1) * limitNumber;

  console.log(status);
  const filter = {};
  if (status && status !== "undefined") {
    filter.isActive = status === "active";
  }

  const totalCouponCodes = await Coupon.countDocuments(filter);
  const totalCouponCodesPages = Math.ceil(totalCouponCodes / limitNumber);

  const couponCodes = await Coupon.find(filter)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limitNumber);

  res.status(200).json({
    couponCodes,
    totalCouponCodesPages,
    totalCouponCodes,
  });
});

module.exports = {
  createCoupon,
  validateCoupon,
  getAllCouponCodesAdmin,
  deleteCoupon,
};
