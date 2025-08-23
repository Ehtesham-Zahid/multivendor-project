const asyncHandler = require("express-async-handler");
const ParentOrder = require("../models/parentOrderModel");
const ShopOrder = require("../models/shopOrderModel");
const Address = require("../models/addressModel");
const Product = require("../models/productModel");
const Shop = require("../models/shopModel");

const createParentOrder = asyncHandler(async (req, res) => {
  const {
    items,
    totalAmount,
    paymentMethod,
    shippingAddress,
    paymentStatus,
    discountPercentage,
  } = req.body;

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
    totalAmount: totalAmount + 100,
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

    // Update item prices and calculate subtotal
    const subtotal = shopItems.reduce((sum, item) => {
      // Priority: Event Price > Discount Price > Original Price
      let itemPrice = item.price; // Original price as fallback

      if (item.eventId && item.eventId.eventPrice) {
        itemPrice = item.eventId.eventPrice; // Event price takes highest priority
      } else if (item.discountPrice) {
        itemPrice = item.discountPrice; // Discount price takes second priority
      }

      // Calculate the discounted price
      const discountedPrice = Number(
        (itemPrice * (1 - discountPercentage / 100)).toFixed(2)
      );

      // Update the item's price property to reflect the actual price being used
      item.price = discountedPrice;

      return sum + discountedPrice * item.quantity; // Use discounted price for subtotal
    }, 0);

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
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const deliveryStatus = req.query.deliveryStatus || "";
  const skip = (page - 1) * limit;

  const filter = {};

  if (deliveryStatus) {
    filter.deliveryStatus = deliveryStatus;
  }

  const orders = await ParentOrder.find({ userId, ...filter })
    .sort({ createdAt: -1 }) // latest first
    .skip(skip)
    .limit(limit)
    .populate({
      path: "shopOrders",
      populate: [{ path: "shopId" }, { path: "items.productId" }],
    })
    .populate("shippingAddress");

  const totalOrders = await ParentOrder.countDocuments({ userId, ...filter });
  const totalPages = Math.ceil(totalOrders / limit);

  res.status(200).json({ orders, totalPages, totalOrders });
});

module.exports = { createParentOrder, getOrdersByUser };
