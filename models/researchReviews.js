const mongoose = require('mongoose');

const schema = mongoose.schema;

const researchReviewsSchema = new mongoose.Schema({


    research_id: [{
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'Research_Details'
    }],
    reviwer_id: [{
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'Reviwer'
    }],
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