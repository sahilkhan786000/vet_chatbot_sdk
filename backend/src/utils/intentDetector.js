function isAppointmentIntent(text) {
  const keywords = ["book", "appointment", "schedule", "visit", "vet"];
  return keywords.some(word => text.toLowerCase().includes(word));
}

module.exports = { isAppointmentIntent };
