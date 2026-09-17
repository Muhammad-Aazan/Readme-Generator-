const { z } = require('zod');
const { errorResponse } = require('../utils/responseHandler');

const validate = (schema) => (req, res, next) => {
  try {
    const validatedData = schema.parse({
      body: req.body,
      query: req.query,
      params: req.params
    });
    // Assign parsed values back to req
    if (validatedData.body) req.body = validatedData.body;
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      const formattedErrors = error.errors.map(err => ({
        path: err.path.join('.'),
        message: err.message
      }));
      return errorResponse(res, 'Validation failed: ' + formattedErrors.map(e => e.message).join('; '), 400, 'VALIDATION_ERROR', formattedErrors);
    }
    next(error);
  }
};

module.exports = validate;