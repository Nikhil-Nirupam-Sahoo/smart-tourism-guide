const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const { findUserById } = require('../db');

/**
 * Protect routes — requires a valid JWT in the Authorization header.
 * Header format: Authorization: Bearer <token>
 */
const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // Use the current role from the database so a role change (or upgrade)
      // takes effect immediately, even with an older token.
      const freshUser = await findUserById(decoded.id);
      req.user = {
        id: decoded.id,
        email: decoded.email,
        role: freshUser ? freshUser.role : decoded.role,
      };
      return next();
    } catch (err) {
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

/**
 * Optional auth — attaches user if a valid token is present, but doesn't require it.
 */
const optionalAuth = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = { id: decoded.id, email: decoded.email, role: decoded.role };
    } catch (err) {
      // ignore invalid tokens for optional auth
      req.user = null;
    }
  }
  next();
});

module.exports = { protect, optionalAuth };
