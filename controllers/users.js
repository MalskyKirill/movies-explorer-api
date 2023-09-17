const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserModel = require('../models/user');
const NotFoundError = require('../utils/errors/NotFoundError');
const ValidationError = require('../utils/errors/ValidationError');
const ConflictError = require('../utils/errors/ConflictError');
const UnauthorizedError = require('../utils/errors/UnauthorizedError');
const { OK_CREATE_CODE } = require('../utils/constStatusCode');

const { NODE_ENV, JWT_SECRET } = process.env;

const SALT_ROUNDS = 10;

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

  const { email, name } = req.body;

  UserModel.findByIdAndUpdate(
    _id,
    { email, name },
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

      if (err.code === 11000) {
        next(new ConflictError('Пользователь с таким email уже существует'));
        return;
      }

      next(err);
    });
};

const createUser = (req, res, next) => {
  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    throw new ValidationError(
      'Email и пароль и имя пользователя не могут быть пустыми',
    );
  }

  bcrypt
    .hash(password, SALT_ROUNDS)
    .then((hash) => UserModel.create({
      email,
      password: hash,
      name,
    }))
    .then((user) => {
      res.status(OK_CREATE_CODE).send({
        _id: user._id,
        name: user.name,
        email: user.email,
      });
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
};

const loginUser = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ValidationError('Email и пароль не могут быть пустыми');
  }

  UserModel.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError('Пользователь с указаным email не найден');
      }

      return bcrypt.compare(password, user.password, (err, isValidPassvord) => {
        if (!isValidPassvord) {
          next(new UnauthorizedError('Пароль не верный'));
          return;
        }
        const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key', {
          expiresIn: '7d',
        });
        res.send({ token });
      });
    })
    .catch(next);
};

module.exports = {
  getCurrentUser, updateUserProfile, createUser, loginUser,
};
