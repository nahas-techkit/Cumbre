var express = require("express");
var router = express.Router();
var multer = require("multer");
const Auth = require("../controllers/auth/auth");
const Register = require("../controllers/auth/register");
const AdminAuth = require("../controllers/auth/admin-auth");
const regenerateToken = require("../controllers/auth/regenerateToken");

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

/* GET users register */
router.post("/register", upload.single("photo"), Register.register);
router.post("/send-otp", Auth.sendOTP);
router.post("/verify-otp", Auth.verifyOtp);

// Check User Login
router.post("/check-user", Register.sendOtpAndCheckUser);
router.post("/login", Register.login);

/* GET Admin listing. */
router.post("/admin-register", AdminAuth.register);
router.post("/admin-login", AdminAuth.login);

/* Regenerate Token. */
router.post("/regenerate-token", regenerateToken);

module.exports = router;
