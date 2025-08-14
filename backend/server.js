const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const path = require("path");
const cron = require("node-cron");
const cookieParser = require("cookie-parser");

const userRouter = require("./routes/userRoutes");
const shopRouter = require("./routes/shopRoutes");
const productRouter = require("./routes/productRoutes");
const reviewRouter = require("./routes/reviewRoutes");
const cartRouter = require("./routes/cartRoutes");
const orderRouter = require("./routes/orderRoutes");
const addressesRouter = require("./routes/addressRoutes");
const eventRouter = require("./routes/eventRoutes");
const paymentRouter = require("./routes/paymentRoutes");
const couponRouter = require("./routes/couponRoutes");
const shopOrderRouter = require("./routes/shopOrderRoutes");
const parentOrderRouter = require("./routes/parentOrderRoutes");
const ParentOrder = require("./models/parentOrderModel");
const ShopOrder = require("./models/shopOrderModel");

const connectDB = require("./config/db");
const { errorHandler } = require("./middlewares/errorMiddleware");
const User = require("./models/userModel");
const { webhook } = require("./controllers/paymentControllers");
const port = process.env.PORT || 8000;

connectDB();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173", // frontend origin
    credentials: true, // required to allow cookies
  })
);

// Stripe webhook route - raw body
app.post(
  "/api/payments/webhook",
  express.raw({ type: "application/json" }),
  webhook
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

// Runs every hour to delete unverified users
cron.schedule("0 * * * *", async () => {
  console.log("[CRON] Running cleanup job..."); // this should show hourly

  const oneHourAgo = new Date(Date.now() - 1000 * 60 * 60);

  try {
    const result = await User.deleteMany({
      isVerified: false,
      createdAt: { $lt: oneHourAgo },
    });
    console.log(`[CRON] Deleted ${result.deletedCount} unverified users`);
  } catch (error) {
    console.error("[CRON] Error deleting unverified users:", error);
  }
});

// Runs every 10 minutes to mark abandoned orders as failed
cron.schedule("*/10 * * * *", async () => {
  console.log("[CRON] Running abandoned order cleanup...");

  const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);

  try {
    // Find abandoned parent orders
    const abandonedParents = await ParentOrder.find({
      paymentStatus: "pending",
      paymentMethod: "card",
      createdAt: { $lt: tenMinutesAgo },
    });

    if (abandonedParents.length === 0) {
      console.log("No abandoned orders found.");
      return;
    }

    const parentIds = abandonedParents.map((order) => order._id);

    // Mark related shop orders as failed
    const updatedShopOrders = await ShopOrder.updateMany(
      { parentOrderId: { $in: parentIds } },
      { $set: { paymentStatus: "failed" } }
    );

    // Mark parent orders as failed
    const updatedParents = await ParentOrder.updateMany(
      { _id: { $in: parentIds } },
      { $set: { paymentStatus: "failed" } }
    );

    console.log(
      `Marked ${updatedParents.modifiedCount} parent orders and ${updatedShopOrders.modifiedCount} shop orders as failed.`
    );
  } catch (err) {
    console.error("[CRON ERROR]", err);
  }
});

app.use("/api/users", userRouter);
app.use("/api/shops", shopRouter);
app.use("/api/products", productRouter);
app.use("/api/reviews", reviewRouter);
app.use("/api/carts", cartRouter);
app.use("/api/orders", orderRouter);
app.use("/api/addresses", addressesRouter);
app.use("/api/events", eventRouter);
app.use("/api/payments", paymentRouter);
app.use("/api/coupons", couponRouter);
app.use("/api/shop-orders", shopOrderRouter);
app.use("/api/parent-orders", parentOrderRouter);

app.use(errorHandler);

app.listen(port, () => {
  console.log("Server is Running!");
});
