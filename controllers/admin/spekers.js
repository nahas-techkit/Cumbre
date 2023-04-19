const Speker = require("../../models/Spekers");

module.exports = {
  createSpeker: async (req, res) => {
    try {
      const { body } = req;
      const { file } = req;
      const newSpeker = await new Speker({
        name: body.name,
        phone_no: body.phone_no,
        email: body.email,
        personal_bio: body.personal_bio,
        company: body.company,
        education: body.education,
        permenent_address: body.permenent_address,
        city: body.city,
        state: body.state,
        country: body.country,
        postal_code: body.postal_code,
        photo: "/uploads/spekers/" + file?.filename,
      }).save();
      res.status(200).json({ message: "Speker created successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getAllSpeker : async (req,res)=>{
    try {
      console.log('1111111111');
        const spekers = await Speker.find().sort({createdAt:-1})
        res.status(200).json(spekers)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
  },

  getSpekersById: async (req,res)=>{
    try {
        const {id} = req.params
        const speker = await Speker.findById(id)
        res.status(200).json(speker)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
  }
};
