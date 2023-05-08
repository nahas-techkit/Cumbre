const { getUser, sendMessage } = require("../../libs/socketio");
const Conversation = require("../../models/Conversation");
const Message = require("../../models/Message");

module.exports = {
  create: async (req, res) => {
    let { sender, reciever, conversationId, text } = req.body;
    try {
      let conversation;
      if (conversationId) {
        conversation = await Conversation.findById(conversationId);
      }
      if (!conversationId) {
        conversation = await Conversation.findOne({
          users: { $all: [sender, reciever] },
        });
      }

      if (!conversation) {
        conversation = new Conversation({
          users: [sender, reciever],
        });
      }

      if (!conversation.users.includes(sender)) {
        return res
          .status(403)
          .send("You are not authorized to send messages to this conversation");
      }

      const message = new Message({
        conversation: conversation._id,
        sender,
        text: text,
      });

      conversation.messages.push(message._id);

      await conversation.save();
      await message.save();
      let recieverId = conversation.users.filter(
        (user) => !user._id.equals(sender)
      )[0]._id;
      sendMessage({ recieverId, senderId: sender, message });
      res.json({
        conversationId: conversation._id,
        messageId: message._id,
        senderId: sender,
        recipientId: recieverId,
        text,
        createdAt: message.createdAt,
      });
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal server error");
    }
  },
  get: async (req, res) => {
    let { conversationId, recieverId, senderId } = req.query;
    try {
      const messages = await Message.find({
        conversation: conversationId,
      })
        .populate({path:"sender"})
        .select("sender text createdAt")
        .sort({ createdAt: 1 });

      const result = messages.map((message) => ({
        messageId: message._id,
        sender: message.sender._id,
        // recipientId: recieverId,
        text: message.text,
        createdAt: message.createdAt,
      }));

      res.json({ result });
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal server error");
    }
  },
};
