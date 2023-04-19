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

  getAllEvent: async (req, res) => {
    try {
      const events = await EventScheam.find({
        status: { $ne: "Deleted" },
      }).sort({ createdAt: -1 });
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

  deleteEvent: async (req, res) => {
    try {
      const { id } = req.params;
      await EventScheam.findByIdAndUpdate(id, {
        $set: { status: "Deleted" },
      });
      res.status(200).json({ message: "Event deleted Successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  editEvent: async (req, res) => {
    try {
      const { id } = req.params;
      const { body } = req;
      console.log(body, "body");
      const updatedEvent = await EventScheam.findByIdAndUpdate(id, {
        $set: body,
      });
      res
        .status(200)
        .json({ message: "Event Updated successfully", updatedEvent });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  chageStatus: async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const updatedEvent = await EventScheam.findByIdAndUpdate(
        id,
        {
          $set: { status },
        },
        { new: true }
      );

      res.status(200).json({ message: `Status Changed`, updatedEvent });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};
