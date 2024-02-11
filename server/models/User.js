const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const gameSchema = require('./Game')
const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/, 'Must use a valid email address'],
        },
        password: {
            type: String,
            required: true,
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
        wishlist: [gameSchema],
        currentlyPlaying: [gameSchema],
       },
    {
        toJSON: {
            virtuals: true,
        },
    }
);

// hash user password
userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }

    next();
});

// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
