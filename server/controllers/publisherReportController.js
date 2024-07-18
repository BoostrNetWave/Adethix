// const Ad = require("../models/ad");
const View = require("../models/view");
const Click = require("../models/click");
const Publisher = require("../models/publisher")
const User = require("../models/user");

const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const ShortUniqueId = require('short-unique-id');

// basic report overview
module.exports.getDashboard = async (req, res) => {
    try {
        // console.log(req.user);
        // Get the current date and time
        const now = new Date();

        const startDate = new Date();
        startDate.setUTCDate(now.getUTCDate() - 7);
        startDate.setUTCHours(0, 0, 0, 0);

        const endDate = new Date();
        endDate.setUTCDate(now.getUTCDate() - 1);
        endDate.setUTCHours(23, 59, 59, 999);

        // finding daily total views and total revenue, and overall total views and total revenue
        const views = await View.aggregate([
            {
                $match: {
                    $and: [
                        {
                            createdAt: {
                                $gte: startDate,
                                $lte: endDate
                            }
                        },
                        {
                            publisher: req.user._id
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
                    totalPublisherRevenue: { "$sum": "$publisher_revenue" }
                }
            },
            {
                $sort: { _id: 1 }
            },
            {
                $group: {
                    _id: null,
                    days: { $push: { date: "$_id", totalViews: "$totalViews", totalPublisherRevenue: "$totalPublisherRevenue" } },
                    totalViews: { $sum: "$totalViews" },
                    totalPublisherRevenue: { $sum: "$totalPublisherRevenue" }
                }
            },
            {
                $project: {
                    _id: 0,
                    days: 1,
                    totalViews: 1,
                    totalPublisherRevenue: 1
                }
            }
        ]);

        // finding daily total clicks and total revenue, and overall total clicks and total revenue
        const clicks = await Click.aggregate([
            {
                $match: {
                    $and: [
                        {
                            createdAt: {
                                $gte: startDate,
                                $lte: endDate
                            }
                        },
                        {
                            publisher: req.user._id
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
                    totalPublisherRevenue: { "$sum": "$publisher_revenue" }
                }
            },
            {
                $sort: { _id: 1 }
            },
            {
                $group: {
                    _id: null,
                    days: { $push: { date: "$_id", totalClicks: "$totalClicks", totalPublisherRevenue: "$totalPublisherRevenue" } },
                    totalClicks: { $sum: "$totalClicks" },
                    totalPublisherRevenue: { $sum: "$totalPublisherRevenue" }
                }
            },
            {
                $project: {
                    _id: 0,
                    days: 1,
                    totalClicks: 1,
                    totalPublisherRevenue: 1
                }
            }
        ]);

        // console.log(views[0]);
        res.status(200).send({ views, clicks });
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: err.message });
    }
}

// basic reports
module.exports.reports = async (req, res) => {
    try {
        // console.log(req.user);
        const now = new Date();

        const startDate = new Date();
        startDate.setUTCDate(now.getUTCDate() - 30);
        startDate.setUTCHours(0, 0, 0, 0);

        const endDate = new Date();
        endDate.setUTCDate(now.getUTCDate() - 1);
        endDate.setUTCHours(23, 59, 59, 999);

        // finding daily total views and total revenue, and overall total views and total revenue
        const views = await View.aggregate([
            {
                $match: {
                    $and: [
                        {
                            createdAt: {
                                $gte: startDate,
                                $lte: endDate
                            }
                        },
                        {
                            publisher: req.user._id
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
                    totalPublisherRevenue: { "$sum": "$publisher_revenue" }
                }
            },
            {
                $sort: { _id: 1 }
            }
        ]);
        // console.log(views)
        // finding daily total clicks and total revenue, and overall total clicks and total revenue
        const clicks = await Click.aggregate([
            {
                $match: {
                    $and: [
                        {
                            createdAt: {
                                $gte: startDate,
                                $lte: endDate
                            }
                        },
                        {
                            publisher: req.user._id
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
                    totalPublisherRevenue: { "$sum": "$publisher_revenue" }
                }
            },
            {
                $sort: { _id: 1 }
            }
        ]);


        // ========= combining views and clicks =========
        // Create a combined map with default values
        const combinedData = {};

        // Add views to combined data
        views.forEach(view => {
            combinedData[view._id] = {
                date: view._id,
                totalViews: view.totalViews,
                totalClicks: 0, // default to 0
                totalPublisherRevenue: view.totalPublisherRevenue
            };
        });
        // console.log(combinedData)

        // Add clicks to combined data
        clicks.forEach(click => {
            if (combinedData[click._id]) {
                combinedData[click._id].totalClicks = click.totalClicks;
                combinedData[click._id].totalPublisherRevenue += click.totalPublisherRevenue;
            } else {
                combinedData[click._id] = {
                    date: click._id,
                    totalViews: 0, // default to 0
                    totalClicks: click.totalClicks,
                    totalPublisherRevenue: click.totalPublisherRevenue
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


        // console.log(views);
        res.status(200).send({ data: combinedArray });
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: err.message });
    }
}

// basic reports
module.exports.reportRangeDate = async (req, res) => {
    // console.log(req.query);
    const { startDate, endDate } = req.query;
    if (!startDate || !endDate) {
        return res.status(400).json({ error: 'startDate and endDate are required' });
    }
    try {
        // console.log(req.user);
        let searchStartDate = new Date(startDate);
        let searchEndDate = new Date(endDate);
        searchEndDate.setUTCHours(23, 59, 59, 999);
        // console.log(searchStartDate, searchEndDate);

        // finding daily total views and total revenue, and overall total views and total revenue
        const views = await View.aggregate([
            {
                $match: {
                    $and: [
                        {
                            createdAt: {
                                $gte: searchStartDate,
                                $lte: searchEndDate
                            }
                        },
                        {
                            publisher: req.user._id
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
                    totalPublisherRevenue: { "$sum": "$publisher_revenue" }
                }
            },
            {
                $sort: { _id: 1 }
            }
        ]);

        // finding daily total clicks and total revenue, and overall total clicks and total revenue
        const clicks = await Click.aggregate([
            {
                $match: {
                    $and: [
                        {
                            createdAt: {
                                $gte: searchStartDate,
                                $lte: searchEndDate
                            }
                        },
                        {
                            publisher: req.user._id
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
                    totalPublisherRevenue: { "$sum": "$publisher_revenue" }
                }
            },
            {
                $sort: { _id: 1 }
            }
        ]);

        // ========= combining views and clicks =========
        // Create a combined map with default values
        const combinedData = {};

        // Add views to combined data
        views.forEach(view => {
            combinedData[view._id] = {
                date: view._id,
                totalViews: view.totalViews,
                totalClicks: 0, // default to 0
                totalPublisherRevenue: view.totalPublisherRevenue
            };
        });
        // console.log(combinedData)

        // Add clicks to combined data
        clicks.forEach(click => {
            if (combinedData[click._id]) {
                combinedData[click._id].totalClicks = click.totalClicks;
                combinedData[click._id].totalPublisherRevenue += click.totalPublisherRevenue;
            } else {
                combinedData[click._id] = {
                    date: click._id,
                    totalViews: 0, // default to 0
                    totalClicks: click.totalClicks,
                    totalPublisherRevenue: click.totalPublisherRevenue
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


        // console.log(views);
        res.status(200).send({ data: combinedArray });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
}

module.exports.getEmbedCode = async (req, res) => {
    res.status(200).send(req.user);
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

        let publisher = await Publisher.findOne({ user: user._id });
        if (!publisher) return res.status(403).send({ message: "You are not a registered publisher", error: "Forbidden" });

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
            role: "publisher",
        })
        let createdUser = await newUser.save();

        let newPublisher = new Publisher({
            user: createdUser._id,
            website: req.body.website,
            note: req.body.note,
            monthlyPageView: req.body.monthlyPageView,
            audienceCategory: req.body.audienceCategory,
            ownReferralCode: randomUUID()
        })
        await newPublisher.save();
        // console.log(newUser, newPublisher)

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
        website: joi.string()
            .required()
            .label('website')
            .messages({
                'any.required': 'Enter website details'
            }),
        audienceCategory: joi.array()
            .items(joi.string())
            .required()
            .label('audienceCategory')
            .messages({
                'any.required': 'Audience Category is required'
            }),
        monthlyPageView: joi.string()
            .required()
            .label('monthlyPageView')
            .messages({
                'any.required': 'Please select monthly page view'
            }),
        note: joi.string()
            .allow('')
            .label('note'),
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
            currentPassword, req.publisher.user.password
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
                _id: req.publisher.user._id
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
        res.status(200).send({ publisher: req.publisher });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Internal server error" });
    }
}

module.exports.getPayoutsDetails = async (req, res) => {
    try {
        res.status(200).send({ publisher: req.publisher });
    } catch (err) {
        console.log(err);
        res.status(500).send({ messsage: "Internal server error" })
    }
}