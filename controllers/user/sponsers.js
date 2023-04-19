const Sponsers = require('../../models/Sponser')

module.exports = {
    getAllSponsers : async (rewq,res)=>{
        try {
            const sponsers = await Sponsers.find().sort({createdAt:-1})
            res.status(200).json(sponsers)
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getSponserById: async (req,res) =>{
        try {
            const {id} = req.params
            const sponser = await Sponsers.findById(id)
            res.status(200).json(sponser)
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}