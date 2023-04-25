const mongoose = require("mongoose");

const sponserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is Required"],
    },
    bio: {
      type: String,
    },
    email: {
      type: String,
      required: [true, "email is Required"],
    },
    photo: String,
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

module.exports = mongoose.model("Sponser", sponserSchema);
