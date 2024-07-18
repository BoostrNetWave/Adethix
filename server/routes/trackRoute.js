const router = require("express").Router();
const trackController = require("../controllers/trackController");

// getting an ad
router.get("/getad", trackController.getAdFunction);

// saving views to db
router.post("/views", trackController.saveViewsDetails);

// saving clicks to db and redirect to original page
// saving clicks to db
router.post("/clicks", trackController.saveClicksDetails);


module.exports = router;