const { User, Game, Post, Comment } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth.js');
const mongoose = require('mongoose');

const resolvers = {
  Query: {
    me: async (_, __, context) => {
      if (context.user) {
        return await User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError('You must be logged in to view this information!');
    },
    getPost: async (_, { postId }, context) => {
      if (!context.user) {
        throw new AuthenticationError('You must be logged in to view this post!');
      }
      return await Post.findById(postId);
    },
    getAllPosts: async (_, __, context) => {
      if (!context.user) {
        throw new AuthenticationError('You must be logged in to view posts!');
      }
      return await Post.find();
    },
    comments: async (_, { postId }, context) => {
      try {
        const comments = await Comment.find({ post: postId }).populate('author');
        return comments;
      } catch (error) {
        throw new Error('Failed to fetch comments');
      }
    },
  },
  Mutation: {
    addUser: async (_, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Invalid email or password');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Invalid email or password');
      }

      const token = signToken(user);

      return { token, user };
    },
    createPost: async (_, { title, content }, context) => {
      if (!context.user) {
        throw new AuthenticationError('You must be logged in to create a post!');
      }
      const newPost = new Post({
        title,
        content,
        author: context.user._id
      });
      const savedPost = await newPost.save();
      savedPost.createdAt = savedPost.createdAt.toLocaleString();
      savedPost.updatedAt = savedPost.updatedAt.toLocaleString();
      return savedPost;
    },
    updatePost: async (_, { postId, content }, context) => {
      if (!context.user) {
        throw new AuthenticationError('You must be logged in to update a post!');
      }

      const updatedPost = await Post.findByIdAndUpdate(
        postId,
        { content, updatedAt: new Date().toISOString() },
        { new: true }
      );
      if (!updatedPost) {
        throw new Error('Post not found');
      }
      return updatedPost;
    },
    deletePost: async (_, { postId }) => {
      try {
        const deletedPost = await Post.findByIdAndDelete(postId);

        if (!deletedPost) {
          throw new Error('Post not found');
        }

        return deletedPost;
      } catch (error) {
        console.error('Error deleting post:', error);
        throw new Error('Failed to delete post');
      }
    },
    createComment: async (_, { content, post }, context) => {
      if (!context.user) {
        throw new AuthenticationError('You must be logged in to make a comment!');
      }
      try {
        const comment = await Comment.create({
          content,
          author: context.user._id,
          post,
        });
        return comment;
      } catch (error) {
        throw new Error('Failed to create comment');
      }
    },
    updateComment: async (_, { id, content }, context) => {
      try {
        const updatedComment = await Comment.findByIdAndUpdate(
          id,
          { content, updatedAt: new Date() },
          { new: true }
        );

        if (!updatedComment) {
          throw new Error('Comment not found');
        }

        return updatedComment;
      } catch (error) {
        throw new Error('Failed to update comment');
      }
    },
    deleteComment: async (_, { id }, context) => {
      try {
        await Comment.findByIdAndDelete(id);
        return "Comment deleted successfully";
      } catch (error) {
        throw new Error('Failed to delete comment');
      }
    },
    addToWishlist: async (_, { gameData }, context) => {
      if (!context.user) {
        throw new AuthenticationError('You must be logged in to add to wishlist!');
      }
      
      const updatedUser = await User.findByIdAndUpdate(
        context.user._id,
        { $push: { wishlist: gameData } },
        { new: true }
      );

      return updatedUser;
    },
    addToCurrentlyPlaying: async (_, { input }, context) => {
      if (!context.user) {
        throw new AuthenticationError('You must be logged in to add to currently playing!');
      }
      
      const game = await Game.findById(input.gameId);

      if (!game) {
        throw new Error('Game not found');
      }

      await User.findByIdAndUpdate(context.user._id, {
        $push: { currentlyPlaying: game },
      });

      return game;
    },
  },
  Comment: {
    author: async (comment) => {
      return await User.findById(comment.author);
    },
    post: async (comment) => {
      return await Post.findById(comment.post);
    },
  },
  Post: {
    author: async (parent) => {
      return await User.findById(parent.author);
    },
  },
};

module.exports = resolvers;
