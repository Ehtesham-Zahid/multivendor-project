const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
const Shop = require("../models/shopModel");
const uploadAvatar = require("../utils/cloudinary");
// const uploadAvatar = require("../utils/cloudinary");
// const POST = require("../utils/email");

const generateToken = (id, expire) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: expire });
};

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
    owner: userId,
  });

  if (req.file) {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const dataURI = `data:${req.file.mimetype};base64,${b64}`;
    const { original } = await uploadAvatar(dataURI, shop._id, "shop_logos");
    shop.imageUrl = original;
    console.log("MAIN ANDER HU");
  }

  await shop.save();

  req.user.hasShop = true;
  req.user.shop = shop._id;
  await req.user.save();

  res.status(201).json({
    id: shop._id,
    shopName: shop.shopName,
    phoneNumber: shop.phoneNumber,
    address: shop.address,
    zipCode: shop.zipCode,
    imageUrl: shop.imageUrl,
  });
});

const getShop = asyncHandler(async (req, res) => {
  const { shopId } = req.params;

  const shop = await Shop.findById({ _id: shopId });

  if (!shop) {
    res.status(401);
    throw new Error("Invalid Shop Id");
  }

  res.status(200).json(shop);
});

module.exports = {
  createShop,
  getShop,
};
