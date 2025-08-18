const asyncHandler = require("express-async-handler");
const Review = require("../models/reviewModel");
const Shop = require("../models/shopModel");
const Product = require("../models/productModel");
const mongoose = require("mongoose");
const ShopOrder = require("../models/shopOrderModel");

const createReview = asyncHandler(async (req, res) => {
  const { shopId, productId, rating, comment } = req.body;

  if (!productId || !shopId) {
    return res
      .status(400)
      .json({ message: "productId and shopId are required" });
  }

  // Verify user purchased this product
  const orders = await ShopOrder.find({ userId: req.user._id, shopId });
  const order = orders.find((order) =>
    order.items.some((item) => item.productId.toString() === productId)
  );
  if (!order) {
    return res
      .status(400)
      .json({ message: "You have not purchased this product" });
  }

  // Create review
  const review = await Review.create({
    rating,
    comment,
    userId: req.user._id,
    shopId,
    productId,
  });

  // Update shop rating
  const shop = await Shop.findById(shopId);
  shop.rating =
    (shop.rating * shop.totalReviews + rating) / (shop.totalReviews + 1);
  shop.totalReviews += 1;
  shop.reviews.push(review._id);
  await shop.save();

  // Update product rating
  const product = await Product.findById(productId);
  product.rating =
    (product.rating * product.totalReviews + rating) /
    (product.totalReviews + 1);
  product.totalReviews += 1;
  product.reviews.push(review._id);
  await product.save();

  res.status(201).json({ message: "Review Created Successfully", review });
});

const updateReview = asyncHandler(async (req, res) => {
  const { reviewId } = req.params;
  const { rating, comment } = req.body;
  console.log(req.body);

  const review = await Review.findById(reviewId);

  if (!review) {
    return res.status(404).json({ message: "Review not found" });
  }

  const oldRating = review.rating; // store old rating

  // update review
  review.rating = rating;
  review.comment = comment;

  // update shop average
  const shop = await Shop.findById(review.shopId);
  shop.rating =
    (shop.rating * shop.totalReviews - oldRating + rating) / shop.totalReviews;
  await shop.save();

  // update product average
  const product = await Product.findById(review.productId);
  product.rating =
    (product.rating * product.totalReviews - oldRating + rating) /
    product.totalReviews;
  await product.save();

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
    return res.status(404).json({ message: "Review not found" });
  }

  const shop = await Shop.findById(review.shopId);
  if (shop.totalReviews > 1) {
    shop.rating =
      (shop.rating * shop.totalReviews - review.rating) /
      (shop.totalReviews - 1);
    shop.totalReviews -= 1;
  } else {
    shop.rating = 0;
    shop.totalReviews = 0;
  }
  shop.reviews.pull(reviewId);
  await shop.save();

  const product = await Product.findById(review.productId);
  if (product.totalReviews > 1) {
    product.rating =
      (product.rating * product.totalReviews - review.rating) /
      (product.totalReviews - 1);
    product.totalReviews -= 1;
  } else {
    product.rating = 0;
    product.totalReviews = 0;
  }
  product.reviews.pull(reviewId);
  await product.save();

  await review.deleteOne();

  res.status(200).json({
    message: "Review Deleted",
  });
});

const getShopReviews = asyncHandler(async (req, res) => {
  const { shopId } = req.params;

  const shop = await Shop.findById(shopId);

  if (!shop) {
    res.status(404);
    throw new Error("Shop doesnt exist");
  }

  const reviews = await Review.find({ shopId }).populate("userId");

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

  const reviews = await Review.find({ productId }).populate("userId");

  res.status(200).json({
    reviews,
  });
});

module.exports = {
  createReview,
  updateReview,
  deleteReview,
  getShopReviews,
  getProductReviews,
};
