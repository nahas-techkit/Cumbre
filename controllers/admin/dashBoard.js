const User = require ('../../models/User')
const Event = require ('../../models/Event')
const Speker = require ('../../models/Spekers')
const Sponser = require ('../../models/Sponser')
module.exports = {
    getDashBoardDeatils: async (req,res)=>{
        try {
            const user = await User.countDocuments()
            const event = await Event.countDocuments()
            const speker = await Speker.countDocuments()
            const sponser = await Sponser.countDocuments()

            const eventPending= await Event.countDocuments({status:"Pending"})
            const eventCompleted= await Event.countDocuments({status:"Completed"})
            const eventOngoing= await Event.countDocuments({status:"Ongoing"})
            const eventCancelled= await Event.countDocuments({status:"Cancelled"})

            const dashBoard = {
                user,
                event,
                speker,
                sponser,
                eventCompleted,
                eventOngoing,
                eventCancelled,
                eventPending
            }
            

            res.status(200).json({dashBoard});
        } catch (error) {
            
        }
    }
}