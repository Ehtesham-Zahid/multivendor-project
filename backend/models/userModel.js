const { timeStamp } = require("console");
const mongoose = require("mongoose");
const { type } = require("os");

const userSchema = mongoose.Schema(
  {
    fullname: {
      type: String,
      required: [true, "Please add a fullname"],
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: [true, "Account already exist"],
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
    },
    imageUrl: {
      type: String,
      //   required: [true, "Please upload an image"],
      default:
        "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg",
    },
    role: {
      type: String,
      enum: ["user", "vendor", "admin"],
      default: "user",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    shopId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shop",
    },
  },
  { timestamps: true }
);
