const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");
const Shop = require("../models/shopModel");
const uploadAvatar = require("../utils/cloudinary");
const Event = require("../models/eventModel");

const createProduct = asyncHandler(async (req, res) => {
  const { name, description, price, discountPrice, stock, category } = req.body;

  if (!name && !description && !price && !stock && !category) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  const productExists = await Product.findOne({ name });

  if (productExists) {
    res.status(400);
    throw new Error("Product name already exists");
  }

  // Debug logging to see what's being compared
  console.log("=== DISCOUNT PRICE VALIDATION DEBUG ===");
  console.log("discountPrice:", discountPrice, "Type:", typeof discountPrice);
  console.log("price:", price, "Type:", typeof price);
  console.log("discountPrice >= price:", discountPrice >= price);
  console.log("discountPrice == price:", discountPrice == price);
  console.log("discountPrice === price:", discountPrice === price);
  console.log("=====================================");

  if (discountPrice >= price) {
    res.status(400);
    throw new Error(
      "Discount price cannot be greater than or equal to original price"
    );
  }

  // Ensure shop exists and is active before creating products
  const shop = await Shop.findById(req.user.shopId);
  if (!shop) {
    res.status(404);
    throw new Error("Shop not found");
  }
  if (!shop.isActive) {
    res.status(403);
    throw new Error(
      "Your shop is inactive. Activate your shop to create products"
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

  shop.products.push(product._id);
  await shop.save();

  res.status(201).json(product);
});

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findOne({
    _id: req.params.productId,
    isDeleted: false,
  })
    .populate("eventId")
    .populate(
      "shopId",
      "shopName imageUrl rating totalReviews isActive products createdAt"
    );

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  res.status(200).json(product);
});

const updateProduct = asyncHandler(async (req, res) => {
  const { name, description, price, discountPrice, stock, category } = req.body;

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
  if (
    discountPrice &&
    discountPrice !== NaN &&
    price &&
    discountPrice >= price
  ) {
    res.status(400);
    throw new Error(
      "Discount price cannot be greater than or equal to original price"
    );
  }

  // Assign updated fields (if provided)
  product.name = name || product.name;
  product.description = description || product.description;
  product.price = price || product.price;
  if (discountPrice && discountPrice !== NaN) {
    product.discountPrice = discountPrice || product.discountPrice;
  }
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

  if (product.eventId) {
    const event = await Event.findById(product.eventId);
    if (event) {
      await event.deleteOne();
      product.eventId = null;
      await product.save();
    }
  }
  res.status(200).json({ message: "Product marked as deleted" });
});

const getProductsByShop = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const products = await Product.find({
    shopId: req.user.shopId,
    isDeleted: false,
  })
    .skip(skip)
    .limit(limit)
    .populate("eventId");

  const total = await Product.countDocuments({
    shopId: req.user.shopId,
    isDeleted: false,
  });

  res.status(200).json({
    products,
    currentPage: page,
    totalPages: Math.ceil(total / limit),
    totalProducts: total, // total products in the shop
  });
});

const getAllProducts = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search || "";
  const isFeatured = req.query.isFeatured || false;
  const skip = (page - 1) * limit;
  const { category, sortBy } = req.query;

  // --- Build initial filter ---
  const filter = { isDeleted: false, isActive: true };
  if (search) {
    filter.name = { $regex: search, $options: "i" };
  }

  if (category) {
    filter.category = category;
  }

  if (isFeatured === "true") {
    filter.isFeatured = true;
  }

  // --- Build sorting ---
  let sortOption = {};
  if (sortBy === "sales") {
    sortOption = { sold: -1 };
  } else if (sortBy === "latest") {
    sortOption = { createdAt: -1 };
  }

  const pipeline = [
    { $match: filter }, // Step 1: basic filter (isDeleted, search, category)
    {
      $lookup: {
        from: "shops",
        localField: "shopId",
        foreignField: "_id",
        as: "shopId",
      },
    },
    { $unwind: "$shopId" }, // Turn shop array into object
    {
      $lookup: {
        from: "events",
        localField: "eventId",
        foreignField: "_id",
        as: "eventId",
      },
    },
    { $unwind: { path: "$eventId", preserveNullAndEmptyArrays: true } },
  ];

  const productsPipeline = [];
  if (sortOption && Object.keys(sortOption).length > 0) {
    productsPipeline.push({ $sort: sortOption });
  }
  productsPipeline.push({ $skip: skip }, { $limit: limit });

  pipeline.push({
    $facet: {
      products: productsPipeline,
      totalCount: [{ $count: "total" }],
    },
  });

  const result = await Product.aggregate(pipeline);
  // Extract results
  const products = result[0].products;
  const total =
    result[0].totalCount.length > 0 ? result[0].totalCount[0].total : 0;

  res.json({
    products,
    currentPage: page,
    totalPages: Math.ceil(total / limit),
    totalProducts: total,
  });
});

const getProductsByCategory = asyncHandler(async (req, res) => {
  const { category } = req.params;

  if (!category) {
    res.status(400);
    throw new Error("Category is required");
  }

  const products = await Product.find({
    category,
    isDeleted: false,
    isActive: true,
  }).populate("shopId", "shopName imageUrl rating totalReviews isActive");

  res.status(200).json(products);
});

// Admin Controllers

const getAllProductsAdmin = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const onlyActive = req.query.onlyActive;
  const onlyDeleted = req.query.onlyDeleted === "true";
  const sortBy = req.query.sortBy === "sales" ? { sold: -1 } : {};
  const skip = (page - 1) * limit;

  const filter = {};

  if (onlyActive === "true") {
    filter.isActive = true;
  } else if (onlyActive === "false") {
    filter.isActive = false;
  }

  if (onlyDeleted) {
    filter.isDeleted = true;
  }

  const totalProducts = await Product.countDocuments(filter);
  const totalPages = Math.ceil(totalProducts / limit);

  const products = await Product.find(filter)
    .sort(sortBy)
    .skip(skip)
    .limit(limit);

  res.status(200).json({
    products,
    totalProducts,
    totalPages,
    currentPage: page,
  });
});

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getProductsByShop,
  getProductsByCategory,
  getAllProductsAdmin,
};
