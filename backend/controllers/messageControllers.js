const asyncHandler = require("express-async-handler");
const ChatMessage = require("../models/chatMessageModel");
const ChatConversation = require("../models/chatConversationModel");

// @desc    Send a message
// @route   POST /api/messages
// @access  Private
const sendMessage = asyncHandler(async (req, res) => {
  const {
    conversationId,
    message,
    messageType = "text",
    attachments = [],
  } = req.body;

  if (!conversationId || !message) {
    res.status(400);
    throw new Error("conversationId and message are required");
  }

  // Verify conversation exists and user is participant
  const conversation = await ChatConversation.findById(conversationId);
  if (!conversation) {
    res.status(404);
    throw new Error("Conversation not found");
  }

  if (!conversation.participants.includes(req.user._id)) {
    res.status(403);
    throw new Error("Not authorized to send message in this conversation");
  }

  // Get the other participant (receiver)
  const receiverId = conversation.participants.find(
    (participant) => participant.toString() !== req.user._id.toString()
  );

  if (!receiverId) {
    res.status(400);
    throw new Error("Invalid conversation participants");
  }

  // Create the message
  const newMessage = await ChatMessage.create({
    sender: req.user._id,
    receiver: receiverId,
    message,
    messageType,
    attachments,
    isRead: false,
  });

  // Populate sender and receiver details
  await newMessage.populate("sender", "fullname email shopName imageUrl");
  await newMessage.populate("receiver", "fullname email shopName imageUrl");

  // Update conversation with last message info
  conversation.lastMessage = newMessage._id;
  conversation.lastMessageAt = new Date();

  // Check if sender is a User or Shop by looking at the participantModel
  const senderIndex = conversation.participants.indexOf(req.user._id);
  const senderType = conversation.participantModel[senderIndex];

  if (senderType === "User") {
    // User is sending → increment shop's unread count
    conversation.shopUnreadCount += 1;
  } else {
    // Shop is sending → increment user's unread count
    conversation.userUnreadCount += 1;
  }

  await conversation.save();

  // Emit via socket.io (this will be handled in your socket logic)
  // You can emit the message to the receiver here

  res.status(201).json({
    success: true,
    message: newMessage,
  });
});

// @desc    Get messages for a conversation
// @route   GET /api/messages/:conversationId
// @access  Private
const getMessages = asyncHandler(async (req, res) => {
  const { conversationId } = req.params;
  const userId = req.user._id;

  // Verify conversation exists and user is participant
  const conversation = await ChatConversation.findById(conversationId);
  if (!conversation) {
    res.status(404);
    throw new Error("Conversation not found");
  }

  if (!conversation.participants.includes(userId)) {
    res.status(403);
    throw new Error("Not authorized to access this conversation");
  }

  // Get messages with pagination
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 50;
  const skip = (page - 1) * limit;

  const messages = await ChatMessage.find({
    $or: [
      { sender: userId, receiver: { $in: conversation.participants } },
      { receiver: userId, sender: { $in: conversation.participants } },
    ],
  })
    .populate("sender", "fullname email shopName imageUrl")
    .populate("receiver", "fullname email shopName imageUrl")
    .sort({ createdAt: -1 }) // Newest first for pagination
    .skip(skip)
    .limit(limit);

  // Get total count for pagination
  const totalMessages = await ChatMessage.countDocuments({
    $or: [
      { sender: userId, receiver: { $in: conversation.participants } },
      { receiver: userId, sender: { $in: conversation.participants } },
    ],
  });

  // Mark messages as read when user fetches them
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

  // Reset unread count for this conversation based on participant type
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
    messages: messages.reverse(), // Oldest first for display
    pagination: {
      currentPage: page,
      totalPages: Math.ceil(totalMessages / limit),
      totalMessages,
      hasNext: page * limit < totalMessages,
      hasPrev: page > 1,
    },
  });
});

// @desc    Mark message as read
// @route   PATCH /api/messages/:messageId/read
// @access  Private
const markMessageAsRead = asyncHandler(async (req, res) => {
  const { messageId } = req.params;
  const userId = req.user._id;

  const message = await ChatMessage.findById(messageId);
  if (!message) {
    res.status(404);
    throw new Error("Message not found");
  }

  // Verify user is the receiver
  if (message.receiver.toString() !== userId.toString()) {
    res.status(403);
    throw new Error("Not authorized to mark this message as read");
  }

  // Mark as read
  message.isRead = true;
  message.readAt = new Date();
  await message.save();

  res.status(200).json({
    success: true,
    message: "Message marked as read",
  });
});

// @desc    Delete a message
// @route   DELETE /api/messages/:messageId
// @access  Private
const deleteMessage = asyncHandler(async (req, res) => {
  const { messageId } = req.params;
  const userId = req.user._id;

  const message = await ChatMessage.findById(messageId);
  if (!message) {
    res.status(404);
    throw new Error("Message not found");
  }

  // Verify user is the sender (can only delete their own messages)
  if (message.sender.toString() !== userId.toString()) {
    res.status(403);
    throw new Error("Not authorized to delete this message");
  }

  await message.deleteOne();

  res.status(200).json({
    success: true,
    message: "Message deleted successfully",
  });
});

module.exports = {
  sendMessage,
  getMessages,
  markMessageAsRead,
  deleteMessage,
};
