const express = require('express')
const app = express()
const path = require('path') //imports the path. this makes it usable inthe body of our server file
const PORT = process.env.PORT || 3000 //sets the port we are running our server on in dev. if there is a port in our env variables, use that otherwise run on port 3000

app.use('/', express.static(path.join(__dirname, 'public'))) // "/" root route. __dirname is a global variable that refers to the current folder. This tells express where to find static files!

app.use('/', require('./routes/root'))

//handles all routes. That's what the * is for
app.all('*', (req, res) => {
    res.status(404) //sets the status of the response to 404
    
    //if the headers say the request accepts html
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    
    //if there is a json request that wasn't routed properly
    } else if (req.accepts('json')) {
        res.json({ message: '404 not found'})
    //if a request is neither json or html
    } else {
        // sets the response type to text
        res.type('txt').send('404 not found')
    }
})

app.listen(PORT, () => console.log(`server running on port ${PORT}`))