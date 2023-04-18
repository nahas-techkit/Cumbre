var express = require('express');
var router = express.Router();
var multer = require("multer");
const Auth = require('../controllers/auth/auth')
const Register = require('../controllers/auth/register')

// ------------------------------------------
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, "public/uploads/profile");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + "-" + file.originalname);
    },
  });
  
  const upload = multer({ storage: storage });
//   -----------------------------------------------

/* GET users listing. */
router.post('/register',upload.single('photo'),Register.register)
router.post('/send-otp',Auth.sendOTP)
router.post('/verify-otp',Auth.verifyOtp)



module.exports = router;
