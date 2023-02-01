const express = require('express')
const router = express.Router()

// All customers route
router.get('/', (req, res) => {
    res.render('customers/index')
})


// New customer route
router.get('/new', (req, res) => {
    res.render('customers/new')
})

// Create customer route
router.post('/', (req, res) => {
    res.send('Create')
})


// router.get('/', (req, res) => {
//     res.render('index')
// })

module.exports = router