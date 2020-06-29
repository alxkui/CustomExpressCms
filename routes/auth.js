const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const { registerValidation, loginValidation } = require('../validation');

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
router.post('/login', async (req, res) => {

    // Validate form
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // find user
    const user = await User.findOne({ email: req.body.email });

    // Send error if user is not found
    if(!user) return res.status(400).send("User not found");

    // compare passwords
    const validPass = await bcrypt.compare(req.body.password, user.password);

    // Send error if password is incorrect
    if(!validPass) return res.status(400).send("Username or password is incorrect");

    // Create token
    const token = jwt.sign({_id: user._id}, process.env.SECRET_KEY);

    // Send token in the header
    res.header('auth-token', token);

    // Success message
    res.json({
        message: 'Logged in successfully',
        token: token
    });

});

module.exports = router;