const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true,
    },
    discountPercentage: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    minCartAmount: {
      type: Number,
      default: 0,
      required: true,
    },
    usageLimit: {
      type: Number,
      // required: true,
    },
    usedCount: {
      type: Number,
      default: 0,
    },
    startDate: {
      type: Date,
      // default: Date.now,
    },
    endDate: {
      type: Date,
      // required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Coupon", couponSchema);
