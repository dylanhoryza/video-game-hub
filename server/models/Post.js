const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({ 
    title: {
        type: String, 
        require: true,
        maxlength: 280,
    },
    content: {
        type: String, 
        required: true,
        maxlength: 10000,
    },
    author: {
        type: String,
        ref: 'User', 
        required: true,
    }
}, {
    timestamps: true
});
    // these are all optional and i'd like your guys' feedback on if we should include these or not
    // makes each post have a readable url 
    // slug: {
    //     type: String,
    //     required: true,
    //     unique: true,
    // },
    // // allows users to categorize posts, making search by tag easier 
    // tags: [{
    //     type: String,
    // }],
    // // represents likes as an array 
    // likes: [{
    //     type: mongoose.Schema.EventEmitter.Types.ObjectId,
    //     ref: 'User',
    // }],
    // // keeps track of number of commments allows user to see engagement with post 
    // commentsCount: {
    //     type: Number,
    //     default: 0,
    // }

const Post = mongoose.model('Post', postSchema);

module.exports = Post;