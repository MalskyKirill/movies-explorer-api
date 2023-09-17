const { ERROR_CONFLICT_CODE } = require('../constStatusCode');

class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ConflictError';
    this.statusCode = ERROR_CONFLICT_CODE;
  }
}

module.exports = ConflictError;
