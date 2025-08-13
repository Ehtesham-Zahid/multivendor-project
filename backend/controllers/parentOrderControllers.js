const asyncHandler = require("express-async-handler");
const ParentOrder = require("../models/parentOrderModel");
const ShopOrder = require("../models/shopOrderModel");
const Address = require("../models/addressModel");
const Product = require("../models/productModel");
const Shop = require("../models/shopModel");

const createParentOrder = asyncHandler(async (req, res) => {
  const { items, totalAmount, paymentMethod, shippingAddress, paymentStatus } =
    req.body;

  // 1. Validate shipping address
  const addressExists = await Address.findById(shippingAddress);
  if (!addressExists) {
    res.status(400);
    throw new Error("Invalid shipping address ID");
  }

  let userId = req.user ? req.user._id : null;

  // 2. Create Parent Order
  const parentOrder = await ParentOrder.create({
    userId,
    totalAmount,
    paymentMethod,
    paymentStatus: paymentStatus || "pending",
    shippingAddress,
  });

  // 3. Group items by shopId
  const shopGroups = {};
  items.forEach((item) => {
    if (!shopGroups[item.shopId]) {
      shopGroups[item.shopId] = [];
    }
    shopGroups[item.shopId].push(item);
  });

  // 4. Create one ShopOrder per shop
  const shopOrders = [];
  for (const shopId in shopGroups) {
    const shopItems = shopGroups[shopId];
    const subtotal = shopItems.reduce(
      (sum, i) => sum + i.price * i.quantity,
      0
    );

    const shopOrder = await ShopOrder.create({
      userId,
      parentOrderId: parentOrder._id,
      shopId,
      items: shopItems,
      subtotal,
      deliveryStatus: "pending",
      refundStatus: "none",
    });

    parentOrder.shopOrders.push(shopOrder._id);
    await parentOrder.save();

    shopOrders.push(shopOrder);

    // 5. Update products & shop balance
    for (const item of shopItems) {
      const product = await Product.findById(item.productId);
      if (product) {
        product.sold += item.quantity;
        await product.save();
      }
    }
  }

  // 6. Return full order
  res.status(201).json({
    message: "Order created successfully",
    parentOrder,
    shopOrders,
  });
});

const getOrdersByUser = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const orders = await ParentOrder.find({ userId })
    .sort({ createdAt: -1 }) // latest first
    .populate({
      path: "shopOrders",
      populate: [{ path: "shopId" }, { path: "items.productId" }],
    })
    .populate("shippingAddress");

  console.log("orders", orders);
  res.status(200).json(orders);
});

// Update payment status for a parent order
const updateParentOrderPaymentStatus = asyncHandler(async (req, res) => {
  const { parentOrderId, paymentMethod } = req.body;
  // paymentMethod could be "card" or "cod"

  const parentOrder =
    await ParentOrder.findById(parentOrderId).populate("shopOrders");

  if (!parentOrder) {
    return res.status(404).json({ message: "Parent order not found" });
  }

  // For COD: update shopOrders individually
  if (paymentMethod === "cod") {
    for (const so of parentOrder.shopOrders) {
      if (so.paymentStatus !== "paid") {
        so.paymentStatus = "paid";
        await so.save();
      }
    }
  }

  // For card: payment is for the whole parent order
  if (paymentMethod === "card") {
    parentOrder.paymentStatus = "paid";
    await parentOrder.save();

    // Also mark each shopOrder as paid
    for (const so of parentOrder.shopOrders) {
      if (so.paymentStatus !== "paid") {
        so.paymentStatus = "paid";
        await so.save();
      }
    }
  }

  // Check if all shop orders are paid → update parent order
  const allPaid = parentOrder.shopOrders.every(
    (so) => so.paymentStatus === "paid"
  );
  if (allPaid && parentOrder.paymentStatus !== "paid") {
    parentOrder.paymentStatus = "paid";
    await parentOrder.save();
  }

  // Calculate commission for admin when payment is confirmed
  if (parentOrder.paymentStatus === "paid") {
    const admin = await User.findOne({ role: "admin" });
    if (admin) {
      const totalCommission = parentOrder.shopOrders.reduce(
        (sum, so) => sum + so.subtotal * COMMISSION_RATE,
        0
      );
      admin.accountBalance = (admin.accountBalance || 0) + totalCommission;
      await admin.save();
    }
  }

  res.status(200).json({
    message: "Payment status updated successfully",
    parentOrder,
  });
});

// Admin Controllers

module.exports = { createParentOrder, getOrdersByUser };
