const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  role: String,
  text: String,
  timestamp: { type: Date, default: Date.now }
});

const ConversationSchema = new mongoose.Schema({
  sessionId: String,
  context: Object,
  messages: [MessageSchema],

  // 🔥 NEW FIELDS
  mode: {
    type: String,
    enum: ["CHAT", "APPOINTMENT"],
    default: "CHAT"
  },
  appointmentData: {
    ownerName: String,
    petName: String,
    phone: String,
    preferredDateTime: String
  },

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Conversation", ConversationSchema);
