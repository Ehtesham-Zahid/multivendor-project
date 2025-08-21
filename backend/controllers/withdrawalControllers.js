const asyncHandler = require("express-async-handler");
const BankAccount = require("../models/bankAccountModel");
const Withdrawal = require("../models/withdrawalModel");
const Shop = require("../models/shopModel");
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// Vendor requests a withdrawal
const requestWithdrawal = asyncHandler(async (req, res) => {
  const { amount, bankAccountId } = req.body;
  const shopId = req.user.shopId; // assuming auth middleware adds this

  const shop = await Shop.findById(shopId);
  if (!shop) {
    res.status(404);
    throw new Error("Shop not found");
  }

  if (amount < 100) {
    res.status(400);
    throw new Error("Withdrawal amount must be greater than $100");
  }

  if (shop.accountBalance < amount) {
    res.status(400);
    throw new Error("Insufficient account balance");
  }

  shop.accountBalance -= amount;
  await shop.save();

  let withdrawal = await Withdrawal.create({
    userId: req.user._id,
    bankAccountId,
    shopId,
    amount,
    status: "pending",
  });

  withdrawal = await withdrawal.populate(
    "bankAccountId",
    "accountHolderName bankName accountNumber"
  );

  res.status(201).json(withdrawal);
});

// Admin views all withdrawals
const getAllWithdrawalsAdmin = asyncHandler(async (req, res) => {
  const withdrawals = await Withdrawal.find()
    .populate("shopId", "shopName accountBalance")
    .populate("bankAccountId", "accountHolderName bankName accountNumber")
    .sort({ createdAt: -1 });
  res.json(withdrawals);
});

const updateWithdrawalStatusAdmin = asyncHandler(async (req, res) => {
  const { withdrawalId } = req.params;
  const { status } = req.body; // "approved", "rejected", "paid"

  const withdrawal = await Withdrawal.findById(withdrawalId)
    .populate("shopId")
    .populate("userId")
    .populate("bankAccountId");
  if (!withdrawal) {
    res.status(404);
    throw new Error("Withdrawal not found");
  }

  if (!["approved", "rejected", "paid"].includes(status)) {
    res.status(400);
    throw new Error("Invalid status");
  }

  if (status === "approved") {
    // ✅ Simulate payout success directly in DB
    withdrawal.status = "paid";
  } else if (status === "rejected") {
    // ✅ Refund amount back to vendor's shop balance
    withdrawal.status = "rejected";
    withdrawal.shopId.accountBalance += withdrawal.amount;
    await withdrawal.shopId.save();
  } else if (status === "paid") {
    withdrawal.status = "paid";
  }

  await withdrawal.save();
  res.json(withdrawal);
});

// const updateWithdrawalStatusAdmin = asyncHandler(async (req, res) => {
//   const { withdrawalId } = req.params;
//   const { status } = req.body; // "completed" or "failed"

//   const withdrawal = await Withdrawal.findById(withdrawalId)
//     .populate("shopId")
//     .populate("userId");
//   if (!withdrawal) {
//     res.status(404);
//     throw new Error("Withdrawal not found");
//   }

//   console.log(status);

//   if (!["approved", "rejected", "paid"].includes(status)) {
//     res.status(400);
//     throw new Error("Invalid status");
//   }

//   // Only proceed with Stripe transfer if approved
//   if (status === "approved") {
//     const user = withdrawal.userId;

//     if (!user.stripeAccountId) {
//       res.status(400);
//       throw new Error("User has no Stripe account connected");
//     }

//     // Find the vendor's default bank account
//     const bankAccount = await BankAccount.findById(withdrawal.bankAccountId);
//     if (!bankAccount) {
//       res.status(400);
//       throw new Error("User has no default bank account");
//     }

//     try {
//       // Create a transfer from your platform (admin) Stripe account → vendor's connected account
//       const transfer = await stripe.transfers.create({
//         amount: Math.round(withdrawal.amount * 100), // in cents
//         currency: "usd", // or "pkr" if supported
//         destination: user.stripeAccountId,
//       });

//       withdrawal.stripePayoutId = transfer.id;
//       withdrawal.status = "paid";
//     } catch (err) {
//       withdrawal.status = "rejected";
//       withdrawal.shopId.accountBalance += withdrawal.amount;
//       await withdrawal.shopId.save();
//       console.error("Stripe transfer failed:", err);
//       res.status(500);
//       throw new Error("Failed to transfer funds via Stripe");
//     }
//   } else if (status === "rejected") {
//     withdrawal.status = "rejected";
//     withdrawal.shopId.accountBalance += withdrawal.amount;
//     await withdrawal.shopId.save();
//   } else if (status === "paid") {
//     withdrawal.status = "paid";
//   }

//   await withdrawal.save();
//   res.json(withdrawal);
// });

// Vendor views own withdrawals
const getMyWithdrawals = asyncHandler(async (req, res) => {
  const shopId = req.user.shopId; // from auth middleware
  const withdrawals = await Withdrawal.find({ shopId })
    .populate("bankAccountId", "accountHolderName bankName accountNumber")
    .sort({ createdAt: -1 });
  res.json(withdrawals);
});

module.exports = {
  requestWithdrawal,
  getAllWithdrawalsAdmin,
  updateWithdrawalStatusAdmin,
  getMyWithdrawals,
};
