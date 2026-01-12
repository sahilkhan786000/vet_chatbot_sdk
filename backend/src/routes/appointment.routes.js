const router = require("express").Router();
const { createAppointment } = require("../controllers/appointment.controller");

router.post("/", createAppointment);

module.exports = router;
