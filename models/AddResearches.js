const mongoose = require('mongoose');

const schema = mongoose.schema;

const addResearch = new mongoose.Schema({

        research_name : {
            type : String,
            required : true
        },
        research_description: {
            type : String,
            required : true
        }

})
const add_Research = mongoose.model("Research", addResearch);

module.exports = add_Research; 