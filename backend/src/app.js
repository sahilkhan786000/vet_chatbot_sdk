const express = require("express");
const cors = require("cors");
const path = require("path");

const chatRoutes = require("./routes/chat.routes");
const appointmentRoutes = require("./routes/appointment.routes");

const app = express();

// 1. Updated CORS to be more flexible for SDK usage
app.use(cors()); 

// 2. IMPORTANT: Allow your site to be framed by other websites
app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", "frame-ancestors *");
  res.setHeader("X-Frame-Options", "ALLOWALL");
  next();
});

app.use(express.json());

app.use("/api/chat", chatRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/conversations", require("./routes/conversation.routes"));

// This ensures files in your 'public' folder are accessible via your-url.com/sdk/filename.js
app.use("/sdk", express.static(path.join(__dirname, "public")));

const frontendPath = path.join(__dirname, "../public/dist");
app.use(express.static(frontendPath));

app.get("/", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

module.exports = app;