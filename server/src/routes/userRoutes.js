const express = require('express');
const router = express.Router();
const {
  toggleFavoriteDestination,
  getMyFavorites,
  getMe,
} = require('../controllers/userController');
const { protect } = require('../middleware/auth');

router.get('/me', protect, getMe);
router.get('/me/favorites', protect, getMyFavorites);
router.post('/me/favorites/:destinationId', protect, toggleFavoriteDestination);

module.exports = router;
