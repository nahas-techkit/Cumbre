const Speker = require("../../models/Spekers");
const { deleteFile } = require("../../utils/deleteFile");

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

  getAllSpeker: async (req, res) => {
    try {
      const spekers = await Speker.find().sort({ createdAt: -1 });
      res.status(200).json(spekers);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getSpekersById: async (req, res) => {
    try {
      const { id } = req.params;
      const speker = await Speker.findById(id);
      res.status(200).json(speker);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  deleteSpeker: async (req, res) => {
    try {
      const { id } = req.params;
      const { photo } = await Speker.findById(id);
      await Speker.findByIdAndDelete(id);
      await deleteFile("public/" + photo);

      res.status(200).json({ message: "Deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  updateSpeker : async (req,res)=>{
    try {
        const {id} =req.params
        const {body} =req
        const {file} =req

        console.log(file);

        if(file){
          console.log(file,'file');
          const speker = await Speker.findById(id)
          const updateImage =await Speker.findByIdAndUpdate(id,{
            photo: "/uploads/spekers/" + file?.filename,
          })
          await deleteFile("public/" + speker.photo)
        }

        const updated = await Speker.findByIdAndUpdate(id,{
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
        })

        res.status(200).json({message:'Updated successfully'})
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  chageStatus: async (req, res) => {

    try {
      console.log('status', req.body, req.params,);
      const { id } = req.params;
      const { status } = req.body;
     
      const updatedSchedule = await Speker.findByIdAndUpdate(
        id,
        {
          $set: { status },
        },
        { new: true }
      );

      res.status(200).json({ message: `Status Changed`, updatedSchedule });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};
