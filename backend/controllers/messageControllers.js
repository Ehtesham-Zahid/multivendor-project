const asyncHandler = require("express-async-handler");
const ChatMessage = require("../models/chatMessageModel");
const ChatConversation = require("../models/chatConversationModel");
const { getIO } = require("../socket");

// @desc    Send a message
// @route   POST /api/messages
// @access  Private
const sendMessage = asyncHandler(async (req, res) => {
  const isShop = req.query.isShop === "true";
  const userId = isShop ? req.user.shopId.toString() : req.user._id.toString();

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

  if (
    !conversation.participants
      .map((participant) => participant.participantId.toString())
      .includes(userId)
  ) {
    res.status(403);
    throw new Error("Not authorized to send message in this conversation");
  }

  // Get the other participant (receiver)
  const receiverId = conversation.participants.find(
    (participant) => participant.participantId.toString() !== userId
  );

  if (!receiverId) {
    res.status(400);
    throw new Error("Invalid conversation participants");
  }

  // Create the message
  const newMessage = await ChatMessage.create({
    sender: isShop ? req.user.shopId : req.user._id,
    receiver: receiverId.participantId,
    senderModel: isShop ? "Shop" : "User",
    receiverModel: isShop ? "User" : "Shop",
    conversationId,
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
  const senderIndex = conversation.participants.findIndex(
    (participant) => participant.participantId.toString() === userId
  );
  const senderType = conversation.participants[senderIndex].participantModel;

  const io = getIO();

  const room = io.sockets.adapter.rooms.get(conversationId);

  let isReceiverInRoom = false;

  if (room) {
    for (const socketId of room) {
      const socket = io.sockets.sockets.get(socketId);
      if (socket?.userId?.toString() === receiverId.participantId.toString()) {
        isReceiverInRoom = true;
        break;
      }
    }
  }

  if (!isReceiverInRoom) {
    if (senderType === "User") {
      conversation.shopUnreadCount += 1;
    } else {
      conversation.userUnreadCount += 1;
    }
  }
  await conversation.save();

  io.to(conversationId).emit("receive-message", newMessage);

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
  const isShop = req.query.isShop === "true";
  const userId = isShop ? req.user.shopId.toString() : req.user._id.toString();

  const conversation = await ChatConversation.findById(conversationId);
  if (!conversation) {
    return res
      .status(404)
      .json({ success: false, message: "Conversation not found" });
  }

  // verify user is part of this conversation
  const isParticipant = conversation.participants.some(
    (p) => p.participantId.toString() === userId.toString()
  );
  if (!isParticipant) {
    return res
      .status(403)
      .json({ success: false, message: "Access denied to this conversation" });
  }

  const participantIds = conversation.participants.map((p) => p.participantId);

  const messages = await ChatMessage.find({
    $or: [
      { sender: userId, receiver: { $in: participantIds } },
      { receiver: userId, sender: { $in: participantIds } },
    ],
  })
    .populate("sender", "fullname email shopName imageUrl")
    .populate("receiver", "fullname email shopName imageUrl")
    .sort({ createdAt: 1 });

  // Mark messages as read
  await ChatMessage.updateMany(
    { receiver: userId, sender: { $in: participantIds }, isRead: false },
    { isRead: true, readAt: new Date() }
  );

  // Reset unread count for this conversation based on participant type
  const participantIndex = conversation.participants.findIndex(
    (p) => p.participantId.toString() === userId.toString()
  );
  const participantType =
    conversation.participants[participantIndex].participantModel;

  if (participantType === "User") {
    conversation.userUnreadCount = 0;
  } else {
    conversation.shopUnreadCount = 0;
  }

  await conversation.save();

  res.status(200).json({
    success: true,
    messages,
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
  deleteMessage,
};
