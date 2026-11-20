const asyncHandler = require('express-async-handler');
const {
  findDestinations,
  countDocuments,
  findDestinationById,
  distinctCategories,
} = require('../db');

/**
 * @desc    Get all destinations with optional filtering
 * @route   GET /api/destinations
 * @access  Public
 */
const getDestinations = asyncHandler(async (req, res) => {
  const {
    category,
    featured,
    search,
    minRating,
    priceLevel,
    page = 1,
    limit = 20,
  } = req.query;

  const filter = { isActive: true };

  if (category) filter.category = category;
  if (featured === 'true') filter.isFeatured = true;
  if (minRating) filter.rating = { $gte: Number(minRating) };
  if (priceLevel) filter.priceLevel = priceLevel;

  if (search) {
    filter.$text = { $search: search };
  }

  const pageNum = Math.max(parseInt(page, 10) || 1, 1);
  const limitNum = Math.min(Math.max(parseInt(limit, 10) || 20, 1), 100);

  const { destinations, total } = await findDestinations(filter, {
    page: pageNum,
    limit: limitNum,
    sort: featured === 'true' ? { isFeatured: -1, rating: -1 } : { rating: -1, createdAt: -1 },
  });

  res.json({
    destinations,
    pagination: {
      page: pageNum,
      limit: limitNum,
      total,
      totalPages: Math.ceil(total / limitNum),
    },
  });
});

/**
 * @desc    Get a single destination by ID
 * @route   GET /api/destinations/:id
 * @access  Public
 */
const getDestinationById = asyncHandler(async (req, res) => {
  const destination = await findDestinationById(req.params.id);
  if (!destination || destination.isActive === false) {
    res.status(404);
    throw new Error('Destination not found');
  }
  res.json(destination);
});

/**
 * @desc    Get featured destinations
 * @route   GET /api/destinations/featured
 * @access  Public
 */
const getFeatured = asyncHandler(async (req, res) => {
  const { destinations } = await findDestinations(
    { isActive: true, isFeatured: true },
    { limit: 6, sort: { rating: -1 } }
  );
  res.json(destinations);
});

/**
 * @desc    Get all unique categories
 * @route   GET /api/destinations/categories
 * @access  Public
 */
const getCategories = asyncHandler(async (_req, res) => {
  const categories = await distinctCategories();
  res.json(categories);
});

module.exports = { getDestinations, getDestinationById, getFeatured, getCategories };
