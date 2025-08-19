const mongoose = require("mongoose");

const bankAccountSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    accountHolderName: { type: String, required: true },
    bankName: { type: String, required: true },
    accountNumber: { type: String, required: true },
    ifscCode: { type: String }, // for Indian banks OR routing number for US
    stripeBankAccountId: { type: String }, // store the Stripe external_account ID
    isDefault: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("BankAccount", bankAccountSchema);
