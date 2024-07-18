const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const applyingReviewSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: "Advertiser",
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
    isOpen: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

const ApplyingReview = mongoose.model("ApplyingReview", applyingReviewSchema);

module.exports = ApplyingReview;