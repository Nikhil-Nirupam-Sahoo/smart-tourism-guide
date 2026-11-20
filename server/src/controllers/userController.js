const asyncHandler = require('express-async-handler');
const { toggleFavorite, getFavorites, findUserById } = require('../db');

/**
 * POST /api/users/me/favorites/:destinationId
 */
const toggleFavoriteDestination = asyncHandler(async (req, res) => {
  const favorites = await toggleFavorite(req.user.id, req.params.destinationId);
  const isFav = favorites.includes(req.params.destinationId);
  res.json({ favorites, isFav });
});

/**
 * GET /api/users/me/favorites
 */
const getMyFavorites = asyncHandler(async (req, res) => {
  const favorites = await getFavorites(req.user.id);
  res.json(favorites);
});

/**
 * GET /api/users/me
 */
const getMe = asyncHandler(async (req, res) => {
  const user = await findUserById(req.user.id);
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }
  res.json(user.toJSON ? user.toJSON() : user);
});

module.exports = { toggleFavoriteDestination, getMyFavorites, getMe };
