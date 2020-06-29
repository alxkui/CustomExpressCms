const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: {
        required: true,
        type: String,
        trim: true,
    },

    slug: {
        required: true,
        type: String,
        trim: true,
    },

    status: {
        required: true,
        default: 'public',
        enum: ['public', 'private']
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },

    createdAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Post', StorySchema);