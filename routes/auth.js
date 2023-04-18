var express = require('express');
var router = express.Router();
const Auth = require('../controllers/auth/auth')

/* GET users listing. */
router.post('/send-otp',Auth.sendOTP)
router.post('/verify-otp',Auth.verifyOtp)



module.exports = router;
