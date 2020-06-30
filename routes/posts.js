const express = require('express');
const router = express.Router();
const slug = require('slug');
const verifyAuth = require('../middleware/verifyToken');

const Post = require('../models/Post');

const { postValidation } = require('../validation');

// @desc    Posts list
// @route   GET /
router.get('/', verifyAuth, async (req, res) => {
    
    try {
        // Get all posts
        const posts = await Post.find()
        .populate('user')
        .sort({createdAt: 'desc'})
        .lean();
    
        // Display posts
        res.json({
            posts: posts
        })

    } catch(err) {
        res.status(401).send(err);
    }

});

// @desc    Single Post
// @route   GET /:id
router.get('/:id', verifyAuth, async (req, res) => {

    try {
        // Find post by id/slug
        const post = await Post.findOne({ slug: req.params.id });
        // Send post to the user
        res.send({
            post: post
        });

    } catch(err) {
        res.status(500).send(err);
        console.error(err);
    }

});

// @desc    Add Post
// @route   POST /
router.post('/add', verifyAuth, async (req, res) => {

    const { error } = postValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    // Create post
    const post = new Post({
        title: req.body.title,
        slug: slug(req.body.title),
        status: req.body.status,
        user: req.user,
    });

    // Upload post
    try {
        const savedPost = await post.save();
        res.json({
            message: "Your post has been uploaded",
            post: savedPost
        });
    } catch(err) {
        res.status(401).send(err);
    }

});

// @desc    Edit Post
// @route   PUT /:id
router.put('/:id', verifyAuth, async (req, res) => {
    // Get post
    const post = await Post.findOne({ slug: req.params.id });

    // Check if the owner of the post is editing it
    if(post.user != req.user.id) return res.send("You do not own this post!");

    // Find post that needs edited
    try {
        // Get and update post
        const post = await Post.findOneAndUpdate({ slug: req.params.id }, req.body, {
            runValidators: true,
            new: true
        });

        // Update the user
        res.json({
            message: "Post successfully updated",
            post: post
        })

    } catch(err) {
        res.status(500).send(err);
        console.error(err);
    }

});

// @desc    Delete post
// @route   DELETE /:id
router.delete('/:id', verifyAuth, async(req, res) => {

    // Get post
    const post = await Post.findOne({ slug: req.params.id });

    // Delete post
    try {
        await Post.remove({ slug: req.params.id });
        res.json({
            message: "Post deleted successfully!"
        })
    } catch(err) {
        res.status(500).send(err);
        console.error(err);
    }

});

module.exports = router;