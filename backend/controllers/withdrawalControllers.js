const asyncHandler = require("express-async-handler");
const Withdrawal = require("../models/withdrawalModel");
const Shop = require("../models/shopModel");

// Vendor requests a withdrawal
const requestWithdrawal = asyncHandler(async (req, res) => {
  const { amount, method } = req.body;
  const shopId = req.user.shopId; // assuming auth middleware adds this

  const shop = await Shop.findById(shopId);
  if (!shop) {
    res.status(404);
    throw new Error("Shop not found");
  }

  if (amount <= 0) {
    res.status(400);
    throw new Error("Withdrawal amount must be greater than zero");
  }

  if (shop.accountBalance < amount) {
    res.status(400);
    throw new Error("Insufficient account balance");
  }

  // Deduct immediately or when completed?
  // Best practice: Deduct immediately to lock funds
  shop.accountBalance -= amount;
  await shop.save();

  const withdrawal = await Withdrawal.create({
    shopId,
    amount,
    method,
    status: "pending",
  });

  res.status(201).json(withdrawal);
});

// Admin views all withdrawals
const getAllWithdrawals = asyncHandler(async (req, res) => {
  const withdrawals = await Withdrawal.find()
    .populate("shopId", "name accountBalance")
    .sort({ createdAt: -1 });
  res.json(withdrawals);
});

// Admin updates withdrawal status
const updateWithdrawalStatus = asyncHandler(async (req, res) => {
  const { withdrawalId } = req.params;
  const { status, transactionId } = req.body; // "completed" or "failed"

  const withdrawal = await Withdrawal.findById(withdrawalId).populate("shopId");
  if (!withdrawal) {
    res.status(404);
    throw new Error("Withdrawal not found");
  }

  if (!["completed", "failed"].includes(status)) {
    res.status(400);
    throw new Error("Invalid status");
  }

  withdrawal.status = status;
  if (transactionId) withdrawal.transactionId = transactionId;

  // If failed, refund the money back to shop
  if (status === "failed") {
    withdrawal.shopId.accountBalance += withdrawal.amount;
    await withdrawal.shopId.save();
  }

  await withdrawal.save();

  res.json(withdrawal);
});

// Vendor views own withdrawals
const getMyWithdrawals = asyncHandler(async (req, res) => {
  const shopId = req.user.shopId; // from auth middleware
  const withdrawals = await Withdrawal.find({ shopId }).sort({ createdAt: -1 });
  res.json(withdrawals);
});

module.exports = {
  requestWithdrawal,
  getAllWithdrawals,
  updateWithdrawalStatus,
  getMyWithdrawals,
};
