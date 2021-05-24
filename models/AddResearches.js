const mongoose = require('mongoose');

const schema = mongoose.schema;

const addResearch = new mongoose.Schema({

        research_name : {
            type : String,
        },
        research_doc : {
            type : String,
        }

})
const add_Research = mongoose.model("Research", addResearch);

module.exports = add_Research; 