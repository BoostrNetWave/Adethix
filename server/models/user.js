const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

// user schema
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    is_email_verified: {
        type: Boolean,
        default: false
    },
    password: {
        type: String,
        required: true
    },
    acceptTerms: {
        type: Boolean,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    referralCode: {
        type: String,
    }
}, { timestamps: true });

// generating jwt token
userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, { expiresIn: "30d" });
    return token;
}

const User = mongoose.model('User', userSchema);


module.exports = User;