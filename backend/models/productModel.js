const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a product name"],
      unique: [true, "Product Name already exist"],
    },
    description: {
      type: String,
      required: [true, "Please add a description"],
    },
    price: {
      type: Number,
      required: true,
      min: [0, "Price must be positive"],
    },
    discountPrice: {
      type: Number,
      default: null,
      min: [0, "Price must be positive"],
    },
    stock: {
      type: Number,
      default: 0,
      min: [0, "Stock cannot be negative"],
    },
    category: {
      type: String,
      required: [true, "Please add a category"],
      enum: [
        "Clothing & Shoes",
        "Mobile & Electronics",
        "Pet Food",
        "Home & Kitchen",
        "Beauty & Personal Care",
        "Grocery & Food",
        "Health & Fitness",
        "Books & Stationery",
        "Toy & Baby Items",
        "Others",
      ],
    },

    images: {
      type: [String],
      // validate: [(arr) => arr.length > 0, "At least one image is required"],
    },
    sold: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    rating: {
      type: Number,
      default: 0,
    },
    totalReviews: {
      type: Number,
      default: 0,
    },
    shopId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shop",
      required: true,
    },
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
