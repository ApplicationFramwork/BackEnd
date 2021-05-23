const mongoose = require('mongoose');

const schema = mongoose.schema;

const researchReviewsSchema = new mongoose.Schema({

    reviwer_id : {
        type : String,
        required : true
    },
    reviwer_name : {
        type : String,
        required : true
    },
    research_id : {
        type : String,
        required : true
    },
    research_topic : {
        type : String,
        required : true
    },
    submiteremail : {
        type : String,
        required : true
    },
    reviwe_date : {
        type : Date,
        required : true
    },
    reviwe_comment : {
        type : String,
        required : true
    },
    status : {
        type : String,
        required :true
    },
    reviwe_point : {
        type : Number,
        required :true
    }
})

const Research_reviwe = mongoose.model("Research_reviwe", researchReviewsSchema);

module.exports = Research_reviwe; 