const Gallery = require("../../models/gallery");

module.exports = {
  getImages: async (req, res) => {
    try {
      const galleries = await Gallery.find({ type: /^image/ }).sort({ createdAt: -1 });
      res.status(200).json(galleries);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
  },

  getVideos: async (req, res) => {
    try {
        const videos = await Gallery.find({ type: /^video/ }).sort({ createdAt: -1})
        res.status(200).json(videos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
  }
};
