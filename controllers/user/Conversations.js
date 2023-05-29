const { sendMessage } = require("../../libs/socketio");
const Conversation = require("../../models/Conversation");
const Message = require("../../models/Message");

module.exports = {
  get: async (req, res) => {
    let userId = req.query.userId;
    try {
      console.log(req.query);
      const conversations = await Conversation.find({
        users: { $in: [userId] },
      })
        .populate({ path: "users", select: "name email phone_no photo" })
        .populate({
          path: "messages",
          select: "sender text createdAt",
          options: { sort: { createdAt: -1 }, limit: 1 },
          populate: { path: "sender", select: "user" },
        })
        .sort({ updatedAt: -1 });

      const result = conversations
        .filter((conversation) => conversation.messages[0]?.sender?._id)
        .map((conversation) => ({
          conversationId: conversation._id,
          messageId: conversation.messages[0]?._id,
          senderId: conversation.messages[0]?.sender?._id,
          recipientId: conversation.users.filter(
            (user) => !user._id.equals(userId)
          )[0],
          text: conversation.messages[0]?.text,
          createdAt: conversation.messages[0]?.createdAt,
        })).filter((conversation) => conversation.recipientId)
        ;
console.log(result);
      res.json({ result });
    } catch (err) {
      console.log(err);
      res.status(500).json("Internal server error");
    }
  },
  create: async (req, res) => {
    let io = req.get("io");
    let { sender, reciever } = req.body;
    try {
      let isExist = await Conversation.findOne({
        users: { $all: [sender, reciever] },
      });
      let conversation = isExist
        ? isExist
        : new Conversation({
            users: [sender, reciever],
          });
      let message;
      if (req.body.message) {
        message = new Message({
          conversation: conversation._id,
          sender,
          text: req.body.message,
        });

        conversation.messages.push(message._id);
        sendMessage({
          conversationId: conversation._id,
          messageId: message?._id,
          senderId: sender,
          recipientId: req.body.reciever,
          text: req.body.message,
          createdAt: message?.createdAt,
        });
        await message.save();
      }
      await conversation.save();

      res.json({
        conversationId: conversation._id,
        messageId: message?._id,
        senderId: sender,
        recipientId: req.body.reciever,
        text: req.body.message,
        createdAt: message?.createdAt,
      });
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ message: "Internal server error", error: err.message });
    }
  },
  // create: async (req, res) => {
  //   let { sender, reciever } = req.body;
  //   try {
  //     let conversation = new Conversation({ users: [sender, reciever] });
  //     await conversation.save();
  //   } catch (err) {
  //     res
  //       .status(500)
  //       .json({ error: err.message, message: "Failed to create conversation" });
  //   }
  // },
};
