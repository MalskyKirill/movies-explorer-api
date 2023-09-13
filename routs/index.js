const router = require('express').Router();
const authRouter = require('./auth');
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const auth = require('../midlewares/auth');

const NotFoundError = require('../utils/errors/NotFoundError');

router.use('/', authRouter);
router.use(auth);
router.use('/users', usersRouter);
router.use('/movies', moviesRouter);
router.use('*', () => {
  throw new NotFoundError('Not found page');
});

module.exports = router;
