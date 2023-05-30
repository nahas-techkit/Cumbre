const User = require("../../models/User");

module.exports = {
  getUserById: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(400).json({ message: "Not Found" });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getAllUSers: async (req, res) => {
    try {
      let search = req.query.search
      let match = {}
      if (search) {
        match.$or = [{ name: { $regex: search ,'$options' : 'i'} }, { phone_no: { $regex: search,'$options' : 'i' } }]
      }
      const users = await User.find(match).sort({ name: 1 });
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};
