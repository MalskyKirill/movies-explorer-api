const mongoose = require('mongoose');
const UserModel = require('./user');
const regExpUrl = require('../utils/regExp');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    require: true,
  },
  director: {
    type: String,
    require: true,
  },
  duration: {
    type: Number,
    require: true,
  },
  year: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    validate: regExpUrl,
    required: true,
  },
  trailerLink: {
    type: String,
    validate: regExpUrl,
    required: true,
  },
  thumbnail: {
    type: String,
    validate: regExpUrl,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: UserModel,
    required: true,
  },
  movieId: {
    type: Number,
    require: true,
  },
  nameRU: {
    type: String,
    require: true,
  },
  nameEN: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
