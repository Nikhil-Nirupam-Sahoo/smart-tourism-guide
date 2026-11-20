const express = require('express');
const router = express.Router();
const {
  getMyTrips,
  getTripById,
  createTrip,
  updateTrip,
  deleteTrip,
} = require('../controllers/tripController');
const { protect } = require('../middleware/auth');

router.get('/', protect, getMyTrips);
router.get('/:id', protect, getTripById);
router.post('/', protect, createTrip);
router.put('/:id', protect, updateTrip);
router.delete('/:id', protect, deleteTrip);

module.exports = router;
