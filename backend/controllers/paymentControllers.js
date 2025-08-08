// server.js or wherever you handle routes
const express = require("express");
const asyncHandler = require("express-async-handler");
const Order = require("../models/orderModel");
const Stripe = require("stripe");
const app = express();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY); // Your Stripe Secret Key

const createCheckoutSession = asyncHandler(async (req, res) => {
  const { productsData, discountPercentage = 0, orderId } = req.body; // Default to 0 if not provided

  const data = productsData.map((product) => {
    const discountMultiplier = 1 - discountPercentage / 100; // Convert percentage to multiplier
    const discountedPrice = product.price * discountMultiplier;
    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: product.name,
        },
        unit_amount: Math.round(discountedPrice * 100), // Apply discount here
      },
      quantity: product.quantity,
    };
  });

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: data,
    mode: "payment",
    success_url: "http://localhost:5173/success",
    cancel_url: "http://localhost:5173/cancel",
    metadata: {
      orderId: orderId,
    },
  });

  res.json({ id: session.id });
});

const webhook = asyncHandler(async (req, res) => {
  console.log("webhook", req.body);
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.log("Webhook signature verification failed.", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const orderId = session.metadata.orderId;
    console.log("webhook orderId", orderId);

    await Order.findByIdAndUpdate(orderId, {
      paymentStatus: "paid",
    });

    console.log("✅ Order marked as paid:", orderId);
  }

  res.status(200).json({ received: true });
});

module.exports = { createCheckoutSession, webhook };
