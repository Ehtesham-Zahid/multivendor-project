const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");
const Shop = require("../models/shopModel");
const uploadAvatar = require("../utils/cloudinary");

const createProduct = asyncHandler(async (req, res) => {
  const { name, description, price, discountPrice, stock, category } = req.body;

  if (
    !name &&
    !description &&
    !price &&
    !discountPrice &&
    !stock &&
    !category
  ) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  const productExists = await Product.findOne({ name });

  if (productExists) {
    res.status(400);
    throw new Error("Product name already exists");
  }

  if (discountPrice >= price) {
    res.status(400);
    throw new Error(
      "Discount price cannot be greater than or equal to original price"
    );
  }

  let product;
  try {
    product = await Product.create({
      name,
      description,
      price,
      discountPrice,
      stock,
      category,
      shopId: req.user.shopId,
    });
  } catch (err) {
    res.status(400);
    throw new Error(err.message || "Invalid product data");
  }

  // Step 2: Handle image uploads if files exist
  if (req.files && req.files.length > 0) {
    const imageUploadPromises = req.files.map(async (image, index) => {
      const b64 = Buffer.from(image.buffer).toString("base64");
      const dataURI = `data:${image.mimetype};base64,${b64}`;
      const { original } = await uploadAvatar(
        dataURI,
        `${product._id}${index}`,
        "product_images"
      );
      return original;
    });

    const uploadedImages = await Promise.all(imageUploadPromises);
    product.images = uploadedImages;
    await product.save(); // Save updated product with images
  }

  const shop = await Shop.findById(req.user.shopId);
  if (!shop) {
    res.status(404);
    throw new Error("Shop not found");
  }

  shop.products.push(product._id);
  await shop.save();

  res.status(201).json(product);
});

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findOne({
    _id: req.params.id,
    isDeleted: false,
  }).populate("shopId", "name");

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  res.status(200).json(product);
});

const updateProduct = asyncHandler(async (req, res) => {
  const { name, description, price, discountPrice, stock, category } = req.body;

  console.log("HEY BUDDY", req.body);

  const product = await Product.findById(req.params.productId);

  if (!product || product.isDeleted) {
    res.status(404);
    throw new Error("Product not found");
  }

  // Optional: Ensure product belongs to the same shop
  if (String(product.shopId) !== String(req.user.shopId)) {
    res.status(403);
    throw new Error("You are not allowed to update this product");
  }

  // Validation: prevent invalid updates
  if (discountPrice && price && discountPrice >= price) {
    res.status(400);
    throw new Error(
      "Discount price cannot be greater than or equal to original price"
    );
  }

  // Assign updated fields (if provided)
  product.name = name || product.name;
  product.description = description || product.description;
  product.price = price || product.price;
  product.discountPrice = discountPrice || product.discountPrice;
  product.stock = stock || product.stock;
  product.category = category || product.category;

  // Handle new image uploads if any
  if (req.files && req.files.length > 0) {
    const imageUploadPromises = req.files.map(async (image, index) => {
      const b64 = Buffer.from(image.buffer).toString("base64");
      const dataURI = `data:${image.mimetype};base64,${b64}`;
      const { original } = await uploadAvatar(
        dataURI,
        `${product._id}-updated-${index}`,
        "product_images"
      );
      return original;
    });

    const newImages = await Promise.all(imageUploadPromises);
    product.images = newImages; // overwrite existing images
  }

  const updatedProduct = await product.save();
  res.status(200).json(updatedProduct);
});

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.productId);

  if (!product || product.isDeleted) {
    res.status(404);
    throw new Error("Product not found");
  }

  product.isDeleted = true;
  await product.save();

  res.status(200).json({ message: "Product marked as deleted" });
});

const getProductsByShop = asyncHandler(async (req, res) => {
  const products = await Product.find({
    shopId: req.user.shopId,
    isDeleted: false, // ✅ Add this
  });

  res.status(200).json(products);
});

const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({ isDeleted: false }).populate(
    "shopId",
    "name",
    "rating",
    "totalReviews"
  );

  res.status(200).json(products);
});

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getProductsByShop,
};
