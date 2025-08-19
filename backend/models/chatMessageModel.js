const mongoose = require("mongoose");

const chatMessageSchema = mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "senderModel",
    },
    senderModel: {
      type: String,
      required: true,
      enum: ["User", "Shop"],
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "receiverModel",
    },
    receiverModel: {
      type: String,
      required: true,
      enum: ["User", "Shop"],
    },
    conversationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ChatConversation",
      required: true,
    },
    message: {
      type: String,
      trim: true,
    },
    messageType: {
      type: String,
      enum: ["text", "image", "file"],
      default: "text",
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    readAt: Date,
    attachments: [
      {
        url: String,
        type: String,
        name: String,
      },
    ],
  },
  { timestamps: true }
);

// Indexes
chatMessageSchema.index({ conversationId: 1, createdAt: -1 });
chatMessageSchema.index({ sender: 1, receiver: 1, createdAt: -1 });

module.exports = mongoose.model("ChatMessage", chatMessageSchema);
