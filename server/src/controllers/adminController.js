const asyncHandler = require('express-async-handler');
const {
  countUsers,
  countDocuments,
  countTrips,
  listDestinations,
  listUsers,
  findDestinationByIdAndUpdate,
} = require('../db');

/**
 * GET /api/admin/stats — dashboard overview.
 * Uses the data-access layer so it works with MongoDB or the in-memory fallback.
 */
const getStats = asyncHandler(async (_req, res) => {
  const [users, destinations, trips] = await Promise.all([
    countUsers(),
    countDocuments({ isActive: { $ne: false } }),
    countTrips(),
  ]);
  res.json({ users, destinations, trips });
});

/**
 * GET /api/admin/destinations — all destinations for management.
 */
const adminGetDestinations = asyncHandler(async (req, res) => {
  const { featured, page = 1, limit = 20 } = req.query;
  const filter = {};
  if (featured === 'true') filter.isFeatured = true;
  if (featured === 'false') filter.isFeatured = false;

  const pageNum = Math.max(parseInt(page, 10) || 1, 1);
  const limitNum = Math.min(Math.max(parseInt(limit, 10) || 20, 1), 100);
  const skip = (pageNum - 1) * limitNum;

  const { destinations, total } = await listDestinations(filter, { skip, limit: limitNum });
  res.json({
    destinations,
    pagination: { page: pageNum, limit: limitNum, total, totalPages: Math.ceil(total / limitNum) },
  });
});

/**
 * PATCH /api/admin/destinations/:id — update featured/active/category/etc.
 */
const adminUpdateDestination = asyncHandler(async (req, res) => {
  const { isFeatured, isActive, category, priceLevel, bookingLinks } = req.body;
  const updates = {};
  if (isFeatured !== undefined) updates.isFeatured = isFeatured;
  if (isActive !== undefined) updates.isActive = isActive;
  if (category) updates.category = category;
  if (priceLevel) updates.priceLevel = priceLevel;
  if (bookingLinks) updates.bookingLinks = bookingLinks;

  const dest = await findDestinationByIdAndUpdate(req.params.id, updates);
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
  res.json(await listUsers());
});

module.exports = { getStats, adminGetDestinations, adminUpdateDestination, adminGetUsers };
