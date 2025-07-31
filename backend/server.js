const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const path = require("path");
const cron = require("node-cron");
const cookieParser = require("cookie-parser");

const userRouter = require("./routes/userRoutes");

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

app.use(errorHandler);

app.listen(port, () => {
  console.log("Server is Running!");
});
