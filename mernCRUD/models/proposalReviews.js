const mongoose = require('mongoose');

const schema = mongoose.schema;

const proposalReviewsSchema = new mongoose.Schema({


    proposal_id: {
        type: String,
        required: true
    },
    reviwer_id: {
        type: String,
        required: true
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