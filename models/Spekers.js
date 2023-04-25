const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const spekersSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is Required"],
    },
    phone_no: {
      type: String,
      required: [true, "Phone No  is Required"],
    },
    email: {
      type: String,
      required: [true, "email is Required"],
    },
    personal_bio: {
      type: String,
    },
    company: String,
    education: String,
    permenent_address: String,
    city: String,
    state: String,
    country: String,
    postal_code: String,
    photo: String,
    evnts: [{ type: ObjectId, ref: "Event" }],
    status: {
      type: String,
      required: true,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Speker", spekersSchema);
