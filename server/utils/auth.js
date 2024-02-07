const { AuthenticationError } = require('apollo-server-express'); // import AuthenticationError from apollo-server-express
const jwt = require('jsonwebtoken');

const secret = 'secretKEY'; // update with secret key
const expiration = '2h';

module.exports = {
  AuthenticationError: AuthenticationError, // export AuthenticationError directly
  authMiddleware: function ({ req }) {
    let token = req.headers.authorization || '';

    if (token.startsWith('Bearer ')) {
      // remove 'Bearer ' from token string
      token = token.slice(7, token.length).trim();
    }

    if (!token) {
      return req;
    }

    try {
      const { data } = jwt.verify(token, secret);
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
