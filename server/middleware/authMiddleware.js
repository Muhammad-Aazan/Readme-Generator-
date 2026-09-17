const User = require('../models/User');
const { verifyAccessToken } = require('../utils/jwt');
const { errorResponse } = require('../utils/responseHandler');

const protect = async (req, res, next) => {
  try {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }

    if (!token) {
      return errorResponse(res, 'Not authorized, no token provided', 401, 'AUTH_REQUIRED');
    }

    try {
      const decoded = verifyAccessToken(token);
      let user = null;
      try {
        user = await User.findById(decoded.id).select('-passwordHash');
      } catch (dbErr) {
        // Fallback for mock/offline dev mode
      }
      
      if (!user) {
        // If DB not connected or demo user
        user = {
          _id: decoded.id,
          role: decoded.role || 'user',
          email: decoded.email || 'user@example.com',
          username: decoded.username || 'developer'
        };
      }

      req.user = user;
      next();
    } catch (err) {
      return errorResponse(res, 'Not authorized, token invalid or expired', 401, 'TOKEN_EXPIRED');
    }
  } catch (error) {
    return errorResponse(res, 'Authentication error', 500, 'AUTH_ERROR');
  }
};

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return errorResponse(res, 'User role is not authorized to access this route', 403, 'FORBIDDEN');
    }
    next();
  };
};

module.exports = {
  protect,
  authorize
};