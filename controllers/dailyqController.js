/////////////////////////////////////
//// Import Dependencies         ////
/////////////////////////////////////
const express = require('express')
const Dailyq = require('../models/dailyqs')


/////////////////////////////////////
//// Create Router               ////
/////////////////////////////////////
const router = express.Router()

//////////////////////////////
//// Routes               ////
//////////////////////////////
router.get('/', (req, res) => {
    Dailyq.find({})

        // send json if successful
        .then(dailyqs => { res.json({ dailyqs: dailyqs })})
        // catch errors if they occur
        .catch(err => {
            console.log(err)
            res.status(404).json(err)
        })
})

//////////////////////////////
//// Export Router        ////
//////////////////////////////
module.exports = router