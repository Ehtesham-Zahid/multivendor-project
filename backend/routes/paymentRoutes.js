const express = require("express");
const {
  createCheckoutSession,
  //   webhook,
} = require("../controllers/paymentControllers");
const router = express.Router();

router.post("/create-checkout-session", createCheckoutSession);
// router.post("/webhook", express.raw({ type: "application/json" }), webhook);

module.exports = router;
