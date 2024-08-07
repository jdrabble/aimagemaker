const express = require("express");
const router = express.Router();
const imagesCtrl = require("../../controllers/api/images");
const ensureLoggedIn = require("../../config/ensureLoggedIn");

router.post("/makeimage", ensureLoggedIn, imagesCtrl.makeImage);
router.get("/images", ensureLoggedIn, imagesCtrl.getAllImages);
router.get("/image/:id", ensureLoggedIn, imagesCtrl.getImage);
router.delete("/image/:id", ensureLoggedIn, imagesCtrl.deleteImage);
router.get("/searchimages/", ensureLoggedIn, imagesCtrl.searchImages);
router.post("/rating/:id", ensureLoggedIn, imagesCtrl.rateImage);

module.exports = router;
