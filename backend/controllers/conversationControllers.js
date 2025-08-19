const asyncHandler = require("express-async-handler");
const ChatMessage = require("../models/chatMessageModel");
const ChatConversation = require("../models/chatConversationModel");

// ---------------- Get all conversations for a user ----------------
const getUserConversations = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const conversations = await ChatConversation.find({
    "participants.participantId": userId,
    isActive: true,
  })
    .populate("participants.participantId", "fullname email shopName imageUrl")
    .populate("lastMessage", "message createdAt")
    .sort({ lastMessageAt: -1 });

  console.log(conversations);

  res.status(200).json({
    success: true,
    conversations,
  });
});

// ---------------- Get all conversations for a shop ----------------
const getShopConversations = asyncHandler(async (req, res) => {
  const shopId = req.user.shopId;

  const conversations = await ChatConversation.find({
    "participants.participantId": shopId,
    isActive: true,
  })
    .populate("participants.participantId", "fullname email shopName imageUrl")
    .populate("lastMessage", "message createdAt")
    .sort({ lastMessageAt: -1 });

  res.status(200).json({
    success: true,
    conversations,
  });
});

// ---------------- Create or get conversation between user and shop ----------------
const getOrCreateConversation = asyncHandler(async (req, res) => {
  const { shopId } = req.params;
  const userId = req.user._id;

  // Check if conversation already exists
  let conversation = await ChatConversation.findOne({
    "participants.participantId": { $all: [userId, shopId] },
    isActive: true,
  });

  if (!conversation) {
    conversation = await ChatConversation.create({
      participants: [
        { participantId: userId, participantModel: "User" },
        { participantId: shopId, participantModel: "Shop" },
      ],
    });
  }

  await conversation.populate(
    "participants.participantId",
    "fullname email shopName imageUrl"
  );

  res.status(200).json({
    success: true,
    conversation,
  });
});

// ---------------- Get unread count ----------------
const getUnreadCount = asyncHandler(async (req, res) => {
  const isShop = req.query.isShop === "true";
  const userId = isShop ? req.user.shopId.toString() : req.user._id.toString();

  const userConversations = await ChatConversation.find({
    "participants.participantId": userId,
    isActive: true,
  });

  let totalUnread = 0;

  for (const conversation of userConversations) {
    const participant = conversation.participants.find(
      (p) => p.participantId.toString() === userId.toString()
    );

    if (participant?.participantModel === "User") {
      totalUnread += conversation.userUnreadCount;
    } else if (participant?.participantModel === "Shop") {
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
  getOrCreateConversation,
  getUnreadCount,
};
