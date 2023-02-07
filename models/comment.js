/////////////////////////////////////////////////////////
//// Our schema for the comment subdocument          ////
/////////////////////////////////////////////////////////
const mongoose = require('../utils/connection')
const { Schema, model } = mongoose


// comment schema
const commentSchema = new Schema({
    note: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
    
}, {
    timestamps: true
})

const Comment = model('Comment', commentSchema)


////////////////////////////////////
//// Export our Schema          ////
////////////////////////////////////
module.exports = Comment