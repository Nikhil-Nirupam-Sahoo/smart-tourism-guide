/**
 * In-memory store used as a fallback when MongoDB is unavailable.
 * Provides a small, Mongoose-like API so controllers can work without a DB.
 */

const users = [];
const destinations = [];
const trips = [];

let nextUserId = 1;
let nextDestId = 1;
let nextTripId = 1;

const generateId = (prefix) => `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;

// ---------- Seed destinations (shared with MongoDB seed) ----------
const seedDestinations = require('../data/destinations');

seedDestinations.forEach((d) => {
  d._id = generateId('dest');
  destinations.push(d);
});

// ---------- Helpers ----------
const findUserByEmail = (email) =>
  users.find((u) => u.email.toLowerCase() === email.toLowerCase());
const findUserById = (id) => users.find((u) => u._id === id);
const findDestinationById = (id) => destinations.find((d) => d._id === id);
const findTripById = (id) => trips.find((t) => t._id === id);

const memory = {
  connected: true,

  // ---------- Users ----------
  createUser: async (data) => {
    if (findUserByEmail(data.email)) {
      const err = new Error('User already exists with this email');
      err.statusCode = 400;
      throw err;
    }
    const bcrypt = require('bcryptjs');
    const user = {
      _id: generateId('user'),
      name: data.name,
      email: data.email.toLowerCase(),
      password: await bcrypt.hash(data.password, 10),
      role: data.role || 'traveler',
      preferences: {
        interests: [],
        budgetLevel: 'mid-range',
        favoriteDestinations: [],
      },
      trips: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      comparePassword: async (candidate) => bcrypt.compare(candidate, user.password),
      toJSON: function () {
        const { password, ...rest } = this;
        return rest;
      },
      save: async function () {
        this.updatedAt = new Date();
        return this;
      },
    };
    users.push(user);
    return user;
  },
  findUserByEmail,
  findUserById,

  // ---------- Destinations ----------
  createDestination: async (data) => {
    const dest = { ...data, _id: generateId('dest'), createdAt: new Date(), updatedAt: new Date() };
    destinations.push(dest);
    return dest;
  },
  findDestinations: async (filter = {}, options = {}) => {
    let result = destinations.filter((d) => d.isActive !== false);
    if (filter.category) result = result.filter((d) => d.category === filter.category);
    if (filter.isFeatured === true) result = result.filter((d) => d.isFeatured);
    if (filter.minRating) result = result.filter((d) => d.rating >= Number(filter.minRating));
    if (filter.priceLevel) result = result.filter((d) => d.priceLevel === filter.priceLevel);
    if (filter.$text) {
      const q = filter.$text.$search.toLowerCase();
      result = result.filter(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          d.country.toLowerCase().includes(q) ||
          (d.city || '').toLowerCase().includes(q) ||
          (d.shortDescription || '').toLowerCase().includes(q) ||
          (d.description || '').toLowerCase().includes(q) ||
          (d.tags || []).some((t) => t.toLowerCase().includes(q))
      );
    }
    const sort = options.sort || {};
    if (sort.isFeatured === -1) {
      result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0) || b.rating - a.rating);
    } else {
      result.sort((a, b) => b.rating - a.rating);
    }
    const skip = options.skip || 0;
    const limit = options.limit || 20;
    const total = result.length;
    result = result.slice(skip, skip + limit);
    return { destinations: result, total };
  },
  countDocuments: async (filter = {}) => {
    let result = destinations.filter((d) => d.isActive !== false);
    if (filter.category) result = result.filter((d) => d.category === filter.category);
    if (filter.isFeatured === true) result = result.filter((d) => d.isFeatured);
    return result.length;
  },
  findDestinationById,
  findDestinationByIdAndUpdate: async (id, updates) => {
    const idx = destinations.findIndex((d) => d._id === id);
    if (idx === -1) return null;
    destinations[idx] = { ...destinations[idx], ...updates, updatedAt: new Date() };
    return destinations[idx];
  },
  distinct: async (field, filter = {}) => {
    let result = destinations.filter((d) => d.isActive !== false);
    if (filter.category) result = result.filter((d) => d.category === filter.category);
    return [...new Set(result.map((d) => d[field]))];
  },

  // ---------- Trips ----------
  createTrip: async (data) => {
    const trip = { ...data, _id: generateId('trip'), createdAt: new Date(), updatedAt: new Date() };
    trips.push(trip);
    return trip;
  },
  findTrips: async (filter = {}, options = {}) => {
    let result = trips.filter((t) => t.isArchived !== true);
    if (filter.user) result = result.filter((t) => t.user === filter.user);
    if (filter.destination) result = result.filter((t) => t.destination === filter.destination);
    result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    const skip = options.skip || 0;
    const limit = options.limit || 20;
    return result.slice(skip, skip + limit);
  },
  findTripById,
  findTripByIdAndUpdate: async (id, updates) => {
    const idx = trips.findIndex((t) => t._id === id);
    if (idx === -1) return null;
    trips[idx] = { ...trips[idx], ...updates, updatedAt: new Date() };
    return trips[idx];
  },
  deleteTrip: async (id) => {
    const idx = trips.findIndex((t) => t._id === id);
    if (idx === -1) return false;
    trips.splice(idx, 1);
    return true;
  },

  // ---------- Auth helpers ----------
  hashPassword: async (pw) => {
    const bcrypt = require('bcryptjs');
    return bcrypt.hash(pw, 10);
  },
  comparePassword: async (candidate, hash) => {
    const bcrypt = require('bcryptjs');
    return bcrypt.compare(candidate, hash);
  },

  // ---------- Favorites (in-memory) ----------
  toggleFavorite: async (userId, destinationId) => {
    const user = users.find((u) => u._id === userId);
    if (!user) return [];
    if (!user.preferences) user.preferences = { favoriteDestinations: [] };
    const favs = user.preferences.favoriteDestinations;
    const idx = favs.indexOf(destinationId);
    if (idx === -1) favs.push(destinationId);
    else favs.splice(idx, 1);
    return favs;
  },
  getFavorites: async (userId) => {
    const user = users.find((u) => u._id === userId);
    if (!user) return [];
    const favIds = (user.preferences && user.preferences.favoriteDestinations) || [];
    return destinations.filter((d) => favIds.includes(d._id));
  },

  // ---------- Share token (in-memory) ----------
  findTripByShareToken: async (token) => trips.find((t) => t.shareToken === token && t.isPublic),

  // ---------- User counts / roles (in-memory) ----------
  countUsers: async () => users.length,
  countAdmins: async () => users.filter((u) => u.role === 'admin').length,
  countTrips: async () => trips.filter((t) => t.isArchived !== true).length,
  listUsers: async () => users.map((u) => {
    const { password, ...safe } = u;
    return safe;
  }),
  listDestinations: async (filter = {}, options = {}) => {
    let result = destinations;
    if (filter.isFeatured === true) result = result.filter((d) => d.isFeatured);
    if (filter.isFeatured === false) result = result.filter((d) => !d.isFeatured);
    const total = result.length;
    const skip = options.skip || 0;
    const limit = options.limit || 20;
    return { destinations: result.slice(skip, skip + limit), total };
  },
  promoteToAdmin: async (id) => {
    const user = users.find((u) => u._id === id);
    if (!user) return null;
    user.role = 'admin';
    return user;
  },
};

module.exports = memory;
