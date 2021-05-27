const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name :{
        type : String,
        required : true
    },
    email :{
        type : String,
        required : true
    },
    user_name :{
        type : String
    },
    password:{
        type : String,
        required : true
    },
    type:{
        type : String,
        required : true
    },
    mobile_number:{
        type : String
    }
});
const User = mongoose.model("User",userSchema);

module.exports = User;