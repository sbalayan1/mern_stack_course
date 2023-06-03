const express = require('express')
const router = express.Router()
const path = require('path')

// only matches if the requested route is only a '/' or is to /index. 
router.get('^/$|/index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html')) 
}) // if there's a request, we respond with the file. path.join creates a path to the index.html file. It looks at the current directory, moves one level up and looks for the index.html file within the views folder

module.exports = router