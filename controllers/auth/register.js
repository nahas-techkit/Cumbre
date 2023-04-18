const bcrypt = require("bcrypt");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../../utils/JWT");
const User = require("../../models/User");


module.exports = {
  register: async (req, res) => {
    try {
      const {body} = req;
      const {file} = req;
      const existingUser = await User.findOne({ email: body.email });

      if (existingUser) {
        return res
          .status(400)
          .json({ message: "This email address already exists" });
      }

      const cryptedPassword = await bcrypt.hash(body.password, 12);
      

      console.log(file);

      const newUser = await new User({
        professional:body.professional,
        middle_name:body.middle_name,
        last_name:body.last_name,
        membership_no:body.membership_no,
        phone_no:body.phone_no,
        email:body.email,
        personal_bio:body.personal_bio,
        company:body.company,
        company_bio:body.company_bio,
        education:body.education,
        permenent_address:body.permenent_address,
        city:body.city,
        state:body.state,
        country:body.country,
        postal_code:body.postal_code,
        password:cryptedPassword,
        photo:"/uploads/profile/" + file?.filename,
      })

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
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(401).json({ message: "Email does not exist" });
      }

      const check = await bcrypt.compare(password, user.password);

      if (!check) {
        return res.status(401).json({ message: "Incorrect Password" });
      }

      const accessToken = generateAccessToken({ id: user._id });
      const refreshToken = generateRefreshToken({ id: user._id });

      res.status(200).json({
        user,
        accessToken,
        refreshToken,
        message: "Login successfully",
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

};
