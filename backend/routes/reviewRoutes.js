const express = require("express");
const {
  createReview,
  //   deleteProduct,
  //   updateProduct,
  //   getProductById,
} = require("../controllers/reviewControllers");
const router = express.router();

router.post("/", createReview);
// router.get("/:id", getProductById);
// router.patch("/:id", updateProduct);
// router.delete("/:id", deleteProduct);

module.exports = router;
