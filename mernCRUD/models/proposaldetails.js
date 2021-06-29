const mongoose = require('mongoose');

const schema = mongoose.schema;

const proposaldetailsSchema = new mongoose.Schema({

    
    proposal_topic: {
        type: String,
        required: true
    },
    submiteremail: {
        type: String,
        required: true
    },
    proposal_description: {
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

const Proposal_Details = mongoose.model("Proposal_Details", proposaldetailsSchema);

module.exports = Proposal_Details;