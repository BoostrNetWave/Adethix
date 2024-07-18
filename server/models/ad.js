const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const adSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    linkUrl: {
        type: String,
        required: true
    },
    image: {
        url: {
            type: String, 
            default: null
        },
        filename: {
            type: String, 
            default: null
        }
    },
    options: {
        image: {
            type: Boolean,
            default: true,
        },
        textOnly: {
            type: Boolean,
            default: true,
        },
        sidebar: {
            type: Boolean,
            default: true,
        },
        custom: {
            type: Boolean,
            default: true,
        },
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: "Advertiser",
        required: true
    },
    campaign: {
        type: Schema.Types.ObjectId,
        ref: "Campaign",
        required: true
    },
    isReviewed: {
        type: Boolean,
        default: false,
    },
    isApproved: {
        type: Boolean,
        default: false,
    },
    markForReview: {
        type: Boolean,
        default: false,
    },
    isActive: {
        type: Boolean,
        default: false,
    },
    isRejected: {
        type: Boolean,
        default: false,
    },
    viewAdvertiserCost: {
        type: Number
    },
    viewPublisherRevenue: {
        type: Number
    },
    clickAdvertiserCost: {
        type: Number
    },
    clickPublisherRevenue: {
        type: Number
    },
    inHouseAd: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const Ad = mongoose.model("Ad", adSchema);

module.exports = Ad;