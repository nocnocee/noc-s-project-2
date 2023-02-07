/////////////////////////////////////
//// Import Dependencies         ////
/////////////////////////////////////
const express = require('express')
const Comment = require('../models/comment')


/////////////////////////////////////
//// Create Router               ////
/////////////////////////////////////
const router = express.Router()

//////////////////////////////
//// Routes               ////
//////////////////////////////
router.get('/', (req, res) => {
    Comment.find({})

        // send json if successful
        .then(comments => { res.json({ comments: comments })})
        // catch errors if they occur
        .catch(err => {
            console.log(err)
            res.status(404).json(err)
        })
})

router.post('/', (req, res) => {
    const theComment = req.body
    console.log(theComment)
    Comment.create(theComment)
        .then(comment => {
            res.status(201).json({ comment: comment.toObject() })
    })
    // send an error if one occurs
        .catch(err => {
            console.log(err)
            res.status(404).json(err)
    })
})

router.put('/', (req, res) => {
    const theComment = req.body
    console.log(theComment)
    Comment.create(theComment)
        .then(comment => {
            res.status(201).json({ comment: comment.toObject() })
    })
    // send an error if one occurs
        .catch(err => {
            console.log(err)
            res.status(404).json(err)
    })
})

router.delete('/', (req, res) => {
    res.status(201).json({})
})

//////////////////////////////
//// Export Router        ////
//////////////////////////////
module.exports = router