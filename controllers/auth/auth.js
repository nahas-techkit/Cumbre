const User = require("../../models/User");
const {dosms,otpVerify} = require('../../libs/OTP')

module.exports = {

  sendOTP: async (req, res) => {
    try {
        const { phone_no } = req.body;
        console.log(phone_no);
        const sms = await dosms(phone_no);
        res.status(200).json(sms);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
  },

  verifyOtp: async (req, res) => {
    try {
      const { phone_no, otp } = req.body;
      const verify = await otpVerify(otp, phone_no);
      if (!verify) {
        return res.status(400).json({ message: "invalid otp number" });
      }

      res.status(200).json({ otp: true, message: "Success" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
  },

  
};
