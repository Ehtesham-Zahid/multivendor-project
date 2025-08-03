const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        shopId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Shop",
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
    totalAmount: {
      type: Number,
      required: [true, "Total Amount is required"],
    },
    paymentStatus: {
      type: String,
      required: [true, "Payment Status is required"],
      default: "Pending",
    },
    paymentMethod: {
      type: String,
      required: [true, "Please add a payment method"],
      default: "Cash on delivery",
    },
    deliveryStatus: {
      type: String,
      enum: ["pending", "fulfilled", "cancelled"],
      default: "pending",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    shippingAddress: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
