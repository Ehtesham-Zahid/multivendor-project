const mongoose = require("mongoose");

const shopSchema = mongoose.Schema(
  {
    shopName: {
      type: String,
      required: [true, "Please add a shop name"],
      unique: [true, "Shop Name already exist"],
    },
    phoneNumber: {
      type: String,
      required: [true, "Please add a phone number"],
    },

    address: {
      type: String,
      required: [true, "Please add a address"],
    },
    zipCode: {
      type: String,
      required: [true, "Please add a zip code"],
    },
    imageUrl: {
      type: String,
      default:
        "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    rating: {
      type: Number,
      default: 0,
    },
    totalReviews: {
      type: Number,
      default: 0,
    },
    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    events: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event",
      },
    ],
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Shop", shopSchema);
