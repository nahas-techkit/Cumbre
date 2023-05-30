const { default: mongoose } = require('mongoose');
const Conversation = require('../models/Conversation');

/**
 * @type {import('socket.io').Server}
 */
const io = require("socket.io")({
  cors: {
    origin: "*",
  },
});
io.connectedUsers = []
io.users = [];
const addUser = (userId, socketId) => {
  !io.users.some((user) => user.userId === userId) &&
    io.users.push({ userId, socketId });
};
const addConnectedUsers = (userId, socketId) => {
  !io.connectedUsers.some((user) => user.userId === userId) &&
    io.connectedUsers.push({ userId, socketId });
};

const removeUser = (socketId) => {
  io.users = io.users.filter((user) => user.socketId !== socketId);
};
const removeConnectedUsers = (socketId) => {
  io.connectedUsers = io.connectedUsers.filter((user) => user.socketId !== socketId);
};

/**
 *
 * @param {*} userId
 * @returns {{ userId, socketId }|undefined}
 */
const getUser = (userId) => {
  return io.users.find((user) => user.userId == userId);
};
/**
 *
 * @param {*} userId
 * @returns {{ userId, socketId }|undefined}
 */
const getConnectedUser = (userId) => {
  return io.connectedUsers.find((user) => user.userId == userId);
};

/**
 *
 * @param {*} data
 */
io.sendMessage = ({
  reciever: recieverId,
  sender,
  messageId,
  text,
  createdAt,
} = {}) => {
  console.log(recieverId, sender, text);
  // let connectedReciever=getConnectedUser(recieverId)
  let reciever = getUser(recieverId);
  try {
    if (reciever?.socketId) {
      io.to(reciever?.socketId).emit("getMessage", {
        reciever: recieverId,
        sender,
        messageId,
        text,
        createdAt,
      });
      return { success: true };
    } else {
      throw new Error("Reciever not found");
    }
  } catch (e) {
    return { success: false, error: e };
  }
};

io.on("connection", (socket) => {
  //when connected
  console.log("user connected");

  socket.on("recent_chats", async (userId) => {
    console.log(userId);
    const conversations = await Conversation.find({
      users: { $in: [userId] },
    }).populate({ path: "users", select: "name email phone_no photo" })
      .populate({
        path: "messages",
        select: "sender text createdAt",
        options: { sort: { createdAt: -1 }, },
        populate: { path: "sender", select: "user" },
      })
      .sort({ updatedAt: -1 });
    io.emit()
    console.log('recent_chats', conversations)
  })
  //take user id socket id from user
  socket.on("addUser", (userId) => {
    console.log(userId);
    addUser(userId, socket.id);
    io.emit("getUsers", io.users);
  });
  socket.on("addConnectedUsers", (userId) => {
    console.log(userId);
    addConnectedUsers(userId, socket.id);
    io.emit("getConnectedUsers", io.connectedUsers);
  });

  //send and get messages
  socket.on("sendMessage", (data) => {
    console.log(data);
    const { senderId, reciverId, text } = data;
    console.log(io.users);
    const user = getUser(reciverId);
    if (user) {
      console.log("user->", user);
      io.to(user.socketId).emit("getMessage", {
        senderId,
        text,
      });
    } else {
    }
  });

  //when disconnect
  socket.on("removeUser", () => {
    console.log("a user disconnected");
    removeUser(socket.id);
    io.emit("getUsers", io.users);
  });
  socket.on("disconnect", () => {
    console.log("a user disconnected");
    removeConnectedUsers(socket.id);
    io.emit("getConnectedUsers", io.connectedUsers);
    removeUser(socket.id);
    io.emit("getUsers", io.users);
  });
});
console.log(io.users);

Conversation.watch([], { fullDocument: 'updateLookup' }).
  on('change', async ({ updateDescription, fullDocument }) => {
    const conversation = await Conversation.findById(fullDocument._id).populate({ path: "users", select: "name email phone_no photo" })
      .populate({
        path: "messages",
        select: "sender text createdAt",
        options: { sort: { createdAt: -1 }, },
        populate: { path: "sender", select: "user" },
      })
    console.log(conversation)
    conversation.users.map((user) => {
      let reciever = getConnectedUser(user._id.toString());
      const result =
      {
        conversationId: conversation._id,
        messageId: conversation.messages[0]?._id,
        senderId: conversation.messages[0]?.sender?._id,
        recipientId:conversation.users.find(
          (userr) => !userr._id.equals(user._id.toString())
        ),
        text: conversation.messages[0]?.text,
        createdAt: conversation.messages[0]?.createdAt,
      }
      console.log(reciever);
      if (reciever?.socketId) {
        io.to(reciever?.socketId).emit("recentChatUpdated", result)
      }
    })
  });


module.exports = io;
exports.getUser = getUser;
// exports.sendMessage = sendMessage;
