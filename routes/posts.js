const express = require('express');
const router = express.Router();
const verifyAuth = require('../middleware/verifyToken');

// @desc    Posts list
// @route   GET /
router.get('/', verifyAuth, (req, res) => {
    res.json({
        message: 'All Posts'
    })
});

// @desc    Single Post
// @route   GET /:id
router.get('/:id', verifyAuth, (req, res) => {
    res.json({
        message: 'Single post'
    })
});

// @desc    Add Post
// @route   POST /
router.get('/add', verifyAuth, (req, res) => {
    res.json({
        message: 'Add a post'
    })
});

// @desc    Edit Post
// @route   PUT /:id
router.put('/:id', verifyAuth, (req, res) => {
    res.json({
        message: 'Edit a post'
    })
});

// @desc    Delete post
// @route   DELETE /:id
router.delete('/:id', verifyAuth, (req, res) => {
    res.json({
        message: 'Delete a post'
    })
});

module.exports = router;