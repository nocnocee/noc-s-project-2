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
const app = express()

/////////////////////////////////////
//// Middleware                  ////
/////////////////////////////////////
middleware(app)


/////////////////////////////////////
//// Routes                      ////
/////////////////////////////////////
app.get('/', (req, res) => {
    res.send('Server is live, ready for requests')
})


app.use('/comments', CommentRouter)
app.use('/users', UserRouter)
app.use('/dailyqs', DailyqRouter)

/////////////////////////////////////
//// Server Listener             ////
/////////////////////////////////////
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Now listening to the sweet sounds of port: ${PORT}`))

// END