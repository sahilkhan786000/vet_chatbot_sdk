const Conversation = require("../models/Conversation");
const { isAppointmentIntent } = require("../utils/intentDetector");
const { queryVetLLM } = require("../services/llm.service");

exports.handleChat = async (req, res) => {
  const { sessionId, message, context } = req.body;

  let conversation = await Conversation.findOne({ sessionId });

  if (!conversation) {
    conversation = await Conversation.create({
      sessionId,
      context,
      messages: [],
    });
  }

  // Save user message
  conversation.messages.push({
    role: "user",
    text: message,
  });

  let reply;

  // Appointment intent check
  if (isAppointmentIntent(message)) {
    reply =
      "I can help you book a veterinary appointment. What is the pet owner's name?";
  } else {
    reply = await queryVetLLM(message);
  }

  // Save bot reply
  conversation.messages.push({
    role: "bot",
    text: reply,
  });

  await conversation.save();

  res.json({ reply });
};
