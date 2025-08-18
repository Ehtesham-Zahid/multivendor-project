const express = require("express");
const router = express.Router();
const {
  sendMessage,
  getMessages,
  markMessageAsRead,
  deleteMessage,
} = require("../controllers/messageControllers");
const { protect } = require("../middlewares/authMiddleware");

// All routes are protected
router.use(protect);

// Send a message
router.post("/", sendMessage);

// Get messages for a conversation
router.get("/:conversationId", getMessages);

// Mark message as read
router.patch("/:messageId/read", markMessageAsRead);

// Delete a message
router.delete("/:messageId", deleteMessage);

module.exports = router;
