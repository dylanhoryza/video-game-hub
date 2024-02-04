const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({ 
    title: {
        type: String, 
        require: true,
    },
    content: {
        type: String, 
        required: true,
    },
    author: {
        type: String, 
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now, // might have to make a utils helper for date format for this
    },
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;