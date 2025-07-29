const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const path = require("path");

const userRouter = require("./routes/userRoutes");

const connectDB = require("./config/db");
const { errorHandler } = require("./middlewares/errorMiddleware");
const port = process.env.PORT || 8000;

connectDB();

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRouter);

app.use(errorHandler);

app.listen(port, () => {
  console.log("Server is Running!");
});
