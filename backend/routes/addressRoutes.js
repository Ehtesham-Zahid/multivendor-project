const express = require("express");
const router = express.Router();
const {
  createAddress,
  getUserAddresses,
  deleteAddress,
  updateAddress,
} = require("../controllers/addressControllers");
const { protect, optionalAuth } = require("../middlewares/authMiddleware");

router.post("/", optionalAuth, createAddress);
router.get("/getUserAddresses", protect, getUserAddresses);
router.patch("/:addressId", protect, updateAddress);
router.delete("/:addressId", protect, deleteAddress);

module.exports = router;
