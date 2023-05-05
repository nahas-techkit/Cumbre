
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../../utils/JWT");
const User = require("../../models/User");
const {dosms,otpVerify} = require('../../libs/OTP')


module.exports = {
  register: async (req, res) => {
    try {
      const {body} = req;
      const {file} = req;
      const existingUser = await User.findOne({ phone_no: body.phone_no });

      if (existingUser) {
        return res
          .status(400)
          .json({ message: "This mobile number is already exists" });
      }

      const newUser = await new User({
        name:body.name,
        phone_no:body.phone_no,
        email:body.email,
        company:body.company,
        // first_name:body.first_name,
        // middle_name:body.middle_name,
        // last_name:body.last_name,
        // membership_no:body.membership_no,
        // personal_bio:body.personal_bio,
        // position:body.company,
        // company_bio:body.company_bio,
        // education:body.education,
        // permenent_address:body.permenent_address,
        // city:body.city,
        // state:body.state,
        // country:body.country,
        // postal_code:body.postal_code,
       
      })

      if(file) {
        newUser.photo="/uploads/profile/" + file?.filename
      }

      const accessToken = generateAccessToken({ id: newUser._id });
      const refreshToken = generateRefreshToken({ id: newUser._id });

      await newUser.save();

      res.send({
        user: newUser,
        accessToken,
        refreshToken,
        message: "Registretion successfully completed",
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  

  login: async (req, res) => {
    try {
      const { phone_no, otp} = req.body;
      const user = await User.findOne({ phone_no });

      if (!user) {
        return res.status(401).json({ message: "Phone No does not exist", userExist:false });
      }

      const verify = await otpVerify(otp, phone_no);
      if (!verify) {
        return res.status(400).json({ message: "invalid otp number" });
      }

      const accessToken = generateAccessToken({ id: user._id });
      const refreshToken = generateRefreshToken({ id: user._id });

      res.status(200).json({
        user,
        accessToken,
        refreshToken
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  sendOtpAndCheckUser : async (req,res)=>{
    try {
      const {phone_no} = req.body;
      const user = await User.findOne({ phone_no });

      if (!user) {
        return res.status(401).json({ message: "Phone No does not exist", userExist:false });
      }

      const sms = await dosms(phone_no);
      res.status(200).json({ message: "OTP send to the phone NO", userExist:true });

    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

};
