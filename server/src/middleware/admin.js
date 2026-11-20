const asyncHandler = require('express-async-handler');

/**
 * Require admin role.
 */
const adminOnly = asyncHandler(async (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    res.status(403);
    throw new Error('Admin access required');
  }
  next();
});

module.exports = { adminOnly };
