const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const adminPublisherReviewSchema = new Schema({
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

const AdminPublisherReview = mongoose.model("AdminPublisherReview", adminPublisherReviewSchema);

module.exports = AdminPublisherReview;