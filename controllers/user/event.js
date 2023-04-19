const EventScheam = require("../../models/Event");
const SpekerScheam = require("../../models/Spekers");

module.exports = {
  
  getAllEvent :async (req,res)=>{
    try {
      const events = await EventScheam.find().sort({createdAt:-1})
      res.status(200).json(events)
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getEventById : async (req,res)=>{
    try {
      const {id} = req.params
      const event = await EventScheam.findById(id)
      res.status(200).json(event)
      
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  
};
