const { User } = require('../models');
const { Game } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth.js');
const mongoose = require('mongoose');
const { ObjectId } = require('mongoose');

const resolvers = {
  Query: {
    // parent, args, then context
    me: async (_, __, context) => {
      if (context.user) {
        return await User.findOne({ _id: context.user._id });
      }
      throw AuthenticationError;
    },
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
    // addToWishlist: async (parent, { input }, context) => {
    //   const { userId } = context.user;
    //   const { gameId } = input;

    //   try {
    //     const game = await Game.findById(ObjectId(gameId));


    //     if (!game) {
    //       throw new Error('Game not found');
    //     }

    //     await User.findByIdAndUpdate(userId, { $push: { wishlist: game } });

    //     return game;
    //   } catch (error) {
    //     console.error('Error adding to wishlist:', error);
    //     throw new Error('Failed to add to wishlist');
    //   }
    // },
    addToWishlist: async (_, { input }, context) => {
      // Ensure the user is logged in
      if (context.user) {
        const { userId } = context.user;
        const { gameId } = input;
    
        try {
          // Check if the game exists
          const game = await Game.findById(gameId);
          if (!game) {
            throw new Error('Game not found');
          }
    
          // Add the game to the user's wishlist
          const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $addToSet: { wishlist: ObjectId(game.id) } },
            { new: true, runValidators: true }
          );
    
          return game; // Return the added game
        } catch (error) {
          console.error('Error adding to wishlist:', error);
          throw new Error('Failed to add to wishlist');
        }
      } else {
        throw new AuthenticationError('Not logged in');
      }
    },
    
    addToCurrentlyPlaying: async (parent, { input }, context) => {
      const { userId } = context.user;
      const { gameId } = input;

      try {
        const game = await Game.findById(gameId);

        if (!game) {
          throw new Error('Game not found');
        }

        await User.findByIdAndUpdate(userId, {
          $push: { currentlyPlaying: game },
        });

        return game;
      } catch (error) {
        console.error('Error adding to currently playing:', error);
        throw new Error('Failed to add to currently playing');
      }
    },
  },
};

module.exports = resolvers;
