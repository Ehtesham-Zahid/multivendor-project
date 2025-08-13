const mongoose = require("mongoose");

const shopOrderSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      // required: true,
    },
    parentOrderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ParentOrder",
      required: true,
    },
    shopId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shop",
      required: true,
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: [1, "Quantity must be at least 1"],
        },
        price: {
          type: Number,
          required: true,
          min: [0, "Price must be a positive number"],
        },
      },
    ],
    subtotal: {
      type: Number,
      required: true,
    },
    deliveryStatus: {
      type: String,
      enum: ["pending", "delivered", "cancelled"],
      default: "pending",
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },
    refundStatus: {
      type: String,
      enum: ["none", "requested", "refunded", "rejected"],
      default: "none",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ShopOrder", shopOrderSchema);
