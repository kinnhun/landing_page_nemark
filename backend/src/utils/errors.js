class ApiError extends Error {
  constructor(statusCode, message, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    Error.captureStackTrace(this, this.constructor);
  }
}

class ValidationError extends ApiError {
  constructor(message) {
    super(400, message);
  }
}

class NotFoundError extends ApiError {
  constructor(message = 'Resource not found') {
    super(404, message);
  }
}

class InternalError extends ApiError {
  constructor(message = 'Internal server error') {
    super(500, message, false);
  }
}

module.exports = {
  ApiError,
  ValidationError,
  NotFoundError,
  InternalError
};
