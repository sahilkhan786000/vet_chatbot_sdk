const router = require("express").Router();
const Conversation = require("../models/Conversation");

/**
 * GET all conversations (sessions list)
 */
router.get("/", async (req, res) => {
  const conversations = await Conversation.find(
    {},
    {
      sessionId: 1,
      createdAt: 1,
      messages: { $slice: 1 } // only first message for title
    }
  ).sort({ createdAt: -1 });

  res.json(conversations);
});

/**
 * GET messages of a session
 */
router.get("/:sessionId", async (req, res) => {
  const convo = await Conversation.findOne({
    sessionId: req.params.sessionId
  });

  res.json(convo?.messages || []);
});

module.exports = router;
