const EventSchema = require("../../models/Event");
const SchduleSchema = require("../../models/Schedule");

module.exports = {
  createEvent: async (req, res) => {
    try {
      const { body } = req;
      const startDateTime = new Date(body.startDateTime);
      const endDateTime = new Date(body.endDateTime);

      const event = await new EventSchema({
        eventTitle: body.eventTitle,
        venue: body.venue,
        startDateTime,
        endDateTime,
        discription: body.discription,
      }).save();

      res.status(200).json({ event, message: "Event created successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getAllevent: async (req, res) => {
    try {
      const events = await EventSchema.find().sort({ createdAt: -1 });
      res.status(200).json({ events });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getById: async (req, res) => {
    try {

      const { id } = req.params;
      console.log(id);
      const event = await EventSchema.findById(id).populate("event_schedule");
      if (event) {
        res.status(200).json({ event });
      } else {
        res.status(404).json({ message: "Event not found" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  deleteEvent: async (req, res) => {
    try {
      const { id } = req.params;
      const { event_schedule } = await EventSchema.findById(id);
      const events = await EventSchema.findByIdAndDelete(id);
      const result = await SchduleSchema.deleteMany({
        _id: { $in: event_schedule },
      });
      console.log(`Deleted ${result.deletedCount} documents`);
      res.status(200).json({ message: "Event deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  updateEvent: async (req, res) => {
    try {
      const { id } = req.params;
      const { body } = req;
      const updateEvent = await EventSchema.findByIdAndUpdate(id, {
        $set: { body },
      });
      res.status(200).json({ updateEvent, message:'Event updated Successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};
