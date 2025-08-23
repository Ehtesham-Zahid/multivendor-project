const express = require("express");
const {
  createBankAccount,
  getBankAccounts,
  getBankAccountById,
  updateBankAccount,
  deleteBankAccount,
} = require("../controllers/bankAccountControllers");

const { protect, isVendor } = require("../middlewares/authMiddleware");
const router = express.Router();

router
  .route("/")
  .post(protect, isVendor, createBankAccount)
  .get(protect, isVendor, getBankAccounts);

router
  .route("/:id")
  .get(protect, isVendor, getBankAccountById)
  .put(protect, isVendor, updateBankAccount)
  .delete(protect, isVendor, deleteBankAccount);

module.exports = router;
