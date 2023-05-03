const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const userSchema = mongoose.Schema(
  {
    // professional: {
    //   type: String,
    //   required: [true, "professional Detials is required"],
    // },
    // first_name: {
    //   type: String,
    //   required: [true, "First Name is Required"],
    // },
    // middle_name: {
    //   type: String,
    //   required: [true, "Middle Name is Required"],
    // },
    name: {
      type: String,
      
    },

    // membership_no: {
    //   type: String,
    // },

    phone_no: {
      type: String,
      required: [true, "Phone No is Required"],
    },

    email: {
      type: String,
      required: [true, "email is Required"],
    },
    // personal_bio: {
    //   type: String,
    // },
    company: String,
    // position: String,
    // company_bio: String,
    // education: String,
    // permenent_address: String,
    // city: String,
    // state: String,
    // country: String,
    // postal_code: String,
    photo: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
