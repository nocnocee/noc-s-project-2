/////////////////////////////////////
//// Import Dependencies         ////
/////////////////////////////////////
const express = require('express') // import the express framework
const morgan = require('morgan') // import the morgan request logger
require('dotenv').config() // Load my ENV file's variables
const path = require('path') // import path module
const UserRouter = require('./controllers/userControllers')
const CommentRouter = require('./controllers/commentControllers')
const DailyqRouter = require('./controllers/dailyqController')
const middleware = require('./utils/middleware')

/////////////////////////////////////
//// Create our Express App Object //
/////////////////////////////////////
// const app = express()

/////////////////////////////////////
//// Middleware                  ////
/////////////////////////////////////
const app = require("liquid-express-views")(express())
middleware(app)


/////////////////////////////////////
//// Routes                      ////
/////////////////////////////////////
app.get('/', (req, res) => {
    // destructure our user info
    const { username, loggedIn, userId } = req.session
    res.render('home.liquid', { username, loggedIn, userId })
})


app.use('/comments', CommentRouter)
app.use('/users', UserRouter)
app.use('/dailyqs', DailyqRouter)


app.get('/error', (req, res) => {
    const error = req.query.error || 'This page does not exist'
    res.render('error.liquid', { error, ...req.session })
})

// this catchall route will redirect a user to the error page
app.all('*', (req, res) => {
    res.redirect('/error')
})


/////////////////////////////////////
//// Server Listener             ////
/////////////////////////////////////
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Now listening to the sweet sounds of port: ${PORT}`))



// END

