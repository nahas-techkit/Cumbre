const { Schema, default: mongoose } = require("mongoose");

const conversationSchema = new Schema(
  {
    users: [{ type: Schema.Types.ObjectId, ref: "User" }],
    messages: [{ type: Schema.Types.ObjectId, ref: "Message" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Conversation", conversationSchema);
