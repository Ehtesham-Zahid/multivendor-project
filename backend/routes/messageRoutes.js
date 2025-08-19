const express = require("express");
const router = express.Router();
const {
  sendMessage,
  getMessages,
} = require("../controllers/messageControllers");
const { protect } = require("../middlewares/authMiddleware");

// All routes are protected
router.use(protect);

// Send a message
router.post("/", sendMessage);

// Get messages for a conversation
router.get("/:conversationId", getMessages);

module.exports = router;
