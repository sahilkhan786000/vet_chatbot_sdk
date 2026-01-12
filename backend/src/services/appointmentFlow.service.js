const Appointment = require("../models/Appointment");

const steps = ["ownerName", "petName", "phone", "preferredDateTime"];

function getNextStep(data) {
  return steps.find(step => !data[step]);
}

async function saveAppointment(sessionId, data) {
  const appointment = new Appointment({ sessionId, ...data });
  await appointment.save();
}

module.exports = { getNextStep, saveAppointment };
