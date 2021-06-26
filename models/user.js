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
<<<<<<< HEAD
        type : String,
        required : true
=======
        type : String
>>>>>>> b8a665f534fc635670b2f9575a021781d8949729
    }

})
const user = mongoose.model("User", userSchema);

module.exports = user; 