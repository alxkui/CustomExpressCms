const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

const { registerValidation } = require('../validation');

// @desc    Register
// @route   POST /register
router.post('/register', async (req, res) => {

    // Validate request
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Check if username exists
    const usernameExists = await User.findOne({ username: req.body.username });
    if (usernameExists) return res.status(400).send("Username already exists");

    // Check if email exists
    const emailExists = await User.findOne({ email: req.body.email });
    if (emailExists) return res.status(400).send("Email already exists");

    // Hash password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create user
    const user = new User({
        username: req.body.username,
        password: hashedPassword,
        email: req.body.email
    });

    // Save user in db
    try {
        const savedUser = await user.save();
        res.json({
            message: "User Created",
            user_id: user._id
        })
    } catch(err) {
        console.error(err);
        res.status(400).send(err);
    }
});

// @desc    Login
// @route   POST /login
router.post('/login', (req, res) => {
    
});

module.exports = router;