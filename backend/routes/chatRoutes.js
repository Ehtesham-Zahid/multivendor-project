const express = require("express");
const router = express.Router();
const {
  getUserConversations,
  getShopConversations,
  getMessages,
  getOrCreateConversation,
  markConversationAsRead,
} = require("../controllers/chatControllers");
const { protect } = require("../middlewares/authMiddleware");

// All routes are protected
router.use(protect);

// Get conversations for current user
router.get("/conversations", getUserConversations);

// Get conversations for shop (shop owners)
router.get("/shop-conversations", getShopConversations);

// Get or create conversation with a shop
router.get("/conversation/:shopId", getOrCreateConversation);

// Get messages for a conversation
router.get("/messages/:conversationId", getMessages);

// Mark conversation as read
router.patch("/conversation/:conversationId/read", markConversationAsRead);

module.exports = router;
