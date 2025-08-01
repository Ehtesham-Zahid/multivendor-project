const asyncHandler = require("express-async-handler");
const Review = require("../models/reviewModel");
const Shop = require("../models/shopModel");
const Product = require("../models/productModel");

const createReview = asyncHandler(async (req, res) => {
  const { shopId, productId, rating, comment } = req.body;

  if (!shopId && !productId) {
    res.status(400);
    throw new Error("shopId or productId is required");
  }

  if (shopId && productId) {
    res.status(400);
    throw new Error("Review can only be for either a shop or a product");
  }

  if (shopId) {
    const existing = await Review.findOne({ shopId, userId: req.user._id });
    if (existing) {
      res.status(400);
      throw new Error("You have already reviewed this shop");
    }
  }

  const reviewData = {
    rating,
    comment,
    userId: req.user._id,
  };

  if (shopId) {
    reviewData.shopId = shopId;
    const review = await Review.create(reviewData);

    const shop = await Shop.findById(shopId);

    const reviews = await Review.find({ shopId });
    const avg =
      reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length;

    shop.rating = avg;
    shop.totalReviews = reviews.length;
    shop.reviews.push(review._id);
    await shop.save();
  }
  if (productId) {
    reviewData.productId = productId;
    const review = await Review.create(reviewData);

    const product = await Product.findById(productId);

    const reviews = await Review.find({ productId });
    const avg =
      reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length;

    product.rating = avg;
    product.totalReviews = reviews.length;
    product.reviews.push(review._id);
    await product.save();
  }

  res.status(201).json({
    message: "Review Created Successfully",
    rating,
    comment,
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
