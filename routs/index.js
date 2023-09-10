const router = require('express').Router();
const usersRouter = require('./users');
const moviesRouter = require('./movies');

router.use('/users', usersRouter);
router.use('/movies', moviesRouter);
router.use('*', () => {
  throw new Error('not found page');
});
