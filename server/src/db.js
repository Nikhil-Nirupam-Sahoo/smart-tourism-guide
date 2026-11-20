/**
 * Unified data access layer.
 * MongoDB (Mongoose) when connected; in-memory store as fallback.
 */
const mongoose = require('mongoose');
const memory = require('./store/memory');

const User = require('./models/User');
const Destination = require('./models/Destination');
const Trip = require('./models/Trip');

const isConnected = () => mongoose.connection.readyState === 1;

// ---------- Users ----------
const countUsers = async () => {
  if (isConnected()) return User.countDocuments();
  return memory.countUsers();
};

const createUser = async (data) => {
  if (isConnected()) {
    const user = new User(data);
    return user.save();
  }
  return memory.createUser(data);
};

const findUserByEmail = async (email, selectPassword = false) => {
  if (isConnected()) {
    const q = User.findOne({ email: new RegExp(`^${email}$`, 'i') });
    if (selectPassword) q.select('+password');
    return q.exec();
  }
  return memory.findUserByEmail(email);
};

const findUserById = async (id) => {
  if (isConnected()) return User.findById(id);
  return memory.findUserById(id);
};

const updateUserById = async (id, updates) => {
  if (isConnected()) {
    return User.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
  }
  const user = memory.findUserById(id);
  if (!user) return null;
  Object.assign(user, updates);
  user.updatedAt = new Date();
  return user;
};

const toggleFavorite = async (userId, destinationId) => {
  if (isConnected()) {
    const user = await User.findById(userId);
    if (!user) throw new Error('User not found');
    const idx = user.preferences.favoriteDestinations.indexOf(destinationId);
    if (idx === -1) user.preferences.favoriteDestinations.push(destinationId);
    else user.preferences.favoriteDestinations.splice(idx, 1);
    await user.save();
    return user.preferences.favoriteDestinations;
  }
  return memory.toggleFavorite(userId, destinationId);
};

const getFavorites = async (userId) => {
  if (isConnected()) {
    const user = await User.findById(userId).populate('preferences.favoriteDestinations');
    if (!user) throw new Error('User not found');
    return user.preferences.favoriteDestinations;
  }
  return memory.getFavorites(userId);
};

// ---------- Destinations ----------
const findDestinations = async (filter = {}, options = {}) => {
  if (isConnected()) {
    const { page = 1, limit = 20, ...rest } = options;
    const skip = (Math.max(parseInt(page, 10) || 1, 1) - 1) * Math.min(Math.max(parseInt(limit, 10) || 20, 1), 100);
    const [results, total] = await Promise.all([
      Destination.find(filter).sort(options.sort || { rating: -1, createdAt: -1 }).skip(skip).limit(options.limit),
      Destination.countDocuments(filter),
    ]);
    return { destinations: results, total };
  }
  return memory.findDestinations(filter, options);
};

const countDocuments = async (filter = {}) => {
  if (isConnected()) return Destination.countDocuments(filter);
  return memory.countDocuments(filter);
};

const findDestinationById = async (id) => {
  if (isConnected()) return Destination.findById(id);
  return memory.findDestinationById(id);
};

const distinctCategories = async () => {
  if (isConnected()) return Destination.distinct('category', { isActive: true });
  return memory.distinct('category', { isActive: true });
};

// ---------- Weather proxy (Open-Meteo — free, no API key) ----------
const fetchWeather = async (latitude, longitude) => {
  try {
    const res = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weathercode,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=auto`
    );
    if (!res.ok) throw new Error('Weather API failed');
    return res.json();
  } catch (err) {
    console.error('Weather fetch error:', err.message);
    return null;
  }
};

// ---------- Trips ----------
const createTrip = async (data) => {
  if (isConnected()) {
    const trip = new Trip(data);
    return trip.save();
  }
  return memory.createTrip(data);
};

const findTrips = async (filter = {}, options = {}) => {
  if (isConnected()) {
    return Trip.find(filter).populate('destination').sort({ createdAt: -1 });
  }
  return memory.findTrips(filter, options);
};

const findTripById = async (id) => {
  if (isConnected()) return Trip.findById(id).populate('destination');
  return memory.findTripById(id);
};

const findTripByShareToken = async (token) => {
  if (isConnected()) return Trip.findOne({ shareToken: token, isPublic: true }).populate('destination');
  return memory.findTripByShareToken(token);
};

const updateTripById = async (id, updates) => {
  if (isConnected()) {
    return Trip.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
  }
  return memory.findTripByIdAndUpdate(id, updates);
};

const deleteTripById = async (id) => {
  if (isConnected()) {
    const trip = await Trip.findByIdAndDelete(id);
    return !!trip;
  }
  return memory.deleteTrip(id);
};

module.exports = {
  isConnected,
  countUsers,
  createUser, findUserByEmail, findUserById, updateUserById, toggleFavorite, getFavorites,
  findDestinations, countDocuments, findDestinationById, distinctCategories, fetchWeather,
  createTrip, findTrips, findTripById, findTripByShareToken, updateTripById, deleteTripById,
};
