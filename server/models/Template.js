const mongoose = require('mongoose');

const templateSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    slug: {
      type: String,
      required: true,
      unique: true
    },
    description: {
      type: String,
      default: ''
    },
    preview: {
      type: String,
      default: ''
    },
    category: {
      type: String,
      enum: ['developer', 'creative', 'minimal', 'specialized', 'animated'],
      default: 'developer'
    },
    tags: [String],
    config: {
      type: Object,
      default: {}
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Template', templateSchema);