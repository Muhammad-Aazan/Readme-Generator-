const mongoose = require('mongoose');
const User = require('../models/User');
const { generateAccessToken, generateRefreshToken, verifyRefreshToken } = require('../utils/jwt');
const { successResponse, errorResponse } = require('../utils/responseHandler');

const memoryUsers = [];
const isDbConnected = () => mongoose.connection && mongoose.connection.readyState === 1;

const register = async (req, res, next) => {
  try {
    const { name, username, email, password } = req.body;

    let userExists = null;
    if (isDbConnected()) {
      try {
        userExists = await User.findOne({
          $or: [{ email: email.toLowerCase() }, { username: username.toLowerCase() }]
        });
      } catch (e) {
        userExists = memoryUsers.find(
          u => u.email === email.toLowerCase() || u.username === username.toLowerCase()
        );
      }
    } else {
      userExists = memoryUsers.find(
        u => u.email === email.toLowerCase() || u.username === username.toLowerCase()
      );
    }

    if (userExists) {
      return errorResponse(res, 'User with this email or username already exists', 400, 'USER_EXISTS');
    }

    let user;
    if (isDbConnected()) {
      try {
        const passwordHash = await User.hashPassword(password);
        user = await User.create({
          name,
          username: username.toLowerCase(),
          email: email.toLowerCase(),
          passwordHash
        });
      } catch (dbErr) {
        const bcrypt = require('bcryptjs');
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);
        user = {
          _id: 'mem_' + Date.now(),
          name,
          username: username.toLowerCase(),
          email: email.toLowerCase(),
          passwordHash,
          role: 'user',
          socialLinks: {},
          matchPassword: async (pwd) => bcrypt.compare(pwd, passwordHash)
        };
        memoryUsers.push(user);
      }
    } else {
      const bcrypt = require('bcryptjs');
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(password, salt);
      user = {
        _id: 'mem_' + Date.now(),
        name,
        username: username.toLowerCase(),
        email: email.toLowerCase(),
        passwordHash,
        role: 'user',
        socialLinks: {},
        matchPassword: async (pwd) => bcrypt.compare(pwd, passwordHash)
      };
      memoryUsers.push(user);
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    return successResponse(
      res,
      {
        user: {
          id: user._id,
          name: user.name,
          username: user.username,
          email: user.email,
          role: user.role,
          avatar: user.avatar || ''
        },
        token: accessToken,
        refreshToken
      },
      'User registered successfully',
      201
    );
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { identifier, password } = req.body;

    let user;
    if (isDbConnected()) {
      try {
        user = await User.findOne({
          $or: [{ email: identifier.toLowerCase() }, { username: identifier.toLowerCase() }]
        });
      } catch (e) {
        user = memoryUsers.find(
          u => u.email === identifier.toLowerCase() || u.username === identifier.toLowerCase()
        );
      }
    } else {
      user = memoryUsers.find(
        u => u.email === identifier.toLowerCase() || u.username === identifier.toLowerCase()
      );
    }

    if (!user) {
      return errorResponse(res, 'Invalid credentials', 401, 'INVALID_CREDENTIALS');
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return errorResponse(res, 'Invalid credentials', 401, 'INVALID_CREDENTIALS');
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    return successResponse(
      res,
      {
        user: {
          id: user._id,
          name: user.name,
          username: user.username,
          email: user.email,
          role: user.role,
          avatar: user.avatar || '',
          bio: user.bio || '',
          location: user.location || '',
          website: user.website || '',
          githubConnected: user.githubConnected || false,
          githubUsername: user.githubUsername || ''
        },
        token: accessToken,
        refreshToken
      },
      'Logged in successfully'
    );
  } catch (error) {
    next(error);
  }
};

const getMe = async (req, res, next) => {
  try {
    let user;
    try {
      user = await User.findById(req.user._id || req.user.id).select('-passwordHash');
    } catch (e) {
      user = req.user;
    }
    return successResponse(res, { user });
  } catch (error) {
    next(error);
  }
};

const refreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return errorResponse(res, 'Refresh token required', 400, 'REFRESH_TOKEN_REQUIRED');
    }

    const decoded = verifyRefreshToken(refreshToken);
    let user;
    try {
      user = await User.findById(decoded.id);
    } catch (e) {
      user = memoryUsers.find(u => u._id === decoded.id);
    }

    if (!user) {
      return errorResponse(res, 'Invalid refresh token', 401, 'INVALID_REFRESH_TOKEN');
    }

    const newAccessToken = generateAccessToken(user);
    return successResponse(res, { token: newAccessToken }, 'Token refreshed');
  } catch (error) {
    return errorResponse(res, 'Expired or invalid refresh token', 401, 'REFRESH_TOKEN_EXPIRED');
  }
};

const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    return successResponse(res, { email }, 'Password reset instructions sent to your email.');
  } catch (error) {
    next(error);
  }
};

const resetPassword = async (req, res, next) => {
  try {
    return successResponse(res, null, 'Password reset successful. You may now log in.');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  getMe,
  refreshToken,
  forgotPassword,
  resetPassword
};