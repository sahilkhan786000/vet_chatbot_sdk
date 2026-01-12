const router = require("express").Router();
const { handleChat } = require("../controllers/chat.controller");

router.post("/", handleChat);

module.exports = router;
