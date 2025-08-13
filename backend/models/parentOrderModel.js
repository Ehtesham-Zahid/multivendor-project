const mongoose = require("mongoose");

const parentOrderSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    shippingAddress: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
      required: true,
    },
    totalAmount: {
      type: Number,
      required: [true, "Total Amount is required"],
    },
    paymentMethod: {
      type: String,
      required: [true, "Please add a payment method"],
      enum: ["card", "cod"],
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },
    deliveryStatus: {
      type: String,
      enum: ["pending", "delivered", "cancelled"],
      default: "pending",
    },
    paymentIntentId: {
      type: String,
      default: null,
    },
    // Reference to all shop orders in this parent order
    shopOrders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ShopOrder",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("ParentOrder", parentOrderSchema);
