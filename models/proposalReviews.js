const mongoose = require('mongoose');

const schema = mongoose.schema;

const proposalReviewsSchema = new mongoose.Schema({

    reviwer_id : {
        type : String,
        required : true
    },
    reviwer_name : {
        type : String,
        required : true
    },
    proposal_id : {
        type : String,
        required : true
    },
    proposal_topic : {
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

const Proposal_reviwe = mongoose.model("Proposal_reviwe", proposalReviewsSchema);

module.exports = Proposal_reviwe; 