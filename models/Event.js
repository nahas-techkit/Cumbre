const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const eventSchema = mongoose.Schema(
  {
    startDateTime: {
      type: Date,
      required: [true, "date is required"],
    },
    
    endDateTime: {
      type: Date,
      required: [true, "End time is Required"],
    },

    status: {
      type: String,
      enum: ["Completed", "Pending", "Started"],
      default: "Pending",
    },
    title: { type: String, required: [true, "date is required"] },
    duration: { type: String, required: [true, "date is required"] },
    speakers: { type: Array, required: [true, "date is required"] },
    moderator: { type: Array, required: [true, "date is required"] },
    discription: { type: Array, required: [true, "date is required"] },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Event", eventSchema);
