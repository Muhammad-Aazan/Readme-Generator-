const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { getProfile, updateProfile } = require('../controllers/userController');

router.use(protect);
router.get('/me', getProfile);
router.patch('/me', updateProfile);

module.exports = router;