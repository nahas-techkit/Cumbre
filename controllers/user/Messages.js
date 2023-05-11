const { getUser, sendMessage } = require("../../libs/socketio");
const Conversation = require("../../models/Conversation");
const Message = require("../../models/Message");
const sendPushNotification = require("../../libs/sendPushNotification");
const User = require("../../models/User");

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
        text,
      });

      conversation.messages.push(message._id);

      await conversation.save();
      await message.save();

      let recieverId = conversation.users.filter(
        (user) => !user._id.equals(sender)
      )[0]._id;
      let result = sendMessage({
        reciever: recieverId.toString(),
        sender: sender,
        messageId: message._id,
        text: message.text,
        createdAt: message.createdAt,
      });
      if (!result.success && result.error) {
        let reciever = await User.findById(recieverId.toString());
        let senderData = await User.findById(sender);
        for (let recipientToken of reciever.deviceTokens) {
          try {
            await sendPushNotification({
              notification: {
                title: senderData.name,
                body: text,
                // imageUrl: senderData.photo,
              },
              token: recipientToken,
              apns: {
                payload: {
                  aps: {
                    sound: "default",
                  },
                },
                headers: {
                  "apns-priority": "5",
                },
              },
            });
          } catch (err) {
            console.log(err);
            reciever.deviceTokens = reciever.deviceTokens.filter(
              (token) => token !== recipientToken
            );
            await reciever.save();
          }
        }
      }
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
      res
        .status(500)
        .json({ message: "Failed to send message", error: err.message });
    }
  },
  get: async (req, res) => {
    let { conversationId, reciever, sender } = req.query;
    try {
      let conversation;
      if (!conversationId) {
        conversation = await Conversation.findOne({
          users: { $all: [sender, reciever] },
        });
      }
      if (conversation) {
        conversationId = conversation._id;
      }
      const messages = await Message.find({
        conversation: conversationId,
      })
        .populate({ path: "sender" })
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
      res
        .status(500)
        .json({ message: "Messages not found", error: err.message });
    }
  },
};
