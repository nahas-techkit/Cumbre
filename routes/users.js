var express = require('express');
var router = express.Router();
const Event = require('../controllers/user/event')
const Speker = require('../controllers/user/spekers')
const Sponser = require('../controllers/user/sponsers')


/* GET Event listing. */
router.get('/event',Event.getAllEvent)
router.get('/event/:id', Event.getEventById)

/* GET Spekers listing. */
router.get('/speker', Speker.getSpekers)
router.get('/speker/:id', Speker.getSpekersById)

/* GET Spekers listing. */
router.get('/sponser',Sponser.getAllSponsers)
router.get('/sponser/:id',Sponser.getSponserById)

module.exports = router;
