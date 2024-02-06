const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  platforms: {
    type: [String],
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  releaseDate: {
    type: String,
    required: true
  }

});

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;