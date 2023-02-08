/////////////////////////////////////
//// Import Dependencies         ////
/////////////////////////////////////
const express = require('express')
const { count } = require('../models/comment')
const Dailyq = require('../models/dailyqs')
const Comment = require('../models/comment')



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
    Dailyq.findOne().skip(random)
    
    // send json if successful
    .then(dailyqs => { 

        Comment.find({ owner: req.session.userId })
    
        // send json if successful
        .then(comments => { 
        
        console.log(dailyqs)
        console.log(comments)
        res.render('dailyQs/quotes', {dailyqs, comments})

        })
            // catch errors if they occur
            .catch(err => {
                console.log(err)
                console.log("hello world")
                res.status(404).json(err)
        })   
        

    })
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