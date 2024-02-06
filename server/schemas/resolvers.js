const { User } = require('../models')
const { signToken, AuthenticationError } = require('../utils/auth.js')
const resolvers = {
    Query: {
        // parent, args, then context 
        me: async (_, __, context) => {
            if (context.user) {
                return await User.findOne({ _id: context.user._id })
            }
            throw AuthenticationError
        }
    },
    Mutation: {
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw AuthenticationError;
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw AuthenticationError;
            }

            const token = signToken(user);

            return { token, user };
        },
        saveBook: async (_, { bookData }, context) => {
            if (context.user) {
                return await User.findOneAndUpdate({ _id: context.user._id }, { $push: { savedBooks: bookData } }, { runValidators: true, new: true }) // if its data always run validators otherwise they wont run 
            }
            throw AuthenticationError;
        },
        removeBook: async (_, { bookId }, context) => {
            if (context.user) {
                return await User.findByIdAndUpdate(context.user._id, {$pull: {savedBooks: {bookId}}}, {new: true}) /// pushing or pull id doesnt require validation on the id 
            }
            throw AuthenticationError
        }
    }
}

module.exports = resolvers 