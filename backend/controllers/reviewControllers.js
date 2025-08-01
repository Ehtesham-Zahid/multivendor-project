const asyncHandler = require("express-async-handler");
const Review = require("../models/reviewModel");

const createReview = asyncHandler(async (req, res) => {
  const { shopId, productId, rating, comment } = req.body;

  if (productId) {
  }

  const review = await Review.create({
    shopId,
    productId,
    rating,
    comment,
  });
});

module.exports = { createReview };
