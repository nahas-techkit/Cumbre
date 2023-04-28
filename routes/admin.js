var express = require("express");
var router = express.Router();
var multer = require("multer");
const Event = require("../controllers/admin/event");
const Speker = require("../controllers/admin/spekers");
const Sponser = require("../controllers/admin/sponser");
const Gallery = require("../controllers/admin/Gallery");

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
router.get("/event", Event.getAllEvent);
router.get("/event/:id", Event.getEventById);
router.delete("/event/:id", Event.deleteEvent);
router.put("/event/:id", Event.editEvent);
router.patch("/event-status/:id", Event.chageStatus);

/* Speker listing. */
router.post("/speker",upload.single('photo'), Speker.createSpeker);
router.get("/speker", Speker.getAllSpeker);
router.get("/speker/:id", Speker.getSpekersById);


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




module.exports = router;
