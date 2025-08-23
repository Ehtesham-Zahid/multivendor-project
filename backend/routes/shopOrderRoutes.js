const express = require("express");
const router = express.Router();
const {
  getShopOrdersByCurrentShop,
  getShopOrderById,
  getAllShopOrdersAdmin,
  requestRefundShopOrder,
  updateShopOrderDeliveryStatus,
  getUserShopOrders,
  updateShopOrderRefundStatus,
} = require("../controllers/shopOrderControllers");
const { protect, isAdmin, isVendor } = require("../middlewares/authMiddleware");

router.get("/current-shop", protect, isVendor, getShopOrdersByCurrentShop);
router.get("/getUserShopOrders", protect, getUserShopOrders);
router.post("/request-refund/:shopOrderId", protect, requestRefundShopOrder);
router.patch(
  "/update-delivery-status/:shopOrderId",
  protect,
  isVendor,
  updateShopOrderDeliveryStatus
);
router.patch(
  "/update-refund-status/:id",
  protect,
  isVendor,
  updateShopOrderRefundStatus
);

// Dynamic routes go last
router.get("/:id", protect, getShopOrderById);

// Admin Routes
router.get("/admin/all-shop-orders", protect, isAdmin, getAllShopOrdersAdmin);

module.exports = router;
