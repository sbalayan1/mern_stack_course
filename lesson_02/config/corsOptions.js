const allowedOrigins = require('./allowedOrigins')

const corsOptions = {
    origins: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('not allowed'))
        }
    },
    credentials: true, //sets the access-control credentials header to true
    optionSuccessStatus: 200
}

module.exports = corsOptions


//cors() takes options, req, res, next() and returns nothing
    //options is of the CorsOptions interface
    //corsOptions interfaces have the following properties 
        //origin, methods, allowedHeaders, exposedHeaders, credentials, maxAge, preFlightContinue, and optionsSuccessStatus
            //origin is a either a boolean, string, or RegExp OR an array of the union Type OR a custom origin which is a method that takes a requestOrigin and a callback method that returns void