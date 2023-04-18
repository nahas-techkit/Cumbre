const EventScheam = require("../../models/Event");

module.exports = {
  createEvent: async (req, res) => {
    try {
      const { body } = req;
      const startDateTime = new Date(body.startDateTime);
      const endDateTime = new Date(body.endDateTime);
      const durationMs = endDateTime - startDateTime;
      const hours = Math.floor(durationMs / 3600000);
      const minutes = Math.round((durationMs % 3600000) / 60000);

      const newEvent = await new EventScheam({
        startDateTime,
        endDateTime,
        duration: `${hours} hours ${minutes} minutes`,
        title: body.title,
        speakers: body.speakers,
        moderator: body.moderator,
        discription: body.discription,
      }).save();
      res.status(200).json({ message: "event created successfully", newEvent });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // getAllEvent :async (req,res)=>{
  //   try {
      
  //   } catch (error) {
      
  //   }
  // }
};
