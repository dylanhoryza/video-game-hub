const { connect, connection } = require('mongoose');
const mongoose = require('mongoose');
 
//  mongoose.connect(
//      process.env.MONGODB_URI || 'mongodb+srv://bkness:ziggy@cluster0.pf0alen.mongodb.net/game_test_db'
//    );

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/'
);

module.exports = mongoose.connection;
