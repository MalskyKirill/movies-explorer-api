const MovieModel = require('../models/movie');
const { OK_CREATE_CODE } = require('../utils/constStatusCode');
const ValidationError = require('../utils/errors/ValidationError');
const NotFoundError = require('../utils/errors/NotFoundError');
const ForbiddenError = require('../utils/errors/ForbiddenError');

const getMovies = (req, res, next) => {
  MovieModel.find({})
    .then((movies) => {
      res.send({ data: movies });
    })
    .catch(next);
};

const createMovie = (req, res, next) => {
  const owner = req.user._id;

  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  MovieModel.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner,
  })
    .then((movie) => {
      res.status(OK_CREATE_CODE).send(movie);
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new ValidationError('Введены некоректные данные'));
        return;
      }

      next(err);
    });
};

const deleteMovie = (req, res, next) => {
  const { movieId } = req.params;

  MovieModel.findById(movieId)
    .orFail(() => {
      throw new NotFoundError('Фильм с указанным id не найдена');
    })
    .then((movie) => {
      if (`${movie.owner}` !== req.user._id) {
        throw new ForbiddenError(
          'Нельзя удалять фильм добавленный другим пользователем',
        );
      }

      MovieModel.deleteOne(movie)
        .then(() => {
          res.send({ message: 'Фильм удален' });
        })
        .catch(next);
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new ValidationError('Некоректные данные в запросе'));
        return;
      }

      next(err);
    });
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
