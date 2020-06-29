const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        max: 255,
    },

    password: {
        type: String,
        required: true,
        max: 1024,
    },

    email: {
        type: String,
        required: true,
        max: 255
    },

    createdAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('User', UserSchema);