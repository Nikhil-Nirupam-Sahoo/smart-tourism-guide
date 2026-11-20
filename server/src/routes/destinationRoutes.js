const express = require('express');
const router = express.Router();
const {
  getDestinations,
  getDestinationById,
  getFeatured,
  getCategories,
} = require('../controllers/destinationController');

router.get('/', getDestinations);
router.get('/featured', getFeatured);
router.get('/categories', getCategories);
router.get('/:id', getDestinationById);

module.exports = router;
