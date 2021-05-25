const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const workshopSchema = new Schema({
    title : {
        type : String,
        required: true
    },
    eventType : {
        type : String,
        required: true
    },
    description : {
        type : String,
        required: true
    },
    startDate : {
        type : String,
        required: true
    },
    duration : {
        type : String,
        required: true
    },
    venue : {
        type : String,
        required: true
    },
    organizedBy : {
        type : String,
        required: true
    },
    eventStatus : {
        type : String,
        required: true
    }

})

const Workshop = mongoose.model("Workshop",workshopSchema);
module.exports = Workshop;