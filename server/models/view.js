const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const viewSchema = new Schema({
    ad: {
        type: Schema.Types.ObjectId,
        ref: "Ad",
        required: true
    },
    publisher: {
        type: Schema.Types.ObjectId,
        ref: "Publisher",
        required: true
    },
    origin: {
        type: String,
        required: true
    },
    pathname: {
        type: String,
        required: true
    },
    advertiser_cost: {
        type: Number,
    },
    publisher_revenue: {
        type: Number,
    },
}, { timestamps: true });

const View = mongoose.model('View', viewSchema);

module.exports = View;

// const validate = (data) => {
//     const schema = joi.object({
//         username: joi.string().required().label("username"),
//         email: joi.string().email().required().label("email"),
//         password: passwordComplexity().required().label("password"),

//     });
//     return schema.validate(data);
// }

// module.exports = {View, validate};