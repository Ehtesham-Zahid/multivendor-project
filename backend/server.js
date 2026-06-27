const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const path = require("path");
const cron = require("node-cron");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const { createServer } = require("http");
const { initSocket } = require("./socket");

const userRouter = require("./routes/userRoutes");
const shopRouter = require("./routes/shopRoutes");
const productRouter = require("./routes/productRoutes");
const reviewRouter = require("./routes/reviewRoutes");
const addressesRouter = require("./routes/addressRoutes");
const eventRouter = require("./routes/eventRoutes");
const paymentRouter = require("./routes/paymentRoutes");
const couponRouter = require("./routes/couponRoutes");
const shopOrderRouter = require("./routes/shopOrderRoutes");
const parentOrderRouter = require("./routes/parentOrderRoutes");
const conversationRouter = require("./routes/conversationRoutes");
const messageRouter = require("./routes/messageRoutes");
const bankAccountRouter = require("./routes/bankAccountRoutes");
const categoryRouter = require("./routes/categoryRoutes");
const ParentOrder = require("./models/parentOrderModel");
const ShopOrder = require("./models/shopOrderModel");
const Event = require("./models/eventModel");
const Product = require("./models/productModel");
const Coupon = require("./models/couponModel");

// Add withdrawals router import
const withdrawalRouter = require("./routes/withdrawalRoutes");

const connectDB = require("./config/db");
const { errorHandler } = require("./middlewares/errorMiddleware");
const User = require("./models/userModel");
const { webhook } = require("./controllers/paymentControllers");
const port = process.env.PORT || 8000;

connectDB();

const app = express();
const server = createServer(app);

app.use(
  cors({
    origin: process.env.FRONTEND_URL, // frontend origin
    credentials: true, // required to allow cookies
  })
);

// Log only in development OR always (depending on your need)
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev")); // pretty output
} else {
  app.use(morgan("combined")); // Apache-style logs, good for production
}

// Stripe webhook route - raw body
app.post(
  "/api/payments/webhook",
  express.raw({ type: "application/json" }),
  webhook
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

// Serve static images
app.use("/api/images", express.static(path.join(__dirname, "public/images")));

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

cron.schedule("0 * * * *", async () => {
  console.log("[CRON] Running event cleanup...");
  const now = new Date();

  // Find expired events
  const expiredEvents = await Event.find({
    endDate: { $lt: now },
    isActive: true,
  });

  if (expiredEvents.length === 0) {
    console.log("No expired events found.");
    return;
  }

  // Get event IDs for product unlinking
  const eventIds = expiredEvents.map((e) => e._id);

  // Unlink from products first (set eventId to null)
  await Product.updateMany(
    { eventId: { $in: eventIds } },
    { $set: { eventId: null } }
  );

  // Delete expired events completely
  await Event.deleteMany({
    _id: { $in: eventIds },
  });

  console.log(
    `[CRON] Deleted ${expiredEvents.length} expired events and unlinked from products`
  );
});

// Cron job to deactivate expired coupon codes
cron.schedule("0 * * * *", async () => {
  console.log("[CRON] Running coupon code cleanup...");
  const now = new Date();

  // Find expired coupon codes
  const expiredCoupons = await Coupon.find({
    endDate: { $lt: now },
    isActive: true,
  });

  if (expiredCoupons.length === 0) {
    console.log("No expired coupon codes found.");
    return;
  }

  // Deactivate expired coupon codes
  await Coupon.updateMany(
    { _id: { $in: expiredCoupons.map((c) => c._id) } },
    { $set: { isActive: false } }
  );

  console.log(
    `[CRON] Deactivated ${expiredCoupons.length} expired coupon codes`
  );
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
app.use("/api/addresses", addressesRouter);
app.use("/api/events", eventRouter);
app.use("/api/payments", paymentRouter);
app.use("/api/coupons", couponRouter);
app.use("/api/shop-orders", shopOrderRouter);
app.use("/api/parent-orders", parentOrderRouter);
app.use("/api/conversations", conversationRouter);
app.use("/api/messages", messageRouter);
app.use("/api/bank-accounts", bankAccountRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/withdrawals", withdrawalRouter);
app.get("/", (req, res) => {
    res.send("Backend Running Version 2 🚀");
});

app.use(errorHandler);

// Socket.IO setup
const io = initSocket(server);

// Socket.IO connection handling
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // identify the user and join their conversation rooms

  // When a user joins a chat
  socket.on("join-room", ({ roomId, userId }) => {
    socket.userId = userId;
    socket.join(roomId);
    console.log(`Socket ${socket.userId} joined room ${roomId}`);
  });

  socket.on("send-message", ({ roomId, message }) => {
    io.to(roomId).emit("receive-message", message); // only this room gets it
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

console.log("✅ Server booted Version 2.0, waiting for requests...");

// Fix: Listen on the server, not app
server.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || "development"}`);
});
