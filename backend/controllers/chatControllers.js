const asyncHandler = require("express-async-handler");
const ChatMessage = require("../models/chatMessageModel");
const ChatConversation = require("../models/chatConversationModel");
const User = require("../models/userModel");
const Shop = require("../models/shopModel");

// Get all conversations for a user
const getUserConversations = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const conversations = await ChatConversation.find({
    participants: userId,
    isActive: true,
  })
    .populate("participants", "fullname email shopName imageUrl")
    .populate("lastMessage", "message createdAt")
    .sort({ lastMessageAt: -1 });

  res.status(200).json({
    success: true,
    conversations,
  });
});

// Get all conversations for a shop
const getShopConversations = asyncHandler(async (req, res) => {
  const shopId = req.user._id; // Assuming shop owner is authenticated

  const conversations = await ChatConversation.find({
    participants: shopId,
    isActive: true,
  })
    .populate("participants", "fullname email shopName imageUrl")
    .populate("lastMessage", "message createdAt")
    .sort({ lastMessageAt: -1 });

  res.status(200).json({
    success: true,
    conversations,
  });
});

// Get messages between two participants
const getMessages = asyncHandler(async (req, res) => {
  const { conversationId } = req.params;
  const userId = req.user._id;

  // Verify user is part of this conversation
  const conversation = await ChatConversation.findById(conversationId);
  if (!conversation || !conversation.participants.includes(userId)) {
    return res.status(403).json({
      success: false,
      message: "Access denied to this conversation",
    });
  }

  const messages = await ChatMessage.find({
    $or: [
      { sender: userId, receiver: { $in: conversation.participants } },
      { receiver: userId, sender: { $in: conversation.participants } },
    ],
  })
    .populate("sender", "fullname email shopName imageUrl")
    .populate("receiver", "fullname email shopName imageUrl")
    .sort({ createdAt: 1 });

  // Mark messages as read
  await ChatMessage.updateMany(
    {
      receiver: userId,
      sender: { $in: conversation.participants },
      isRead: false,
    },
    {
      isRead: true,
      readAt: new Date(),
    }
  );

  res.status(200).json({
    success: true,
    messages,
  });
});

// Create or get conversation between user and shop
const getOrCreateConversation = asyncHandler(async (req, res) => {
  const { shopId } = req.params;
  const userId = req.user._id;

  // Check if conversation already exists
  let conversation = await ChatConversation.findOne({
    participants: { $all: [userId, shopId] },
    isActive: true,
  });

  if (!conversation) {
    // Create new conversation
    conversation = await ChatConversation.create({
      participants: [userId, shopId],
    });
  }

  // Populate participant details
  await conversation.populate(
    "participants",
    "fullname email shopName imageUrl"
  );

  res.status(200).json({
    success: true,
    conversation,
  });
});

// Mark conversation as read
const markConversationAsRead = asyncHandler(async (req, res) => {
  const { conversationId } = req.params;
  const userId = req.user._id;

  const conversation = await ChatConversation.findById(conversationId);
  if (!conversation || !conversation.participants.includes(userId)) {
    return res.status(403).json({
      success: false,
      message: "Access denied to this conversation",
    });
  }

  // Mark all messages as read
  await ChatMessage.updateMany(
    {
      receiver: userId,
      sender: { $in: conversation.participants },
      isRead: false,
    },
    {
      isRead: true,
      readAt: new Date(),
    }
  );

  // Reset unread count based on participant type
  const participantIndex = conversation.participants.indexOf(userId);
  const participantType = conversation.participantModel[participantIndex];

  if (participantType === "User") {
    conversation.userUnreadCount = 0;
  } else {
    conversation.shopUnreadCount = 0;
  }
  await conversation.save();

  res.status(200).json({
    success: true,
    message: "Conversation marked as read",
  });
});

// Get unread count for current user
const getUnreadCount = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  // Get total unread count across all conversations
  const userConversations = await ChatConversation.find({
    participants: userId,
    isActive: true,
  });

  let totalUnread = 0;

  // For each conversation, determine if current user is User or Shop
  for (const conversation of userConversations) {
    const participantIndex = conversation.participants.indexOf(userId);
    const participantType = conversation.participantModel[participantIndex];

    if (participantType === "User") {
      totalUnread += conversation.userUnreadCount;
    } else {
      totalUnread += conversation.shopUnreadCount;
    }
  }

  res.status(200).json({
    success: true,
    totalUnread,
  });
});

module.exports = {
  getUserConversations,
  getShopConversations,
  getMessages,
  getOrCreateConversation,
  markConversationAsRead,
  getUnreadCount,
};
