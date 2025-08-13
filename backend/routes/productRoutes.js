const express = require("express");
const router = express.Router();
const {
  createProduct,
  deleteProduct,
  updateProduct,
  getProductById,
  getAllProducts,
  getProductsByShop,
  getProductsByCategory,
  getAllProductsAdmin,
} = require("../controllers/productControllers");
const { protect, isAdmin } = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware");

router.post("/", protect, upload.array("images"), createProduct);
router.get("/", getAllProducts);
router.get("/getProductsByShop", protect, getProductsByShop);
router.get("/:productId", getProductById);
router.patch("/:productId", protect, upload.array("images"), updateProduct);
router.delete("/:productId", deleteProduct);
router.get("/category/:category", getProductsByCategory);

// Admin Routes
router.get("/admin/all-products", protect, isAdmin, getAllProductsAdmin);

module.exports = router;
