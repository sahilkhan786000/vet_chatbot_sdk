const { saveAppointment } = require("../services/appointmentFlow.service");

exports.createAppointment = async (req, res) => {
  const { sessionId, data } = req.body;

  await saveAppointment(sessionId, data);

  res.json({
    message: "✅ Appointment booked successfully! Our vet will contact you."
  });
};
