const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const clickSchema = new Schema({
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
    on_view: {
        type: Schema.Types.ObjectId,
        ref: "View"
    },
    advertiser_cost: {
        type: Number,
    },
    publisher_revenue: {
        type: Number,
    },
}, { timestamps: true });

const Click = mongoose.model('Click', clickSchema);

module.exports = Click;

// const validate = (data) => {
//     const schema = joi.object({
//         username: joi.string().required().label("username"),
//         email: joi.string().email().required().label("email"),
//         password: passwordComplexity().required().label("password"),

//     });
//     return schema.validate(data);
// }

// module.exports = {View, validate};