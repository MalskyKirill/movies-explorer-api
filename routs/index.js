const router = require('express').Router();
const usersRouter = require('./users');
// const moviesRouter = require('./movies');

const NotFoundError = require('../utils/errors/NotFoundError');

router.use('/users', usersRouter);
// router.use('/movies', moviesRouter);
router.use('*', () => {
  throw new NotFoundError('Not found page');
});

module.exports = router;
