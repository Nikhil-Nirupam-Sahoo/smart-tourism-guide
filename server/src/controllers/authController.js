const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {
  createUser,
  findUserByEmail,
  findUserById,
  updateUserById,
} = require('../db');

/**
 * Generate a JWT token
 */
const generateToken = (id, email, role) =>
  jwt.sign({ id, email, role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });

/**
 * @desc    Register a new user
 * @route   POST /api/auth/register
 * @access  Public
 */
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please provide name, email, and password');
  }

  const userExists = await findUserByEmail(email);
  if (userExists) {
    res.status(400);
    throw new Error('User already exists with this email');
  }

  const user = await createUser({ name, email, password });

  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    token: generateToken(user._id, user.email, user.role),
  });
});

/**
 * @desc    Authenticate user & get token
 * @route   POST /api/auth/login
 * @access  Public
 */
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error('Please provide email and password');
  }

  const user = await findUserByEmail(email, true);
  if (!user) {
    res.status(401);
    throw new Error('Invalid email or password');
  }

  const isMatch = await user.comparePassword
    ? await user.comparePassword(password)
    : await bcrypt.compare(password, user.password);

  if (!isMatch) {
    res.status(401);
    throw new Error('Invalid email or password');
  }

  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    token: generateToken(user._id, user.email, user.role),
  });
});

/**
 * @desc    Get current user profile
 * @route   GET /api/auth/me
 * @access  Private
 */
const getMe = asyncHandler(async (req, res) => {
  const user = await findUserById(req.user.id);
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }
  res.json(user.toJSON ? user.toJSON() : user);
});

/**
 * @desc    Update user profile / preferences
 * @route   PUT /api/auth/profile
 * @access  Private
 */
const updateProfile = asyncHandler(async (req, res) => {
  const user = await findUserById(req.user.id);
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  const { name, preferences } = req.body;
  const updates = {};
  if (name) updates.name = name;
  if (preferences) updates.preferences = preferences;

  const updatedUser = await updateUserById(req.user.id, updates);
  res.json({
    _id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
    role: updatedUser.role,
    preferences: updatedUser.preferences,
  });
});

module.exports = { registerUser, loginUser, getMe, updateProfile };
