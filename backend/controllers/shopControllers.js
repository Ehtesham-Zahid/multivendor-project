const asyncHandler = require("express-async-handler");
const Shop = require("../models/shopModel");
const Product = require("../models/productModel");
const uploadAvatar = require("../utils/cloudinary");

const createShop = asyncHandler(async (req, res) => {
  const { shopName, phoneNumber, address, zipCode } = req.body;

  const shopExists = await Shop.findOne({ shopName });
  if (shopExists) {
    res.status(401);
    throw new Error("Shop Name already registered");
  }

  if (req.user.hasShop) {
    res.status(403);
    throw new Error("User already has a shop.");
  }

  const userId = req.user._id;

  const shop = await Shop.create({
    shopName,
    phoneNumber,
    address,
    zipCode,
    ownerId: userId, // renamed
  });

  if (req.file) {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const dataURI = `data:${req.file.mimetype};base64,${b64}`;
    const { original } = await uploadAvatar(dataURI, shop._id, "shop_logos");
    shop.imageUrl = original;
  }

  await shop.save();

  req.user.hasShop = true;
  req.user.shopId = shop._id;
  if (req.user.role === "user") {
    req.user.role = "vendor";
  }
  await req.user.save();

  res.status(201).json(shop);
});

const getCurrentUserShop = asyncHandler(async (req, res) => {
  console.log(req.user);
  const shop = await Shop.findById(req.user.shopId);
  if (!shop) {
    res.status(404);
    throw new Error("Invalid Shop Id");
  }

  res.status(200).json(shop);
});

const updateCurrentUserShop = asyncHandler(async (req, res) => {
  const { shopId } = req.user;
  const updates = req.body;

  const shop = await Shop.findById(shopId)
    .populate({
      path: "products",
      match: { isDeleted: false },
      populate: { path: "eventId", model: "Event" },
    })
    // populate events -> productId -> eventId
    .populate({
      path: "events",
      populate: {
        path: "productId",
        match: { isDeleted: false },
        populate: { path: "eventId", model: "Event" },
      },
    });
  if (!shop) {
    res.status(404);
    throw new Error("Shop not found");
  }

  if (shop.ownerId.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error("Not authorized to update this shop");
  }

  Object.assign(shop, updates);

  if (req.file) {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const dataURI = `data:${req.file.mimetype};base64,${b64}`;
    const { original } = await uploadAvatar(dataURI, shop._id, "shop_logos");
    shop.imageUrl = original;
  }

  await shop.save();
  res.status(200).json(shop);
});

const getAllShops = asyncHandler(async (req, res) => {
  const shops = await Shop.find({}).populate("ownerId", "name email");
  res.status(200).json(shops);
});

const getShopById = asyncHandler(async (req, res) => {
  const { shopId } = req.params;

  const shop = await Shop.findById(shopId)
    // populate products but only where isDeleted = false
    .populate({
      path: "products",
      match: { isDeleted: false },
      populate: { path: "eventId", model: "Event" },
    })
    // populate events -> productId -> eventId
    .populate({
      path: "events",
      populate: {
        path: "productId",
        match: { isDeleted: false },
        populate: { path: "eventId", model: "Event" },
      },
    });

  if (!shop) {
    res.status(404);
    throw new Error("Shop not found");
  }

  res.status(200).json(shop);
});

const updateShopStatus = asyncHandler(async (req, res) => {
  const { shopId } = req.params;

  const shop = await Shop.findById(shopId)
    .populate({
      path: "products",
      match: { isDeleted: false },
      populate: { path: "eventId", model: "Event" },
    })
    .populate({
      path: "events",
      populate: {
        path: "productId",
        match: { isDeleted: false },
        populate: { path: "eventId", model: "Event" },
      },
    });

  if (!shop) {
    res.status(404);
    throw new Error("Shop not found");
  }

  // Toggle shop status
  shop.isActive = !shop.isActive;
  await shop.save();

  // Update all products belonging to this shop
  await Product.updateMany(
    { _id: { $in: shop.products.map((p) => p._id) } },
    { $set: { isActive: shop.isActive } }
  );

  res.status(200).json({
    message: `Shop is now ${shop.isActive ? "active" : "inactive"}`,
    shop,
  });
});

// Admin Controllers
const getAllShopsAdmin = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const onlyActive = req.query.onlyActive;

  const skip = (page - 1) * limit;

  const filter = {};
  console.log(onlyActive);

  if (onlyActive === "true") {
    filter.isActive = true;
  }

  if (onlyActive === "false") {
    filter.isActive = false;
  }

  const totalShops = await Shop.countDocuments(filter);
  const totalPages = Math.ceil(totalShops / limit);

  const shops = await Shop.find(filter)
    .skip(skip)
    .limit(limit)
    .populate("ownerId", "fullName email");

  res.status(200).json({
    shops,
    totalShops,
    totalPages,
    currentPage: page,
  });
});

module.exports = {
  createShop,
  getCurrentUserShop,
  updateCurrentUserShop,
  getAllShops,
  getShopById,
  getAllShopsAdmin,
  updateShopStatus,
};
