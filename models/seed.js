const mongoose = require('../utils/connection')
const Dailyq = require('./dailyqs')

/////////////////////////////////////
//// Seed Script code            ////
/////////////////////////////////////
// first, we'll save our db connection to a variable
const db = mongoose.connection

db.on('open', () => {
    // array of starter resources
    const dailyQuestion = [ 
        {quote: "How many of the things you think you want to do today have you actually done?" },
        {quote: "What kind of stimulation do I have when I hear the word death?" },
        {quote: "What are my favorite travel destinations and why, and what is my travel style?" },
        {quote: "What do I use as a reference when I reflect on my day, such as work, emotions, etc.?" },
        {quote: "Am I willing to incur a loss for the public good as described by the state?"} ,
        {quote: "What is my own definition of time standing still?" },
        {quote: "What are my standards for summer?" },
        {quote: "What was the most useless emotion I felt today?" },
        {quote: "What values are most important in my life?" },
        {quote: "What genre of music do I like and what is the charm of that genre?" }
    ]

    Dailyq.deleteMany({ owner: null })
        .then(() => {
            Dailyq.create(dailyQuestion)
                .then(data => {
                    console.log('here are the created dailyqs: \n', data)
                    db.close()
                })
                .catch(err => {
                    console.log('The following error occurred: \n', err)
                    db.close()
                })
        })
        .catch(err => {
            console.log(err)
            db.close()
        })
})