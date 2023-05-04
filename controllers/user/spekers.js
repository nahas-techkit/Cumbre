const SpekerScheam = require("../../models/Spekers");
module.exports = {
    getSpekers: async (req,res)=>{
        try {
          const spekers = await SpekerScheam.find({status:'Active'}).sort({createdAt:-1})
          res.status(200).json(spekers)
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
      },
    
      getSpekersById: async (req,res)=>{
        try {
          const {id} = req.params
          const speker = await SpekerScheam.findById(id)
          res.status(200).json(speker)
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
      }
}