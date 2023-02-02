const express = require('express')
const router = express.Router()
const Customer = require('../models/customer')

// All customers route
router.get('/', async (req, res) => {
    try {
        const customers = await Customer.find({})
        res.render('customers/index', { customers: customers })
    } catch {
        res.redirect('/')

    }
    
})


// New customer route
router.get('/new', (req, res) => {
    res.render('customers/new', {customer: new Customer()})
})

// Create customer route
router.post('/', async (req, res) => {
    const customer = new Customer({
        name: req.body.name,
        lastname: req.body.lastname,
        cellphone: req.body.cellphone,
        city: req.body.city
    })
    try{
        const newCustomer = await customer.save()
        res.redirect(`/customers/${newCustomer.id}`)


    } catch {
        res.render('customers/new', {
            customer: customer,
            errorMessage: 'Error creating Customer'
        })
    }
})

router.get('/:id', (req, res) => {
    res.send('Show Customer ' + req.params.id)
}) 

router.get('/:id/edit', async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id)
        res.render('customers/edit', { customer: customer })
    }catch {
        res.redirect('/customers')
    }

}) 

router.put('/:id', async (req, res) => {
    let customer
    
    try{
        customer = await Customer.findById(req.params.id)

        customer.name = req.body.name || customer.name;
        customer.lastname = req.body.lastname || customer.lastname;
        customer.cellphone = req.body.cellphone || customer.cellphone;
        customer.city = req.body.city || customer.city;
        await customer.save()
        res.redirect(`/customers/${customer.id}`)
        
    } catch {
        if (customer == null) {
            res.redirect('/customers')
        } else {
        res.render('customers/edit', {
            customer: customer,
            errorMessage: 'Error updating Customer'
        })
    }
    }
})

router.delete('/:id', async (req, res) => {
    try{
        customer = await Customer.findById(req.params.id)
        await customer.remove()
        res.redirect('/customers')
        
    } catch {
        if (customer == null) {
            res.redirect('/customers')
        } else {
        res.render(`/customers/${customer.id}`, {
            customer: customer,
            errorMessage: 'Error deleting Customer'
        })
    }
    }
})


module.exports = router