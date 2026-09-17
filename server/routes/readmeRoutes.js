const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  getReadmes,
  getReadmeById,
  getPublicReadme,
  createReadme,
  updateReadme,
  deleteReadme,
  duplicateReadme
} = require('../controllers/readmeController');

// Public route for shared READMEs
router.get('/public/:username/:slug', getPublicReadme);

// Authenticated CRUD routes
router.use(protect);
router.get('/', getReadmes);
router.post('/', createReadme);
router.get('/:id', getReadmeById);
router.patch('/:id', updateReadme);
router.delete('/:id', deleteReadme);
router.post('/:id/duplicate', duplicateReadme);

module.exports = router;