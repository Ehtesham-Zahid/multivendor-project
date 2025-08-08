const asyncHandler = require("express-async-handler");
const Order = require("../models/orderModel");
const Address = require("../models/addressModel");

// Create

const createOrder = asyncHandler(async (req, res) => {
  console.log("order controller", req.body);
  const { items, totalAmount, paymentStatus, paymentMethod, shippingAddress } =
    req.body;

  // 1. Validate address exists
  const addressExists = await Address.findById(shippingAddress);
  if (!addressExists) {
    res.status(400);
    throw new Error("Invalid shipping address ID");
  }

  let userId = null;
  if (req.user) {
    userId = req.user._id;
  }

  const order = await Order.create({
    userId,
    items,
    totalAmount,
    paymentStatus,
    paymentMethod,
    shippingAddress,
  });

  console.log("order created", order);

  res.status(201).json(order);
});

const getOrder = asyncHandler(async (req, res) => {
  const orderId = req.params.orderId;
  if (!orderId) {
    res.status(400);
    throw new Error("Order ID is required");
  }
  const order = await Order.findById(orderId)
    .populate("shippingAddress") // optional: full address
    .lean();

  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }

  res.status(200).json(order);
});

const getOrdersByUser = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const orders = await Order.find({ userId })
    .populate("shippingAddress") // optional, if you want full address details
    .sort({ createdAt: -1 }); // latest first

  res.status(200).json(orders);
});

const getOrdersByShop = asyncHandler(async (req, res) => {
  const shopId = req.user.shopId;

  const orders = await Order.find({ items: { $elemMatch: { shopId } } })
    .populate("shippingAddress") // optional, if you want full address details
    .sort({ createdAt: -1 }); // latest first

  res.status(200).json(orders);
});

module.exports = {
  createOrder,
  getOrder,
  getOrdersByUser,
  getOrdersByShop,
};
