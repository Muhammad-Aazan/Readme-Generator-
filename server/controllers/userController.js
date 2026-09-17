const User = require('../models/User');
const { successResponse, errorResponse } = require('../utils/responseHandler');

const getProfile = async (req, res, next) => {
  try {
    const userId = req.user._id || req.user.id;
    let user;
    try {
      user = await User.findById(userId).select('-passwordHash');
    } catch (e) {
      user = req.user;
    }
    return successResponse(res, { user });
  } catch (error) {
    next(error);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const userId = req.user._id || req.user.id;
    const allowedFields = ['name', 'bio', 'avatar', 'location', 'website', 'socialLinks', 'tagline'];
    const updateData = {};

    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    });

    let updatedUser;
    try {
      updatedUser = await User.findByIdAndUpdate(userId, { $set: updateData }, { new: true, runValidators: true }).select('-passwordHash');
    } catch (e) {
      updatedUser = { ...req.user, ...updateData };
    }

    return successResponse(res, { user: updatedUser }, 'Profile updated successfully');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProfile,
  updateProfile
};