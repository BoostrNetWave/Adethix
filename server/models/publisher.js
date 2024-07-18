const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const publisherSchema = new Schema({
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
    website: {
        type: String,
        required: true
    },
    monthlyPageView: {
        type: String,
        required: true
    },
    note: {
        type: String,
        default: ""
    },
    audienceCategory: {
        type: [String],
        default: [],
        required: true
    },
    ownReferralCode: {
        type: String,
    }
}, {timestamps: true})

const Publisher = mongoose.model("Publisher", publisherSchema);

module.exports = Publisher;