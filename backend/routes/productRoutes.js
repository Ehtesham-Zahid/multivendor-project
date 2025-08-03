const express = require("express");
const router = express.Router();
const {
  createProduct,
  deleteProduct,
  updateProduct,
  getProductById,
  getAllProducts,
} = require("../controllers/productControllers");
const { protect } = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware");

router.post("/", protect, upload.array("images"), createProduct);
router.get("/", getAllProducts);
router.get("/:productId", getProductById);
router.patch("/:productId", updateProduct);
router.delete("/:productId", deleteProduct);

module.exports = router;
