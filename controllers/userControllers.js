/////////////////////////////////////
//// Import Dependencies         ////
/////////////////////////////////////
const express = require('express')
const User = require('../models/user')
const bcrypt = require('bcryptjs')

/////////////////////////////////////
//// Create Router               ////
/////////////////////////////////////
const router = express.Router()

//////////////////////////////
//// Routes               ////
//////////////////////////////
// POST -> /users/signup
router.post('/signup', async (req, res) => {
    const newUser = req.body
    console.log(newUser)
    newUser.password = await bcrypt.hash(
        newUser.password,
        await bcrypt.genSalt(10)
    )
    // then create the user
    User.create(newUser)
        // if we're successful, send a 201 status
        .then(user => {
            // console.log('new user created \n', user)
            res.status(201).json({ username: user.username })
        })
        // if there is an error, handle the error
        .catch(err => {
            console.log(err)
            res.json(err)
        })
})

// POST -> /users/login
router.post('/login', async (req, res) => {
    // first we want to destructure the username and password from our req.body
    const { username, password } = req.body

    // search the db, for a user with a specific username
    User.findOne({ username })
        .then(async (user) => {
            // we check if that user exists
            if (user) {

                const result = await bcrypt.compare(password, user.password)

                if (result) {
                    req.session.username = username
                    req.session.loggedIn = true
                    req.session.userId = user.id

                    res.status(201).json({ username: user.username })
                } else {
                    // if the passwords dont match, send the user a message
                    res.json({ error: 'username or password is incorrect' })
                }

            } else {
                // if the user does not exist, we respond with a message saying so
                res.json({ error: 'user does not exist' })
            }

        })
        .catch(err => {
            console.log(err)
            res.json(err)
        })
})

// DELETE -> /users/logout
router.delete('/logout', (req, res) => {
    // destroy the session and send an appropriate response
    req.session.destroy(() => {
        console.log('this is req.session upon logout \n', req.session)
        // eventually we will redirect users here, but thats after adding the view layer
        res.sendStatus(204)
    })
})


//////////////////////////////
//// Export Router        ////
//////////////////////////////
module.exports = router