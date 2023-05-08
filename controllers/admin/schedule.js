const Schedule = require("../../models/Schedule");
const Event = require("../../models/Event");
const moment = require("moment");

module.exports = {
  createSchedule: async (req, res) => {
    try {
      console.log("cs");
      const { body } = req;
      const { id } = req.params;
      const result = await Event.exists({ _id: id });
      console.log(body,'body');

      if (!result) {
        return res.status(400).json({ message: "Please provide a valid id" });
      }

      const startDateTime = new Date(body.startDateTime);
      const endDateTime = new Date(body.endDateTime);
      const durationMs = endDateTime - startDateTime;
      const hours = Math.floor(durationMs / 3600000);
      const minutes = Math.round((durationMs % 3600000) / 60000);

      const options = {
        timeZone: "Asia/Kolkata",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      };
      const dateForSave = startDateTime.toLocaleString("en-IN", options);
      const endDateForSave = endDateTime.toLocaleString("en-IN", options);

      

      const newSchedule = await new Schedule({
        startDateTime,
        endDateTime,
        startDateTimeShow: dateForSave,
        endDateTimeShow: endDateForSave,
        duration: `${hours} hours ${minutes} minutes`,
        title: body.title,
        speakers: body.speakers,
        moderator: body.moderator,
        discription: body.discription,
        event: id,
      }).save();

      const event = await Event.findByIdAndUpdate(id, {
        $push: {
          event_schedule: newSchedule._id,
        },
      });

      res
        .status(200)
        .json({ message: "Schedule Added successfully", newSchedule });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  updateSchedule: async (req, res) => {
    try {
      const { id } = req.params;
      const { body } = req;
      console.log(body, "body");


      const startDateTime = new Date(body.startDateTime);
      const endDateTime = new Date(body.endDateTime);
      const durationMs = endDateTime - startDateTime;
      const hours = Math.floor(durationMs / 3600000);
      const minutes = Math.round((durationMs % 3600000) / 60000);

      const options = {
        timeZone: "Asia/Kolkata",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      };
      const dateForSave = startDateTime.toLocaleString("en-IN", options);
      const endDateForSave = endDateTime.toLocaleString("en-IN", options);


      const updatedSchedule = await Schedule.findByIdAndUpdate(id, {
        startDateTime,
        endDateTime,
        startDateTimeShow: dateForSave,
        endDateTimeShow: endDateForSave,
        duration: `${hours} hours ${minutes} minutes`,
        title: body.title,
        speakers: body.speakers,
        moderator: body.moderator,
        discription: body.discription,
        event: id,
      });
      res
        .status(200)
        .json({ message: "Schedule Updated successfully", updatedSchedule });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  chageStatus: async (req, res) => {
    try {
      const { id } = req.params;
      console.log(id);

      const { status } = req.body;
      console.log(status);

      const updatedSchedule = await Schedule.findByIdAndUpdate(
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

  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const schedule = await Schedule.findById(id);
      res.status(200).json(schedule);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  deleteSchedule: async (req, res) => {
    try {
      const { id } = req.params;
      const { event } = await Schedule.findById(id);
      const pullIdFromEvent = await Event.findByIdAndUpdate(event, {
        $pull: {
          event_schedule: id,
        },
      });

      console.log(pullIdFromEvent);

      const deleted = await Schedule.findByIdAndDelete(id);
      console.log(deleted, "deleted");

      res.status(200).json({ message: "Schedule deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};
