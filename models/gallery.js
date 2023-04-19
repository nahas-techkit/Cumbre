const mongoose = require("mongoose");
const gallerySchema = mongoose.Schema(
  {
    file: {
      type: String,
      required: [true, "Name is Required"],
    },
    discription: {
      type: String,
      required: [true, "Phone No  is Required"],
    },
    type:String
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Gallery", gallerySchema);
