const express = require("express");
const {
  createBankAccount,
  getBankAccounts,
  getBankAccountById,
  updateBankAccount,
  deleteBankAccount,
} = require("../controllers/bankAccountControllers");

const { protect } = require("../middlewares/authMiddleware");
const router = express.Router();

router
  .route("/")
  .post(protect, createBankAccount)
  .get(protect, getBankAccounts);

router
  .route("/:id")
  .get(protect, getBankAccountById)
  .put(protect, updateBankAccount)
  .delete(protect, deleteBankAccount);

module.exports = router;
