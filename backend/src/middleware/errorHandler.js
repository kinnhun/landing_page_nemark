const { ApiError } = require('../utils/errors');
const response = require('../utils/response');
const config = require('../config');

/**
 * Error handler middleware
 */
const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal server error';

  // Log error in development
  if (config.nodeEnv === 'development') {
    console.error('Error:', err);
  }

  // Handle specific error types
  if (err instanceof ApiError) {
    statusCode = err.statusCode;
    message = err.message;
  }

  // Send error response
  return response.error(res, message, statusCode);
};

/**
 * 404 Not Found handler
 */
const notFoundHandler = (req, res) => {
  return response.error(res, 'Route not found', 404);
};

module.exports = {
  errorHandler,
  notFoundHandler
};
