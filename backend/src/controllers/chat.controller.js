const Conversation = require("../models/Conversation");
const { isAppointmentIntent } = require("../utils/intentDetector");
const { queryVetLLM } = require("../services/llm.service");
const {
  getNextQuestion,
  saveAnswer,
  isComplete
} = require("../services/appointmentFlow.service");

exports.handleChat = async (req, res) => {
  const { sessionId, message, context } = req.body;

  let convo = await Conversation.findOne({ sessionId });

  if (!convo) {
    convo = await Conversation.create({
      sessionId,
      context,
      messages: []
    });
  }

  convo.messages.push({ role: "user", text: message });

  let reply;

  // 🔥 IF ALREADY IN APPOINTMENT MODE
  if (convo.mode === "APPOINTMENT") {
    convo.appointmentData = saveAnswer(
      convo.appointmentData || {},
      message
    );

    if (isComplete(convo.appointmentData)) {
      reply = `
✅ Appointment details received:
Owner: ${convo.appointmentData.ownerName}
Pet: ${convo.appointmentData.petName}
Phone: ${convo.appointmentData.phone}
Date/Time: ${convo.appointmentData.preferredDateTime}

Your appointment has been booked. A vet will contact you shortly.
      `.trim();

      convo.mode = "CHAT";
    } else {
      reply = getNextQuestion(convo.appointmentData);
    }
  }

  // 🔥 START APPOINTMENT FLOW
  else if (isAppointmentIntent(message)) {
    convo.mode = "APPOINTMENT";
    convo.appointmentData = {};
    reply = "Sure 🐶 Let’s book an appointment. What is the pet owner's name?";
  }

  // 🔥 NORMAL CHAT → LLM
  else {
    reply = await queryVetLLM(message);
  }

  convo.messages.push({ role: "bot", text: reply });
  await convo.save();

  res.json({ reply });
};
