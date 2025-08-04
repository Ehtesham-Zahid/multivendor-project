const asyncHandler = require("express-async-handler");
const Address = require("../models/addressModel");

// @desc    Create address (for registered or guest user)
// @route   POST /api/addresses
// @access  Public (but associate if user is logged in)
const createAddress = asyncHandler(async (req, res) => {
  const { fullName, phoneNumber, street, city, state, zipCode, country } =
    req.body;

  if (
    !fullName ||
    !phoneNumber ||
    !street ||
    !city ||
    !state ||
    !zipCode ||
    !country
  ) {
    res.status(400);
    throw new Error("All fields are required");
  }

  const address = await Address.create({
    fullName,
    phoneNumber,
    street,
    city,
    state,
    zipCode,
    country,
    userId: req.user ? req.user._id : null,
    isGuestAddress: !req.user,
  });

  res.status(201).json(address);
});

// @desc    Get all addresses for logged-in user
// @route   GET /api/addresses
// @access  Private
const getUserAddresses = asyncHandler(async (req, res) => {
  const addresses = await Address.find({ user: req.user._id });
  res.json(addresses);
});

// @desc    Update a specific address
// @route   PUT /api/addresses/:id
// @access  Private
const updateAddress = asyncHandler(async (req, res) => {
  const { fullName, phoneNumber, street, city, state, zipCode, country } =
    req.body;

  const address = await Address.findById(req.params.addressId);

  if (!address) {
    res.status(404);
    throw new Error("Address not found");
  }

  if (!address.user || address.user.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error("Not authorized to update this address");
  }

  // Update fields
  address.fullName = fullName || address.fullName;
  address.phoneNumber = phoneNumber || address.phoneNumber;
  address.street = street || address.street;
  address.city = city || address.city;
  address.state = state || address.state;
  address.zipCode = zipCode || address.zipCode;
  address.country = country || address.country;

  const updatedAddress = await address.save();
  res.json(updatedAddress);
});

// @desc    Delete a specific address
// @route   DELETE /api/addresses/:id
// @access  Private
const deleteAddress = asyncHandler(async (req, res) => {
  const address = await Address.findById(req.params.addressId);

  if (!address) {
    res.status(404);
    throw new Error("Address not found");
  }

  if (!address.user || address.user.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error("Not authorized to delete this address");
  }

  await address.remove();
  res.json({ message: "Address deleted successfully" });
});

module.exports = {
  createAddress,
  getUserAddresses,
  updateAddress,
  deleteAddress,
};
