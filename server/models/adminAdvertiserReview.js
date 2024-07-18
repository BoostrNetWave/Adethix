const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const adminAdvertiserReviewSchema = new Schema({
    reviewer: {
        type: Schema.Types.ObjectId,
        ref: "Admin",
        required: true
    },
    comments: {
        type: String,
        required: true
    },
    reviewDetails: {
        type: Object,
        required: true
    }
}, { timestamps: true });

const AdminAdvertiserReview = mongoose.model("AdminAdvertiserReview", adminAdvertiserReviewSchema);

module.exports = AdminAdvertiserReview;