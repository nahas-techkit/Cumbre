var express = require("express");
var router = express.Router();
const Event = require("../controllers/user/event");
const Speker = require("../controllers/user/spekers");
const Sponser = require("../controllers/user/sponsers");
const Gallery = require("../controllers/user/gallery");
const User = require("../controllers/user/User");
const Conversation = require("../controllers/user/Conversations");
const Messages = require("../controllers/user/Messages");

/* GET Event listing. */
router.post("/event", Event.getAllEvent);
router.get("/event/:id", Event.getEventById);
router.get("/event-dates", Event.getEventsDate);

/* GET Spekers listing. */
router.get("/speker", Speker.getSpekers);
router.get("/speker/:id", Speker.getSpekersById);

/* GET Spekers listing. */
router.get("/sponser", Sponser.getAllSponsers);
router.get("/sponser/:id", Sponser.getSponserById);

/* GET Gallery listing. */
router.get("/images", Gallery.getImages);
router.get("/videos", Gallery.getVideos);

/* GET User listing. */
router.get("/user/:id", User.getUserById);
router.get("/user", User.getAllUSers);

/* GET Conversations listing */
router.get("/conversation", Conversation.get);
router.post("/conversation", Conversation.create);

/* GET Messages listing*/
router.get("/message", Messages.get);
router.post("/message/:id", Messages.create);

module.exports = router;
