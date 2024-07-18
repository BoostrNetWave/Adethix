const Ad = require("../models/ad");
const View = require("../models/view");
const Click = require("../models/click");
const Publisher = require("../models/publisher");
const Campaign = require("../models/campaign");

module.exports.getAdFunction = async (req, res) => {
    try {
        // textonly, custom, sidebar else fixed (fixed / undefined / else)
        // also check budget remaining or not

        const { adType, publisher, origin, pathname } = req.query;
        let ads;

        let pub = await Publisher.findOne({ _id: publisher });

        const findInHouseAd = async () => {  // logic to find inhouse ad
            ads = await Ad.find({
                isActive: true,
                inHouseAd: true,
            });
        }

        // checking publisher approved or not
        if (pub.isApproved) {  // if publisher is approved then show ad
            if (pub.isActive) { // if publisher is active then show paid ad
                if (adType === "textonly") {
                    // console.log("textonly")
                    ads = await Ad.aggregate([
                        {
                            $lookup: {
                                from: 'campaigns',
                                localField: 'campaign',
                                foreignField: '_id',
                                as: 'campaignDetails'
                            }
                        },
                        {
                            $unwind: '$campaignDetails'
                        },
                        {
                            $match: {
                                $and: [
                                    {
                                        $expr: {
                                            $gt: ["$campaignDetails.balanceAmount", { $add: ["$viewAdvertiserCost", "$clickAdvertiserCost"] }]
                                        }
                                    },
                                    {
                                        isApproved: true
                                    },
                                    {
                                        isRejected: false
                                    },
                                    {
                                        isActive: true
                                    },
                                    {
                                        inHouseAd: false
                                    },
                                    {
                                        "options.textOnly": { $exists: true }
                                    }
                                ]
                            }
                        }
                    ])

                    if (ads.length === 0) {
                        // call a function to generate inhouse ad
                        findInHouseAd();
                    }
                } else if (adType === "sidebar") {
                    // console.log("sidebar")
                    ads = await Ad.aggregate([
                        {
                            $lookup: {
                                from: 'campaigns',
                                localField: 'campaign',
                                foreignField: '_id',
                                as: 'campaignDetails'
                            }
                        },
                        {
                            $unwind: '$campaignDetails'
                        },
                        {
                            $match: {
                                $and: [
                                    {
                                        $expr: {
                                            $gt: ["$campaignDetails.balanceAmount", { $add: ["$viewAdvertiserCost", "$clickAdvertiserCost"] }]
                                        }
                                    },
                                    {
                                        isApproved: true
                                    },
                                    {
                                        isRejected: false
                                    },
                                    {
                                        isActive: true
                                    },
                                    {
                                        inHouseAd: false
                                    },
                                    {
                                        "options.sidebar": { $exists: true }
                                    }
                                ]
                            }
                        }
                    ])

                    if (ads.length === 0) {
                        // call a function to generate inhouse ad
                        findInHouseAd();
                    }
                } else if (adType === "custom") {
                    // console.log("custom")

                    ads = await Ad.aggregate([
                        {
                            $lookup: {
                                from: 'campaigns',
                                localField: 'campaign',
                                foreignField: '_id',
                                as: 'campaignDetails'
                            }
                        },
                        {
                            $unwind: '$campaignDetails'
                        },
                        {
                            $match: {
                                $and: [
                                    {
                                        $expr: {
                                            $gt: ["$campaignDetails.balanceAmount", { $add: ["$viewAdvertiserCost", "$clickAdvertiserCost"] }]
                                        }
                                    },
                                    {
                                        isApproved: true
                                    },
                                    {
                                        isRejected: false
                                    },
                                    {
                                        isActive: true
                                    },
                                    {
                                        inHouseAd: false
                                    },
                                    {
                                        "options.custom": { $exists: true }
                                    }
                                ]
                            }
                        }
                    ])

                    if (ads.length === 0) {
                        // call a function to generate inhouse ad
                        findInHouseAd();
                    }
                } else {
                    // console.log("fixed")
                    ads = await Ad.aggregate([
                        {
                            $lookup: {
                                from: 'campaigns',
                                localField: 'campaign',
                                foreignField: '_id',
                                as: 'campaignDetails'
                            }
                        },
                        {
                            $unwind: '$campaignDetails'
                        },
                        {
                            $match: {
                                $and: [
                                    {
                                        $expr: {
                                            $gt: ["$campaignDetails.balanceAmount", { $add: ["$viewAdvertiserCost", "$clickAdvertiserCost"] }]
                                        }
                                    },
                                    {
                                        isApproved: true
                                    },
                                    {
                                        isRejected: false
                                    },
                                    {
                                        isActive: true
                                    },
                                    {
                                        inHouseAd: false
                                    },
                                    {
                                        "options.image": { $exists: true }
                                    }
                                ]
                            }
                        }
                    ])

                    if (ads.length === 0) {
                        // call a function to generate inhouse ad
                        findInHouseAd();
                    }
                }
            } else { // if publisher is not active then show in-house ad

                // call a function to generate inhouse ad
                findInHouseAd();
            }
        } else { // if publisher is not approved then don't show any ad
            return res.status(400).send({ message: "Publisher is not approved" });
        }

        function getRandomNumberBetween1AndN(n) {
            return Math.floor(Math.random() * n);
        }

        if (ads?.length > 0) {
            const n = ads.length;
            const randomNumber = getRandomNumberBetween1AndN(n);
            // console.log(randomNumber);
            // console.log(ads[randomNumber]);

            return res.status(200).send(ads[randomNumber]);
        } else {
            return res.status(404).send({ message: "No ads found" })
        }

    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Internal Server Error" });
    }
}


// implement budget remaining for campaign
module.exports.saveViewsDetails = async (req, res) => {
    try {
        // console.log(req.body);

        let ad = await Ad.findOne({ _id: req.body.ad });
        // console.log(ad);

        let newView = new View({
            ...req.body,
            advertiser_cost: ad.viewAdvertiserCost,
            publisher_revenue: ad.viewPublisherRevenue,
        });
        // console.log(newView);
        let view = await newView.save();

        // reduce remaining budget
        await Campaign.findOneAndUpdate(
            {
                _id: ad.campaign
            },
            {
                $inc: {
                    balanceAmount: -ad.viewAdvertiserCost,
                }
            }
        )

        res.status(200).send(view);
        // res.status(200).send({ message: "working" });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Internal Server Error" });
    }
}

// implement budget remaining for campaign
module.exports.saveClicksDetails = async (req, res) => {
    try {
        // console.log(req.body);

        let ad = await Ad.findOne({ _id: req.body.ad });
        // console.log(ad);

        let newClick = new Click({
            ...req.body,
            advertiser_cost: ad.clickAdvertiserCost,
            publisher_revenue: ad.clickPublisherRevenue,
        });
        // console.log(newClick);
        let click = await newClick.save();

        // reduce remaining budget
        await Campaign.findOneAndUpdate(
            {
                _id: ad.campaign
            },
            {
                $inc: {
                    balanceAmount: -ad.clickAdvertiserCost,
                }
            }
        )

        res.status(200).send(click);
        // res.status(200).send({ message: "working" });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Internal Server Error" });
    }

}