const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({ 
    title: {
        type: String, 
        required: true,
        maxlength: 280,
    },
    content: {
        type: String, 
        required: true,
        maxlength: 10000,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true,
    }
}, {
    timestamps: true
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
