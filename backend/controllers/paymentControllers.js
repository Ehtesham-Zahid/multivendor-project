// server.js or wherever you handle routes
const express = require("express");
const asyncHandler = require("express-async-handler");
const ParentOrder = require("../models/parentOrderModel");
const Shop = require("../models/shopModel");
const User = require("../models/userModel");
const Stripe = require("stripe");
const app = express();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY); // Your Stripe Secret Key

const createCheckoutSession = asyncHandler(async (req, res) => {
  const { productsData, discountPercentage = 0, orderId } = req.body; // Default to 0 if not provided

  const data = productsData.map((product) => {
    // Priority: Event Price > Discount Price > Original Price
    let basePrice = product.price; // Original price as fallback

    if (product.eventId && product.eventId.eventPrice) {
      basePrice = product.eventId.eventPrice; // Event price takes highest priority
    } else if (product.discountPrice) {
      basePrice = product.discountPrice; // Discount price takes second priority
    }

    // Apply coupon discount to the determined base price
    const discountMultiplier = 1 - discountPercentage / 100; // Convert percentage to multiplier
    const finalPrice = basePrice * discountMultiplier;

    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: product.name,
        },
        unit_amount: Math.round(finalPrice * 100), // Apply discount here
      },
      quantity: product.quantity,
    };
  });

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: data,
    shipping_options: [
      {
        shipping_rate_data: {
          display_name: "Standard Delivery",
          type: "fixed_amount",
          fixed_amount: { amount: 10000, currency: "usd" }, // $10 delivery
        },
      },
    ],
    mode: "payment",
    success_url: "http://localhost:5173/checkout/success",
    cancel_url: "http://localhost:5173/checkout/cancel",
    metadata: {
      orderId: orderId,
    },
  });

  res.json({ id: session.id });
});

const webhook = asyncHandler(async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const orderId = session.metadata.orderId;

    // Retrieve PaymentIntent if you need full details
    const paymentIntent = await stripe.paymentIntents.retrieve(
      session.payment_intent
    );

    const parentOrder =
      await ParentOrder.findById(orderId).populate("shopOrders");
    if (!parentOrder) {
      res.status(404);
      throw new Error("Parent order not found");
    }

    parentOrder.paymentIntentId = paymentIntent.id;
    parentOrder.paymentStatus = "paid";
    await parentOrder.save();

    // Add commission to admin here, if you want it on full payment
    const admin = await User.findOne({ role: "admin" });
    if (!admin) {
      res.status(500);
      throw new Error("Admin user not found");
    }

    const totalCommission = parentOrder.totalAmount * 0.1;

    admin.accountBalance = (admin.accountBalance || 0) + totalCommission;
    admin.totalRevenue = (admin.totalRevenue || 0) + totalCommission;

    await admin.save();

    for (const shopOrder of parentOrder.shopOrders) {
      shopOrder.paymentStatus = "paid";
      await shopOrder.save();

      const shop = await Shop.findById(shopOrder.shopId);
      if (!shop) {
        res.status(404);
        throw new Error("Shop not found");
      }

      const shopCommission = shopOrder.subtotal * 0.9;
      shop.accountBalance = (shop.accountBalance || 0) + shopCommission;
      shop.totalRevenue = (shop.totalRevenue || 0) + shopCommission;
      await shop.save();
    }
  }

  if (
    event.type === "payment_intent.payment_failed" ||
    event.type === "checkout.session.expired"
  ) {
    const session = event.data.object;
    const orderId =
      session.metadata?.orderId || event.data.object.metadata?.orderId;

    if (!orderId) {
      console.error("No orderId found in failed payment event");
      return res.status(400).send("Missing orderId");
    }

    const parentOrder =
      await ParentOrder.findById(orderId).populate("shopOrders");
    if (!parentOrder) {
      console.error("Parent order not found for failed payment:", orderId);
      return res.status(404).send("Order not found");
    }

    parentOrder.paymentStatus = "failed";
    await parentOrder.save();

    for (const shopOrder of parentOrder.shopOrders) {
      shopOrder.paymentStatus = "failed";
      await shopOrder.save();
    }
  }

  res.status(200).json({ received: true });
});

module.exports = { createCheckoutSession, webhook };
