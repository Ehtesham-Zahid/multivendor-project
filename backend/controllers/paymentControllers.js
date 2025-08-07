// server.js or wherever you handle routes
const express = require("express");
const asyncHandler = require("express-async-handler");
const Stripe = require("stripe");
const app = express();
const stripe = Stripe(
  "sk_test_51RtPHKBTJUPkctEDaaXA5QTxfnKqWDG6uwI2JIMxrRzCNfpGJOalKslAdvRxuoRV4KWvudgUAAykHWapvFXLgXGH00NCOCePid"
); // Your Stripe Secret Key

const createCheckoutSession = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { productsData } = req.body;
  console.log("HEMLO", productsData);
  const data = productsData.map((product) => {
    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: product.name,
        },
        unit_amount: Math.round(product.price * 100),
      },
      quantity: product.quantity,
    };
  });
  console.log(data);
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: data,
    mode: "payment",
    success_url: "http://localhost:5173/success",
    cancel_url: "http://localhost:5173/cancel",
  });

  res.json({ id: session.id });
});

module.exports = { createCheckoutSession };
