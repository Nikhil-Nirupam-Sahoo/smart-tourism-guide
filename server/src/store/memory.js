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
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Eiffel_Tower_%28cropped%29.jpg/1024px-Eiffel_Tower_%28cropped%29.jpg',
    gallery: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Eiffel_Tower_%28cropped%29.jpg/1024px-Eiffel_Tower_%28cropped%29.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Musee_du_Louvre_%28cropped%29.jpg/1024px-Musee_du_Louvre_%28cropped%29.jpg',
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
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Tokyo_Tower_%2813608033575%29.jpg/1024px-Tokyo_Tower_%2813608033575%29.jpg',
    gallery: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Tokyo_Tower_%2813608033575%29.jpg/1024px-Tokyo_Tower_%2813608033575%29.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Senso-ji_Temple%2C_Tokyo.jpg/1024px-Senso-ji_Temple%2C_Tokyo.jpg',
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
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Pura_Lempuyang_Luhur.jpg/1024px-Pura_Lempuyang_Luhur.jpg',
    gallery: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Pura_Lempuyang_Luhur.jpg/1024px-Pura_Lempuyang_Luhur.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Tegalalang_Rice_Terrace%2C_Bali.jpg/1024px-Tegalalang_Rice_Terrace%2C_Bali.jpg',
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
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Sagrada_Familia_%28Facade%29.jpg/1024px-Sagrada_Familia_%28Facade%29.jpg',
    gallery: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Sagrada_Familia_%28Facade%29.jpg/1024px-Sagrada_Familia_%28Facade%29.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Parc_G%C3%BCell%2C_Barcelona.jpg/1024px-Parc_G%C3%BCell%2C_Barcelona.jpg',
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
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Table_Mountain_Aerial_Cableway%2C_Cape_Town.jpg/1024px-Table_Mountain_Aerial_Cableway%2C_Cape_Town.jpg',
    gallery: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Table_Mountain_Aerial_Cableway%2C_Cape_Town.jpg/1024px-Table_Mountain_Aerial_Cableway%2C_Cape_Town.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Victoria_%26_Alfred_Waterfront%2C_Cape_Town.jpg/1024px-Victoria_%26_Alfred_Waterfront%2C_Cape_Town.jpg',
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
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Kinkaku-ji_%28Golden_Pavilion%29%2C_Kyoto.jpg/1024px-Kinkaku-ji_%28Golden_Pavilion%29%2C_Kyoto.jpg',
    gallery: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Kinkaku-ji_%28Golden_Pavilion%29%2C_Kyoto.jpg/1024px-Kinkaku-ji_%28Golden_Pavilion%29%2C_Kyoto.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Fushimi_Inari_Taisha%2C_Kyoto.jpg/1024px-Fushimi_Inari_Taisha%2C_Kyoto.jpg',
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

  // ---------- User count (in-memory) ----------
  countUsers: async () => users.length,
};

module.exports = memory;
