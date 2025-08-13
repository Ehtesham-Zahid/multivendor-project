const express = require("express");
const {
  createParentOrder,
  getOrdersByUser,
} = require("../controllers/parentOrderControllers");
const { protect } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/", protect, createParentOrder);
router.get("/getOrdersByUser", protect, getOrdersByUser);

module.exports = router;
