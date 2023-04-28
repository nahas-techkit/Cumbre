const mongoose = require("mongoose");
const gallerySchema = mongoose.Schema(
  {
    file: { type: String, required: true },
    type: { type: String, required: true },
    discription: { type: String },
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Gallery", gallerySchema);
