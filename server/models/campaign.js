const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const campaignSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: "Advertiser",
        required: true
    },
    topics: {
        type: [String],
        default: [],
        required: true
    },
    expectedBudget: {
        type: String,
        required: true
    },
    isReviewed: {
        type: Boolean,
        default: false,
        required: true
    },
    isApproved: {
        type: Boolean,
        default: false,
        required: true
    },
    markForReview: {
        type: Boolean,
        default: false,
        required: true
    },
    isActive: {
        type: Boolean,
        default: false,
        required: true
    },
    totalAmount: {
        type: Number,
        default: 0
    },
    balanceAmount: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

const Campaign = mongoose.model("Campaign", campaignSchema);

module.exports = Campaign;