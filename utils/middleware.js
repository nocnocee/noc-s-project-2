/////////////////////////////////////
//// Import Dependencies         ////
/////////////////////////////////////
const express = require('express') // import the express framework
const morgan = require('morgan') // import the morgan request logger
const session = require('express-session') // import the express-session package
const MongoStore = require('connect-mongo') // import the connect-mongo package(for sessions)
require('dotenv').config()
const methodOverride = require('method-override')

/////////////////////////////////////
//// Middleware function         ////
/////////////////////////////////////

const middleware = (app) => {
    // middleware runs before all the routes.
    // every request is processed through our middleware before mongoose can do anything with it
    app.use(methodOverride('_method'))
    app.use(morgan('tiny')) // this is for request loggging, the 'tiny' argument declares what size of morgan log to use
    app.use(express.urlencoded({ extended: true })) //this parses urlEncoded request bodies(useful for POST and PUT requests)
    app.use(express.static('public')) // this serves static files from the 'public' folder
    app.use(express.json()) // parses incoming request payloads with JSON

    app.use(
        session({
            secret:"hi",
            store: MongoStore.create({
                mongoUrl: process.env.DATABASE_URL
            }),
            saveUninitialized: true,
            resave: false
        })
    )
}

///////////////////////////////////////////
//// Export middleware function        ////
///////////////////////////////////////////
module.exports = middleware