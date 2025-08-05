const mongoose = require("mongoose");

const addressSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null, // Null for guest addresses
    },
    fullName: {
      type: String,
      required: [true, "Full name is required"],
    },
    phoneNumber: {
      type: String,
      required: [true, "Phone number is required"],
    },
    street: {
      type: String,
      required: [true, "Street address is required"],
    },
    city: {
      type: String,
      required: [true, "City is required"],
    },
    state: {
      type: String,
      required: [true, "State/Province is required"],
    },
    zipCode: {
      type: String,
      required: [true, "ZIP/Postal code is required"],
    },
    country: {
      type: String,
      required: [true, "Country is required"],
    },
    isPrimary: {
      type: Boolean,
      default: false, // Default to false, can be set to true for primary address
    },
    isGuestAddress: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Address", addressSchema);
