const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const Admin = require("../models/admin");
const jwt = require("jsonwebtoken");


// Middleware to verify JWT
const verifyToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN
    // console.log(token);

    if (!token) return res.status(401).send({ message: "Access Denied: No token provided!", error: "Unauthorized" });

    try {
        const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY); // Verify the token
        // console.log(decoded);
        let admin = await Admin.findOne({ user: decoded._id }).populate("user");
        if (!admin) {
            return res.status(403).send({ message: "You are not a registered admin.", error: "Forbidden" });
        }
        req.admin = admin;
        // console.log(req.admin);
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid Token.', error: "Unauthorized" });
    }
};

router.get("/dashboard", verifyToken, adminController.dashboard);
router.get("/report", verifyToken, adminController.report);
router.get("/report/range", verifyToken, adminController.getReportRangeDate);

router.get("/manage-ads", verifyToken, (req, res) => {
    res.status(200).send({ message: "manage ads" });
});

router.get("/settings", verifyToken, adminController.getSettingDetails);
router.post("/settings/reset-password", verifyToken, adminController.resetPassword);

router.get("/applying-reviews", verifyToken, adminController.getAllApplyingreviews);
router.get("/applying-reviews/:reviewId", verifyToken, adminController.getApplyingreviews);
router.post("/applying-reviews/:reviewId", verifyToken, adminController.saveReviewStatus);

router.get("/authorize-publishers", verifyToken, adminController.getAllPendingAuthorizationPublisher);
router.get("/authorize-publishers/:publisherId", verifyToken, adminController.getPendingAuthorizationPublisher);
router.post("/authorize-publishers/:publisherId", verifyToken, adminController.savePublisherApprovalStatus);
router.get("/authorize-publishers/:publisherId/activate", verifyToken, adminController.getActivationPublisher);
router.post("/authorize-publishers/:publisherId/activate", verifyToken, adminController.savePublisherActivationStatus);

router.get("/authorize-advertisers", verifyToken, adminController.getAllPendingAuthorizationAdvertiser)
router.get("/authorize-advertisers/:advertiserId", verifyToken, adminController.getAdvertiserDetails)
router.post("/authorize-advertisers/:advertiserId/review", verifyToken, adminController.saveAdvertiserReviewStatus)

module.exports = router;