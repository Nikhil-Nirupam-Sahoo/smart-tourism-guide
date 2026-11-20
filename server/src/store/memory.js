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

// ---------- Seed destinations ----------
const seedDestinations = [
  {
    name: 'Paris',
    country: 'France',
    city: 'Paris',
    description: 'The City of Light, famous for its art, fashion, gastronomy, and iconic landmarks like the Eiffel Tower and Louvre Museum.',
    shortDescription: 'Art, fashion, and romance on the Seine.',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1511739001486-6bfe1427b44c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80',
    ],
    category: 'culture',
    tags: ['romance', 'museums', 'fashion', 'food'],
    rating: 4.8,
    reviewCount: 1240,
    priceLevel: 'luxury',
    bestTimeToVisit: 'April to October',
    location: { type: 'Point', coordinates: [2.3522, 48.8566] },
    isFeatured: true,
    isActive: true,
  },
  {
    name: 'Tokyo',
    country: 'Japan',
    city: 'Tokyo',
    description: 'A vibrant metropolis where ultramodern skyscrapers stand beside historic temples, offering world-class dining and unique culture.',
    shortDescription: 'Neon lights, temples, and cutting-edge tech.',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1539067728879-ab317b8e3e04?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80',
    ],
    category: 'city',
    tags: ['technology', 'food', 'shopping', 'temples'],
    rating: 4.9,
    reviewCount: 1560,
    priceLevel: 'mid-range',
    bestTimeToVisit: 'March to May, September to November',
    location: { type: 'Point', coordinates: [139.6917, 35.6895] },
    isFeatured: true,
    isActive: true,
  },
  {
    name: 'Bali',
    country: 'Indonesia',
    city: 'Denpasar',
    description: 'Tropical paradise known for its lush rice terraces, volcanic mountains, coral reefs, and spiritual retreats.',
    shortDescription: 'Tropical beaches and serene rice terraces.',
    image: 'https://images.unsplash.com/photo-1537290961690-d8910cbc9762?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1527937352226-aa2565c5b2bb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1537290961690-d8910cbc9762?auto=format&fit=crop&w=800&q=80',
    ],
    category: 'relaxation',
    tags: ['beach', 'wellness', 'surfing', 'temples'],
    rating: 4.7,
    reviewCount: 980,
    priceLevel: 'budget',
    bestTimeToVisit: 'April to October',
    location: { type: 'Point', coordinates: [115.1889, -8.4095] },
    isFeatured: true,
    isActive: true,
  },
  {
    name: 'Barcelona',
    country: 'Spain',
    city: 'Barcelona',
    description: 'Mediterranean city renowned for Gaudí architecture, lively tapas culture, beaches, and a rich artistic heritage.',
    shortDescription: 'Gaudí architecture and Mediterranean vibes.',
    image: 'https://images.unsplash.com/photo-1532926437381-9968717a187f?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1537906710050-029921c7a6b6?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1532926437381-9968717a187f?auto=format&fit=crop&w=800&q=80',
    ],
    category: 'food',
    tags: ['architecture', 'tapas', 'beach', 'art'],
    rating: 4.6,
    reviewCount: 870,
    priceLevel: 'mid-range',
    bestTimeToVisit: 'May to October',
    location: { type: 'Point', coordinates: [2.1734, 41.3851] },
    isFeatured: false,
    isActive: true,
  },
  {
    name: 'Cape Town',
    country: 'South Africa',
    city: 'Cape Town',
    description: 'Stunning coastal city dominated by Table Mountain, with beaches, vineyards, and rich wildlife nearby.',
    shortDescription: 'Table Mountain, beaches, and vineyards.',
    image: 'https://images.unsplash.com/photo-1557813123-f9d9f0401a08?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1518578204556-4c2f0f0ee408?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1557813123-f9d9f0401a08?auto=format&fit=crop&w=800&q=80',
    ],
    category: 'nature',
    tags: ['hiking', 'wine', 'wildlife', 'beach'],
    rating: 4.8,
    reviewCount: 640,
    priceLevel: 'budget',
    bestTimeToVisit: 'November to March',
    location: { type: 'Point', coordinates: [18.4241, -33.9249] },
    isFeatured: false,
    isActive: true,
  },
  {
    name: 'Kyoto',
    country: 'Japan',
    city: 'Kyoto',
    description: 'Ancient capital filled with classical Buddhist temples, gardens, imperial palaces, Shinto shrines, and traditional wooden houses.',
    shortDescription: 'Temples, gardens, and traditional Japan.',
    image: 'https://images.unsplash.com/photo-1493976040374-85c877968a1e?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1493976040374-85c877968a1e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1469702235878-9866292501e2?auto=format&fit=crop&w=800&q=80',
    ],
    category: 'history',
    tags: ['temples', 'cherry blossoms', 'tea ceremony', 'culture'],
    rating: 4.9,
    reviewCount: 720,
    priceLevel: 'mid-range',
    bestTimeToVisit: 'March to May, October to November',
    location: { type: 'Point', coordinates: [135.7681, 35.0116] },
    isFeatured: false,
    isActive: true,
  },
];

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
      role: 'traveler',
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
          (d.shortDescription || '').toLowerCase().includes(q)
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
};

module.exports = memory;
