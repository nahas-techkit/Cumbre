const Sponser = require("../../models/Sponser");
const {deleteFile} = require("../../utils/deleteFile")

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
        .json({ message: "Sponser Created Successfully", newSponser });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getAllSponsers: async (req, res) => {
    try {
      const sponser = await Sponser.find({ status: { $ne: "Inactive" } }).sort({
        createdAt: -1,
      });
      res.status(200).json(sponser);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getSponserById: async (req, res) => {
    try {
      const { id } = req.params;
      const sponser = await Sponser.findById(id);
      res.status(200).json(sponser);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  updateSponsor: async (req, res) => {
    try {
      const { id } = req.params;
      const { body } = req;
      const { file } = req;

      const sponser = await Sponser.findById(id)
      console.log(sponser);
      
      await Sponser.findByIdAndUpdate(
        id,
        {
          name: body.name,
          bio: body.company_bio,
          email: body.email,
          photo: "/uploads/sponsers/" + file?.filename,
        },
        { new: true }
      );

     const a = await deleteFile('public/'+ sponser.photo  )
      res.status(200).json({ message: "Sponsor updated successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  deleteSponser: async (req, res) => {
    try {
      const { id } = req.params;
      console.log(id, "id");
      await Sponser.findByIdAndUpdate(id, {
        status: "Inactive",
      });
      res.status(200).json({ message: "Sponser deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};
