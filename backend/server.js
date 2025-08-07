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

const connectDB = require("./config/db");
const { errorHandler } = require("./middlewares/errorMiddleware");
const User = require("./models/userModel");
const port = process.env.PORT || 8000;

connectDB();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173", // frontend origin
    credentials: true, // required to allow cookies
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

// Runs every hour
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

app.use("/api/users", userRouter);
app.use("/api/shops", shopRouter);
app.use("/api/products", productRouter);
app.use("/api/reviews", reviewRouter);
app.use("/api/carts", cartRouter);
app.use("/api/orders", orderRouter);
app.use("/api/addresses", addressesRouter);
app.use("/api/events", eventRouter);
app.use("/api/payments", paymentRouter);

app.use(errorHandler);

app.listen(port, () => {
  console.log("Server is Running!");
});
