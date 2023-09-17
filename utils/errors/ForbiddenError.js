const { ERROR_FORBIDDEN_CODE } = require('../constStatusCode');

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ForbiddenError';
    this.statusCode = ERROR_FORBIDDEN_CODE;
  }
}

module.exports = ForbiddenError;
