const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { getCurrentUser, updateUserProfile } = require('../controllers');

router.get('/me', getCurrentUser); // получить информацию о пользователе

router.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().email().required(),
      name: Joi.string().min(2).max(30),
    }),
  }),
  updateUserProfile,
); // обновить информацию о пользователе
