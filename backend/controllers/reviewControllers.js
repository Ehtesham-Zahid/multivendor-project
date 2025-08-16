const asyncHandler = require("express-async-handler");
const Review = require("../models/reviewModel");
const Shop = require("../models/shopModel");
const Product = require("../models/productModel");
const mongoose = require("mongoose");

const createReview = asyncHandler(async (req, res) => {
  const { shopId, productId, rating, comment } = req.body;

  if (!productId) {
    res.status(400);
    throw new Error("productId is required");
  }

  const review = await Review.create({
    rating,
    comment,
    userId: req.user._id,
    shopId,
    productId,
  });

  // Update shop rating (if shopId provided)
  if (shopId) {
    const shopStats = await Review.aggregate([
      { $match: { shopId: new mongoose.Types.ObjectId(shopId) } },
      {
        $group: {
          _id: null,
          avgRating: { $avg: "$rating" },
          total: { $sum: 1 },
        },
      },
    ]);

    await Shop.findByIdAndUpdate(shopId, {
      $set: {
        rating: shopStats[0]?.avgRating || 0,
        totalReviews: shopStats[0]?.total || 0,
      },
      $addToSet: { reviews: review._id },
    });
  }

  // Update product rating
  const productStats = await Review.aggregate([
    { $match: { productId: new mongoose.Types.ObjectId(productId) } },
    {
      $group: { _id: null, avgRating: { $avg: "$rating" }, total: { $sum: 1 } },
    },
  ]);

  await Product.findByIdAndUpdate(productId, {
    $set: {
      rating: productStats[0]?.avgRating || 0,
      totalReviews: productStats[0]?.total || 0,
    },
    $addToSet: { reviews: review._id },
  });

  res.status(201).json({
    message: "Review Created Successfully",
    review,
  });
});

const updateReview = asyncHandler(async (req, res) => {
  const { reviewId } = req.params;
  const updatedData = req.body;

  const review = await Review.findById(reviewId);

  if (!review) {
    res.status(404);
    throw new Error("Review not found");
  }

  Object.assign(review, updatedData);
  await review.save();

  res.status(200).json({
    message: "Review Updated",
    review,
  });
});

const deleteReview = asyncHandler(async (req, res) => {
  const { reviewId } = req.params;

  const review = await Review.findById(reviewId);

  if (!review) {
    res.status(404);
    throw new Error("Review not found");
  }

  await Review.deleteOne({ _id: reviewId });

  if (review.shopId) {
    const shop = await Shop.findById(review.shopId);
    if (shop) {
      shop.reviews.pull(reviewId); // remove from array
      const reviews = await Review.find({ shopId: review.shopId });
      shop.totalReviews = reviews.length;
      shop.rating =
        reviews.length > 0
          ? reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length
          : 0;
      await shop.save();
    }
  }

  if (review.productId) {
    const product = await Product.findById(review.productId);
    if (product) {
      product.reviews.pull(reviewId); // remove from array
      const reviews = await Review.find({ productId: review.productId });
      product.totalReviews = reviews.length;
      product.rating =
        reviews.length > 0
          ? reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length
          : 0;
      await product.save();
    }
  }

  res.status(200).json({
    message: "Review Deleted",
    review,
  });
});

const getShopReviews = asyncHandler(async (req, res) => {
  const { shopId } = req.params;

  const shop = await Shop.findById(shopId);

  if (!shop) {
    res.status(404);
    throw new Error("Shop doesnt exist");
  }

  const reviews = await Review.find({ shopId });

  res.status(200).json({
    reviews,
  });
});

const getProductReviews = asyncHandler(async (req, res) => {
  const { productId } = req.params;

  const product = await Product.findById(productId);

  if (!product) {
    res.status(404);
    throw new Error("Product doesnt exist");
  }

  const reviews = await Review.find({ productId });

  res.status(200).json({
    reviews,
  });
});

module.exports = { createReview, updateReview, deleteReview };
