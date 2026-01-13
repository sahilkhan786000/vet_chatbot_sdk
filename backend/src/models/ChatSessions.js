import mongoose from "mongoose";

const ChatSessionSchema = new mongoose.Schema(
  {
    sessionId: { type: String, required: true, unique: true },
    title: String,
    context: Object
  },
  { timestamps: true }
);

export default mongoose.model("ChatSession", ChatSessionSchema);
