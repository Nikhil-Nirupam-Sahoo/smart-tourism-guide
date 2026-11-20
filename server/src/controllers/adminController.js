const asyncHandler = require('express-async-handler');
const {
  countDocuments, findDestinations, findTrips, findUserById,
} = require('../db');
const User = require('../models/User');
const Destination = require('../models/Destination');
const Trip = require('../models/Trip');

/**
 * GET /api/admin/stats  — dashboard overview
 */
const getStats = asyncHandler(async (_req, res) => {
  const [users, destinations, trips] = await Promise.all([
    User.countDocuments(),
    Destination.countDocuments({ isActive: true }),
    Trip.countDocuments(),
  ]);
  res.json({ users, destinations, trips });
});

/**
 * GET /api/admin/destinations  — all destinations (incl. inactive) for management
 */
const adminGetDestinations = asyncHandler(async (req, res) => {
  const { featured, page = 1, limit = 20 } = req.query;
  const filter = {};
  if (featured === 'true') filter.isFeatured = true;
  if (featured === 'false') filter.isFeatured = false;

  const pageNum = Math.max(parseInt(page, 10) || 1, 1);
  const limitNum = Math.min(Math.max(parseInt(limit, 10) || 20, 1), 100);
  const skip = (pageNum - 1) * limitNum;

  const [destinations, total] = await Promise.all([
    Destination.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limitNum),
    Destination.countDocuments(filter),
  ]);
  res.json({ destinations, pagination: { page: pageNum, limit: limitNum, total, totalPages: Math.ceil(total / limitNum) } });
});

/**
 * PATCH /api/admin/destinations/:id  — toggle featured / active / update fields
 */
const adminUpdateDestination = asyncHandler(async (req, res) => {
  const { isFeatured, isActive, category, priceLevel, bookingLinks } = req.body;
  const updates = {};
  if (isFeatured !== undefined) updates.isFeatured = isFeatured;
  if (isActive !== undefined) updates.isActive = isActive;
  if (category) updates.category = category;
  if (priceLevel) updates.priceLevel = priceLevel;
  if (bookingLinks) updates.bookingLinks = bookingLinks;

  const dest = await Destination.findByIdAndUpdate(req.params.id, updates, { new: true });
  if (!dest) {
    res.status(404);
    throw new Error('Destination not found');
  }
  res.json(dest);
});

/**
 * GET /api/admin/users
 */
const adminGetUsers = asyncHandler(async (_req, res) => {
  const users = await User.find({}, '-password').sort({ createdAt: -1 }).limit(50);
  res.json(users);
});

module.exports = { getStats, adminGetDestinations, adminUpdateDestination, adminGetUsers };
