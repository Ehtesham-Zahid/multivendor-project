const asyncHandler = require("express-async-handler");
const Cart = require("../models/cartModel");
const Product = require("../models/productModel");

// Get user cart
const getCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ userId: req.user._id }).populate(
    "items.productId",
    "name price"
  );

  if (!cart) {
    res.status(404);
    throw new Error("Cart not found");
  }

  res.status(200).json(cart);
});

// Add or update item in cart
const addToCart = asyncHandler(async (req, res) => {
  const { productId, quantity } = req.body;

  if (!productId || quantity < 1) {
    res.status(400);
    throw new Error("Product ID and valid quantity required");
  }

  const product = await Product.findById(productId);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  let cart = await Cart.findOne({ userId: req.user._id });

  if (!cart) {
    cart = new Cart({
      userId: req.user._id,
      items: [],
      totalAmount: 0,
    });
  }

  const existingItem = cart.items.find(
    (item) => item.productId.toString() === productId
  );

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.items.push({ productId, quantity });
  }

  // Recalculate total
  cart.totalAmount = 0;
  for (let item of cart.items) {
    const prod = await Product.findById(item.productId);
    cart.totalAmount += prod.price * item.quantity;
  }

  await cart.save();
  res.status(200).json(cart);
});

// Remove item from cart
const removeFromCart = asyncHandler(async (req, res) => {
  const { productId } = req.body;

  let cart = await Cart.findOne({ userId: req.user._id });
  if (!cart) {
    res.status(404);
    throw new Error("Cart not found");
  }

  cart.items = cart.items.filter(
    (item) => item.productId.toString() !== productId
  );

  // Recalculate total
  cart.totalAmount = 0;
  for (let item of cart.items) {
    const prod = await Product.findById(item.productId);
    cart.totalAmount += prod.price * item.quantity;
  }

  await cart.save();
  res.status(200).json({ message: "Item removed", cart });
});

// Clear cart
const clearCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ userId: req.user._id });

  if (!cart) {
    res.status(404);
    throw new Error("Cart not found");
  }

  cart.items = [];
  cart.totalAmount = 0;

  await cart.save();
  res.status(200).json({ message: "Cart cleared" });
});

module.exports = {
  getCart,
  addToCart,
  removeFromCart,
  clearCart,
};
