const asyncHandler = require("express-async-handler");
const Address = require("../models/addressModel");

// @desc    Create address (for registered or guest user)
// @route   POST /api/addresses
// @access  Public (but associate if user is logged in)
const createAddress = asyncHandler(async (req, res) => {
  if (req.user && req.user._id) {
    const addresses = await Address.find({ userId: req.user._id });
    if (addresses.length === 0) {
      req.body.isPrimary = true; // Set first address as isPrimary if user is logged in
    } else if (req.body.isPrimary === true) {
      // If isPrimary is true, ensure no other address is isPrimary
      await Address.updateMany({ userId: req.user._id }, { isPrimary: false });
    }
  }

  const {
    fullName,
    phoneNumber,
    email,
    addressDetails,
    city,
    state,
    zipCode,
    country,
    isPrimary,
  } = req.body;
  console.log(req.body);
  //   if (
  //     !fullName ||
  //     !phoneNumber ||
  //     !email ||
  //     !addressDetails ||
  //     !city ||
  //     !state ||
  //     !zipCode ||
  //     !country
  //   ) {
  //     res.status(400);
  //     throw new Error("All fields are required");
  //   }

  const address = await Address.create({
    fullName,
    phoneNumber,
    email,
    addressDetails,
    city,
    state,
    zipCode,
    country,
    isPrimary,
    userId: req.user ? req.user._id : null,
    isGuestAddress: !req.user,
  });

  res.status(201).json(address);
});

// @desc    Get all addresses for logged-in user
// @route   GET /api/addresses
// @access  Private
const getUserAddresses = asyncHandler(async (req, res) => {
  const addresses = await Address.find({ userId: req.user._id }).sort({
    isPrimary: -1,
  });
  res.json(addresses);
});

// @desc    Update a specific address
// @route   PUT /api/addresses/:id
// @access  Private
const updateAddress = asyncHandler(async (req, res) => {
  const {
    fullName,
    phoneNumber,
    email,
    addressDetails,
    city,
    state,
    zipCode,
    country,
    isPrimary,
  } = req.body;

  const address = await Address.findById(req.params.addressId);

  if (!address) {
    res.status(404);
    throw new Error("Address not found");
  }

  if (
    !address.userId ||
    address.userId.toString() !== req.user._id.toString()
  ) {
    res.status(403);
    throw new Error("Not authorized to update this address");
  }

  if (isPrimary) {
    await Address.updateMany(
      {
        userId: req.user._id,
        isPrimary: true,
        _id: { $ne: address._id },
      },
      { isPrimary: false }
    );
  }

  address.fullName = fullName;
  address.phoneNumber = phoneNumber;
  address.email = email;
  address.addressDetails = addressDetails;
  address.city = city;
  address.state = state;
  address.zipCode = zipCode;
  address.country = country;
  address.isPrimary = isPrimary;

  await address.save();
  res.json(address);
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

  if (
    !address.userId ||
    address.userId.toString() !== req.user._id.toString()
  ) {
    res.status(403);
    throw new Error("Not authorized to delete this address");
  }

  if (address.isPrimary) {
    // If deleting a primary address, set another address as primary if available
    const anotherAddress = await Address.findOne({
      userId: req.user._id,
      isPrimary: false,
    });
    if (anotherAddress) {
      anotherAddress.isPrimary = true;
      await anotherAddress.save();
    }
  }

  await address.deleteOne();
  res.json({ message: "Address deleted successfully" });
});

module.exports = {
  createAddress,
  getUserAddresses,
  updateAddress,
  deleteAddress,
};
