const mongoose = require("mongoose");

const chatConversationSchema = mongoose.Schema(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        refPath: "participantModel",
        required: true,
      },
    ],
    participantModel: [
      {
        type: String,
        enum: ["User", "Shop"],
        default: ["User", "Shop"],
        required: true,
      },
    ],
    lastMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ChatMessage",
    },
    lastMessageAt: {
      type: Date,
      default: Date.now,
    },
    // Track unread for each participant
    userUnreadCount: { type: Number, default: 0 }, // For users
    shopUnreadCount: { type: Number, default: 0 }, // For shops
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// Index for efficient querying
chatConversationSchema.index({ participants: 1 });
chatConversationSchema.index({ lastMessageAt: -1 });

// Virtual for getting the other participant
chatConversationSchema.virtual("otherParticipant").get(function () {
  return this.participants.find(
    (p) => p.toString() !== this.currentUser?.toString()
  );
});

module.exports = mongoose.model("ChatConversation", chatConversationSchema);
