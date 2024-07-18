const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const adminReviewSchema = new Schema({
    reviewer: {
        type: Schema.Types.ObjectId,
        ref: "Admin",
        required: true
    },
    adInfo: {
        type: Object,
        required: true
    },
    adId: {
        type: Schema.Types.ObjectId,
        ref: "Ad",
        required: true  
    }, 
    applyingReview: {
        type: Schema.Types.ObjectId,
        ref: "ApplyingReview",
        required: true  
    },
    comments: {
        type: String
    },
    viewAdvertiserCost: {
        type: String
    },
    viewPublisherRevenue: {
        type: String
    },
    clickAdvertiserCost: {
        type: String
    },
    clickPublisherRevenue: {
        type: String
    },
    isApproved: {
        type: Boolean
    },
    isRejected: {
        type: Boolean
    },

}, { timestamps: true });

const AdminReview = mongoose.model("AdminReview", adminReviewSchema);

module.exports = AdminReview;