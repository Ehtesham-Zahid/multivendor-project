const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");
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

  const product = await Product.create({
    name,
    description,
    price,
    discountPrice,
    stock,
    category,
    shopId: req.user.shopId,
  });

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
  const product = await Product.findById(req.params.id);

  if (!product || product.isDeleted) {
    res.status(404);
    throw new Error("Product not found");
  }

  Object.assign(product, req.body);
  await product.save();

  res.status(200).json(product);
});

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product || product.isDeleted) {
    res.status(404);
    throw new Error("Product not found");
  }

  product.isDeleted = true;
  await product.save();

  res.status(200).json({ message: "Product marked as deleted" });
});

const getProductsByShop = asyncHandler(async (req, res) => {
  const { shopId } = req.params;
  const products = await Product.find({ shopId, isDeleted: false });

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
