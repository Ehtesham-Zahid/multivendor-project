const mongoose = require("mongoose");

const shopSchema = mongoose.Schema(
  {
    shopName: {
      type: String,
      required: [true, "Please add a shop name"],
      unique: [true, "Shop Name already exist"],
    },
    phoneNumber: {
      type: Number,
      required: [true, "Please add an phone number"],
    },
    address: {
      type: String,
      required: [true, "Please add a address"],
    },
    zipCode: {
      type: Number,
      required: [true, "Please add a zip code"],
    },
    imageUrl: {
      type: String,
      default:
        "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg",
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // ratings: {
    //   type: Number,
    // },
    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Prodcut",
      },
    ],
    events: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Shop", shopSchema);
