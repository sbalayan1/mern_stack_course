// const { format } = require('date-fns')
// const { v4: uuid } = require('uuid')
// const fs = require('fs')
// const fsPromises = require('fs').promises
// const path = require('path')

// const logEvents = async (message, logFileName) => {
//     const dateTime = format(new Date(), 'yyyyMMdd\tHH:mm:ss')
//     const logItem = `${dateTime}\t${uuid()}\t${message}\n`

//     try {
//         if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
//             await fsPromises.mkdir(path.join(__dirname, '..', 'logs'))
//         }
//         await fsPromises.appendFile(path.join(__dirname, '..', 'logs', logFileName), logItem)
//     } catch (err) {
//         console.log(err)
//     }
// }

// const logger = (req, res, next) => {
//     logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, 'reqLog.log')
//     console.log(`${req.method} ${req.path}`)
//     next()
// }

// module.exports = { logEvents, logger }


const { format }= require('date-fns')
const { v4: uuid }= require('uuid')
const fs = require('fs') //is built into node
const fsPromises = require('fs').promises
const path = require('path')

//helper function
const logEvents = async (message, logFileName) => {
    const dateTime = format(new Date(), 'yyyyMMdd\tHH:mm:ss') //creates a new Date instance and formats it. This comes from the date-fns package
    const logItem = `${dateTime}\t${uuid()}\t${message}\n` //passes in the dateTime and creates a string of the log message. \t makes a tab
    try {
        //if the logs folder doesn't exist 
        if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
            await fs.promises.mkdir(path.join(__dirname, '..', 'logs')) //create the directory using the provided path
        }

        await fs.promises.appendFile(path.join(__dirname, '..', 'logs', logFileName), logItem) // ./../logs/logFileName/logItem
    } catch(err) {
        console.log(err)
    }
}

// middleware has a req, res, and the ability to call next and move onto the next piece of middleware
const logger = (req, res, next) => {
    //calls the logEvents method with a message created using properties within the req. Then we write to the reqLog.log file. .log is essentially a text file for writing logs.
    //This will log all requests that come in. You can put conditionals in that say to only write logs for specific requests
    logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, 'reqLog.log')
    console.log(`${req.method} ${req.path}`)
    next() //moves on to the next piece of middleware OR the controller
}

module.exports = { logEvents, logger } //export to provide access to our server.js. logEvents can be used inside of an error handler. 