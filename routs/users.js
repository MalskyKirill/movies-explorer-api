const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { getCurrentUser, updateUserProfile, createUser } = require('../controllers/users');

router.get('/me', getCurrentUser); // получить информацию о пользователе

router.post('/', createUser); // создать пользователя

router.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().email(),
      name: Joi.string().min(2).max(30),
    }),
  }),
  updateUserProfile,
); // обновить информацию о пользователе

module.exports = router;
