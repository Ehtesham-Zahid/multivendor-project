const mongoose = require("mongoose");

const eventSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Event Name is required"],
    },
    originalPrice: {
      type: Number,
      required: [true, "Original Price is required"],
    },
    eventPrice: {
      type: Number,
      required: [true, "Event Price is required"],
      validate: {
        validator: function (value) {
          return value < this.originalPrice;
        },
        message: "Event Price must be less than Original Price",
      },
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    startDate: {
      type: Date,
      required: [true, "Start Date is required"],
    },
    endDate: {
      type: Date,
      required: [true, "End Date is required"],
      validate: {
        validator: function (value) {
          return value > this.startDate;
        },
        message: "End Date must be after Start Date",
      },
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    shopId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shop",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", eventSchema);
