/**
 * @type {import('socket.io').Server}
 */
const io = require("socket.io")({
  cors: {
    origin: "*",
  },
});

io.users = [];
const addUser = (userId, socketId) => {
  !io.users.some((user) => user.userId === userId) &&
    io.users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  io.users = io.users.filter((user) => user.socketId !== socketId);
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
  //take user id socket id from user
  socket.on("addUser", (userId) => {
    console.log(userId);
    addUser(userId, socket.id);
    io.emit("getUsers", io.users);
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
  socket.on("disconnect", () => {
    console.log("a user disconnected");
    removeUser(socket.id);
    io.emit("getUsers", io.users);
  });
});
console.log(io.users);

module.exports = io;
exports.getUser = getUser;
// exports.sendMessage = sendMessage;
