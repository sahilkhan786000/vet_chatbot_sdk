const express = require("express");
const cors = require("cors");
const path = require("path");

const chatRoutes = require("./routes/chat.routes");
const appointmentRoutes = require("./routes/appointment.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/chat", chatRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/conversations", require("./routes/conversation.routes"));
app.use("/sdk", express.static(path.join(__dirname, "public")));


const frontendPath = path.join(__dirname, "../public/dist");
app.use(express.static(frontendPath));


app.get("/*", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

module.exports = app;
