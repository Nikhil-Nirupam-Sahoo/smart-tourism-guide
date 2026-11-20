const asyncHandler = require('express-async-handler');
const {
  findDestinations,
  countDocuments,
  findDestinationById,
  distinctCategories,
  fetchWeather,
} = require('../db');

/**
 * GET /api/destinations  — list with filtering, search, pagination
 */
const getDestinations = asyncHandler(async (req, res) => {
  const {
    category, featured, search, minRating, priceLevel, page = 1, limit = 20,
  } = req.query;

  const filter = { isActive: true };
  if (category) filter.category = category;
  if (featured === 'true') filter.isFeatured = true;
  if (minRating) filter.rating = { $gte: Number(minRating) };
  if (priceLevel) filter.priceLevel = priceLevel;
  if (search) filter.$text = { $search: search };

  const pageNum = Math.max(parseInt(page, 10) || 1, 1);
  const limitNum = Math.min(Math.max(parseInt(limit, 10) || 20, 1), 100);

  const { destinations, total } = await findDestinations(filter, {
    page: pageNum, limit: limitNum,
    sort: featured === 'true' ? { isFeatured: -1, rating: -1 } : { rating: -1, createdAt: -1 },
  });

  res.json({ destinations, pagination: { page: pageNum, limit: limitNum, total, totalPages: Math.ceil(total / limitNum) } });
});

/**
 * GET /api/destinations/:id  — single destination (+ weather if coords available)
 */
const getDestinationById = asyncHandler(async (req, res) => {
  const destination = await findDestinationById(req.params.id);
  if (!destination || destination.isActive === false) {
    res.status(404);
    throw new Error('Destination not found');
  }

  let weather = null;
  const coords = destination.location?.coordinates;
  if (coords && coords.length === 2) {
    const [lon, lat] = coords;
    weather = await fetchWeather(lat, lon);
  }

  res.json({ ...destination.toObject ? destination.toObject() : destination, weather });
});

/**
 * GET /api/destinations/featured
 */
const getFeatured = asyncHandler(async (req, res) => {
  const { destinations } = await findDestinations(
    { isActive: true, isFeatured: true }, { limit: 6, sort: { rating: -1 } }
  );
  res.json(destinations);
});

/**
 * GET /api/destinations/categories
 */
const getCategories = asyncHandler(async (_req, res) => {
  const categories = await distinctCategories();
  res.json(categories);
});

module.exports = { getDestinations, getDestinationById, getFeatured, getCategories };
