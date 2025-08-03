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
  await req.user.save();

  res.status(201).json(shop);
});

const getShop = asyncHandler(async (req, res) => {
  const { shopId } = req.params;

  const shop = await Shop.findById(shopId);
  if (!shop) {
    res.status(404);
    throw new Error("Invalid Shop Id");
  }

  res.status(200).json(shop);
});

const updateShop = asyncHandler(async (req, res) => {
  const { shopId } = req.params;
  const updates = req.body;

  const shop = await Shop.findById(shopId);
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

const deleteShop = asyncHandler(async (req, res) => {
  const { shopId } = req.params;

  const shop = await Shop.findById(shopId);
  if (!shop) {
    res.status(404);
    throw new Error("Shop not found");
  }

  if (shop.ownerId.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error("Not authorized");
  }

  shop.isDeleted = true;
  await shop.save();

  // Also soft-delete all its products
  await Product.updateMany({ shop: shop._id }, { isDeleted: true });

  res.status(200).json({ message: "Shop deleted" });
});

const getAllShops = asyncHandler(async (req, res) => {
  const shops = await Shop.find({}).populate("ownerId", "name email");
  res.status(200).json(shops);
});

module.exports = {
  createShop,
  getShop,
  updateShop,
  deleteShop,
  getAllShops,
};
