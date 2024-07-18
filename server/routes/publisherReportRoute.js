const router = require("express").Router();
const publisherReportController = require("../controllers/publisherReportController");
const jwt = require('jsonwebtoken');
const Publisher = require("../models/publisher");

// Middleware to verify JWT
const verifyToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN
    // console.log(token)

    if (!token) return res.status(401).send({ message: "Access Denied: No token provided!", error: "Unauthorized" });

    try {
        const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY); // Verify the token
        let publisher = await Publisher.findOne({ user: decoded._id }).populate("user");
        if (!publisher) return res.status(403).send({ message: "You are not a registered publisher", error: "Forbidden" });
        req.user = publisher; // Add decoded user to request
        req.publisher = publisher;
        // console.log(decoded, publisher);
        // console.log(req.user);
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        return res.status(400).json({ message: 'Invalid Token' });
    }
};

// basic report overview
router.post("/signin", publisherReportController.signin);
router.post("/signup", publisherReportController.signup);
router.get("/dashboard", verifyToken, publisherReportController.getDashboard);
router.get("/report", verifyToken, publisherReportController.reports);
router.get("/report/range", verifyToken, publisherReportController.reportRangeDate);
router.get("/embed", verifyToken, publisherReportController.getEmbedCode);
router.get("/payouts", verifyToken, publisherReportController.getPayoutsDetails);

router.get("/settings", verifyToken, publisherReportController.getSettingDetails);
router.post("/settings/reset-password", verifyToken, publisherReportController.resetPassword);

module.exports = router;