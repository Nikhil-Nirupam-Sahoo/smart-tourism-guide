const express = require('express');
const router = express.Router();
const {
  getStats,
  adminGetDestinations,
  adminUpdateDestination,
  adminGetUsers,
} = require('../controllers/adminController');
const { protect } = require('../middleware/auth');
const { adminOnly } = require('../middleware/admin');

router.use(protect);
router.use(adminOnly);

router.get('/stats', getStats);
router.get('/destinations', adminGetDestinations);
router.patch('/destinations/:id', adminUpdateDestination);
router.get('/users', adminGetUsers);

module.exports = router;
