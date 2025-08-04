const express = require("express");
const router = express.Router();
const {
  createOrder,
  getOrder,
  getOrdersByShop,
  getOrdersByUser,
} = require("../controllers/orderControllers");
const { protect, optionalAuth } = require("../middlewares/authMiddleware");

router.post("/", optionalAuth, createOrder);
router.get("/getOrdersByShop", protect, getOrdersByShop);
router.get("/getOrdersByUser", protect, getOrdersByUser);
router.get("/:orderId", protect, getOrder);

module.exports = router;
