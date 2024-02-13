const { connect, connection } = require('mongoose');
const mongoose = require('mongoose');
 
//  mongoose.connect(
//      process.env.MONGODB_URI || 'mongodb+srv://bkness:ziggy@cluster0.pf0alen.mongodb.net/game_test_db'
//    );


mongoose.connect(
  process.env.MONGODB_URI || 'mongodb+srv://dylanhoryza:dog123@cluster0.ezqwhyq.mongodb.net/game_db?retryWrites=true&w=majority'
);


module.exports = mongoose.connection;
