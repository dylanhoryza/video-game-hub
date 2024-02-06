const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    bio: {
        type: String
    },
    avatar: {
        type: String
    },
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review'
    }],
    wishlist: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Game'
    }],
    currentlyPlaying: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Game'
    }],
    favoriteGames: [String]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
