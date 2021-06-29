const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const OTPSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true
    },
    otp : {
        type : Number,
        required : true
    }
})
const OTP = mongoose.model("OTP",OTPSchema);

module.exports = OTP;