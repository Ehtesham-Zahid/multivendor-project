const express = require("express");
const router = express.Router();
const {
  createOrder,
  getOrder,
  getOrdersByShop,
  getOrdersByUser,
  requestRefund,
} = require("../controllers/orderControllers");
const { protect, optionalAuth } = require("../middlewares/authMiddleware");

router.post("/", optionalAuth, createOrder);
router.get("/getOrdersByShop", protect, getOrdersByShop);
router.get("/getOrdersByUser", protect, getOrdersByUser);
router.get("/:orderId", protect, getOrder);
router.post("/requestRefund/:orderId", protect, requestRefund);

module.exports = router;
