const Gallery = require('../../models/gallery')

module.exports = {
    uploadFile : async (req,res)=>{
        try {
            const {discription} = req.body
            const {file} = req
            const newFile = await new Gallery({
                file: "/uploads/gallery/" + file?.filename,
                discription,
                type:file.mimetype,
            }).save()
            res.status(200).json(newFile)
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    
}