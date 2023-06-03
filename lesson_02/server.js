const express = require('express')
const app = express()
const path = require('path')
const { logger } = require('./middleware/logger')
const errorHandler = require('./middleware/errorHandler')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const PORT = process.env.PORT || 3500

app.use(logger)

// is 3rd party middleware that allows cross origin requests to our api
// we should only allow the origins that we want to access our api. We do this with corsOptions

    //cors() takes options, req, res, next() and returns nothing
app.use(cors(corsOptions))

//is built-in middleware that lets us receive and parse json data
app.use(express.json())

//is 3rd party middleware that lets us parse cookies we receive
app.use(cookieParser())

//express.static is built-in middleware. it tells our server where to grab static files
app.use('/', express.static(path.join(__dirname, 'public'))) 

// note you can also use. this is because the public file is relative to where your server.js is
// app.use(express('public'))

app.use('/', require('./routes/root'))

app.all('*', (req, res) => {
    res.status(404)
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    } else if (req.accepts('json')) {
        res.json({ message: '404 Not Found' })
    } else {
        res.type('txt').send('404 Not Found')
    }
})

app.use(errorHandler) //want to use this after everything has been implemented/used
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))