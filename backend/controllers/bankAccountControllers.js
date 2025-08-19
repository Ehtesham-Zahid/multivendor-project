const asyncHandler = require("express-async-handler");
const BankAccount = require("../models/bankAccountModel");

// ✅ Create Bank Account
const createBankAccount = asyncHandler(async (req, res) => {
  const { bankName, accountNumber, accountHolderName, ifscCode, isDefault } =
    req.body;
  const vendorId = req.user._id;

  if (isDefault) {
    // reset all others to false
    await BankAccount.updateMany({ vendorId }, { isDefault: false });
  }

  const bankAccount = await BankAccount.create({
    vendorId,
    bankName,
    accountNumber,
    accountHolderName,
    ifscCode,
    isDefault,
  });

  res.status(201).json(bankAccount);
});

// ✅ Get All Bank Accounts for Vendor
const getBankAccounts = asyncHandler(async (req, res) => {
  const vendorId = req.user._id;
  const accounts = await BankAccount.find({ vendorId });
  res.json(accounts);
});

// ✅ Get Single Bank Account
const getBankAccountById = asyncHandler(async (req, res) => {
  const vendorId = req.user._id;
  const bankAccount = await BankAccount.findOne({
    _id: req.params.id,
    vendorId,
  });

  if (!bankAccount) {
    res.status(404);
    throw new Error("Bank account not found");
  }

  res.json(bankAccount);
});

// ✅ Update Bank Account
const updateBankAccount = asyncHandler(async (req, res) => {
  const vendorId = req.user._id;
  const { bankName, accountNumber, accountHolderName, ifscCode, isDefault } =
    req.body;

  let bankAccount = await BankAccount.findOne({ _id: req.params.id, vendorId });

  if (!bankAccount) {
    res.status(404);
    throw new Error("Bank account not found");
  }

  if (isDefault) {
    await BankAccount.updateMany({ vendorId }, { isDefault: false });
  }

  bankAccount.bankName = bankName || bankAccount.bankName;
  bankAccount.accountNumber = accountNumber || bankAccount.accountNumber;
  bankAccount.accountHolderName =
    accountHolderName || bankAccount.accountHolderName;
  bankAccount.ifscCode = ifscCode || bankAccount.ifscCode;
  bankAccount.isDefault =
    isDefault !== undefined ? isDefault : bankAccount.isDefault;

  const updatedAccount = await bankAccount.save();
  res.json(updatedAccount);
});

// ✅ Delete Bank Account
const deleteBankAccount = asyncHandler(async (req, res) => {
  const vendorId = req.user._id;
  const bankAccount = await BankAccount.findOne({
    _id: req.params.id,
    vendorId,
  });

  if (!bankAccount) {
    res.status(404);
    throw new Error("Bank account not found");
  }

  const isDefault = bankAccount.isDefault;

  await bankAccount.deleteOne();

  // If deleted account was default, assign another one as default
  if (isDefault) {
    const anotherAccount = await BankAccount.findOne({ vendorId });
    if (anotherAccount) {
      anotherAccount.isDefault = true;
      await anotherAccount.save();
    }
  }

  res.json({ message: "Bank account removed" });
});

module.exports = {
  createBankAccount,
  getBankAccounts,
  getBankAccountById,
  updateBankAccount,
  deleteBankAccount,
};
