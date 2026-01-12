const express = require("express");
const cors = require("cors");

const chatRoutes = require("./routes/chat.routes");
const appointmentRoutes = require("./routes/appointment.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/chat", chatRoutes);
app.use("/api/appointments", appointmentRoutes);

app.get("/", (_, res) => {
  res.send("Vet Chatbot Backend Running");
});

module.exports = app;
