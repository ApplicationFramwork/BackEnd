const mongoose = require('mongoose');

const schema = mongoose.schema;

const researchdetailsSchema = new mongoose.Schema({


    research_topic: {
        type: String,
        required: true
    },
    submiteremail: {
        type: String,
        required: true
    },
    reseach_description: {
        type: String,
        required: true
    },
    document: {
        type: String,
    },
    status: {
        type: String,
        required: true
    },
    total_reviwe_point: {
        type: Number,
        required: true
    }
})

const Research_Details = mongoose.model("Research_Details", researchdetailsSchema);

module.exports = Research_Details;