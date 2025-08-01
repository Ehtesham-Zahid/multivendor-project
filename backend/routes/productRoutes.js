const express = require("express");
const {
  createProduct,
  deleteProduct,
  updateProduct,
  getProductById,
} = require("../controllers/productControllers");
const router = express.router();

router.post("/", createProduct);
router.get("/:id", getProductById);
router.patch("/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
