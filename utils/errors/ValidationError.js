const { ERROR_VALIDATION_CODE } = require('../constStatusCode');

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
    this.statusCode = ERROR_VALIDATION_CODE;
  }
}

module.exports = ValidationError;
