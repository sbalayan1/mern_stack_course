// const { logEvents } = require('./logger')

// const errorHandler = (err, req, res, next) => {
//     logEvents(`${err.name}: ${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}`, 'errLog.log')
//     console.log(err.stack)

//     const status = res.statusCode ? res.statusCode : 500 // server error 

//     res.status(status)

//     res.json({ message: err.message })
// }

// module.exports = errorHandler 



// this overwrites the default express error handling
const { logEvents } = require('./logger')

const errorHandler = (err, req, res, next) => {
    //takes two arguments, the first is the message you want to write, the second is the file to write to
    logEvents(`${err.name}: ${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}`, 'errorLog.log')
    console.log(err.stack) //console logs the error stack. gives details about the error and where

    const status = res.statusCode ? res.statusCode : 500 //server error
    res.status(status)
    res.json({message: err.message })
}

module.exports = errorHandler