const GithubConnection = require('../models/GithubConnection');
const User = require('../models/User');
const GithubService = require('../services/githubService');
const { encryptToken, decryptToken } = require('../services/tokenEncryption');
const { successResponse, errorResponse } = require('../utils/responseHandler');

const memoryConnections = [];

const getConnectUrl = async (req, res, next) => {
  try {
    const clientId = process.env.GITHUB_CLIENT_ID || 'placeholder_client_id';
    const redirectUri = process.env.GITHUB_CALLBACK_URL || 'http://localhost:5000/api/github/callback';
    const scope = 'read:user,user:email,repo';
    const state = Math.random().toString(36).substring(7);

    const githubUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&scope=${scope}&state=${state}`;

    return successResponse(res, { url: githubUrl, state });
  } catch (error) {
    next(error);
  }
};

const handleCallback = async (req, res, next) => {
  try {
    const { code } = req.query;
    if (!code) {
      return errorResponse(res, 'OAuth code missing', 400, 'CODE_REQUIRED');
    }

    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
    return res.redirect(`${frontendUrl}/github/callback?code=${code}`);
  } catch (error) {
    next(error);
  }
};

const getProfile = async (req, res, next) => {
  try {
    const userId = req.user._id || req.user.id;
    let conn = null;
    try {
      conn = await GithubConnection.findOne({ userId });
    } catch (e) {
      conn = memoryConnections.find(c => String(c.userId) === String(userId));
    }

    if (!conn) {
      return errorResponse(res, 'GitHub account is not connected', 404, 'GITHUB_NOT_CONNECTED');
    }

    const token = decryptToken(conn.accessTokenEncrypted);
    const profile = await GithubService.getProfile(token);
    return successResponse(res, { profile });
  } catch (error) {
    next(error);
  }
};

const getRepositories = async (req, res, next) => {
  try {
    const userId = req.user._id || req.user.id;
    let conn = null;
    try {
      conn = await GithubConnection.findOne({ userId });
    } catch (e) {
      conn = memoryConnections.find(c => String(c.userId) === String(userId));
    }

    if (!conn) {
      // Fallback sample repos for demo if not linked
      return successResponse(res, {
        repos: [
          {
            id: 1,
            name: 'fullstack-saas-starter',
            description: 'Production-ready React and Node.js microservice starter repository.',
            stargazers_count: 124,
            forks_count: 32,
            language: 'TypeScript',
            html_url: 'https://github.com/example/fullstack-saas-starter',
            updated_at: new Date().toISOString()
          },
          {
            id: 2,
            name: 'ai-prompt-evaluator',
            description: 'Benchmarking and testing LLM prompt performance with automated metrics.',
            stargazers_count: 88,
            forks_count: 14,
            language: 'Python',
            html_url: 'https://github.com/example/ai-prompt-evaluator',
            updated_at: new Date().toISOString()
          }
        ]
      });
    }

    const token = decryptToken(conn.accessTokenEncrypted);
    const repos = await GithubService.getRepositories(token);
    return successResponse(res, { repos });
  } catch (error) {
    next(error);
  }
};

const pushReadme = async (req, res, next) => {
  try {
    const userId = req.user._id || req.user.id;
    const { owner, repo, branch, path, message, content } = req.body;

    if (!owner || !repo || !content) {
      return errorResponse(res, 'Owner, repo, and content are required', 400, 'MISSING_FIELDS');
    }

    let conn = null;
    try {
      conn = await GithubConnection.findOne({ userId });
    } catch (e) {
      conn = memoryConnections.find(c => String(c.userId) === String(userId));
    }

    if (!conn) {
      return errorResponse(res, 'Please connect your GitHub account first', 400, 'GITHUB_NOT_CONNECTED');
    }

    const token = decryptToken(conn.accessTokenEncrypted);
    const result = await GithubService.pushReadme(token, {
      owner,
      repo,
      branch: branch || 'main',
      path: path || 'README.md',
      message,
      content
    });

    return successResponse(res, { result }, 'README committed successfully to GitHub!');
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return errorResponse(res, 'Repository or branch not found on GitHub', 404, 'REPO_NOT_FOUND');
    }
    if (error.response && error.response.status === 401) {
      return errorResponse(res, 'GitHub token expired or revoked', 401, 'GITHUB_TOKEN_EXPIRED');
    }
    next(error);
  }
};

const disconnect = async (req, res, next) => {
  try {
    const userId = req.user._id || req.user.id;
    try {
      await GithubConnection.findOneAndDelete({ userId });
      await User.findByIdAndUpdate(userId, { githubConnected: false, githubUsername: '' });
    } catch (e) {
      const idx = memoryConnections.findIndex(c => String(c.userId) === String(userId));
      if (idx !== -1) memoryConnections.splice(idx, 1);
    }
    return successResponse(res, null, 'GitHub disconnected successfully');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getConnectUrl,
  handleCallback,
  getProfile,
  getRepositories,
  pushReadme,
  disconnect
};