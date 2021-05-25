const mongoose = require('mongoose');

const schema = mongoose.schema;

const userSchema = new mongoose.Schema({

    first_name : {
        type : String,
    },
    last_name : {
        type : String,
    },
    email : {
        type : String,
        required : true
    },
    number : {
        type : String,
    },
    type : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    document : {
        type : String,
    }

})
const user = mongoose.model("User", userSchema);

module.exports = user; 