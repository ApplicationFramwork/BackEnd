const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const eventSchema = new Schema({
    title : {
        type : String,
        required: false
    },
    eventType : {
        type : String,
        required: false
    },
    description : {
        type : String,
        required: false
    },
    startDate : {
        type : String,
        required: false
    },
    duration : {
        type : String,
        required: false
    },
    venue : {
        type : String,
        required: false
    },
    organizedBy : {
        type : String,
        required: false
    },
    eventStatus : {
        type : String,
        required: false
    }

})

const Event = mongoose.model("Event",eventSchema);

module.exports = Event;