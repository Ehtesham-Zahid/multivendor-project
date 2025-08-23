const express = require("express");
const router = express.Router();

const {
  requestWithdrawal,
  getAllWithdrawalsAdmin,
  updateWithdrawalStatusAdmin,
  getMyWithdrawals,
} = require("../controllers/withdrawalControllers");
const { protect, isAdmin, isVendor } = require("../middlewares/authMiddleware");

// Vendor routes
router.post("/", protect, isVendor, requestWithdrawal);
router.get("/getMyWithdrawals", protect, isVendor, getMyWithdrawals);

// Admin routes
router.get("/admin/all-withdrawals", protect, isAdmin, getAllWithdrawalsAdmin);
router.patch(
  "/admin/update-status/:withdrawalId",
  protect,
  isAdmin,
  updateWithdrawalStatusAdmin
);

module.exports = router;
