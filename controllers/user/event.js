const EventScheam = require("../../models/Event");
const SchScheam = require("../../models/Schedule");
const SpekerScheam = require("../../models/Spekers");

module.exports = {
  getAllEvent: async (req, res) => {
    try {
      const { body } = req;
      const dateToFind = new Date(body.date);
      const startOfDay = new Date(dateToFind.setHours(0, 0, 0, 0)); // start of day
      const endOfDay = new Date(dateToFind.setHours(23, 59, 59, 999));
      console.log(startOfDay, endOfDay);

      const events = await SchScheam.find({
        startDateTime: { $gte: startOfDay, $lt: endOfDay },
      });
      res.status(200).json(events);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getEventById: async (req, res) => {
    try {
      const { id } = req.params;
      const event = await EventScheam.findById(id);
      res.status(200).json(event);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getEventsDate : async (req,res)=>{
    try {
      console.log('dddd');
      const scheduleCountsByDate = await SchScheam.aggregate([
        {
          $group: {
            _id: { $dateToString: { format: '%Y-%m-%d', date: '$startDateTime' } },
            count: { $sum: 1 },
          },
        },
      ]);
      res.json( scheduleCountsByDate );
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching schedule counts' });
    }
  }
};
