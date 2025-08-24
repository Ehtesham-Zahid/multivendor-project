const asyncHandler = require("express-async-handler");
const ShopOrder = require("../models/shopOrderModel");
const ParentOrder = require("../models/parentOrderModel");
const Shop = require("../models/shopModel");
const User = require("../models/userModel");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const getShopOrderById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Find shop order and populate relations
  const shopOrder = await ShopOrder.findById(id)
    .populate("shopId", "shopName email phoneNumber") // Shop details
    .populate({
      path: "items.productId",
      select: "name images price shopId reviews",
      populate: {
        path: "reviews",
        select: "userId rating comment createdAt",
      },
    })
    .populate({
      path: "parentOrderId",
      select:
        "userId shippingAddress paymentMethod paymentStatus totalAmount createdAt",
      populate: { path: "shippingAddress" },
    })
    .lean();

  if (!shopOrder) {
    res.status(404);
    throw new Error("Shop order not found");
  }

  res.status(200).json({
    message: "Shop order fetched successfully",
    shopOrder,
  });
});

const getShopOrdersByCurrentShop = asyncHandler(async (req, res) => {
  const { shopId } = req.user;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  const refundOnly = String(req.query.refundOnly || "false").toLowerCase();
  const deliveryStatus = req.query.deliveryStatus || "";
  const refundStatus = req.query.refundStatus || "";

  const filter = {
    refundStatus: { $ne: "refunded" },
  };

  if (refundOnly === "true") {
    filter.refundStatus = { $ne: "none" };
  }
  if (refundStatus) {
    filter.refundStatus = refundStatus;
  }
  if (deliveryStatus) {
    filter.deliveryStatus = deliveryStatus;
  }

  const totalShopOrders = await ShopOrder.countDocuments({ shopId, ...filter });
  const totalPages = Math.ceil(totalShopOrders / limit);

  const shopOrders = await ShopOrder.find({ shopId, ...filter })
    .skip(skip)
    .limit(limit)
    .populate("items.productId", "name images price")
    .populate(
      "parentOrderId",
      "userId shippingAddress paymentMethod paymentStatus totalAmount createdAt"
    )
    .sort({ createdAt: -1 })
    .lean();

  res.status(200).json({
    message: "Shop orders fetched successfully",
    shopOrders,
    totalShopOrders,
    totalPages,
    currentPage: page,
  });
});

const requestRefundShopOrder = asyncHandler(async (req, res) => {
  const { shopOrderId } = req.params;

  const shopOrder = await ShopOrder.findById(shopOrderId)
    .populate("shopId", "shopName email phone") // Shop details
    .populate("items.productId", "name images price") // Product details
    .populate({
      path: "parentOrderId",
      select:
        "userId shippingAddress paymentMethod paymentStatus totalAmount createdAt",
      populate: {
        path: "shippingAddress",
      },
    });

  if (!shopOrder) {
    res.status(404);
    throw new Error("Shop order not found");
  }
  if (shopOrder.paymentStatus !== "paid") {
    res.status(400);
    throw new Error("Shop order is not paid");
  }

  shopOrder.refundStatus = "requested";
  await shopOrder.save();

  res.status(200).json({
    message: "Refund request sent successfully",
    shopOrder,
  });
});

const updateShopOrderRefundStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { refundStatus } = req.body;

  const shopOrder = await ShopOrder.findById(id)
    .populate({
      path: "parentOrderId",
      select:
        "userId shippingAddress paymentMethod paymentStatus totalAmount createdAt paymentIntentId",
      populate: {
        path: "shippingAddress",
      },
    })
    .populate("items.productId");
  if (!shopOrder) {
    res.status(404);
    throw new Error("Shop order not found");
  }
  if (shopOrder.refundStatus === "refunded") {
    res.status(400);
    throw new Error("This order has already been refunded");
  }

  shopOrder.refundStatus = refundStatus;
  await shopOrder.save();

  if (
    refundStatus === "refunded" &&
    shopOrder.parentOrderId.paymentMethod === "card" &&
    shopOrder.paymentStatus === "paid"
  ) {
    // Check if paymentIntentId exists
    if (!shopOrder.parentOrderId.paymentIntentId) {
      res.status(400);
      throw new Error("Payment intent ID not found for this order");
    }

    try {
      // Create a refund
      const refund = await stripe.refunds.create({
        payment_intent: shopOrder.parentOrderId.paymentIntentId,
        amount: Math.round(shopOrder.subtotal * 100),
        // Amount is in cents, e.g., 500 = $5.00 (optional)
      });

      shopOrder.refundStatus = "refunded";

      await shopOrder.save();

      const admin = await User.findOne({ role: "admin" });
      if (!admin) throw new Error("Admin user not found");

      admin.totalRevenue = (admin.totalRevenue || 0) - shopOrder.subtotal * 0.1;
      admin.accountBalance =
        (admin.accountBalance || 0) - shopOrder.subtotal * 0.1;
      await admin.save();

      const shop = await Shop.findById(shopOrder.shopId);
      if (!shop) throw new Error("Shop not found");

      shop.totalRevenue = (shop.totalRevenue || 0) - shopOrder.subtotal * 0.9;
      shop.accountBalance =
        (shop.accountBalance || 0) - shopOrder.subtotal * 0.9;
      await shop.save();
    } catch (error) {
      shopOrder.refundStatus = "rejected";
      await shopOrder.save();
      console.error("Refund failed:", error.message);
      res.status(500);
      throw new Error(error.message);
    }
  }

  res.status(200).json({
    message: "Refund status updated successfully",
    shopOrder,
  });
});

const updateShopOrderDeliveryStatus = asyncHandler(async (req, res) => {
  const { shopOrderId } = req.params;
  const { deliveryStatus } = req.body;

  const shopOrder = await ShopOrder.findById(shopOrderId)
    .populate({
      path: "parentOrderId",
      select:
        "userId shippingAddress paymentMethod paymentStatus totalAmount paymentIntentId createdAt",
      populate: { path: "shippingAddress" },
    })
    .populate("items.productId");

  if (!shopOrder) {
    res.status(404);
    throw new Error("ShopOrder not found");
  }

  shopOrder.deliveryStatus = deliveryStatus;

  // Handle Delivered
  if (deliveryStatus === "delivered" && shopOrder.paymentStatus !== "paid") {
    shopOrder.paymentStatus = "paid";

    const admin = await User.findOne({ role: "admin" });
    if (!admin) throw new Error("Admin user not found");

    const adminCommission = shopOrder.subtotal * 0.1;
    admin.accountBalance = (admin.accountBalance || 0) + adminCommission;
    admin.totalRevenue = (admin.totalRevenue || 0) + adminCommission;
    await admin.save();

    const shop = await Shop.findById(shopOrder.shopId);
    if (!shop) throw new Error("Shop not found");

    const shopCommission = shopOrder.subtotal * 0.9;
    shop.accountBalance = (shop.accountBalance || 0) + shopCommission;
    shop.totalRevenue = (shop.totalRevenue || 0) + shopCommission;
    await shop.save();
  }

  // Handle Cancelled
  if (deliveryStatus === "cancelled") {
    // If paid, reverse commissions + process refund if needed
    if (
      shopOrder.paymentStatus === "paid" &&
      shopOrder.refundStatus !== "refunded"
    ) {
      const admin = await User.findOne({ role: "admin" });
      if (!admin) throw new Error("Admin user not found");

      const adminCommission = shopOrder.subtotal * 0.1;
      admin.accountBalance = (admin.accountBalance || 0) - adminCommission;
      admin.totalRevenue = (admin.totalRevenue || 0) - adminCommission;
      await admin.save();

      const shop = await Shop.findById(shopOrder.shopId);
      if (!shop) throw new Error("Shop not found");

      const shopCommission = shopOrder.subtotal * 0.9;
      shop.accountBalance = (shop.accountBalance || 0) - shopCommission;
      shop.totalRevenue = (shop.totalRevenue || 0) - shopCommission;
      await shop.save();

      // Refund if card payment
      if (shopOrder.parentOrderId.paymentMethod === "card") {
        try {
          await stripe.refunds.create({
            payment_intent: shopOrder.parentOrderId.paymentIntentId,
            amount: Math.round(shopOrder.subtotal * 100),
          });
          shopOrder.refundStatus = "refunded";
        } catch (error) {
          shopOrder.refundStatus = "rejected";
          throw new Error("Refund failed: " + error.message);
        }
      } else {
        shopOrder.refundStatus = "refunded"; // COD case
      }
    }
  }

  await shopOrder.save();

  // Update Parent Order Status
  const parentOrder = await ParentOrder.findById(
    shopOrder.parentOrderId
  ).populate("shopOrders");
  if (!parentOrder) throw new Error("ParentOrder not found");

  const allDelivered = parentOrder.shopOrders.every(
    (so) => so.deliveryStatus === "delivered"
  );
  const allCancelled = parentOrder.shopOrders.every(
    (so) => so.deliveryStatus === "cancelled"
  );

  if (allDelivered && parentOrder.deliveryStatus !== "delivered") {
    parentOrder.deliveryStatus = "delivered";
    parentOrder.paymentStatus = "paid";
  } else if (allCancelled && parentOrder.deliveryStatus !== "cancelled") {
    parentOrder.deliveryStatus = "cancelled";
  }

  await parentOrder.save();

  res.status(200).json(shopOrder);
});

const getUserShopOrders = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  const refundStatus = req.query.refundStatus || "";
  const refundOnly = req.query.refundOnly?.toString().toLowerCase() === "true";

  const userId = req.user.id;

  const filter = {};

  if (refundOnly) {
    filter.refundStatus = { $ne: "none" };
  }
  if (refundStatus) {
    filter.refundStatus = refundStatus;
  }

  const shopOrders = await ShopOrder.find({ userId, ...filter })
    .skip(skip)
    .limit(limit)
    .populate({
      path: "parentOrderId",
      select:
        "userId shippingAddress paymentMethod paymentStatus totalAmount createdAt",
      populate: {
        path: "shippingAddress",
      },
    });

  const totalShopOrders = await ShopOrder.countDocuments({ userId, ...filter });
  const totalPages = Math.ceil(totalShopOrders / limit);

  res
    .status(200)
    .json({ shopOrders, totalPages, currentPage: page, totalShopOrders });
});

// Admin Controllers
const getAllShopOrdersAdmin = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  const refundOnly = String(req.query.refundOnly || "false").toLowerCase();
  const deliveryStatus = req.query.deliveryStatus || "";
  const refundStatus = req.query.refundStatus || "";

  const filter = {
    refundStatus: { $ne: "refunded" },
  };

  if (refundOnly === "true") {
    filter.refundStatus = { $ne: "none" };
  }
  if (refundStatus) {
    filter.refundStatus = refundStatus;
  }
  if (deliveryStatus) {
    filter.deliveryStatus = deliveryStatus;
  }

  const totalShopOrders = await ShopOrder.countDocuments(filter);
  const totalPages = Math.ceil(totalShopOrders / limit);

  const shopOrders = await ShopOrder.find(filter)
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 })
    .populate("shopId")
    .populate("items.productId")
    .populate("parentOrderId");

  res.status(200).json({
    shopOrders,
    totalPages,
    totalShopOrders,
    currentPage: page,
  });
});

module.exports = {
  getShopOrderById,
  requestRefundShopOrder,
  updateShopOrderDeliveryStatus,
  getAllShopOrdersAdmin,
  updateShopOrderRefundStatus,
  getShopOrdersByCurrentShop,
  getUserShopOrders,
};
