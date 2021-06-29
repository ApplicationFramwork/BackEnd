const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PaymentSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true
    },
    amount : {
        type : Number,
        required : true
    },
    date : {
        type : Date
    },
    status :{
        type : String,
        required : true
    }
});

const Payment = mongoose.model("Payment",PaymentSchema);

module.exports = Payment;