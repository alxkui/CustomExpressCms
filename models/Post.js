const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: {
        required: true,
        type: String,
    },

    slug: {
        type: String,
    },

    status: {
        type: String,
        default: 'public',
        enum: ['public', 'private'],
        required: true,
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

module.exports = mongoose.model('Post', PostSchema);