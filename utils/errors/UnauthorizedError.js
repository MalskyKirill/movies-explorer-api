const { ERROR_UNAUTHORIZED_CODE } = require('../constStatusCode');

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.name = 'UnauthorizedError';
    this.statusCode = ERROR_UNAUTHORIZED_CODE;
  }
}

module.exports = UnauthorizedError;
