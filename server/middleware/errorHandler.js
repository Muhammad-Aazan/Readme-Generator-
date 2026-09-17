const { errorResponse } = require('../utils/responseHandler');

const notFound = (req, res, next) => {
  return errorResponse(res, 'API route not found - ' + req.originalUrl, 404, 'NOT_FOUND');
};

const errorHandler = (err, req, res, next) => {
  console.error('[Error caught by global handler]:', err.stack || err.message);

  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message || 'Internal Server Error';
  let errorCode = err.code || 'INTERNAL_ERROR';

  if (err.name === 'CastError') {
    message = 'Resource not found or invalid identifier format';
    statusCode = 404;
    errorCode = 'RESOURCE_NOT_FOUND';
  }

  if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0] || 'field';
    message = 'Duplicate field value entered: ' + field + '. Please use another value.';
    statusCode = 409;
    errorCode = 'DUPLICATE_KEY_ERROR';
  }

  if (err.name === 'ValidationError') {
    message = Object.values(err.errors).map(val => val.message).join(', ');
    statusCode = 400;
    errorCode = 'VALIDATION_ERROR';
  }

  return errorResponse(res, message, statusCode, errorCode);
};

module.exports = {
  notFound,
  errorHandler
};