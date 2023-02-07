/////////////////////////////////////
//// Import Dependencies         ////
/////////////////////////////////////
const express = require('express')
const { count } = require('../models/comment')
const Dailyq = require('../models/dailyqs')


/////////////////////////////////////
//// Create Router               ////
/////////////////////////////////////
const router = express.Router()
const limit = 10

//////////////////////////////
//// Routes               ////
//////////////////////////////
router.get('/', (req, res) => {
    let random = Math.floor(Math.random() * limit) % limit
    console.log(random)
    Dailyq.findOne().skip(random)

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