const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { getMovies, createMovie, deleteMovie } = require('../controllers');
const regExpUrl = require('../utils/regExp');

router.get('/', getMovies); // получить все фильмы

router.post(
  '/',
  celebrate({
    body: Joi.object.keys({
      country: Joi.string().required(),
      director: Joi.string().required(),
      duration: Joi.number().required(),
      year: Joi.string().required(),
      description: Joi.string().required().regex(regExpUrl),
      image: Joi.string().required().regex(regExpUrl),
      trailerLink: Joi.string().required().regex(regExpUrl),
      thumbnail: Joi.string().required().regex(regExpUrl),
      owner: Joi.string().required(),
      movieId: Joi.string().required(),
      nameRU: Joi.string().required(),
      nameEN: Joi.string().required(),
    }),
  }),
  createMovie,
); // создать фильм

router.delete('/:movieId', celebrate({
  params: Joi.object.keys({
    movieId: Joi.string().required().length(24),
  }),
}), deleteMovie); // удалить фильм

module.exports = router;
