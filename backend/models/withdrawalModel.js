const mongoose = require("mongoose");

const withdrawalSchema = mongoose.Schema({
  shopId: { type: mongoose.Schema.Types.ObjectId, ref: "Shop", required: true },
  amount: { type: Number, required: true },
  status: {
    type: String,
    enum: ["pending", "completed", "failed"],
    default: "pending",
  },
  transactionId: { type: String, default: null },
  method: {
    type: String,
    enum: ["stripe", "bank_transfer"],
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Withdrawal", withdrawalSchema);
