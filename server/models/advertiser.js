const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const advertiserSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    isActive: {
        type: Boolean,
        default: false
    },
    isReviewed: {
        type: Boolean,
        default: false,
    },
    isApproved: {
        type: Boolean,
        default: false,
    },
    company: {
        type: String,
        required: true
    },
    monthlyBudget: {
        type: String,
        required: true
    },
    note: {
        type: String,
        required: true
    },
    topicFocus: {
        type: [String],
        default: [],
        required: true
    },
    ownReferralCode: {
        type: String,
    }
}, {timestamps: true})

const Advertiser = mongoose.model("Advertiser", advertiserSchema);

module.exports = Advertiser;