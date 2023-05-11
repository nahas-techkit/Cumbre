const { Schema, default: mongoose } = require("mongoose");

const messageSchema = new Schema({
  conversation: { type: Schema.Types.ObjectId, ref: "Conversation" },
  sender: { type: Schema.Types.ObjectId, ref: "User" },
  text: String,
},{timestamps:true});

module.exports = mongoose.model("Message", messageSchema);
