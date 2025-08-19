const mongoose = require("mongoose");

const chatConversationSchema = mongoose.Schema(
  {
    participants: [
      {
        participantId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          refPath: "participants.participantModel",
        },
        participantModel: {
          type: String,
          required: true,
          enum: ["User", "Shop"], // list all models allowed here
        },
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

chatConversationSchema.index({ "participants.participantId": 1 });
chatConversationSchema.index({ lastMessageAt: -1 });

// Virtual for getting the other participant
// chatConversationSchema.virtual("otherParticipant").get(function () {
//   return this.participants.find(
//     (p) => p.toString() !== this.currentUser?.toString()
//   );
// });

module.exports = mongoose.model("ChatConversation", chatConversationSchema);
