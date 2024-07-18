const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const paymentSchema = new Schema({
    advertiser: {
        type: Schema.Types.ObjectId,
        ref: "Advertiser",
        required: true
    },
    campaign: {
        type: Schema.Types.ObjectId,
        ref: "Campaign",
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    razorpay_payment_id: {
        type: String, 
        required: true
    },
    razorpay_order_id: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    }
}, {timestamps: true})

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;