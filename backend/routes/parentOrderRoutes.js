const express = require("express");
const {
  createParentOrder,
  getOrdersByUser,
} = require("../controllers/parentOrderControllers");
const { optionalAuth, protect } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/", optionalAuth, createParentOrder);
router.get("/getOrdersByUser", protect, getOrdersByUser);

module.exports = router;
