const ApplyingReview = require("../models/applyingReview");
const Ad = require("../models/ad");
const User = require("../models/user");
const AdminReview = require("../models/adminReview");
const Publisher = require("../models/publisher");
const View = require("../models/view");
const Click = require("../models/click");
const Advertiser = require("../models/advertiser")
const AdminPublisherReview = require("../models/adminPublisherReview");
const AdminAdvertiserReview = require("../models/adminAdvertiserReview")

const bcrypt = require("bcrypt");
const joi = require("joi");
const passwordComplexity = require("joi-password-complexity");
const publisherAccountReject = require("../emails/publisherAccountReject");
const publisherAccountApprove = require("../emails/publisherAccountApprove");
const advertiserAccountApprove = require("../emails/advertiserAccountApprove");
const advertiserAccountReject = require("../emails/advertiserAccountReject");

module.exports.dashboard = async (req, res) => {
    try {
        // Get the current date and time
        const now = new Date();

        const startDate = new Date();
        startDate.setUTCDate(now.getUTCDate() - 7);
        startDate.setUTCHours(0, 0, 0, 0);

        const endDate = new Date();
        endDate.setUTCDate(now.getUTCDate() - 1);
        endDate.setUTCHours(23, 59, 59, 999);

        let views = await View.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: startDate,
                        $lte: endDate
                    }
                }
            },
            {
                $group: {
                    _id: {
                        $dateToString: {
                            format: "%d-%m-%Y",
                            date: "$createdAt"
                        }
                    },
                    totalViews: { $sum: 1 },
                    totalAdvertiserCost: { $sum: "$advertiser_cost" }
                }
            },
            {
                $sort: { _id: 1 }
            },
            {
                $group: {
                    _id: null,
                    days: { $push: { date: "$_id", totalViews: "$totalViews", totalAdvertiserCost: "$totalAdvertiserCost" } },
                    totalViews: { $sum: "$totalViews" },
                    totalAdvertiserCost: { $sum: "$totalAdvertiserCost" }
                }
            },
            {
                $project: {
                    _id: 0,
                    days: 1,
                    totalViews: 1,
                    totalAdvertiserCost: 1
                }
            }
        ])

        const clicks = await Click.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: startDate,
                        $lte: endDate
                    }
                }
            },
            {
                $group: {
                    _id: {
                        $dateToString: {
                            format: "%d-%m-%Y",
                            date: "$createdAt"
                        }
                    },
                    totalClicks: { $sum: 1 },
                    totalAdvertiserCost: { $sum: "$advertiser_cost" }
                }
            },
            {
                $sort: { _id: 1 }
            },
            {
                $group: {
                    _id: null,
                    days: { $push: { date: "$_id", totalClicks: "$totalClicks", totalAdvertiserCost: "$totalAdvertiserCost" } },
                    totalClicks: { $sum: "$totalClicks" },
                    totalAdvertiserCost: { $sum: "$totalAdvertiserCost" }
                }
            },
            {
                $project: {
                    _id: 0,
                    days: 1,
                    totalClicks: 1,
                    totalAdvertiserCost: 1
                }
            }
        ]);

        res.status(200).send({ views, clicks });
    } catch (error) {
        console.log("Error while fetching admin dashboard", error);
        res.status(500).send({ message: "Internal server error" });
    }
}

module.exports.report = async (req, res) => {
    try {
        const now = new Date();

        const startDate = new Date();
        startDate.setUTCDate(now.getUTCDate() - 30);
        startDate.setUTCHours(0, 0, 0, 0);

        const endDate = new Date();
        endDate.setUTCDate(now.getUTCDate() - 1);
        endDate.setUTCHours(23, 59, 59, 999);

        let views = await View.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: startDate,
                        $lte: endDate
                    }
                }
            },
            {
                $group: {
                    _id: {
                        $dateToString: {
                            format: "%d-%m-%Y",
                            date: "$createdAt"
                        }
                    },
                    totalViews: { $sum: 1 },
                }
            },
            {
                $sort: { _id: 1 }
            }
        ])

        const clicks = await Click.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: startDate,
                        $lte: endDate
                    }
                }
            },
            {
                $group: {
                    _id: {
                        $dateToString: {
                            format: "%d-%m-%Y",
                            date: "$createdAt"
                        }
                    },
                    totalClicks: { $sum: 1 },
                }
            },
            {
                $sort: { _id: 1 }
            }
        ]);

        // ========= combining views and clicks =========
        const combinedData = {};

        views.forEach(view => {
            combinedData[view._id] = {
                date: view._id,
                totalViews: view.totalViews,
                totalClicks: 0, // default to 0
            };
        });
        // console.log(combinedData)

        clicks.forEach(click => {
            if (combinedData[click._id]) {
                combinedData[click._id].totalClicks = click.totalClicks;
            } else {
                combinedData[click._id] = {
                    date: click._id,
                    totalViews: 0, // default to 0
                    totalClicks: click.totalClicks,
                };
            }
        });
        // console.log(combinedData)

        const dataArray = Object.entries(combinedData);
        dataArray.sort((a, b) => {
            const dateA = a[0].split('-').reverse().join('-'); // Convert 'dd-mm-yyyy' to 'yyyy-mm-dd'
            const dateB = b[0].split('-').reverse().join('-'); // Convert 'dd-mm-yyyy' to 'yyyy-mm-dd'
            return dateA.localeCompare(dateB);
        });
        const sortedData = Object.fromEntries(dataArray);

        const combinedArray = Object.values(sortedData);

        res.status(200).send({ data: combinedArray });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Internal server error" });
    }
}

module.exports.getReportRangeDate = async (req, res) => {
    const { startDate, endDate } = req.query;
    if (!startDate || !endDate) {
        return res.status(400).json({ error: 'startDate and endDate are required' });
    }
    try {
        let searchStartDate = new Date(startDate);
        let searchEndDate = new Date(endDate);
        searchEndDate.setUTCHours(23, 59, 59, 999);
        // console.log(searchStartDate, searchEndDate);

        let views = await View.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: searchStartDate,
                        $lte: searchEndDate
                    }
                }
            },
            {
                $group: {
                    _id: {
                        $dateToString: {
                            format: "%d-%m-%Y",
                            date: "$createdAt"
                        }
                    },
                    totalViews: { $sum: 1 },
                }
            },
            {
                $sort: { _id: 1 }
            }
        ])

        const clicks = await Click.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: searchStartDate,
                        $lte: searchEndDate
                    }
                }
            },
            {
                $group: {
                    _id: {
                        $dateToString: {
                            format: "%d-%m-%Y",
                            date: "$createdAt"
                        }
                    },
                    totalClicks: { $sum: 1 },
                }
            },
            {
                $sort: { _id: 1 }
            }
        ]);

        // ========= combining views and clicks =========
        const combinedData = {};

        views.forEach(view => {
            combinedData[view._id] = {
                date: view._id,
                totalViews: view.totalViews,
                totalClicks: 0, // default to 0
            };
        });
        // console.log(combinedData)

        clicks.forEach(click => {
            if (combinedData[click._id]) {
                combinedData[click._id].totalClicks = click.totalClicks;
            } else {
                combinedData[click._id] = {
                    date: click._id,
                    totalViews: 0, // default to 0
                    totalClicks: click.totalClicks,
                };
            }
        });
        // console.log(combinedData)

        const dataArray = Object.entries(combinedData);
        dataArray.sort((a, b) => {
            const dateA = a[0].split('-').reverse().join('-'); // Convert 'dd-mm-yyyy' to 'yyyy-mm-dd'
            const dateB = b[0].split('-').reverse().join('-'); // Convert 'dd-mm-yyyy' to 'yyyy-mm-dd'
            return dateA.localeCompare(dateB);
        });
        const sortedData = Object.fromEntries(dataArray);

        const combinedArray = Object.values(sortedData);

        res.status(200).send({ data: combinedArray });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Internal server error" });
    }
}

module.exports.getAllApplyingreviews = async (req, res) => {
    try {
        let applyingReviews = await ApplyingReview.find({ isOpen: true });
        res.status(200).send(applyingReviews);
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Internal server error" });
    }
}

module.exports.getApplyingreviews = async (req, res) => {
    try {
        const { reviewId } = req.params;
        let applyingReview = await ApplyingReview.findOne({ _id: reviewId });
        // console.log(applyingReview);
        res.status(200).send(applyingReview);
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Internal server error" });
    }
}

module.exports.saveReviewStatus = async (req, res) => {
    try {
        const { reviewId } = req.params;
        // console.log(req.body);

        let review = await ApplyingReview.findOne({ _id: reviewId });
        // console.log(review);

        let updatedAd = await Ad.findOneAndUpdate({ _id: review.adId }, {
            isRejected: req.body.isRejected,
            isApproved: req.body.isApproved,
            viewAdvertiserCost: Number(req.body.viewAdvertiserCost) / 1000,
            viewPublisherRevenue: Number(req.body.viewPublisherRevenue) / 1000,
            clickAdvertiserCost: Number(req.body.clickAdvertiserCost) / 1000,
            clickPublisherRevenue: Number(req.body.clickPublisherRevenue) / 1000,
            isReviewed: true,
        }, { new: true });
        // console.log(updatedAd);

        let newAdminReview = new AdminReview({
            ...req.body,
            reviewer: req.admin._id,
            applyingReview: review._id,
            adId: updatedAd._id,
            adInfo: updatedAd
        })
        // console.log(newAdminReview)
        await newAdminReview.save();

        await ApplyingReview.findOneAndUpdate({ _id: review._id }, { isOpen: false });

        res.status(200).send({ message: "Review Updated" });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Internal server error" });
    }
}

module.exports.getAllPendingAuthorizationPublisher = async (req, res) => {
    try {
        let newPublishers = await Publisher.aggregate([
            {
                $lookup: {
                    from: "users",
                    foreignField: "_id",
                    localField: "user",
                    as: "user"
                }
            },
            {
                $unwind: {
                    path: "$user"
                }
            },
            {
                $match: {
                    $and: [
                        {
                            isReviewed: false,
                        },
                        {
                            isActive: false
                        },
                        {
                            isApproved: false,
                        },
                        {
                            "user.is_email_verified": true
                        }
                    ]
                }
            }
        ])

        // also send need activation publisher
        let approvedPublishers = await Publisher.find({ isReviewed: true, isApproved: true, isActive: false }).populate("user");

        // rejected publishers
        let rejectedPublishers = await Publisher.find({ isReviewed: true, isApproved: false, isActive: false }).populate("user");

        res.status(200).send({ newPublishers, approvedPublishers, rejectedPublishers });
        // res.status(200).send({message: "Working"});
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Internal server error" });
    }
}

module.exports.getPendingAuthorizationPublisher = async (req, res) => {
    try {
        const { publisherId } = req.params;
        let publisher = await Publisher.findOne({ _id: publisherId }).populate("user");
        res.status(200).send({ publisher });
        // res.status(200).send({ message: "Working" });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Internal server error" });
    }
}

module.exports.savePublisherApprovalStatus = async (req, res) => {
    try {
        const { publisherId } = req.params;
        const { comments, isApproved } = req.body;
        // console.log(req.body);
        let publisher;

        if (comments === "") return res.status(400).send({ message: "Please enter a review comment" });
        if (isApproved) {
            // updating publisher
            publisher = await Publisher.findOneAndUpdate(
                {
                    _id: publisherId
                },
                {
                    isApproved: true,
                    isReviewed: true,
                    isActive: true
                }
            )
        } else {
            // updating publisher
            publisher = await Publisher.findOneAndUpdate(
                {
                    _id: publisherId
                },
                {
                    isApproved: false,
                    isReviewed: true,
                    isActive: false
                }
            )
        }

        let newAdminPublisherReview = new AdminPublisherReview({
            reviewer: req.admin._id,
            comments: comments,
            reviewDetails: {
                reviewFor: "Publisher Approval",
                publisherId,
                isApproved,
            }
        })
        await newAdminPublisherReview.save();

        const user = await User.findOne({
            _id: publisher.user
        })
        // Send email
        if (isApproved) {
            publisherAccountApprove(user.email, user.firstName).catch(err => console.log("Error while sending publisher account approval email", err))
        } else {
            publisherAccountReject(user.email, user.firstName).catch(err => console.log("Error while sending publisher account rejected email", err))
        }

        res.status(200).send({ message: "Review Updated" });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Internal server error" });
    }
}

module.exports.getActivationPublisher = async (req, res) => {
    try {
        const { publisherId } = req.params;
        let publisher = await Publisher.findOne({ _id: publisherId }).populate("user");
        // console.log(publisher);
        let approvalreview = await AdminPublisherReview.findOne({
            "reviewDetails.reviewFor": "Publisher Approval",
            "reviewDetails.publisherId": publisherId,
        })
        // console.log(approvalreview);
        res.status(200).send({ publisher, approvalreview });
        // res.status(200).send({ message: "Working" });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Internal server error" });
    }
}


module.exports.savePublisherActivationStatus = async (req, res) => {
    try {
        const { publisherId } = req.params;
        let { comments, isActive, isChecked } = req.body;

        await Publisher.findOneAndUpdate(
            {
                _id: publisherId
            },
            {
                isActive
            }
        )

        let newAdminPublisherReview = new AdminPublisherReview({
            reviewer: req.admin._id,
            comments: comments,
            reviewDetails: {
                reviewFor: "Publisher Activation",
                publisherId,
                isActive,
                isChecked,
            }
        })
        await newAdminPublisherReview.save();

        // Send email

        res.status(200).send({ message: "Activation Status Updated" });
        // res.status(200).send({ message: "Working" });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Internal server error" });
    }
}


module.exports.getAllPendingAuthorizationAdvertiser = async (req, res) => {
    try {
        // let newAdvertisers = await Advertiser.find({ isReviewed: false, isApproved: false, isActive: false }).populate("user");
        // console.log(newAdvertisers)

        let newAdvertisers = await Advertiser.aggregate([
            {
                $lookup: {
                    from: "users",
                    foreignField: "_id",
                    localField: "user",
                    as: "user"
                }
            },
            {
                $unwind: {
                    path: "$user"
                }
            },
            {
                $match: {
                    $and: [
                        {
                            isReviewed: false,
                        },
                        {
                            isActive: false
                        },
                        {
                            isApproved: false,
                        },
                        {
                            "user.is_email_verified": true
                        }
                    ]
                }
            }
        ])

        res.status(200).send({ newAdvertisers });
        // res.status(200).send({message: "Working"});
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Internal server error" });
    }
}

module.exports.getAdvertiserDetails = async (req, res) => {
    try {
        let { advertiserId } = req.params;
        let advertiser = await Advertiser.findOne({ _id: advertiserId }).populate("user");

        return res.status(200).send({ advertiser });
        // res.status(200).send({ message: "Working" });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Internal server error" });
    }
}

module.exports.saveAdvertiserReviewStatus = async (req, res) => {
    try {
        const { advertiserId } = req.params;
        const { comments, isApproved } = req.body;

        let advertiser;

        if (comments === "") return res.status(400).send({ message: "Please enter a review comment" });
        // console.log(isApproved)
        if (isApproved) {
            // updating advertiser
            advertiser = await Advertiser.findOneAndUpdate(
                {
                    _id: advertiserId
                },
                {
                    isApproved: true,
                    isReviewed: true,
                    isActive: true,
                }
            )
        } else {
            // updating advertiser
            advertiser = await Advertiser.findOneAndUpdate(
                {
                    _id: advertiserId
                },
                {
                    isApproved: false,
                    isReviewed: true,
                    isActive: false,
                }
            )
        }

        let newAdminAdvertiserReview = new AdminAdvertiserReview({
            reviewer: req.admin._id,
            comments: comments,
            reviewDetails: {
                reviewFor: "Advertiser Approval",
                advertiserId,
                isApproved,
            }
        })
        await newAdminAdvertiserReview.save();

        const user = await User.findOne({
            _id: advertiser.user
        })
        // Send email
        if (isApproved) {
            advertiserAccountApprove(user.email, user.firstName).catch(err => console.log("Error while sending advertiser account approval email", err))
        } else {
            advertiserAccountReject(user.email, user.firstName).catch(err => console.log("Error while sending advertiser account rejected email", err))
        }

        res.status(200).send({ message: "Review Updated" });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Internal server error" });
    }
}

module.exports.getSettingDetails = async (req, res) => {
    try {
        res.status(200).send({ message: "Working" });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Internal server error" });
    }
}

module.exports.resetPassword = async (req, res) => {
    try {
        let { currentPassword, newPassword } = req.body;
        if (currentPassword === "") {
            return res.status(400).send({ message: "Please enter current passwrd" });
        }
        if (newPassword === "") {
            return res.status(400).send({ message: "Please enter new passwrd" });
        }
        if (currentPassword === newPassword) {
            return res.status(400).send({ message: "Current password and new password can not be same" });
        }

        const validPassword = await bcrypt.compare(
            currentPassword, req.admin.user.password
        )
        // console.log(validPassword);
        if (!validPassword) return res.status(400).send({ message: 'Please enter correct password' });

        const complexityOptions = {
            min: 8,
            max: 20,
            lowerCase: 1,
            upperCase: 1,
            numeric: 1,
            symbol: 1,
            requirementCount: 4,
        };
        const passwordSchema = joi.object({
            newPassword: passwordComplexity(complexityOptions),
        });
        const { error } = passwordSchema.validate({ newPassword });
        if (error)
            return res.status(400).send({ message: error.details[0].message });

        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        await User.findOneAndUpdate(
            {
                _id: req.admin.user._id
            },
            {
                password: hashedPassword
            }
        )

        res.status(200).send({ message: "Password updated" });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Internal server error" });
    }
}