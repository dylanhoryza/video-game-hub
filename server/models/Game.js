const { Schema } = require('mongoose');

const gameSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  gameId: {
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

// const Game = mongoose.model('Game', gameSchema);

module.exports = gameSchema;