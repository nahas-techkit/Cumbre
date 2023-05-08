const { getUser, sendMessage } = require("../../libs/socketio");
const Conversation = require("../../models/Conversation");
const Message = require("../../models/Message");

module.exports = {
  create: async (req, res) => {
    let { senderId,  } = req.body;
    try {
      const conversation = await Conversation.findById(
        req.params.conversationId
      );
      if (!conversation) {
        return res.status(404).send("Conversation not found");
      }

      if (!conversation.users.includes(senderId)) {
        return res
          .status(403)
          .send("You are not authorized to send messages to this conversation");
      }

      const message = new Message({
        conversation: conversation._id,
        sender: senderId,
        text: req.body.message,
      });

      conversation.messages.push(message._id);

      await conversation.save();
      await message.save();
      let recieverId = conversation.users.filter(
        (user) => !user._id.equals(senderId)
      )[0]._id;
      sendMessage({ recieverId, senderId, message });
      res.json({
        conversationId: conversation._id,
        messageId: message._id,
        senderId: senderId,
        recipientId: recieverId,
        content: req.body.message,
        createdAt: message.createdAt,
      });
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal server error");
    }
  },
  get: async (req, res) => {
    let { conversationId, recieverId } = req.body;
    try {
      const messages = await Message.find({
        conversation: conversationId,
      })
        .populate("sender", "user")
        .select("sender text createdAt")
        .sort({ createdAt: 1 });

      const result = messages.map((message) => ({
        messageId: message._id,
        senderId: message.sender._id,
        recipientId: recieverId,
        content: message.content,
        createdAt: message.createdAt,
      }));

      res.json({ result });
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal server error");
    }
  },
};
