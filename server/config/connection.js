const { connect, connection } = require('mongoose');

const connectionString = 'mongodb+srv://bkness:ziggy@cluster0.pf0alen.mongodb.net/game_db'
 
connect(connectionString);

module.exports = connection;
