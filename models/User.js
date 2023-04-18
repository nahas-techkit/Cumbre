const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const userSchema = mongoose.Schema(
  {
    professional: {
      type: String,
      required: [true, "professional Detials is required"],
    },
    middle_name: {
      type: String,
      required: [true, "Middle Name is Required"],
    },
    last_name: {
      type: String,
      required: [true, "Last Name is Required"],
    },

    membership_no: {
      type: String,
    },

    phone_no: {
      type: String,
      required: [true, "Last Name is Required"],
    },

    email: {
      type: String,
      required: [true, "email is Required"],
    },

    personal_bio: {
      type: String,
    },

    company: String,
    company_bio: String,
    education: String,
    permenent_address: String,
    city: String,
    state: String,
    country: String,
    postal_code: String,

    password: {
      type: String,
      required: [true, "Password is Required"],
    },

    photo:String
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
