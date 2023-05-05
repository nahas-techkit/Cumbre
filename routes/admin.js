var express = require("express");
var router = express.Router();
var multer = require("multer");
const Event = require("../controllers/admin/event");
const Schedule = require("../controllers/admin/schedule");
const Speker = require("../controllers/admin/spekers");
const Sponser = require("../controllers/admin/sponser");
const Gallery = require("../controllers/admin/Gallery");
const Dashboard = require("../controllers/admin/dashBoard");
const dashBoard = require("../controllers/admin/dashBoard");

// Multer Setup //
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      if(file.fieldname === 'photo'){
        return cb(null, "public/uploads/spekers");
      }else if(file.fieldname === 'sponserImg'){
        return cb(null, "public/uploads/sponsers");
      } else if(file.fieldname === 'images'){
        return cb(null, "public/uploads/gallery");
      } else {
        return cb(null, "public/uploads/gallery");
      }
    
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + "-" + file.originalname);
    },
  });

  const upload = multer({ storage: storage });

/* Event listing. */
router.post("/event", Event.createEvent);
router.get("/event", Event.getAllevent);
router.get("/event/:id", Event.getById);
router.put("/event/:id", Event.updateEvent);
router.delete("/event/:id", Event.deleteEvent);
router.patch("/event-status/:id", Event.chageStatus);

/* Schedule listing. */
router.post("/schedule/:id", Schedule.createSchedule);
router.put("/schedule/:id", Schedule.updateSchedule);
router.patch("/schedule-status/:id", Schedule.chageStatus);
router.get("/schedule/:id", Schedule.getById);
router.delete("/schedule/:id", Schedule.deleteSchedule);


/* Speker listing. */
router.post("/speker",upload.single('photo'), Speker.createSpeker);
router.get("/speker", Speker.getAllSpeker);
router.get("/speker/:id", Speker.getSpekersById);
router.delete("/speker/:id", Speker.deleteSpeker);
router.put("/speker/:id",upload.single('photo'), Speker.updateSpeker);
router.patch("/speker-status/:id", Speker.chageStatus);


/* Sponser listing. */
router.post('/sponsor', upload.single('sponserImg'), Sponser.createSponser )
router.get('/sponser', Sponser.getAllSponsers )
router.get('/sponsor/:id', Sponser.getSponserById )
router.delete('/sponser/:id', Sponser.deleteSponser )
router.put('/sponsor/:id',upload.single('sponserImg'), Sponser.updateSponsor )

/* Gallery listing. */
router.post('/gallery', upload.array('images'), Gallery.uploadFile )
router.get('/image', Gallery.getAllImage )
router.get('/video', Gallery.getVideos )
router.delete('/gallery/:id', Gallery.deleteFile )

/* Dash Board listing. */
router.get('/dashboard', dashBoard.getDashBoardDeatils)


module.exports = router;
