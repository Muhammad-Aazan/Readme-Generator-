const mongoose = require('mongoose');

const githubConnectionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true
    },
    githubUserId: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true
    },
    accessTokenEncrypted: {
      type: String,
      required: true
    },
    scopes: {
      type: [String],
      default: ['read:user', 'user:email', 'repo']
    },
    connectedAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('GithubConnection', githubConnectionSchema);