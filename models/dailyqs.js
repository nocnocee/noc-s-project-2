/////////////////////////////////////////////////////////
//// Our schema for the comment subdocument          ////
/////////////////////////////////////////////////////////
const mongoose = require('../utils/connection')
const { Schema, model } = mongoose


// dailyq schema
const dailyqSchema = new Schema({
    quote: {
        type: String,
        required: true
    }
    
}, {
    timestamps: true
})

const Dailyq = model('Dailyq', dailyqSchema)


////////////////////////////////////
//// Export our Schema          ////
////////////////////////////////////
module.exports = Dailyq