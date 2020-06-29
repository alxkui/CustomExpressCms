const express = require('express');
const router = express.Router();

// @desc    Posts list
// @route   GET /
router.get('/', (req, res) => {
    res.json({
        message: 'All Posts'
    })
});

// @desc    Single Post
// @route   GET /:id
router.get('/:id', (req, res) => {
    res.json({
        message: 'Single post'
    })
});

// @desc    Add Post
// @route   POST /
router.get('/add', (req, res) => {
    res.json({
        message: 'Add a post'
    })
});

// @desc    Edit Post
// @route   PUT /:id
router.put('/:id', (req, res) => {
    res.json({
        message: 'Edit a post'
    })
});

// @desc    Delete post
// @route   DELETE /:id
router.delete('/:id', (req, res) => {
    res.json({
        message: 'Delete a post'
    })
});

module.exports = router;