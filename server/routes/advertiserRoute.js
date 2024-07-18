const express = require("express");
const router = express.Router();
const advertiserController = require("../controllers/advertiserController");
const Advertiser = require("../models/advertiser");
const jwt = require("jsonwebtoken");

const upload = require("../multerconfig");

// Middleware to verify JWT
const verifyToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN
    // console.log(token);

    if (!token) return res.status(401).send({ message: "Access Denied: No token provided!", error: "Unauthorized" });

    try {
        const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY); // Verify the token
        // console.log(decoded);
        let advertiser = await Advertiser.findOne({ user: decoded._id }).populate("user");
        if (!advertiser) {
            return res.status(403).send({ message: "You are not a registered advertiser.", error: "Forbidden" });
        }
        req.advertiser = advertiser

        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid Token.', error: "Unauthorized" });
    }
};

router.post("/signin", advertiserController.signin);
router.post("/signup", advertiserController.signup);

router.get("/dashboard", verifyToken, advertiserController.getDashboard);
router.get("/report", verifyToken, advertiserController.getReport);
router.get("/report/range", verifyToken, advertiserController.getReportRangeDate);

router.get("/settings", verifyToken, advertiserController.getSettingDetails);
router.post("/settings/reset-password", verifyToken, advertiserController.resetPassword);

router.get("/campaign", verifyToken, advertiserController.getAllCampaign);
router.post("/campaign", verifyToken, advertiserController.createCampaign);

router.get("/campaign/:campaignId", verifyToken, advertiserController.getCampaignDetails);
router.get("/campaign/:campaignId/report", verifyToken, advertiserController.getCampaignReport);
router.get("/campaign/:campaignId/report/range", verifyToken, advertiserController.getCampaignReportRangeDate);

router.get("/campaign/:campaignId/add-money", verifyToken, advertiserController.getAddMoneyDetails);
router.get("/campaign/:campaignId/add-money/getkey", verifyToken, advertiserController.getkey);
router.post("/campaign/:campaignId/add-money/checkout", verifyToken, advertiserController.adMoneyCheckout);
router.post("/campaign/:campaignId/add-money/verifysuccess", verifyToken, advertiserController.verifysuccess);
router.post("/campaign/:campaignId/add-money/verifyfailure", verifyToken, advertiserController.verifyfailure);

router.post("/campaign/:campaignId/create", verifyToken, upload.single('image'), advertiserController.createAd);
router.get("/campaign/:campaignId/:adId", verifyToken, advertiserController.getAdDetails);
router.get("/campaign/:campaignId/:adId/report", verifyToken, advertiserController.getAdReport);
router.get("/campaign/:campaignId/:adId/report/range", verifyToken, advertiserController.getAdReportRangeDate);
router.get("/campaign/:campaignId/:adId/home", verifyToken, advertiserController.getAdHomeDetails);
router.put("/campaign/:campaignId/:adId", verifyToken, upload.single('image'), advertiserController.editAdvertisement);

router.post("/campaign/:campaignId/:adId/markforreview", verifyToken, advertiserController.markforreview);

module.exports = router