const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { githubLimiter } = require('../middleware/rateLimiter');
const {
  getConnectUrl,
  handleCallback,
  getProfile,
  getRepositories,
  pushReadme,
  disconnect
} = require('../controllers/githubController');

// Public OAuth redirect routes
router.get('/connect', getConnectUrl);
router.get('/callback', handleCallback);

// Protected routes requiring authentication
router.use(protect);
router.get('/profile', githubLimiter, getProfile);
router.get('/repos', githubLimiter, getRepositories);
router.post('/readme', githubLimiter, pushReadme);
router.delete('/disconnect', disconnect);

module.exports = router;