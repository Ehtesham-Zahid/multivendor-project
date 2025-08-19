const mongoose = require("mongoose");

const withdrawalSchema = new mongoose.Schema(
  {
    vendorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    bankAccountId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BankAccount",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: [1, "Withdrawal amount must be greater than 0"],
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected", "paid"],
      default: "pending",
    },
    adminNote: { type: String }, // optional: why rejected
    stripePayoutId: { type: String }, // store Stripe payout ID after processing
  },
  { timestamps: true }
);

module.exports = mongoose.model("Withdrawal", withdrawalSchema);
