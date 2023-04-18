var express = require('express');
var router = express.Router();
const Event = require('../controllers/user/event')

/* GET users listing. */
router.get('/event',Event.createEvent)



module.exports = router;
