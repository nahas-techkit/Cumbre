const Gallery = require("../../models/gallery");
const {deleteFile} = require('../../utils/deleteFile')

module.exports = {
  uploadFile: async (req, res) => {
    try {
      console.log("upFile");
      const { files } = req;
      console.log(files);

      files.forEach(async (file) => {
        await new Gallery({
          file: "/uploads/gallery/" + file?.filename,
          type: file.mimetype,
        }).save();
      });
      res.status(200).json({ message: "File Added successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getAllImage: async (req, res) => {
    try {
      const galleries = await Gallery.find({ type: /^image/ }).sort({
        createdAt: -1,
      });
      res.status(200).json(galleries);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getVideos: async (req, res) => {
    try {
      const videos = await Gallery.find({ type: /^video/ }).sort({
        createdAt: -1,
      });
      res.status(200).json(videos);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  deleteFile: async (req, res) => {
    try {
      const { id } = req.params;
      const file = await Gallery.findById(id)
      deleteFile("public/" + file.file)
      await Gallery.findByIdAndDelete(id);
      res.status(200).json({ message: "File Deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};
