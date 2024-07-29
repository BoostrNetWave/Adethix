const mongoose = require('mongoose');
const Ad = require("../models/ad");
const Campaign = require("../models/campaign");
const View = require("../models/view");
const Click = require("../models/click");
const ApplyingReview = require('../models/applyingReview.js');
const Advertiser = require('../models/advertiser.js');
const User = require("../models/user");
const Payment = require("../models/payment.js")

const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const Razorpay = require('razorpay');
const crypto = require('crypto');

const ShortUniqueId = require('short-unique-id');

module.exports.getDashboard = async (req, res) => {
    try {
        let createdAds = await Ad.aggregate([
            {
                $match: {
                    creator: req.advertiser._id
                }
            },
            {
                $group: {
                    _id: null,
                    ads: { $push: "$_id" }
                }
            }
        ])
        // console.log(createdAds)
        let ads = createdAds[0].ads;
        // console.log(ads);

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
                    $and: [
                        {
                            ad: {
                                $in: ads
                            }
                        },
                        {
                            createdAt: {
                                $gte: startDate,
                                $lte: endDate
                            }
                        }
                    ]
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
                    totalViews: { "$sum": 1 },
                    totalAdvertiserCost: { "$sum": "$advertiser_cost" }
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
        // console.log(views);
        // console.log(views.length);

        const clicks = await Click.aggregate([
            {
                $match: {
                    $and: [
                        {
                            ad: {
                                $in: ads
                            }
                        },
                        {
                            createdAt: {
                                $gte: startDate,
                                $lte: endDate
                            }
                        }
                    ]
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
                    totalClicks: { "$sum": 1 },
                    totalAdvertiserCost: { "$sum": "$advertiser_cost" }
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
        // console.log(clicks)
        // console.log(clicks[0].days)

        res.status(200).send({ views, clicks });
    } catch (err) {
        // console.log(err)
        res.status(500).send({ message: "Internal server error" });
    }
}

module.exports.getReport = async (req, res) => {
    try {
        // finding ads that are created by the advertiser
        let createdAds = await Ad.aggregate([
            {
                $match: {
                    creator: req.advertiser._id
                }
            },
            {
                $group: {
                    _id: null,
                    ads: { $push: "$_id" }
                }
            }
        ])
        let ads = createdAds[0].ads;


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
                    $and: [
                        {
                            ad: {
                                $in: ads
                            }
                        },
                        {
                            createdAt: {
                                $gte: startDate,
                                $lte: endDate
                            }
                        }
                    ]
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
                    totalViews: { "$sum": 1 },
                    totalAdvertiserCost: { "$sum": "$advertiser_cost" }
                }
            },
            {
                $sort: { _id: 1 }
            }
        ])
        // console.log(views);
        // console.log(views.length);

        const clicks = await Click.aggregate([
            {
                $match: {
                    $and: [
                        {
                            ad: {
                                $in: ads
                            }
                        },
                        {
                            createdAt: {
                                $gte: startDate,
                                $lte: endDate
                            }
                        }
                    ]
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
                    totalClicks: { "$sum": 1 },
                    totalAdvertiserCost: { "$sum": "$advertiser_cost" }
                }
            },
            {
                $sort: { _id: 1 }
            }
        ]);
        // console.log(clicks)
        // console.log(clicks[0].days)


        // ========= combining views and clicks =========
        const combinedData = {};

        views.forEach(view => {
            combinedData[view._id] = {
                date: view._id,
                totalViews: view.totalViews,
                totalClicks: 0, // default to 0
                totalAdvertiserCost: view.totalAdvertiserCost
            };
        });
        // console.log(combinedData)

        clicks.forEach(click => {
            if (combinedData[click._id]) {
                combinedData[click._id].totalClicks = click.totalClicks;
                combinedData[click._id].totalAdvertiserCost += click.totalAdvertiserCost;
            } else {
                combinedData[click._id] = {
                    date: click._id,
                    totalViews: 0, // default to 0
                    totalClicks: click.totalClicks,
                    totalAdvertiserCost: click.totalAdvertiserCost
                };
            }
        });
        // console.log(combinedData)

        // ========= sorting according to date =========

        // Convert the object to an array of entries
        const dataArray = Object.entries(combinedData);

        // Sort the array based on the date
        dataArray.sort((a, b) => {
            const dateA = a[0].split('-').reverse().join('-'); // Convert 'dd-mm-yyyy' to 'yyyy-mm-dd'
            const dateB = b[0].split('-').reverse().join('-'); // Convert 'dd-mm-yyyy' to 'yyyy-mm-dd'
            return dateA.localeCompare(dateB);
        });

        // Convert the sorted array back to an object
        const sortedData = Object.fromEntries(dataArray);

        // ========= sorting according to date =========

        // Convert the combined data map to an array
        const combinedArray = Object.values(sortedData);

        // console.log(combinedArray);
        // ========= combining views and clicks =========

        res.status(200).send({ data: combinedArray });
    } catch (err) {
        res.status(500).send({ message: "Internal server error" });
    }
}

module.exports.getReportRangeDate = async (req, res) => {
    const { startDate, endDate } = req.query;
    if (!startDate || !endDate) {
        return res.status(400).json({ error: 'startDate and endDate are required' });
    }
    try {
        // finding ads that are created by the advertiser
        let createdAds = await Ad.aggregate([
            {
                $match: {
                    creator: req.advertiser._id
                }
            },
            {
                $group: {
                    _id: null,
                    ads: { $push: "$_id" }
                }
            }
        ])
        let ads = createdAds[0].ads;
        // console.log(ads);

        let searchStartDate = new Date(startDate);
        let searchEndDate = new Date(endDate);
        searchEndDate.setUTCHours(23, 59, 59, 999);
        // console.log(searchStartDate, searchEndDate);

        let views = await View.aggregate([
            {
                $match: {
                    $and: [
                        {
                            ad: {
                                $in: ads
                            }
                        },
                        {
                            createdAt: {
                                $gte: searchStartDate,
                                $lte: searchEndDate
                            }
                        }
                    ]
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
                    totalViews: { "$sum": 1 },
                    totalAdvertiserCost: { "$sum": "$advertiser_cost" }
                }
            },
            {
                $sort: { _id: 1 }
            }
        ])
        // console.log(views);
        // console.log(views.length);

        const clicks = await Click.aggregate([
            {
                $match: {
                    $and: [
                        {
                            ad: {
                                $in: ads
                            }
                        },
                        {
                            createdAt: {
                                $gte: searchStartDate,
                                $lte: searchEndDate
                            }
                        }
                    ]
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
                    totalClicks: { "$sum": 1 },
                    totalAdvertiserCost: { "$sum": "$advertiser_cost" }
                }
            },
            {
                $sort: { _id: 1 }
            }
        ]);
        // console.log(clicks)
        // console.log(clicks[0].days)

        // ========= combining views and clicks =========
        const combinedData = {};

        views.forEach(view => {
            combinedData[view._id] = {
                date: view._id,
                totalViews: view.totalViews,
                totalClicks: 0, // default to 0
                totalAdvertiserCost: view.totalAdvertiserCost
            };
        });
        // console.log(combinedData)

        clicks.forEach(click => {
            if (combinedData[click._id]) {
                combinedData[click._id].totalClicks = click.totalClicks;
                combinedData[click._id].totalAdvertiserCost += click.totalAdvertiserCost;
            } else {
                combinedData[click._id] = {
                    date: click._id,
                    totalViews: 0, // default to 0
                    totalClicks: click.totalClicks,
                    totalAdvertiserCost: click.totalAdvertiserCost
                };
            }
        });
        // console.log(combinedData)

        // ========= sorting according to date =========

        // Convert the object to an array of entries
        const dataArray = Object.entries(combinedData);

        // Sort the array based on the date
        dataArray.sort((a, b) => {
            const dateA = a[0].split('-').reverse().join('-'); // Convert 'dd-mm-yyyy' to 'yyyy-mm-dd'
            const dateB = b[0].split('-').reverse().join('-'); // Convert 'dd-mm-yyyy' to 'yyyy-mm-dd'
            return dateA.localeCompare(dateB);
        });

        // Convert the sorted array back to an object
        const sortedData = Object.fromEntries(dataArray);

        // ========= sorting according to date =========

        // Convert the combined data map to an array
        const combinedArray = Object.values(sortedData);

        // console.log(combinedArray);
        // ========= combining views and clicks =========

        res.status(200).send({ data: combinedArray });
    } catch (err) {
        res.status(500).send({ message: "Internal server error" });
    }
}

module.exports.getAllCampaign = async (req, res) => {
    try {
        let campaigns = await Campaign.find({ creator: req.advertiser._id });
        // console.log("campaigns", campaigns);
        res.status(200).send({ campaigns });
    } catch (err) {
        res.status(500).send({ message: "Internal server error" });
    }
}

module.exports.createCampaign = async (req, res) => {
    try {

        // console.log(req.body);
        let newCampaign = new Campaign({
            name: req.body.name,
            creator: req.advertiser._id,
            topics: req.body.topics,
            expectedBudget: req.body.expectedBudget,
        })
        let createdCampaign = await newCampaign.save();
        // console.log("createdcampaign : ", createdCampaign);
        res.status(201).send({ createdCampaign, message: "Campiagn created!" });
    } catch (err) {
        res.status(500).send({ message: "Internal server error" });
    }
}

// total clicks, views and spend upto the previous day
module.exports.getCampaignDetails = async (req, res) => {
    try {
        const { campaignId } = req.params;

        // finding ads that are created by the advertiser under that campaign
        let createdAds = await Ad.aggregate([
            {
                $match: {
                    $and: [
                        {
                            creator: req.advertiser._id
                        },
                        {
                            campaign: new mongoose.Types.ObjectId(campaignId)
                        }
                    ]
                }
            },
            {
                $group: {
                    _id: null,
                    ads: { $push: "$_id" }
                }
            }
        ])
        // console.log(createdAds)
        let ads = createdAds[0]?.ads;
        if (!ads) ads = [];
        // console.log(ads)

        const now = new Date();

        // const startDate = new Date();
        // startDate.setUTCDate(now.getUTCDate() - 30);
        // startDate.setUTCHours(0, 0, 0, 0);

        const endDate = new Date();
        endDate.setUTCDate(now.getUTCDate() - 1);
        endDate.setUTCHours(23, 59, 59, 999);

        let views = await View.aggregate([
            {
                $match: {
                    $and: [
                        {
                            ad: {
                                $in: ads
                            }
                        },
                        {
                            createdAt: {
                                $lte: endDate
                            }
                        }
                    ]
                }
            },
            {
                $addFields: {
                    adString: { $toString: "$ad" }
                }
            },
            {
                $group: {
                    _id: "$adString",
                    totalViews: { "$sum": 1 },
                    totalAdvertiserCost: { "$sum": "$advertiser_cost" }
                }
            },
            {
                $sort: { _id: 1 }
            }
        ])
        // console.log(views);
        // console.log(views.length);

        const clicks = await Click.aggregate([
            {
                $match: {
                    $and: [
                        {
                            ad: {
                                $in: ads
                            }
                        },
                        {
                            createdAt: {
                                $lte: endDate
                            }
                        }
                    ]
                }
            },
            {
                $addFields: {
                    adString: { $toString: "$ad" }
                }
            },
            {
                $group: {
                    _id: "$adString",
                    totalClicks: { "$sum": 1 },
                    totalAdvertiserCost: { "$sum": "$advertiser_cost" }
                }
            },
            {
                $sort: { _id: 1 }
            }
        ]);
        // console.log(clicks)
        // console.log(clicks.length)


        // // ========= combining views and clicks =========
        const combinedData = {};

        let totalViewsCost = 0;
        views.forEach(view => {
            combinedData[view._id] = {
                adId: view._id,
                totalViews: view.totalViews,
                totalClicks: 0, // default to 0
                totalViewsCost: view.totalAdvertiserCost,
                totalAdvertiserCost: view.totalAdvertiserCost
            };
            totalViewsCost += view.totalAdvertiserCost
        });
        // console.log(combinedData)
        // console.log(totalViewsCost);

        clicks.forEach(click => {
            if (combinedData[click._id]) {
                combinedData[click._id].totalClicks = click.totalClicks;
                combinedData[click._id].totalAdvertiserCost += click.totalAdvertiserCost;
            } else {
                combinedData[click._id] = {
                    adId: click._id,
                    totalViews: 0, // default to 0
                    totalViewsCost: 0, // default to 0
                    totalClicks: click.totalClicks,
                    totalAdvertiserCost: click.totalAdvertiserCost
                };
            }
        });
        // console.log(combinedData)

        // if for any ad there is no data then for that ad setting data
        ads.forEach((ad, idx) => {
            // console.log(ad.toString())
            if (!combinedData[ad.toString()]) {
                combinedData[ad.toString()] = {
                    adId: ad.toString(),
                    totalViews: 0,
                    totalViewsCost: 0,
                    totalClicks: 0,
                    totalAdvertiserCost: 0
                }
            }
        })
        // console.log(combinedData)

        // All ads combined views, clicks and spend
        let combinedDataArray = Object.values(combinedData);
        // console.log(combinedDataArray);

        let campaignInfo = {
            totalViews: 0,
            totalClicks: 0,
            totalAdvertiserCost: 0,
            totalViewsCost
        }

        combinedDataArray.forEach((info, idx) => {
            campaignInfo.totalViews += info.totalViews;
            campaignInfo.totalClicks += info.totalClicks;
            campaignInfo.totalAdvertiserCost += info.totalAdvertiserCost;
        })

        // console.log(campaignInfo)

        let campaign = await Campaign.findOne({ creator: req.advertiser._id, _id: campaignId });
        // console.log(campaign);
        let advertisements = await Ad.find({ campaign: campaign, creator: req.advertiser._id });
        // console.log(advertisements);
        res.status(200).send({ campaign, ads: advertisements, adInfo: combinedData, campaignInfo });
    } catch (err) {
        // console.log(err)
        res.status(500).send({ message: "Internal server error" });
    }
}

// total clicks, views and spend upto the previous day for 15 days - day wise
module.exports.getCampaignReport = async (req, res) => {
    try {
        const { campaignId } = req.params;

        // finding ads that are created by the advertiser under that campaign
        let createdAds = await Ad.aggregate([
            {
                $match: {
                    $and: [
                        {
                            creator: req.advertiser._id
                        },
                        {
                            campaign: new mongoose.Types.ObjectId(campaignId)
                        }
                    ]
                }
            },
            {
                $group: {
                    _id: null,
                    ads: { $push: "$_id" }
                }
            }
        ])
        // console.log(createdAds)
        let ads = createdAds[0]?.ads;
        if (!ads) ads = [];
        // console.log(ads)

        const now = new Date();

        const startDate = new Date();
        startDate.setUTCDate(now.getUTCDate() - 15);
        startDate.setUTCHours(0, 0, 0, 0);

        const endDate = new Date();
        endDate.setUTCDate(now.getUTCDate() - 1);
        endDate.setUTCHours(23, 59, 59, 999);

        let views = await View.aggregate([
            {
                $match: {
                    $and: [
                        {
                            ad: {
                                $in: ads
                            }
                        },
                        {
                            createdAt: {
                                $gte: startDate,
                                $lte: endDate
                            }
                        }
                    ]
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
                    totalViews: { "$sum": 1 },
                    totalAdvertiserCost: { "$sum": "$advertiser_cost" }
                }
            },
            {
                $sort: { _id: 1 }
            }
        ])
        // console.log(views);
        // console.log(views.length);

        const clicks = await Click.aggregate([
            {
                $match: {
                    $and: [
                        {
                            ad: {
                                $in: ads
                            }
                        },
                        {
                            createdAt: {
                                $gte: startDate,
                                $lte: endDate
                            }
                        }
                    ]
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
                    totalClicks: { "$sum": 1 },
                    totalAdvertiserCost: { "$sum": "$advertiser_cost" }
                }
            },
            {
                $sort: { _id: 1 }
            }
        ]);
        // console.log(clicks)
        // console.log(clicks.length)


        // ========= combining views and clicks =========
        // Create a combined map with default values
        const combinedData = {};

        // Add views to combined data
        views.forEach(view => {
            combinedData[view._id] = {
                date: view._id,
                totalViews: view.totalViews,
                totalClicks: 0, // default to 0
                totalAdvertiserCost: view.totalAdvertiserCost
            };
        });
        // console.log(combinedData)

        // Add clicks to combined data
        clicks.forEach(click => {
            if (combinedData[click._id]) {
                combinedData[click._id].totalClicks = click.totalClicks;
                combinedData[click._id].totalAdvertiserCost += click.totalAdvertiserCost;
            } else {
                combinedData[click._id] = {
                    date: click._id,
                    totalViews: 0, // default to 0
                    totalClicks: click.totalClicks,
                    totalAdvertiserCost: click.totalAdvertiserCost
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

        // console.log(combinedArray);

        let totalReportInfo = {
            totalViews: 0,
            totalClicks: 0,
            totalAdvertiserCost: 0,
            totalViewsCost: 0
        }

        combinedArray.forEach((info, idx) => {
            totalReportInfo.totalViews += info.totalViews;
            totalReportInfo.totalClicks += info.totalClicks;
            totalReportInfo.totalAdvertiserCost += info.totalAdvertiserCost;
        })

        // console.log(totalReportInfo)
        // ========= combining views and clicks =========

        let campaign = await Campaign.findOne({ creator: req.advertiser._id, _id: campaignId });
        let advertisements = await Ad.find({ campaign: campaign, creator: req.advertiser._id });
        res.status(200).send({ campaign, ads: advertisements, reportInfo: combinedArray, totalReportInfo });
    } catch (err) {
        console.log(err)
        res.status(500).send({ message: "Internal server error" });
    }
}

// total clicks, views and spend upto the previous day for 15 days - day wise
module.exports.getCampaignReportRangeDate = async (req, res) => {
    const { startDate, endDate } = req.query;
    if (!startDate || !endDate) {
        return res.status(400).json({ error: 'startDate and endDate are required' });
    }
    try {
        const { campaignId } = req.params;

        // finding ads that are created by the advertiser under that campaign
        let createdAds = await Ad.aggregate([
            {
                $match: {
                    $and: [
                        {
                            creator: req.advertiser._id
                        },
                        {
                            campaign: new mongoose.Types.ObjectId(campaignId)
                        }
                    ]
                }
            },
            {
                $group: {
                    _id: null,
                    ads: { $push: "$_id" }
                }
            }
        ])
        // console.log(createdAds)
        let ads = createdAds[0]?.ads;
        if (!ads) ads = [];
        // console.log(ads)

        let searchStartDate = new Date(startDate);
        let searchEndDate = new Date(endDate);
        searchEndDate.setUTCHours(23, 59, 59, 999);
        // console.log(searchStartDate, searchEndDate);

        let views = await View.aggregate([
            {
                $match: {
                    $and: [
                        {
                            ad: {
                                $in: ads
                            }
                        },
                        {
                            createdAt: {
                                $gte: searchStartDate,
                                $lte: searchEndDate
                            }
                        }
                    ]
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
                    totalViews: { "$sum": 1 },
                    totalAdvertiserCost: { "$sum": "$advertiser_cost" }
                }
            },
            {
                $sort: { _id: 1 }
            }
        ])
        // console.log(views);
        // console.log(views.length);

        const clicks = await Click.aggregate([
            {
                $match: {
                    $and: [
                        {
                            ad: {
                                $in: ads
                            }
                        },
                        {
                            createdAt: {
                                $gte: searchStartDate,
                                $lte: searchEndDate
                            }
                        }
                    ]
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
                    totalClicks: { "$sum": 1 },
                    totalAdvertiserCost: { "$sum": "$advertiser_cost" }
                }
            },
            {
                $sort: { _id: 1 }
            }
        ]);
        // console.log(clicks)
        // console.log(clicks.length)


        // ========= combining views and clicks =========
        // Create a combined map with default values
        const combinedData = {};

        // Add views to combined data
        views.forEach(view => {
            combinedData[view._id] = {
                date: view._id,
                totalViews: view.totalViews,
                totalClicks: 0, // default to 0
                totalAdvertiserCost: view.totalAdvertiserCost
            };
        });
        // console.log(combinedData)

        // Add clicks to combined data
        clicks.forEach(click => {
            if (combinedData[click._id]) {
                combinedData[click._id].totalClicks = click.totalClicks;
                combinedData[click._id].totalAdvertiserCost += click.totalAdvertiserCost;
            } else {
                combinedData[click._id] = {
                    date: click._id,
                    totalViews: 0, // default to 0
                    totalClicks: click.totalClicks,
                    totalAdvertiserCost: click.totalAdvertiserCost
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

        // console.log(combinedArray);

        let totalReportInfo = {
            totalViews: 0,
            totalClicks: 0,
            totalAdvertiserCost: 0
        }

        combinedArray.forEach((info, idx) => {
            totalReportInfo.totalViews += info.totalViews;
            totalReportInfo.totalClicks += info.totalClicks;
            totalReportInfo.totalAdvertiserCost += info.totalAdvertiserCost;
        })

        // console.log(totalReportInfo)
        // ========= combining views and clicks =========

        // console.log(combinedArray);

        res.status(200).send({ reportInfo: combinedArray, totalReportInfo });
    } catch (err) {
        // console.log(err)
        res.status(500).send({ message: "Internal server error" });
    }
}

module.exports.createAd = async (req, res) => {
    try {
        const { campaignId } = req.params;
        // console.log(campaignId);
        function stringToBoolean(str) {
            return str.toLowerCase() === 'true';
        }
        if ((stringToBoolean(req.body.options.image) || stringToBoolean(req.body.options.sidebar) || stringToBoolean(req.body.options.custom)) && !req.file) {
            return res.status(400).send({ message: "Image file not present! Choose a image." });
        }

        let newAd = new Ad({
            ...req.body,
            creator: req.advertiser._id,
            campaign: campaignId,
            image: {
                filename: req?.file?.filename,
                url: req?.file?.path ? `${process.env.BACKEND_URL}/image/upload/${req.file.filename}` : ''
            }
        });
        let createdAd = await newAd.save();
        // console.log(createdAd)
        res.status(201).send({ message: "New ad created succesfully" });
    } catch (err) {
        console.log(err)
        res.status(500).send({ message: "Internal server error" });
    }
}

module.exports.createvideoad = async (req, res) => {
    try {
        const { campaignId } = req.params;

        if (req.body.name === "" || req.body.linkUrl === "") {
            return res.status(400).send({ message: "Please fill all the fields." });
        } else if (!req.file) {
            return res.status(400).send({ message: "Please select a video." });
        }

        let newAd = new Ad({
            ...req.body,
            creator: req.advertiser._id,
            campaign: campaignId,
            video: {
                filename: req?.file?.filename,
                url: req?.file?.path ? `${process.env.BACKEND_URL}/video/upload/${req.file.filename}` : ''
            },
            options: { image: false, textOnly: false, sidebar: false, custom: false },
        });

        let createdAd = await newAd.save();
        // console.log(createdAd)
        res.status(201).send({ message: "New ad created succesfully" });
    } catch (err) {
        console.log(err)
        res.status(500).send({ message: "Internal server error" });
    }
}


module.exports.getAdDetails = async (req, res) => {
    try {
        const { campaignId, adId } = req.params;
        // console.log(campaignId, adId);
        let ad = await Ad.findOne({ creator: req.advertiser._id, _id: adId, campaign: campaignId }).populate('campaign');
        if (!ad) return res.status(400).send({ message: "Ad not found" });
        // console.log(ad)
        res.status(200).send(ad);
    } catch (err) {
        res.status(500).send({ message: "Internal server error" });
    }
}

module.exports.editAdvertisement = async (req, res) => {
    try {
        const { campaignId, adId } = req.params;
        let ad = await Ad.findOne({ _id: adId });
        console.log(ad);
        console.log(req.body);
        console.log(req.file);
        ad.image.filename = req.file.filename;
        ad.image.url = req.file.path;
        // ad = {...ad, image: {filename: req.file.filename, url: req.file.path}};
        console.log("ad after adding file", ad);
        let updatedAD = await ad.save();
        console.log("ad after updation", updatedAD);
        // function stringToBoolean(str) {
        //     return str.toLowerCase() === 'true';
        // }
        // if ((stringToBoolean(req.body.options.image) || stringToBoolean(req.body.options.sidebar) || stringToBoolean(req.body.options.custom)) && !req.file) {
        //     return res.status(400).send({ message: "File not present" });
        // }

        // if ((stringToBoolean(req.body.options.image) || stringToBoolean(req.body.options.sidebar) || stringToBoolean(req.body.options.custom)) && req.file && ad.image.filename) {
        //     // delete assest first
        //     await cloudinary.uploader.destroy(ad.image.filename);
        //     ad.image.filename = req.file.filename;
        //     ad.image.url = req.file.path;
        //     ad = { ...ad, ...req.body };
        //     await ad.save();
        //     return res.status(200).send({ message: "Ad updated successfully" });
        // }
        // if ((stringToBoolean(req.body.options.image) || stringToBoolean(req.body.options.sidebar) || stringToBoolean(req.body.options.custom)) && req.file && !ad.image.filename) {
        //     ad.image.filename = req.file.filename;
        //     ad.image.url = req.file.path;
        //     ad = { ...ad, ...req.body };
        //     await ad.save();
        //     return res.status(200).send({ message: "Ad updated successfully" });
        // }

        // if (!stringToBoolean(req.body.options.image) && !stringToBoolean(req.body.options.sidebar) && !stringToBoolean(req.body.options.custom) && stringToBoolean(req.body.options.textOnly)) {
        //     if (ad.image.filename) {
        //         await cloudinary.uploader.destroy(ad.image.filename);
        //         ad.image.filename = null;
        //         ad.image.url = null;
        //         ad = { ...ad, ...req.body };
        //         await ad.save();
        //         return res.status(200).send({ message: "Ad updated successfully" });
        //     } else {
        //         ad.image.filename = null;
        //         ad.image.url = null;
        //         ad = { ...ad, ...req.body };
        //         await ad.save();
        //         return res.status(200).send({ message: "Ad updated successfully" });
        //     }
        // }

        res.status(200).send({ message: "Ad updated successfully" });
    } catch (err) {
        // console.log(err);
        res.status(500).send({ message: "Internal server error" });
    }
}

module.exports.markforreview = async (req, res) => {
    try {
        const { campaignId, adId } = req.params;
        // console.log(req.body);

        let newApplyingReview = new ApplyingReview({
            creator: req.advertiser._id,
            adId: adId,
            adInfo: { ...req.body }
        });
        // console.log("applying review",newApplyingReview);
        await newApplyingReview.save();

        let updatedAd = await Ad.findOneAndUpdate({ _id: adId }, { markForReview: true }, { new: true });
        // console.log("updated ad",updatedAd);
        res.status(200).send({ message: "Marked for review", updatedAd });
    } catch (err) {
        res.status(500).send({ message: "Internal server error" });
    }
}


module.exports.signin = async (req, res) => {
    try {
        // console.log(req.body);

        const { error } = validateSigninData(req.body);
        // console.log(error);
        if (error)
            return res.status(400).send({ message: error.details[0].message });

        const user = await User.findOne({ email: req.body.email });
        // console.log(user);

        if (!user) return res.status(400).send({ message: 'Invalid email or password.' });

        // // ----------- checking password match or not ----------- 
        const validPassword = await bcrypt.compare(
            req.body.password, user.password
        )
        // console.log(validPassword);
        if (!validPassword) return res.status(400).send({ message: 'Invalid email or password.' });

        let advertiser = await Advertiser.findOne({ user: user._id });
        if (!advertiser) {
            return res.status(403).send({ message: "You are not a registered advertiser.", error: "Forbidden" });
        }

        // after successfull login creating jwt token
        const token = user.generateAuthToken();
        // console.log(token);

        return res.status(200).send({ message: "Logged in successfully", token: token });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: "Internal server error" });
    }
}

// validating data
const validateSigninData = (data) => {
    const schema = joi.object({
        email: joi.string().email().required().label("email"),
        password: passwordComplexity().required().label("password"),
    });
    return schema.validate(data);
}

module.exports.getAdHomeDetails = async (req, res) => {
    try {
        const { campaignId, adId } = req.params;
        // console.log(campaignId, adId);

        let ad = await Ad.findOne({ creator: req.advertiser._id, _id: adId, campaign: campaignId }).populate('campaign');
        if (!ad) return res.status(400).send({ message: "Ad not found" });
        // console.log(ad);

        const now = new Date();

        const endDate = new Date();
        endDate.setUTCDate(now.getUTCDate() - 1);
        endDate.setUTCHours(23, 59, 59, 999);

        let views = await View.aggregate([
            {
                $match: {
                    $and: [
                        {
                            ad: ad._id
                        },
                        {
                            createdAt: {
                                $lte: endDate
                            }
                        }
                    ]
                }
            },
            {
                $group: {
                    _id: "$ad",
                    totalViews: { "$sum": 1 },
                    totalAdvertiserCost: { "$sum": "$advertiser_cost" }
                }
            },
            {
                $sort: { _id: 1 }
            }
        ])
        // console.log(views);
        // console.log(views.length);

        const clicks = await Click.aggregate([
            {
                $match: {
                    $and: [
                        {
                            ad: ad._id
                        },
                        {
                            createdAt: {
                                $lte: endDate
                            }
                        }
                    ]
                }
            },
            {
                $group: {
                    _id: "$ad",
                    totalClicks: { "$sum": 1 },
                    totalAdvertiserCost: { "$sum": "$advertiser_cost" }
                }
            },
            {
                $sort: { _id: 1 }
            }
        ]);
        // console.log(clicks)
        // console.log(clicks.length)

        const adInfo = {
            _id: views[0]?._id || adId,
            totalViews: views[0]?.totalViews || 0,
            totalViewsCost: views[0]?.totalAdvertiserCost || 0,
            totalClicks: clicks[0]?.totalClicks || 0,
            totalAdvertiserCost: (views[0]?.totalAdvertiserCost + clicks[0]?.totalAdvertiserCost) || 0,
        }

        // console.log(adInfo);

        res.status(200).send({ ad, adInfo });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Internal server error" });
    }
}

// advertisement report for 15 days
module.exports.getAdReport = async (req, res) => {
    try {
        const { campaignId, adId } = req.params;

        let ad = await Ad.findOne({ creator: req.advertiser._id, _id: adId, campaign: campaignId }).populate('campaign');
        if (!ad) return res.status(400).send({ message: "Ad not found" });
        // console.log(ad);

        const now = new Date();

        const startDate = new Date();
        startDate.setUTCDate(now.getUTCDate() - 15);
        startDate.setUTCHours(0, 0, 0, 0);

        const endDate = new Date();
        endDate.setUTCDate(now.getUTCDate() - 1);
        endDate.setUTCHours(23, 59, 59, 999);

        let views = await View.aggregate([
            {
                $match: {
                    $and: [
                        {
                            ad: ad._id
                        },
                        {
                            createdAt: {
                                $gte: startDate,
                                $lte: endDate
                            }
                        }
                    ]
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
                    totalViews: { "$sum": 1 },
                    totalAdvertiserCost: { "$sum": "$advertiser_cost" }
                }
            },
            {
                $sort: { _id: 1 }
            }
        ])
        // console.log(views);
        // console.log(views.length);

        const clicks = await Click.aggregate([
            {
                $match: {
                    $and: [
                        {
                            ad: ad._id
                        },
                        {
                            createdAt: {
                                $gte: startDate,
                                $lte: endDate
                            }
                        }
                    ]
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
                    totalClicks: { "$sum": 1 },
                    totalAdvertiserCost: { "$sum": "$advertiser_cost" }
                }
            },
            {
                $sort: { _id: 1 }
            }
        ]);
        // console.log(clicks)
        // console.log(clicks.length)

        // ========= combining views and clicks =========
        // Create a combined map with default values
        const combinedData = {};

        // Add views to combined data
        views.forEach(view => {
            combinedData[view._id] = {
                date: view._id,
                totalViews: view.totalViews,
                totalViewsCost: view.totalAdvertiserCost,
                totalClicks: 0, // default to 0
                totalAdvertiserCost: view.totalAdvertiserCost
            };
        });
        // console.log(combinedData)

        // Add clicks to combined data
        clicks.forEach(click => {
            if (combinedData[click._id]) {
                combinedData[click._id].totalClicks = click.totalClicks;
                combinedData[click._id].totalAdvertiserCost += click.totalAdvertiserCost;
            } else {
                combinedData[click._id] = {
                    date: click._id,
                    totalViews: 0, // default to 0
                    totalViewsCost: 0, // default to 0
                    totalClicks: click.totalClicks,
                    totalAdvertiserCost: click.totalAdvertiserCost
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

        // console.log(combinedArray);

        let totalReportInfo = {
            totalViews: 0,
            totalClicks: 0,
            totalAdvertiserCost: 0,
            totalViewsCost: 0
        }

        combinedArray.forEach((info, idx) => {
            totalReportInfo.totalViews += info.totalViews;
            totalReportInfo.totalClicks += info.totalClicks;
            totalReportInfo.totalAdvertiserCost += info.totalAdvertiserCost;
            totalReportInfo.totalViewsCost += info.totalViewsCost;
        })

        // console.log(totalReportInfo)
        // ========= combining views and clicks =========

        res.status(200).send({ ad, reportInfo: combinedArray, totalReportInfo });
        // res.send("wotking")
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Internal server error" });
    }
}

module.exports.getAdReportRangeDate = async (req, res) => {
    const { startDate, endDate } = req.query;
    if (!startDate || !endDate) {
        return res.status(400).json({ error: 'startDate and endDate are required' });
    }
    try {
        const { campaignId, adId } = req.params;

        let ad = await Ad.findOne({ creator: req.advertiser._id, _id: adId, campaign: campaignId }).populate('campaign');
        if (!ad) return res.status(400).send({ message: "Ad not found" });
        // console.log(ad);


        let searchStartDate = new Date(startDate);
        let searchEndDate = new Date(endDate);
        searchEndDate.setUTCHours(23, 59, 59, 999);


        let views = await View.aggregate([
            {
                $match: {
                    $and: [
                        {
                            ad: ad._id
                        },
                        {
                            createdAt: {
                                $gte: searchStartDate,
                                $lte: searchEndDate
                            }
                        }
                    ]
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
                    totalViews: { "$sum": 1 },
                    totalAdvertiserCost: { "$sum": "$advertiser_cost" }
                }
            },
            {
                $sort: { _id: 1 }
            }
        ])
        // console.log(views);
        // console.log(views.length);

        const clicks = await Click.aggregate([
            {
                $match: {
                    $and: [
                        {
                            ad: ad._id
                        },
                        {
                            createdAt: {
                                $gte: searchStartDate,
                                $lte: searchEndDate
                            }
                        }
                    ]
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
                    totalClicks: { "$sum": 1 },
                    totalAdvertiserCost: { "$sum": "$advertiser_cost" }
                }
            },
            {
                $sort: { _id: 1 }
            }
        ]);
        // console.log(clicks)
        // console.log(clicks.length)

        // ========= combining views and clicks =========
        // Create a combined map with default values
        const combinedData = {};

        // Add views to combined data
        views.forEach(view => {
            combinedData[view._id] = {
                date: view._id,
                totalViews: view.totalViews,
                totalViewsCost: view.totalAdvertiserCost,
                totalClicks: 0, // default to 0
                totalAdvertiserCost: view.totalAdvertiserCost
            };
        });
        // console.log(combinedData)

        // Add clicks to combined data
        clicks.forEach(click => {
            if (combinedData[click._id]) {
                combinedData[click._id].totalClicks = click.totalClicks;
                combinedData[click._id].totalAdvertiserCost += click.totalAdvertiserCost;
            } else {
                combinedData[click._id] = {
                    date: click._id,
                    totalViews: 0, // default to 0
                    totalViewsCost: 0, // default to 0
                    totalClicks: click.totalClicks,
                    totalAdvertiserCost: click.totalAdvertiserCost
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

        // console.log(combinedArray);

        let totalReportInfo = {
            totalViews: 0,
            totalClicks: 0,
            totalAdvertiserCost: 0,
            totalViewsCost: 0
        }

        combinedArray.forEach((info, idx) => {
            totalReportInfo.totalViews += info.totalViews;
            totalReportInfo.totalClicks += info.totalClicks;
            totalReportInfo.totalAdvertiserCost += info.totalAdvertiserCost;
            totalReportInfo.totalViewsCost += info.totalViewsCost;
        })

        // console.log(totalReportInfo)
        // ========= combining views and clicks =========

        res.status(200).send({ reportInfo: combinedArray, totalReportInfo });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Internal server error" });
    }
}

module.exports.signup = async (req, res) => {
    try {
        // console.log(req.body);
        const { randomUUID } = new ShortUniqueId({ length: 10 });

        const { error } = validateSignupData(req.body);
        // console.log(error);
        if (error)
            return res.status(400).send({ message: error.details[0].message });

        const user = await User.findOne({ email: req.body.email });
        // console.log(user);
        if (user) {
            return res.status(409).send({ message: "User with given email address already exist" });
        }

        // TODO: Check for valid referral code 

        let newUser = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            referralCode: req.body.referralCode,
            acceptTerms: req.body.acceptTerms,
            role: "advertiser",
        })
        let createdUser = await newUser.save();

        let newAdvertiser = new Advertiser({
            user: createdUser._id,
            company: req.body.company,
            note: req.body.note,
            monthlyBudget: req.body.monthlyBudget,
            topicFocus: req.body.topicFocus,
            ownReferralCode: randomUUID()
        })
        await newAdvertiser.save();
        // console.log(newUser, newAdvertiser)

        return res.status(200).send({ message: "Our team will contact you soon." });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: "Internal server error" });
    }
}

const validateSignupData = (data) => {
    const schema = joi.object({
        firstName: joi.string()
            .required()
            .label('firstName')
            .messages({
                'any.required': 'First Name is required'
            }),
        lastName: joi.string()
            .required()
            .label('lastName')
            .messages({
                'any.required': 'Last Name is required'
            }),
        email: joi.string()
            .email()
            .required()
            .label('email')
            .messages({
                'string.email': 'Enter a valid email address',
                'any.required': 'Email is required'
            }),
        company: joi.string()
            .required()
            .label('company')
            .messages({
                'any.required': 'Enter company details'
            }),
        topicFocus: joi.array()
            .items(joi.string())
            .required()
            .label('topicFocus')
            .messages({
                'any.required': 'Advertisement topic is required'
            }),
        monthlyBudget: joi.string()
            .required()
            .label('monthlyBudget')
            .messages({
                'any.required': 'Please select monthly budget'
            }),
        note: joi.string()
            .required()
            .label('note')
            .messages({
                'any.required': 'Please tell us your advertising goal'
            }),
        referralCode: joi.string()
            .allow('')
            .label('referralCode'),
        acceptTerms: joi.boolean()
            .valid(true)
            .required()
            .label('acceptTerms')
            .messages({
                'any.required': 'Please accept Terms of Service and Privacy Policy',
                'any.only': 'You must accept the Terms of Service and Privacy Policy'
            }),
    });

    return schema.validate(data);
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
            currentPassword, req.advertiser.user.password
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
                _id: req.advertiser.user._id
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

module.exports.getSettingDetails = async (req, res) => {
    try {
        res.status(200).send({ advertiser: req.advertiser });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Internal server error" });
    }
}

module.exports.getAddMoneyDetails = async (req, res) => {
    try {
        // also send advertiser name, email etc from user
        let { campaignId } = req.params;
        let campaign = await Campaign.findOne({ creator: req.advertiser._id, _id: campaignId }).populate({
            path: "creator",
            populate: {
                path: 'user'
            }
        });
        res.status(200).send({ message: "working", campaign });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Internal server error" });
    }
}

module.exports.getkey = async (req, res) => {
    try {
        res.status(200).send({ key: process.env.RAZORPAY_KEY_ID })
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Internal server error" });
    }
}

module.exports.adMoneyCheckout = async (req, res) => {
    try {
        const instance = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET
        })

        const options = {
            amount: Number(req.body.amount) * 100,
            currency: "USD",
        };
        // receipt: "order_rcptid_11"  // set recipt to add money + date + publisher + campaign

        instance.orders.create(options, function (err, order) {
            // console.log(order);
            if (err) {
                return res.status(400).send({ message: "Error while creating order" })
            } else {
                return res.status(200).send({ message: "Order Created", order });
            }
        });

        // res.status(200).send({ success: true });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Internal server error" });
    }
}

module.exports.verifysuccess = async (req, res) => {
    try {
        // console.log(req.body);

        // verify payment here
        const generated_signature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(req.body.order_id + "|" + req.body.razorpay_payment_id)
            .digest('hex');

        // console.log(generated_signature);
        if (generated_signature == req.body.razorpay_signature) {
            let { campaignId } = req.params;
            let newPayment = new Payment({
                advertiser: req.advertiser._id,
                campaign: campaignId,
                amount: Number(req.body.amount),
                razorpay_payment_id: req.body.razorpay_payment_id,
                razorpay_order_id: req.body.razorpay_order_id,
                status: "captured"
            })
            await newPayment.save();

            await Campaign.findOneAndUpdate(
                {
                    creator: req.advertiser._id,
                    _id: campaignId
                },
                {
                    $inc: {
                        totalAmount: Number(req.body.amount),
                        balanceAmount: Number(req.body.amount),
                    }
                },
            );
            return res.status(200).send({ message: "Payment is successful" })
        } else {
            return res.status(400).send({ message: "Invalid signature, payment verification failed" })
        }

    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Internal server error" });
    }
}

module.exports.verifyfailure = async (req, res) => {
    try {
        // console.log(req.body);
        let { campaignId } = req.params;
        let newPayment = new Payment({
            advertiser: req.advertiser._id,
            campaign: campaignId,
            amount: Number(req.body.amount),
            razorpay_payment_id: req.body.razorpay_payment_id,
            razorpay_order_id: req.body.razorpay_order_id,
            status: "failed"
        })
        await newPayment.save();
        res.status(200).send({ message: "Payment failed" })
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Internal server error" });
    }
}
