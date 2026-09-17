const rateLimit = require('express-rate-limit');
const { errorResponse } = require('../utils/responseHandler');

const rateLimitHandler = (message, code = 'RATE_LIMIT_EXCEEDED') => (req, res) => {
  return errorResponse(res, message, 429, code);
};

// Relaxed limits for local development & normal usage
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200, // generous limit for development
  standardHeaders: true,
  legacyHeaders: false,
  handler: rateLimitHandler('Too many login/registration attempts. Please try again in 15 minutes.', 'AUTH_RATE_LIMIT')
});

const githubLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  handler: rateLimitHandler('GitHub sync limit reached. Please wait a few moments before trying again.', 'GITHUB_RATE_LIMIT')
});

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000,
  standardHeaders: true,
  legacyHeaders: false,
  handler: rateLimitHandler('Too many requests from this IP. Please try again later.', 'GENERAL_RATE_LIMIT')
});

module.exports = {
  authLimiter,
  githubLimiter,
  apiLimiter
};