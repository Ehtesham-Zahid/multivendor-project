const asyncHandler = require("express-async-handler");
const Order = require("../models/orderModel");
const Address = require("../models/addressModel");
const Product = require("../models/productModel");
const Shop = require("../models/shopModel");

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

  items.forEach(async (item) => {
    const product = await Product.findById(item.productId);
    product.sold += item.quantity;
    await product.save();

    const shop = await Shop.findById(item.shopId);
    shop.accountBalance += item.price * item.quantity;
    await shop.save();
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
    .populate("shippingAddress")
    .populate("items.productId")
    .populate("items.shopId")
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
  console.log("shopId", shopId);

  // const orders = await Order.find({ "items.shopId": shopId })
  //   .populate("shippingAddress")
  //   .sort({ createdAt: -1 });

  const orders = await Order.find({ items: { $elemMatch: { shopId } } })
    .populate("shippingAddress") // optional, if you want full address details
    .sort({ createdAt: -1 }); // latest first

  // Filter items and calculate shop-specific total
  const shopSpecificOrders = orders.map((order) => {
    const shopItems = order.items.filter(
      (item) => item.shopId.toString() === shopId.toString()
    );

    const shopTotalAmount = shopItems.reduce((sum, item) => {
      return sum + item.price * item.quantity;
    }, 0);

    return {
      _id: order._id,
      createdAt: order.createdAt,
      paymentStatus: order.paymentStatus,
      paymentMethod: order.paymentMethod,
      deliveryStatus: order.deliveryStatus,
      shippingAddress: order.shippingAddress,
      items: shopItems,
      totalAmount: shopTotalAmount,
    };
  });

  res.status(200).json(shopSpecificOrders);
});

const requestRefund = asyncHandler(async (req, res) => {
  const orderId = req.params.orderId;

  const order = await Order.findById(orderId);
  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }

  order.refundStatus = "requested";
  await order.save();

  res.status(200).json(order);
});

module.exports = {
  createOrder,
  getOrder,
  getOrdersByUser,
  getOrdersByShop,
  requestRefund,
};
