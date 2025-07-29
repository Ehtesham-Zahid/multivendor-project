const mongoose = require("mongoose");

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
    verificationToken: {
      type: String,
    },
    shopId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shop",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
