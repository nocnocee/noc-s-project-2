/////////////////////////////////////
//// Import Dependencies         ////
/////////////////////////////////////
const express = require('express')
const Favorite = require('../models/favorites')


/////////////////////////////////////
//// Create Router               ////
/////////////////////////////////////
const router = express.Router()

//////////////////////////////
//// Routes               ////
//////////////////////////////

router.get('/', (req, res) => {
    Favorite.find({ owner: req.session.userId })
    .populate('note', 'username')
    .populate('comments.author', 'username')

        // send json if successful
        .then(favorites => { res.json({ favorites: favorites })})
        // catch errors if they occur
        .catch(err => {
            console.log(err)
            res.status(404).json(err)
        })
})

router.put('/', (req, res) => {
    const id = req.params.id
    Favorite.findById(id)
        .then(favorite => {
            res.sendStatus(204)
            return favorite.updateOne(req.body)
        })
         // send an error if one occurs
        .catch(err => {
            console.log(err)
            res.status(404).json(err)
        })
})

router.delete('/:id', (req, res) => {
    const id = req.params.id
    Favorite.findById(id)
        .then(favorite => {
            res.sendStatus(204)
            return favorite.deleteOne(req.body)
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