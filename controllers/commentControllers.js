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

router.get('/', (req, res) => {
    Comment.find({ owner: req.session.userId })

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

router.put('/:id', (req, res) => {
    const id = req.params.id
    Comment.findById(id)
        .then(comment => {
            res.sendStatus(204)
            return comment.updateOne(req.body)
        })
         // send an error if one occurs
        .catch(err => {
            console.log(err)
            res.status(404).json(err)
        })
})

router.delete('/:id', (req, res) => {
    const id = req.params.id
    Comment.findById(id)
        .then(comment => {
            res.sendStatus(204)
            return comment.deleteOne(req.body)
        })
         // send an error if one occurs
        .catch(err => {
            console.log(err)
            res.status(404).json(err)
        })
 })

//////////////////////////////
//// Export Router        ////
//////////////////////////////
module.exports = router