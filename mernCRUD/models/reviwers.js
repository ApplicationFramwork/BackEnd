const mongoose = require('mongoose');

const schema = mongoose.schema;

const reviwerSchema = new mongoose.Schema({

    first_name : {
        type : String,
        required : true
    },
    last_name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    number_Of_reviews : {
        type : Number,
        required : true
    },
    password : {
        type : String,
        required : true
    }
})

const Reviwer = mongoose.model("Reviwer", reviwerSchema);

module.exports = Reviwer; 