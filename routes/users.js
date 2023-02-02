const express = require('express')
const User = require('../models/user')
const bcrypt = require( 'bcrypt' )
const mongoose = require('mongoose')
const router = express.Router()


// Register user route
router.get('/register', (req, res) => {
    res.render('/register', {user: new User()})
})



router.post('/register', async (req, res) => {
    const user = new User();
    try {
        if (req.body.password !== req.body.confirmPassword) {
            throw new Error('Passwords do not match');
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        user.username = req.body.username;
        user.password = hashedPassword;
        await user.save();
        res.redirect('/login');
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});


router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).send({ error: 'Invalid username or password' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).send({ error: 'Invalid username or password' });
        }
        res.send({ message: 'Login successful' });
    } catch (error) {
        res.status(400).send({ error: 'Error logging in' });
    }
});

module.exports = router