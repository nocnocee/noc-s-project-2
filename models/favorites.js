const mongoose = require('../utils/connection')
const commentSchema = require('./comment')


const { Schema, model } = mongoose


const favoriteSchema = new Favorite({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    comments: [commentSchema]
})

const Favorite = model('Favorite', favoriteSchema)

//////////////////////////
//// Export our Model ////
//////////////////////////
module.exports = Favorite