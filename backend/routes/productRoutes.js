const express = require("express");
const {
  createProduct,
  deleteProduct,
  updateProduct,
  getProductById,
  getAllProducts,
} = require("../controllers/productControllers");
const router = express.router();

router.post("/", createProduct);
router.get("/", getAllProducts);
router.get("/:productId", getProductById);
router.patch("/:productId", updateProduct);
router.delete("/:productId", deleteProduct);

module.exports = router;
