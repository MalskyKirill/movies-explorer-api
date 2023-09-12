const UserModel = require('../models/user');
const NotFoundError = require('../utils/errors/NotFoundError');
const ValidationError = require('../utils/errors/ValidationError');
const ConflictError = require('../utils/errors/ConflictError');

const getCurrentUser = (req, res, next) => {
  const { _id } = req.user;

  UserModel.findById(_id)
    .orFail(() => {
      throw new NotFoundError('Пользователь с указанным id не найден');
    })
    .then((user) => {
      res.send(user);
    })
    .catch(next);
};

const updateUserProfile = (req, res, next) => {
  const { _id } = req.user;

  const { name, about } = req.body;

  UserModel.findByIdAndUpdate(
    _id,
    { name, about },
    { new: true, runValidators: true },
  )
    .orFail(() => {
      throw new NotFoundError('Пользователь с указанным id не найден');
    })
    .then((newData) => {
      res.send(newData);
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new ValidationError('Введены некоректные данные'));
        return;
      }

      next(err);
    });
};

const createUser = (req, res, next) => {
  const { email, password, name } = req.body;

  console.log(email, password, name)

  if (!email || !password || !name) {
    throw new ValidationError(
      'Email и пароль и имя пользователя не могут быть пустыми',
    );
  }

  UserModel.create({
    email,
    password,
    name,
  }).then((user) => {
    res
      .status(201)
      .send({
        _id: user._id,
        password: user.password,
        name: user.name,
      })
      .catch((err) => {
        if (err.name === 'ValidationError' || err.name === 'CastError') {
          next(new ValidationError('Введены некоректные данные'));
          return;
        }

        if (err.code === 11000) {
          next(new ConflictError('Пользователь с таким email уже существует'));
          return;
        }

        next(err);
      });
  });
};

module.exports = { getCurrentUser, updateUserProfile, createUser };
