const Sponser = require("../../models/Sponser");

module.exports = {
  createSponser: async (req, res) => {
    try {
      const { body } = req;
      const { file } = req;

      const newSponser = await new Sponser({
        name: body.name,
        bio: body.bio,
        email: body.email,
        photo: "/uploads/sponsers/" + file?.filename,
      }).save();

      res
        .status(200)
        .json({ message: "Sponser Created Successfully", newSponser});
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  
  getAllSponsers : async (req, res) => {
    try {
      const sponser = await Sponser.find({status:{$ne:'Inactive'}}).sort({createdAt:-1})
      res.status(200).json(sponser)
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  
};
