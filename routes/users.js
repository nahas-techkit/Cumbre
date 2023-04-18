var express = require('express');
var router = express.Router();
const Event = require('../controllers/user/event')

/* GET users listing. */
router.get('/event',Event.getAllEvent)
router.get('/event/:id', Event.getEventById)



module.exports = router;
