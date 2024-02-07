// const { AuthenticationError } = require('apollo-server-express'); // import AuthenticationError from apollo-server-express
const jwt = require('jsonwebtoken');
const {GraphQLError} = require('graphql');

const secret = 'secretKEY'; // update with secret key
const expiration = '2h';

module.exports = {
  AuthenticationError: new GraphQLError('cannot authenticate user', {
    extensions: {
      code: 'UNAUTHENTICATED'
    }
  }), // export AuthenticationError directly
  authMiddleware: function ({ req }) {
    let token = req.body.token || req.query.token || req.headers.authorization;

    if (req.headers.authorization) {
      // remove 'Bearer ' from token string
      token = token.split(' ').pop().trim();
    }

    if (!token) {
      return req;
    }

    try {
      const { data } = jwt.verify(token, secret, {maxAge: expiration});
      req.user = data;
    } catch (error) {
      console.error('Invalid token:', error.message);
    }

    return req;
  },
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
