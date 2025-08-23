const express = require("express");
const router = express.Router();
const {
  getUserConversations,
  getShopConversations,
  getOrCreateConversation,
  getUnreadCount,
} = require("../controllers/conversationControllers");
const { protect, isVendor } = require("../middlewares/authMiddleware");

// All routes are protected
router.use(protect);

// Get conversations for current user
router.get("/user-conversations", getUserConversations);

// Get conversations for shop (shop owners)
router.get("/shop-conversations", isVendor, getShopConversations);

// Get or create conversation with a shop
router.get("/get-or-create/:shopId", getOrCreateConversation);

// Get total unread count for current user
router.get("/unread-count", getUnreadCount);

module.exports = router;
