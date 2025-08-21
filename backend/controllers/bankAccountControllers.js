const asyncHandler = require("express-async-handler");
const BankAccount = require("../models/bankAccountModel");
const User = require("../models/userModel");
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// ✅ Create Bank Account
const createBankAccount = asyncHandler(async (req, res) => {
  const {
    bankName,
    accountNumber,
    accountHolderName,
    routingNumber,
    isDefault,
  } = req.body;
  const vendorId = req.user._id;

  // Step 1: Reset other defaults if this one is default
  if (isDefault) {
    await BankAccount.updateMany({ userId: vendorId }, { isDefault: false });
  }

  // Step 2: Get or create Stripe Connected Account for this vendor
  let vendor = await User.findById(vendorId);
  if (!vendor.stripeAccountId) {
    const account = await stripe.accounts.create({
      type: "express",
      country: "US",
      email: vendor.email,
      business_type: "individual",
      capabilities: {
        transfers: { requested: true },
      },
    });

    vendor.stripeAccountId = account.id;
    await vendor.save();
  }

  let bankAccountStripe;

  try {
    bankAccountStripe = await stripe.accounts.createExternalAccount(
      vendor.stripeAccountId,
      {
        external_account: {
          object: "bank_account",
          country: "US",
          currency: "USD",
          account_holder_name: accountHolderName,
          account_number: accountNumber,
          routing_number: routingNumber,
        },
        default_for_currency: true,
      }
    );
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
  // Step 3: Attach bank account to vendor's Stripe account

  // Step 4: Save to your DB
  const bankAccount = await BankAccount.create({
    userId: vendorId,
    bankName,
    accountNumber,
    accountHolderName,
    routingNumber,
    isDefault,
    stripeBankAccountId: bankAccountStripe.id, // save Stripe reference
  });

  res.status(201).json(bankAccount);
});

// ✅ Get All Bank Accounts for Vendor
const getBankAccounts = asyncHandler(async (req, res) => {
  const vendorId = req.user._id;
  const accounts = await BankAccount.find({ userId: vendorId });
  res.json(accounts);
});

// ✅ Get Single Bank Account
const getBankAccountById = asyncHandler(async (req, res) => {
  const vendorId = req.user._id;
  const bankAccount = await BankAccount.findOne({
    _id: req.params.id,
    userId: vendorId,
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

  let bankAccount = await BankAccount.findOne({
    _id: req.params.id,
    userId: vendorId,
  });

  if (!bankAccount) {
    res.status(404);
    throw new Error("Bank account not found");
  }

  if (isDefault) {
    await BankAccount.updateMany({ userId: vendorId }, { isDefault: false });
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
    userId: vendorId,
  });

  if (!bankAccount) {
    res.status(404);
    throw new Error("Bank account not found");
  }

  const isDefault = bankAccount.isDefault;

  await bankAccount.deleteOne();

  // If deleted account was default, assign another one as default
  if (isDefault) {
    const anotherAccount = await BankAccount.findOne({ userId: vendorId });
    if (anotherAccount) {
      anotherAccount.isDefault = true;
      await anotherAccount.save();
    }
  }

  res.json({ message: "Bank account removed", id: bankAccount._id });
});

module.exports = {
  createBankAccount,
  getBankAccounts,
  getBankAccountById,
  updateBankAccount,
  deleteBankAccount,
};
