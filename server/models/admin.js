const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const adminSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    isActive: {
        type: Boolean,
        default: false
    }
}, {timestamps: true})

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;