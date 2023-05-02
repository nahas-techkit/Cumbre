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
      enum: ["Completed", "Ongoing", "Cancelled", "Pending"],
      default: "Pending",
    },
    eventTitle: { type: String, required: [true, "title is required"] },
    venue: { type: String, required: [true, "event is required"] },
    discription: String,
    event_schedule: [{ type: ObjectId, ref: "Schedule" }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Event", eventSchema);
