var express = require("express");
var router = express.Router();
var multer = require("multer");
const Event = require("../controllers/admin/event");
const Speker = require("../controllers/admin/spekers");

// Multer Setup //
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, "public/uploads/spekers");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + "-" + file.originalname);
    },
  });

  const upload = multer({ storage: storage });

/* Event listing. */
router.post("/event", Event.createEvent);
router.get("/event", Event.getAllEvent);
router.get("/event/:id", Event.getEventById);
router.delete("/event/:id", Event.deleteEvent);
router.put("/event/:id", Event.editEvent);
router.patch("/event-status/:id", Event.chageStatus);

/* Speker listing. */
router.post("/speker",upload.single('photo'), Speker.createSpeker);
router.get("/speker", Speker.getAllSpeker);
router.get("/speker/:id", Speker.getSpekersById);


module.exports = router;
