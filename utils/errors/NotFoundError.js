const { ERROR_NOT_FOUND_CODE } = require('../constStatusCode');

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
    this.statusCode = ERROR_NOT_FOUND_CODE;
  }
}

module.exports = NotFoundError;
